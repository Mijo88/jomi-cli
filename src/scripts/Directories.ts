import path from 'path';

import config from '@/config';

import Base from './Base';

export default class Directories extends Base {

  public create = () => {
    this.createProjectRootDirectory();
    this.createProjectSourceDirectory();

    if (this.config.createProjectDirectories) {
      this.createProjectDirectoryStructure();
    }
  };

  protected createProjectRootDirectory = () => {
    this.createDirectory(this.config.projectRootDirectory);
  };

  protected createProjectSourceDirectory = () => {
    this.createDirectory(this.config.projectSourceDirectory);
  };

  protected createProjectDirectoryStructure = () => {
    const INDEX_FILE_EXT = this.config.useTypeScript ? 'ts' : 'js';
    const { projectRootDirectory, projectSourceDirectory } = this.config;
    // TODO: Provide different structure options
    const directories = [...config.projectDirectoryStructures.backendDefault];

    directories.forEach(({ dirName, addIndexFile, isSourceDirectory }) => {
      const dirPath = isSourceDirectory
        ? path.resolve(projectSourceDirectory, dirName)
        : path.resolve(projectRootDirectory, dirName);

      this.createDirectory(dirPath);

      const filePath = addIndexFile ? path.resolve(dirPath, `index.${INDEX_FILE_EXT}`) : null;
      if (filePath) {
        this.createFile(filePath);
      }
    });
  };

}
