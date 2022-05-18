import path from 'path';

import config from '@/config';
import { MakeFile } from '@/typings';

import Base from './Base';

export default class Files extends Base {

  public create = () => {
    this.createProjectRootFiles();
    this.createProjectSourceFiles();
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

}
