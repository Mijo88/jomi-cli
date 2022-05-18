import path from 'path';

import Directories from './Directories';
import Files from './Files';
import PackageManager from './PackageManager';
import promptUser from './prompt';

export default async function setup() {
  const promptResult = await promptUser();
  const { projectName, srcDirectoryName } = promptResult;

  // Store directory paths
  const projectRootDirectory = path.resolve(process.cwd(), projectName);
  const projectSourceDirectory = path.resolve(projectRootDirectory, srcDirectoryName);

  // Create full project config by merging prompt results with dir paths
  const projectConfig = {
    ...promptResult,
    projectRootDirectory: projectRootDirectory,
    projectSourceDirectory: projectSourceDirectory,
  };

  // Initialize classes
  const directories = new Directories(projectConfig);
  const files = new Files(projectConfig);
  const packageManager = new PackageManager(projectConfig);

  // Create directories
  directories.create();

  // Create project files
  files.create();

  // Initialize and install NPM packages
  packageManager.init();
}
