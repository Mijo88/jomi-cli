#!/usr/bin/env node
import promptUser from '@/prompt';
import { createDirectories } from '@/directories';

(async (command: string, ...args: string[]) => {
  if (!command) {
    console.log('No command was specified');
    return;
  }

  if (command === 'create-app') {
    // Check if project name was provided
    const promptConfig = await promptUser();
    const {
      createProjectDirectories,
      useTypeScript,
    } = promptConfig;

    if (createProjectDirectories) {
      // Create list of directories to create and files to add
      const ext = useTypeScript ? 'ts' : 'js';
      const directories = [
        { name: 'controllers', files: [`index.${ext}`] },
        { name: 'routers', files: [`index.${ext}`] },
        { name: 'services', files: [`index.${ext}`] },
        { name: 'models', files: [`index.${ext}`] },
        { name: 'middleware', files: [`index.${ext}`] },
      ]
      if (useTypeScript) {
        directories.push({ name: '@types', files: ['index.d.ts'] });
      }
      // Create directories and content
      createDirectories(directories, promptConfig);
    }
  }

  return;
})(process.argv[2], ...process.argv.slice(3));
