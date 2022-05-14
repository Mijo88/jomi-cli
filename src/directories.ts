import fs from 'fs';

import type {
  Directory,
  PromptConfig,
} from '@/typings';

const CWD = process.cwd();

export function createProjectRootDirectory(cfg: PromptConfig) {
  const projectRootDir = `${CWD}/${cfg.projectName}`;
  fs.mkdirSync(`${CWD}/${projectRootDir}`, { recursive: true });
}

export function createDirectories(directories: Directory.CreateObj[], cfg: PromptConfig) {
  const projectRootDir = cfg.projectName;

  directories.forEach((dir) => {
    const dirPath = `${CWD}/${projectRootDir}/src/${dir.name}`;
    fs.mkdirSync(dirPath, { recursive: true });
    if (!dir.files) return;

    dir.files.forEach((file) => {
      const filePath = `${dirPath}/${file}`;
      console.log('filePath:', filePath);
    });
  });
}