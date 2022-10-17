module.exports = {
    env: {
      browser: true,
      es2021: true,
      // 解决 'module' is not defined.eslintno-undef
      node: true
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-essential',
      'plugin:@typescript-eslint/recommended',
      // 启用prettier插件与通用配置
      'plugin:prettier/recommended'
    ],
    overrides: [],
    // 解决 Parsing error: '>' expected.eslint
    parser: 'vue-eslint-parser',
    parserOptions: {
      // 解决 Parsing error: '>' expected.eslint
      parser: '@typescript-eslint/parser',
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
      // 在Eslint中开启prettier校验规则
      'prettier/prettier': 'error'
    }
  }
