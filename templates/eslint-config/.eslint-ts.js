const CWD = process.cwd();

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-var': 'off',
    '@typescript-eslint/no-unused-var': 'warn',
  },
}
