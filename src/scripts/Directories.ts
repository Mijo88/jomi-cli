
import Base from './Base';

const DIRECTORY_STRUCTURE_BACKEND = [
  {
    dirName: 'controllers',
    addIndexFile: true,
    isSourceDirectory: true,
  },
  {
    dirName: 'routers',
    addIndexFile: true,
    isSourceDirectory: true,
  },
  {
    dirName: 'services',
    addIndexFile: true,
    isSourceDirectory: true,
  },
  {
    dirName: 'models',
    addIndexFile: true,
    isSourceDirectory: true,
  },
  {
    dirName: 'middleware',
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
      dirName,
      addIndexFile,
      isSourceDirectory,
    }) => {
      const dirPath = isSourceDirectory
        ? `${this.projectSourceDirectory}/${dirName}`
        : `${this.projectRootDirectory}/${dirName}`;

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
