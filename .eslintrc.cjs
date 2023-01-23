module.exports = {
  // ...
  extends: ['standard', 'plugin:astro/recommended'],
  rules: {
    'no-tabs': 'off',
    'indent': 'off',
    'space-before-function-paren': 'off',
    semicolon: 'on'
  },
  // ...
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {}
    }
  ]
}