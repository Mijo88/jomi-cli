import path from 'path';

const TEMPLATES_PATH = path.resolve(`${__dirname}/../templates`);

export default {
  paths: { templates: TEMPLATES_PATH },
  files: {
    root: [
      {
        fileName: 'README.md',
        useCopy: false,
      },
      {
        fileName: '.editorconfig',
        useCopy: true,
        path: path.resolve(TEMPLATES_PATH, 'editorconfig', 'config-default'),
      },
      {
        fileName: '.gitignore',
        useCopy: true,
        path: path.resolve(TEMPLATES_PATH, 'git', 'ignore-default'),
      },
      {
        fileName: '.env',
        useCopy: false,
      },
    ],
    source: [
      {
        fileName: 'app.js',
        useCopy: false,
      },
    ],
  },
  projectDirectoryStructures: {
    backendDefault: [
      {
        dirName: 'controllers',
        addIndexFile: true,
        isSourceDirectory: true,
      },
      {
        dirName: 'routers',
        addIndexFile: true,
        isSourceDirectory: true,
      },
      {
        dirName: 'services',
        addIndexFile: true,
        isSourceDirectory: true,
      },
      {
        dirName: 'models',
        addIndexFile: true,
        isSourceDirectory: true,
      },
      {
        dirName: 'middleware',
        addIndexFile: true,
        isSourceDirectory: true,
      },
    ],
  },
  packages: {
    'core': {
      runtime: ['dotenv'],
      dev: [
        'eslint',
        'eslint-plugin-simple-import-sort',
      ],
    },
    'core-ts': {
      runtime: [],
      dev: [
        'ts-node',
        'typescript',
        'ttypescript',
        'typescript-transform-paths',
        '@types/node',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
      ],
    },
    'express': {
      runtime: [],
      dev: [],
    },
    'express-ts': {
      runtime: [],
      dev: [],
    },
    'jest': {
      runtime: [],
      dev: [],
    },
    'jest-ts': {
      runtime: [],
      dev: [],
    },
  },
};
