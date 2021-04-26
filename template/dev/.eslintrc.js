module.exports = {
  rules: {
    'no-shadow': 'off',
    'no-prototype-builtins': 'off',
    'no-plusplus': 'off',
    'linebreak-style': 'off',
    'no-unused-vars': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'new-cap': 0,
  },
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  ignorePatterns: ['src/tools/*.js'],
};
