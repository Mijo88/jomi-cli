import fs from 'fs';
import inquirer from 'inquirer';

import type { PromptResult } from '@/typings';

// eslint-disable-next-line max-lines-per-function
export default async (): Promise<PromptResult> => {
  const result = await inquirer.prompt(
    [
      {
        type: 'input',
        name: 'projectName',
        message: 'Name of project?',
        validate: function(projectName: string) {
          const isValidProjectName = !!projectName && !/[^\w-]/.test(projectName);
          if (!isValidProjectName) {
            return 'Only letters, numbers, - and _ are supported for project names';
          }

          const projectDirectory = `${process.cwd()}/${projectName}`;
          if (fs.existsSync(projectDirectory)) {
            const message = [
              `Project directory ${projectName} already exists. `,
              'Please pick a different name ',
              'or delete the directory first.',
            ].join('');

            return message;
          }

          return true;
        },
      },
      {
        type: 'list',
        name: 'packageManager',
        messsage: 'Which package manager are you using?',
        choices: [
          {
            name: 'npm',
            value: 'npm',
          },
          {
            name: 'yarn',
            value: 'yarn',
          },
        ],
      },
      {
        type: 'list',
        name: 'srcDirectoryName',
        message: 'Name of project source directory?',
        choices: [
          {
            name: 'src',
            value: 'src',
          },
          {
            name: 'source',
            value: 'source',
          },
        ],
      },
      {
        type: 'confirm',
        name: 'useTypeScript',
        message: 'Use TypeScript?',
        default: true,
      },
      {
        type: 'list',
        name: 'useBackendFramework',
        message: 'Which framework do you want to use?',
        choices: [
          {
            name: 'None',
            value: null,
          },
          {
            name: 'Express',
            value: 'express',
          },
        ],
      },
      {
        type: 'list',
        name: 'useTestLibrary',
        message: 'Which testing framework do you want to use?',
        choices: [
          {
            name: 'None',
            value: null,
          },
          {
            name: 'Jest',
            value: 'jest',
          },
        ],
      },
      {
        type: 'list',
        name: 'useImportExportType',
        message: 'Which import/export type do you want to use?',
        choices: [
          {
            name: 'CommonJS',
            value: 'commonjs',
          },
          {
            name: 'ES6 modules',
            value: 'es6',
          },
        ],
      },
      {
        type: 'confirm',
        name: 'createProjectDirectories',
        message: 'Create project directory structure?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'initializeGit',
        message: 'Create an empty git repository?',
        default: false,
      },
    ],
  );

  return result;
};
