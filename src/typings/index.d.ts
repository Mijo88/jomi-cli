export declare interface PromptResult {
  packageManager: 'npm' | 'yarn';
  projectName: string;
  srcDirectoryName: string;
  buildDirectoryName: string;
  useTypeScript: boolean;
  createProjectDirectories: boolean;
}

export declare interface MakeFile {
  fileName: string;
  useCopy: boolean;
  path?: string;
}

export declare interface ProjectConfig extends PromptResult {
  projectRootDirectory: string;
  projectSourceDirectory: string;
}

export declare interface ESlintConfig {
  env?: {
    [prop: string]: boolean;
  };
  extends?: string[],
  parser?: string;
  parserOptions?: {
    [prop: string]: string;
  }
  plugins?: string[];
  rules?: {
    [prop: string]: string | string[] | unknown[];
  };
}
