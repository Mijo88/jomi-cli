import fs from 'fs';

import type {
  Directory,
  PromptConfig,
} from '@/typings';

export function createDirectories(directories: Directory.CreateObj[], cfg: PromptConfig) {
  const cwd = process.cwd();

  directories.forEach((dir) => {
    const dirPath = `${cwd}/src/${dir.name}`;
    console.log('dirPath:', dirPath);
  });
}
