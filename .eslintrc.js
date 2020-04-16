module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'consistent-return': [ 'error', { 'treatUndefinedAsUnspecified': true } ],
    'no-void': 0,
    'no-unused-vars': ['error', { 'args': "none" }]
  },
};
