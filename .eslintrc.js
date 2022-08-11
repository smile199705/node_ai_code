module.exports = {
  parser: '@typescript-eslint/parser', // eslingt解析器
  parserOptions: { // 指定javascript语言格式
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true, // 此项是用来告诉eslint找当前配置文件不能往父级查找
  env: { // 指定全局变量
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'], // 忽略规则的文件
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

  },
};
