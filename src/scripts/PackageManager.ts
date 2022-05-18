import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

import config from '@/config';

import Base from './Base';

export default class PackageManager extends Base {

  public init = async () => {
    // Set process directory to where commands should be executed from
    const { projectRootDirectory } = this.config;
    process.chdir(projectRootDirectory);

    await this.execInitCommand();
    await this.execInstallCommand();
    this.addScripts();
  };

  protected addScripts = () => {
    const {
      projectRootDirectory,
      projectSourceDirectory,
      useTypeScript,
    } = this.config;

    const entryFile = path.resolve(projectSourceDirectory, `index.${useTypeScript ? 'ts' : 'js'}`);
    const packageJSONPath = path.resolve(projectRootDirectory, 'package.json');

    const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, { encoding: 'utf-8' }));
    packageJSON.scripts = {} as { [scriptName: string]: string };
    packageJSON.scripts.start = `node ${entryFile}`;
    packageJSON.scripts['start:watch'] = `nodemon ${entryFile}`;
    packageJSON.scripts.lint = useTypeScript ? 'eslint . --ext .ts' : 'eslint **/*.js';

    if (useTypeScript) {
      packageJSON.scripts.start = `ts-node -r tsconfig-paths/register ${entryFile}`;
      packageJSON.scripts['start:watch'] = `nodemon ${entryFile}`;
      packageJSON.scripts.tsc = 'tsc --noEmit';
      packageJSON.scripts['tsc:watch'] = 'tsc --noEmit --watch';
      packageJSON.scripts.build = 'ttsc';
    }

    this.createFile(packageJSONPath, JSON.stringify(packageJSON, null, 2));
  };

  protected getPackages = () => {
    const { packages } = config;

    // Add core packages
    const runtimePackages = [...packages.core.runtime];
    const devPackages = [...packages.core.dev];

    // Add typescript packages
    if (this.config.useTypeScript) {
      runtimePackages.push(...packages['core-ts'].runtime);
      devPackages.push(...packages['core-ts'].dev);
    }

    return {
      runtimePackages: runtimePackages,
      devPackages: devPackages,
    };
  };

  protected execInitCommand = async () => {
    const { packageManager } = this.config;
    const command = packageManager === 'npm' ? 'npm init -y' : 'yarn init -y';
    await this.execCommandAsync(command);
  };

  protected execInstallCommand = async () => {
    const { packageManager } = this.config;
    const commandBase = packageManager === 'npm' ? 'npm install' : 'yarn add';

    const { runtimePackages, devPackages } = this.getPackages();
    await this.execCommandAsync(`${commandBase} ${runtimePackages.join(' ')}`);
    await this.execCommandAsync(`${commandBase} -D ${devPackages.join(' ')}`);
  };

}
