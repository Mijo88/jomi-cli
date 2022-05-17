export declare namespace Directory {
  interface CreateObj {
    name: string;
    files?: string[];
  }
}

export declare interface PromptConfig {
  projectName: string;
  useTypeScript: boolean;
  useBackendFramework: 'express' | null;
  useTestLibrary: 'jest' | null;
  useImportExportType: 'es6' | 'commonjs';
  createProjectDirectories: boolean;
  initializeGit: boolean;
}
