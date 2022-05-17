#!/usr/bin/env node
import setup from '@/scripts';

(async (command: string, ..._args: string[]) => {
  if (!command) {
    console.log('No command was specified');

    return;
  }

  if (command === 'create-app') {
    await setup();
    // const SOURCE_DIR = 'src';
    // const promptConfig = await promptUser();
    // const {
    //   createProjectDirectories,
    //   useTypeScript,
    // } = promptConfig;

    // // Create project root directory
    // createDirectory(promptConfig);
    // // Create src directory
    // createDirectory(promptConfig, SOURCE_DIR);
    // // Create project files
    // const jsExt = useTypeScript ? 'ts' : 'js';
    // const projectFiles = [
    //   {
    //     path: '',
    //     files: ['.gitignore', 'README.md', '.editorconfig', '.env'],
    //   },
    //   {
    //     path: SOURCE_DIR,
    //     files: [`app.${jsExt}`],
    //   },
    // ];
    // if (useTypeScript) {
    //   projectFiles.push({
    //     path: '',
    //     files: ['tsconfig.json'],
    //   });
    // }

    // projectFiles.forEach(({ path, files }) => {
    //   files.forEach((fileName) => {
    //     createFile(promptConfig, path, fileName);
    //   });
    // });

    // // NPM dependencies
    // const projectDependencies: string[] = [];
    // // NPM Dev dependencies
    // let projectDevDependencies = ['eslint'];
    // if (useTypeScript) {
    //   projectDevDependencies = [
    //     ...projectDevDependencies,
    //     ...[
    //       'typescript',
    //       'ttypescript',
    //       '@types/node',
    //       '@typescript-eslint/parser',
    //       '@typescript-eslint/eslint-plugin',
    //       'typescript-transform-paths',
    //     ],
    //   ];
    // }

    // const installDependenciesCommand = projectDependencies
    //   ? `npm install ${projectDependencies.join(' ')}`
    //   : '';

    // const installDevDependenciesCommand = `npm install ${projectDevDependencies.join(' ')}`;

    // // Create list of directories to create and files to add
    // if (createProjectDirectories) {
    //   const directories = [
    //     {
    //       path: `${SOURCE_DIR}/controllers`,
    //       files: [`index.${jsExt}`],
    //     },
    //     {
    //       path: `${SOURCE_DIR}/routers`,
    //       files: [`index.${jsExt}`],
    //     },
    //     {
    //       path: `${SOURCE_DIR}/services`,
    //       files: [`index.${jsExt}`],
    //     },
    //     {
    //       path: `${SOURCE_DIR}/models`,
    //       files: [`index.${jsExt}`],
    //     },
    //     {
    //       path: `${SOURCE_DIR}/middleware`,
    //       files: [`index.${jsExt}`],
    //     },
    //   ];

    //   if (useTypeScript) {
    //     directories.push({
    //       path: `${SOURCE_DIR}/@types`,
    //       files: ['index.d.ts'],
    //     });
    //     directories.push({
    //       path: `${SOURCE_DIR}/typings`,
    //       files: ['index.d.ts'],
    //     });
    //   }

    //   directories.forEach(({ path, files }) => {
    //     createDirectory(promptConfig, path);
    //     if (files) {
    //       files.forEach((fileName) => {
    //         createFile(promptConfig, path, fileName);
    //       });
    //     }
    //   });
    // }

    // const rootDir = `${process.cwd()}/${promptConfig.projectName}`;

    // exec(`cd ${rootDir} && npm init -y`);
    // if (installDependenciesCommand) {
    //   exec(`cd ${rootDir} && ${installDependenciesCommand}`, (error, stdout, stderr) => {
    //     if (error) {
    //       console.log(error);
    //     }

    //     console.log(stdout);
    //     console.log(stderr);
    //   });
    // }

    // if (installDevDependenciesCommand) {
    //   exec(`cd ${rootDir} && ${installDevDependenciesCommand}`, (error, stdout, stderr) => {
    //     if (error) {
    //       console.log(error);
    //     }

    //     console.log(stdout);
    //     console.log(stderr);
    //   });
    // }
  }
})(process.argv[2], ...process.argv.slice(3));
