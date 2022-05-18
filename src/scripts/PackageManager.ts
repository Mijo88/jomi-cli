import { exec } from 'child_process';

import config from '@/config';

import Base from './Base';

export default class PackageManager extends Base {

  public init = () => {
    // Set process directory to where commands should be executed from
    const { projectRootDirectory } = this.config;
    process.chdir(projectRootDirectory);

    this.execInitCommand();
    this.execInstallCommand();
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

  protected execInitCommand = () => {
    const { packageManager } = this.config;
    const command = packageManager === 'npm' ? 'npm init -y' : 'yarn init -y';
    exec(command);
  };

  protected execInstallCommand = () => {
    const { packageManager } = this.config;
    const commandBase = packageManager === 'npm' ? 'npm install' : 'yarn add';

    const { runtimePackages, devPackages } = this.getPackages();

    exec(`${commandBase} ${runtimePackages.join(' ')}`, this.execCommandCallback);
    exec(`${commandBase} -D ${devPackages.join(' ')}`, this.execCommandCallback);
  };

}
