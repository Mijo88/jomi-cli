import path from 'path';

import config from '@/config';

import Commands from './Commands';
import Directories from './Directories';
import Files from './Files';
import PackageManager from './PackageManager';
import promptUser from './prompt';

// eslint-disable-next-line max-lines-per-function
export default async function setup() {
  const promptResult = await promptUser();
  const { projectName, srcDirectoryName } = promptResult;

  // Store directory paths
  const projectRootDirectory = path.resolve(process.cwd(), projectName);
  const projectSourceDirectory = path.resolve(projectRootDirectory, srcDirectoryName);
  const templatesDirectory = config.paths.templates;

  // Create full project config by merging prompt results with dir paths
  const projectConfig = {
    ...promptResult,
    projectRootDirectory: projectRootDirectory,
    projectSourceDirectory: projectSourceDirectory,
    templatesDirectory: templatesDirectory,
  };

  // Initialize classes
  const commands = new Commands(projectConfig);
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
