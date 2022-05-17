export declare namespace Options {
  type BackendFramework = 'express';
  type TestLibrary = 'jest';
  type ImportExportType = 'es6' | 'commonjs';
}

export declare interface PromptResult {
  projectName: string;
  srcDirectoryName: string;
  useTypeScript: boolean;
  useBackendFramework: 'express' | null;
  useTestLibrary: 'jest' | null;
  useImportExportType: 'es6' | 'commonjs';
  createProjectDirectories: boolean;
  initializeGit: boolean;
}

export declare interface ProjectConfig extends PromptResult {
  projectRootDirectory: string;
  projectSourceDirectory: string;
  templatesDirectory: string;
}
