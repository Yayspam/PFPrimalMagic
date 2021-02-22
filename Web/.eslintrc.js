module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'jsx-a11y/click-events/have-key-events': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'any',
        prev: 'block-like',
        next: 'return',
      },
    ],
    'prettier/prettier': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    indent: ['error', 2],
    'no-multi-spaces': ['error'],
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    allowImportEverywhere: true,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to auto detect React version to use
    },
  },
};
