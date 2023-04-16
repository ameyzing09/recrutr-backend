module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      project: './tsconfig.json',
    },
    ignorePatterns: ['.eslintrc.cjs'],
    env: {
      node: true,
      es2022: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    plugins: ['@typescript-eslint'],
    rules: {
      // Your custom rules go here
    },
  };
  