import Commands from './Commands';
import Directories from './Directories';
import Files from './Files';
import PackageManager from './PackageManager';
import promptUser from './prompt';

export interface Dependencies {
  commands: Commands;
  directories: Directories;
  files: Files;
  packageManager: PackageManager;
}

// eslint-disable-next-line max-lines-per-function
export default async function setup() {
  const promptResult = await promptUser();
  const { projectName, srcDirectoryName } = promptResult;

  // Store directory paths
  const projectRootDirectory = `${process.cwd()}/${projectName}`;
  const projectSourceDirectory = `${projectRootDirectory}/${srcDirectoryName}`;
  const templatesDirectory = __dirname;

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

  // Pass dependencies on to each class instance
  const dependencies = {
    commands: commands,
    directories: directories,
    files: files,
    packageManager: packageManager,
  };

  Object.values(dependencies).forEach((dependency) => {
    dependency.inject(dependencies);
  });

  // Create directories
  directories.create();
}
