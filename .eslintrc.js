module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    'plugin:react/jsx-runtime',
    'standard-with-typescript',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    "ecmaFeatures": {
      "jsx": true
    },
    // ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react'
  ],
  rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    // "dot-notation": "off",
    "react/jsx-key": "warn",
    "@typescript-eslint/dot-notation": "warn",
    "@typescript-eslint/quotes": "warn",
    "@typescript-eslint/no-unused-vars": "warn"
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    react: {
      version: 'detect',
    },
  }
}
