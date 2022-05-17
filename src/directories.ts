import fs from 'fs';

import type { PromptConfig } from '@/typings';

const CWD = process.cwd();

export function createDirectory(cfg: PromptConfig, relativePath?: string) {
  const rootDir = `${CWD}/${cfg.projectName}`;
  if (!relativePath) {
    if (!fs.existsSync(rootDir)) {
      fs.mkdirSync(rootDir, { recursive: true });
    }

    return;
  }

  const dirPath = `${rootDir}/${relativePath}`;
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function createFile(cfg: PromptConfig, relativeDirPath: string, fileName: string) {
  const absDirPath = `${CWD}/${cfg.projectName}/${relativeDirPath}`;
  if (!fs.existsSync(absDirPath)) {
    return null;
  }

  const filePath = `${absDirPath}/${fileName}`;
  fs.writeFileSync(filePath, '');

  return filePath;
}
