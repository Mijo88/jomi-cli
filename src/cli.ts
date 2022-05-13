#!/usr/bin/env node
const fs = require('fs');
const inquirer = require('inquirer');

(async (command: string, ...args: string[]) => {
  if (!command) {
    console.log('No command was specified');
    return;
  }
  const currentDirectory = process.cwd(); // Get dir path from which the CLI command was executed

  if (command === 'create-app') {
    // Check if project name was provided
    const result = await inquirer.prompt(
      [
        {
          type: 'input',
          name: 'projectName',
          message: 'Name of project?',
          validate: function (projectName: string) {
            const isValidProjectName = !/[^\w-]/.test(projectName);
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
  }
  return;
})(process.argv[2], ...process.argv.slice(3));
