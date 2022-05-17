import fs from 'fs';

import type { Dependencies } from '@/scripts';
import type { Options, ProjectConfig } from '@/typings';

export default class Base {

  protected projectName: string;

  protected projectRootDirectory: string;
  protected projectSourceDirectory: string;
  protected templatesDirectory: string;

  protected useTypeScript: boolean;
  protected useBackendFrameWork: Options.BackendFramework | null;
  protected useTestLibrary: Options.TestLibrary | null;
  protected useImportExportType: Options.ImportExportType;
  protected createProjectDirectories: boolean;

  protected dependencies: Dependencies | null = null;

  constructor(cfg: ProjectConfig) {
    this.projectName = cfg.projectName;

    this.projectRootDirectory = cfg.projectRootDirectory;
    this.projectSourceDirectory = cfg.projectSourceDirectory;
    this.templatesDirectory = cfg.templatesDirectory;

    this.useTypeScript = cfg.useTypeScript;
    this.useBackendFrameWork = cfg.useBackendFramework;
    this.useTestLibrary = cfg.useTestLibrary;
    this.useImportExportType = cfg.useImportExportType;
    this.createProjectDirectories = cfg.createProjectDirectories;
  }

  public inject = (dependencies: Dependencies) => {
    // Filter out dependencies that are the same as this
    const filteredDependencies = Object.entries(dependencies)
      .reduce((acc, [name, instance]) => {
        if (instance === this) {
          return acc;
        }

        return {
          ...acc,
          [name]: instance,
        };
      }, {}) as Dependencies;

    this.dependencies = filteredDependencies;
  };

  /**
   * @param path - Absolute file path (including directory name to create)
   * @param deleteIfExists - Delete directory before recreating it
   */
  protected createDirectory = (path: string, deleteIfExists = false) => {
    if (fs.existsSync(path) && deleteIfExists) {
      fs.rmSync(path, {
        force: true,
        recursive: true,
      });
    }

    fs.mkdirSync(path, { recursive: true });
  };

  protected createFile = (path: string) => {
    fs.writeFileSync(path, '');
  };

}
