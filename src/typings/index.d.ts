export declare interface PromptResult {
  packageManager: 'npm' | 'yarn';
  projectName: string;
  srcDirectoryName: string;
  useTypeScript: boolean;
  useBackendFramework: 'express' | null;
  useTestLibrary: 'jest' | null;
  useImportExportType: 'es6' | 'commonjs';
  createProjectDirectories: boolean;
  initializeGit: boolean;
}

export declare interface MakeFile {
  fileName: string;
  useCopy: boolean;
  path?: string;
}

export declare interface ProjectConfig extends PromptResult {
  projectRootDirectory: string;
  projectSourceDirectory: string;
  templatesDirectory: string;
}
