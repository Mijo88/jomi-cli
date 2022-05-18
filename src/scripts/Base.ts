/* eslint-disable no-console */
import type { ExecException } from 'child_process';
import fs from 'fs';

import type { ProjectConfig } from '@/typings';

export default class Base {

  protected config: ProjectConfig;

  constructor(cfg: ProjectConfig) {
    this.config = cfg;
  }

  /**
   * @param path - Absolute directory path (including directory name to create)
   * @param deleteIfExists - Delete directory before recreating it
   */
  protected createDirectory = (path: string, deleteIfExists = false) => {
    if (fs.existsSync(path) && deleteIfExists) {
      fs.rmSync(path, { force: true, recursive: true });
    }

    fs.mkdirSync(path, { recursive: true });
  };

  /**
   * @param path - Absolute file path (including file name to create)
   */
  protected createFile = (path: string) => {
    fs.writeFileSync(path, '');
  };

  /**
   * @param sourcePath - Absolute path to source file
   * @param destinationPath - Absolute destination path (including file name)
   */
  protected copyFile = (sourcePath: string, destinationPath: string) => {
    fs.copyFileSync(sourcePath, destinationPath);
  };

  /** Transforms file name based on condition (.js -> .ts) */
  protected transFormFileName = (fileName: string) => {
    const { useTypeScript } = this.config;
    if (useTypeScript && fileName.includes('js')) {
      return fileName.replace('.js', '.ts');
    }

    return fileName;
  };

  /** Callback function to print feedback from exec command */
  protected execCommandCallback = (error: ExecException | null, stdout: string, stderr: string) => {
    if (error) {
      console.log(error);

      return;
    }

    console.log(stdout);
    console.log(stderr);
  };

}
