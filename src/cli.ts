#!/usr/bin/env node
import setup from '@/scripts';

(async (command: string, ..._args: string[]) => {
  if (!command) {
    console.log('No command was specified');

    return;
  }

  if (command === 'create-app') {
    await setup();
  }
})(process.argv[2], ...process.argv.slice(3));
