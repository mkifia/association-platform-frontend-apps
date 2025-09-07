module.exports = {
  extends: [
    'next/core-web-vitals',
    '@next/eslint-config-next',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/prefer-const': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    '@next/next/no-img-element': 'warn',
    'jsx-a11y/alt-text': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
