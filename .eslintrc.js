module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs']
  }
}
