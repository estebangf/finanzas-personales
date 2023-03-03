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
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react'
  ],
  rules: {
    "dot-notation": "off",
    "no-case-declarations": "off",
    "react/jsx-key": "warn",
    "react/prop-types": "off",
    "@typescript-eslint/dot-notation": "warn",
    "@typescript-eslint/quotes": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/promise-function-async": "off",
    "@no-case-declarations": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    // "@typescript-eslint/space-before-function-paren": "off",
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
