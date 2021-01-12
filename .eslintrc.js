module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    semi: 0,
    'comma-dangle': 0,
    'space-before-function-paren': 0,
  },
};
