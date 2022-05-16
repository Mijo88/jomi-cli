import inquirer from 'inquirer';
import type { PromptConfig } from '@/typings';

export default async (): Promise<PromptConfig> => await inquirer.prompt(
  [
    {
      type: 'input',
      name: 'projectName',
      message: 'Name of project?',
      validate: function (projectName: string) {
        const isValidProjectName = !!projectName && !/[^\w-]/.test(projectName);
        if (isValidProjectName) return true;
        return 'Only letters, numbers, - and _ are supported for project names'
      },
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
        { name: 'None', value: null },
        { name: 'Express', value: 'express' },
      ]
    },
    {
      type: 'list',
      name: 'useTestLibrary',
      message: 'Which testing framework do you want to use?',
      choices: [
        { name: 'None', value: null },
        { name: 'Jest', value: 'jest' },
      ]
    },
    {
      type: 'list',
      name: 'useImportExportType',
      message: 'Which import/export type do you want to use?',
      choices: [
        { name: 'CommonJS', value: 'commonjs' },
        { name: 'ES6 modules', value: 'es6' },
      ]
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
)
