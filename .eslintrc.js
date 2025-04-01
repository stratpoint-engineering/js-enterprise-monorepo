module.exports = {
  root: true,
  extends: ['./packages/config/eslint-preset.js'],
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  overrides: [
    // TypeScript files
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json', './apps/*/tsconfig.json', './packages/*/tsconfig.json'],
      },
      settings: {
        'import/resolver': {
          typescript: {
            project: ['./tsconfig.json', './apps/*/tsconfig.json', './packages/*/tsconfig.json'],
          },
        },
      },
    },
    // JavaScript files
    {
      files: ['*.js', '*.jsx'],
      parser: 'espree', // Use the default ESLint parser for JavaScript files
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'commonjs',
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
