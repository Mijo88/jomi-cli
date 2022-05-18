import fs from 'fs';
import path from 'path';

import config from '@/config';
import { ESlintConfig, MakeFile } from '@/typings';

import Base from './Base';

export default class Files extends Base {

  public create = () => {
    this.createProjectRootFiles();
    this.createProjectSourceFiles();

    this.createESlintConfigFile();
    if (this.config.useTypeScript) {
      this.createTSConfigFile();
    }
  };

  protected createProjectRootFiles = () => {
    const { projectRootDirectory } = this.config;
    const filesToCreate = config.files.root;
    filesToCreate.forEach((file) => {
      this.addFile(projectRootDirectory, file);
    });
  };

  protected createProjectSourceFiles = () => {
    const { projectSourceDirectory } = this.config;
    const filesToCreate = config.files.source;
    filesToCreate.forEach((file) => {
      this.addFile(projectSourceDirectory, file);
    });
  };

  protected addFile = (
    destinationDirectoryPath: string,
    file: MakeFile,
    transformFileName = true,
  ) => {
    const fileName = transformFileName
      ? this.transFormFileName(file.fileName)
      : file.fileName;
    const destinationPath = path.resolve(destinationDirectoryPath, fileName);

    if (file.useCopy) {
      const sourcePath = file.path;
      if (!sourcePath) {
        throw new Error('Missing source path');
      }

      this.copyFile(sourcePath, destinationPath);

      return;
    }

    this.createFile(destinationPath);
  };

  protected createTSConfigFile = () => {
    const { projectRootDirectory } = this.config;
    const sourcePath = path.resolve(config.paths.templates, 'tsconfig', 'default.json');
    const configTemplate = fs.readFileSync(sourcePath, { encoding: 'utf-8' })
      .replace(/{{ SOURCE_VAR }}/g, this.config.srcDirectoryName)
      .replace(/{{ BUILD_VAR }}/g, this.config.buildDirectoryName);

    this.createFile(
      path.resolve(projectRootDirectory, 'tsconfig.json'),
      configTemplate,
    );
  };

  protected loadESlintRules = () => {
    const { eslint } = config;

    return {
      vanilla: JSON.parse(fs.readFileSync(eslint.rules.vanilla, { encoding: 'utf-8' })),
      typescript: JSON.parse(fs.readFileSync(eslint.rules.typescript, { encoding: 'utf-8' })),
    };
  };

  protected createESlintConfigFile = () => {
    const { eslint } = config;
    const { useTypeScript, projectRootDirectory } = this.config;

    const lang = useTypeScript ? 'typescript' : 'vanilla';
    const eslintConf: ESlintConfig = {};

    eslintConf.env = eslint.env.node;
    eslintConf.extends = eslint.extends[lang];
    if (useTypeScript) {
      eslintConf.parser = eslint.parser[lang] as string;
    }
    eslintConf.parserOptions = eslint.parserOptions[lang];
    eslintConf.plugins = eslint.plugins[lang];

    const rules = this.loadESlintRules();
    eslintConf.rules = useTypeScript
      ? { ...rules.vanilla, ...rules.typescript }
      : { ...rules.vanilla };

    this.createFile(
      path.resolve(projectRootDirectory, '.eslintrc.json'),
      JSON.stringify(eslintConf, null, 2),
    );
  };

}
