module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    "plugin:vue/recommended",
    "eslint:recommended",
    "prettier",
    "prettier/vue"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    parser: "babel-eslint",
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    "linebreak-style": [0, "error", "windows"],
    "no-unused-vars": 'off'
  },
};
