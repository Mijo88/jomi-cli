import fs from 'fs';

import Base from './Base';

const DIRECTORY_STRUCTURE_BACKEND = [
  {
    dir: 'controllers',
    addIndexFile: true,
    isSourceDirectory: true,
  },
  {
    dir: 'routers',
    addIndexFile: true,
    isSourceDirectory: true,
  },
  {
    dir: 'services',
    addIndexFile: true,
    isSourceDirectory: true,
  },
  {
    dir: 'models',
    addIndexFile: true,
    isSourceDirectory: true,
  },
  {
    dir: 'middleware',
    addIndexFile: true,
    isSourceDirectory: true,
  },
];

export default class Directories extends Base {

  public create() {
    this.createProjectRootDirectory();
    this.createProjectSourceDirectory();

    if (this.createProjectDirectories) {
      this.createProjectDirectoryStructure();
    }
  }

  /**
   * @param path - Absolute file path (including directory name to create)
   * @param deleteIfExists - Delete directory before recreating it
   */
  protected createDirectory = (path: string, deleteIfExists = false) => {
    if (fs.existsSync(path) && deleteIfExists) {
      fs.rmSync(path, {
        force: true,
        recursive: true,
      });
    }

    fs.mkdirSync(path, { recursive: true });
  };

  protected createProjectRootDirectory = () => {
    this.createDirectory(this.projectRootDirectory);
  };

  protected createProjectSourceDirectory = () => {
    this.createDirectory(this.projectSourceDirectory);
  };

  protected createProjectDirectoryStructure = () => {
    const INDEX_FILE_EXT = this.useTypeScript ? 'ts' : 'js';
    // TODO: Provide different structure options
    const directories = [...DIRECTORY_STRUCTURE_BACKEND];
    directories.forEach(({
      dir,
      addIndexFile,
      isSourceDirectory,
    }) => {
      const dirPath = isSourceDirectory
        ? `${this.projectSourceDirectory}/${dir}`
        : `${this.projectRootDirectory}/${dir}`;

      this.createDirectory(dirPath);

      const filePath = addIndexFile
        ? `${dirPath}/index.${INDEX_FILE_EXT}`
        : null;

      if (filePath && this.dependencies?.files) {
        const { files } = this.dependencies;
        // Create file
      }
    });
  };

}
