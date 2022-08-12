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
    // 'plugin:prettier/recommended',
  ],
  root: true, // 此项是用来告诉eslint找当前配置文件不能往父级查找
  env: { // 指定全局变量
    es6: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'], // 忽略规则的文件
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    /**
     * for-of代替for循环.
     */
    '@typescript-eslint/prefer-for-of': 'off',
    /**
     * ts每个函数都要显式声明返回值.
     */
    '@typescript-eslint/explicit-module-boundary-types': 'warn',

    /**
     * 关闭 any 的警告.
     */
    '@typescript-eslint/no-explicit-any': ['warn'],

    /**
     * 禁止混用tab和空格.
     */
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],

    /**
     * 强制不使用分号.
     */
    'semi': ['error', 'never'],
    '@typescript-eslint/semi':  ['error', 'never'],

    /**
     * 分号前后空格.
     */
    'semi-spacing': ['error', { 'before': false, 'after': true }],

    /**
     * 限制数组类型必须使用 Array<T> 或 T[].
     * @reason 允许灵活运用两者.
     */
    '@typescript-eslint/array-type': 'off',

    /**
     * 禁止使用 // @ts-ignore // @ts-nocheck // @ts-check.
     * @reason 这种注释本身就是对特殊代码的说明.
     */
    '@typescript-eslint/ban-ts-comment': 'off',

    /**
     * 禁止使用类似 tslint:disable-next-line 这样的注释.
     */
    '@typescript-eslint/ban-tslint-comment': 'off',

    /**
     * 优先使用 interface 而不是 type.
     * @reason interface 可以 implement, extend 和 merge.
     */
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

    /**
     * 必须使用 import type 导入类型.
     */
    '@typescript-eslint/consistent-type-imports': 'off',

    /**
     * 禁止使用 foo['bar']，必须写成 foo.bar.
     * @reason 当需要写一系列属性的时候，可以更统一.
     */
    'dot-notation': 'warn',
    '@typescript-eslint/dot-notation': 'warn',

    /**
     * 函数返回值必须与声明的类型一致.
     * @reason 编译阶段检查就足够了.
     */
    '@typescript-eslint/explicit-function-return-type': 'off',

    /**
     * 必须设置类的成员的可访问性.
     * @reason 将不需要公开的成员设为私有的，可以增强代码的可理解性，对文档输出也很友好.
     */
    '@typescript-eslint/explicit-member-accessibility': ['error', {
      accessibility: 'explicit',
      overrides: {
        accessors: 'explicit',
        constructors: 'no-public',
        methods: 'explicit',
        properties: 'off',
        parameterProperties: 'explicit'
      }
    }],

    /**
     * 禁止使用返回值为 void 的函数的返回值.
     */
    '@typescript-eslint/no-confusing-void-expression': 'warn',

    /**
     * 禁止重复定义类的成员.
     * @reason 编译阶段就会报错了.
     */
    'no-dupe-class-members': 'warn',
    '@typescript-eslint/no-dupe-class-members': 'warn',

    /**
     * 禁止重复导入模块.
     */
    'no-duplicate-imports': 'off',
    '@typescript-eslint/no-duplicate-imports': 'error',

    /**
     * 禁止对 array 使用 for in 循环.
     */
    '@typescript-eslint/no-for-in-array': 'warn',

    /**
     * 禁止在类之外的地方使用 this.
     * @reason 只允许在 class 中使用 this.
     */
    'no-invalid-this': 'off',
    '@typescript-eslint/no-invalid-this': 'error',

    /**
     * 禁止使用无意义的 void 类型.
     * @reason void 只能用在函数的返回值中.
     */
    '@typescript-eslint/no-invalid-void-type': 'error',

    /**
     * 避免错误的使用 Promise.
     */
    '@typescript-eslint/no-misused-promises': 'warn',

    /**
     * 禁止使用 namespace 来定义命名空间.
     * @reason 使用 es6 引入模块，才是更标准的方式.
     * 但是允许使用 declare namespace ... {} 来定义外部命名空间.
     */
    '@typescript-eslint/no-namespace': [
      'error',
      {
        allowDeclarations: true,
        allowDefinitionFiles: true,
      },
    ],

    /**
     * 禁止使用 require.
     * @reason 统一使用 import 来引入模块，特殊情况使用单行注释允许 require 引入.
     */
    '@typescript-eslint/no-require-imports': 'error',

    /**
     * 禁止将 this 赋值给其他变量，除非是解构赋值.
     */
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: true,
      },
    ],

    /**
     * 禁止 throw 字面量，必须 throw 一个 Error 对象.
     */
    'no-throw-literal': 'warn',
    '@typescript-eslint/no-throw-literal': 'warn',
    /**
     * 禁止将变量或属性的类型设置为 any.
     */
    '@typescript-eslint/no-unsafe-assignment': 'off',

    /**
     * 禁止在定义变量之前就使用它.
     * @reason 编译阶段检查就足够了.
     */
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',

    /**
     * 使用 includes 而不是 indexOf.
     */
    '@typescript-eslint/prefer-includes': 'off',

    /**
     * 使用 ?? 替代 ||.
     */
    '@typescript-eslint/prefer-nullish-coalescing': 'off',

    /**
     * 私有变量如果没有在构造函数外被赋值，则必须设为 readonly.
     */
    '@typescript-eslint/prefer-readonly': 'off',
    /**
     * 函数的参数必须设置为 readonly.
     */
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',

    /**
     * 使用 reduce 方法时，必须传入范型，而不是对第二个参数使用 as.
     */
    '@typescript-eslint/prefer-reduce-type-parameter': 'off',

    /**
     * async 函数的返回值必须是 Promise.
     */
    '@typescript-eslint/promise-function-async': 'warn',

    /**
     * 使用 sort 时必须传入比较函数.
     */
    '@typescript-eslint/require-array-sort-compare': 'off',

    /**
     * async 函数中必须存在 await 语句.
     */
    'require-await': 'off',
    '@typescript-eslint/require-await': 'off',

    /**
     * 模版字符串中的变量类型必须是字符串.
     */
    '@typescript-eslint/restrict-template-expressions': 'off',

    /**
     * 禁止在 return 语句里使用 await.
     */
    'no-return-await': 'off',
    '@typescript-eslint/return-await': 'off',

    /**
     * 联合类型和交叉类型的每一项必须按字母排序.
     */
    '@typescript-eslint/sort-type-union-intersection-members': 'off',

    /**
     * 禁止使用三斜杠导入文件.
     * @reason 三斜杠是已废弃的语法，但在类型声明文件中还是可以使用的.
     */
    '@typescript-eslint/triple-slash-reference': [
      'error',
      {
        path: 'never',
        types: 'always',
        lib: 'always',
      },
    ],

    /**
     * interface 和 type 定义时必须声明成员的类型.
     */
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: false,
        arrowParameter: false,
        memberVariableDeclaration: false,
        objectDestructuring: false,
        parameter: false,
        propertyDeclaration: true,
        variableDeclaration: false,
      },
    ],

    // TS End ---------------------------------------------------------------------

    /**
     * 关键字的前后空格.
     */
    'keyword-spacing': ['error', { 'before': true, 'after': true }],

    /**
     * 对象字面量中冒号的前后空格
     */
    'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],

    /**
     * 引号类型 `` "" ''
     */
    'quotes': ['error', 'single'],

    /**
     * 逗号前后的空格
     */
    'comma-spacing': ['error', { 'before': false, 'after': true }],

    /**
     * 必须使用全等
     */
    'eqeqeq': 'error',

    /**
     * switch必须写default case.
     */
    'default-case': 'error',

    /**
     * 不能用多余的空格.
     */
    'no-multi-spaces': 'error',

    /**
     * 一行结束后面不要有空格
     */
    'no-trailing-spaces': 'error',

    /**
     * 对象字面量项尾不能有逗号
     */

    'comma-dangle': [2, 'never'], // 对象字面量项尾不能有逗号

    'strict': 2, // 使用严格模式

    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],//箭头函数中的箭头前后加空格

    'block-spacing': [2, 'never'],//花括号内前后加空格

    "brace-style": ["error", "1tbs",], // 强制在代码块中使用一致的大括号风格

    "space-before-function-paren": ["error", "always"], // 强制在 function的左括号之前使用一致的空格

    // "space-after-function-paren": ["error", "always"], // 强制在 function的左括号之前使用一致的空格

    "space-unary-ops": ["error", { "words": true, "nonwords": false }], // 强制在一元操作符前后使用一致的空格

    "spaced-comment": ["error", "always"], // 强制在注释中 // 或 /* 使用一致的空格

    'space-infix-ops': 'warn', // 要求操作符周围有空格

    "operator-linebreak": ["error", "after"], // 强制操作符使用一致的换行符

    "max-nested-callbacks": ["error", 3], // 强制回调函数最大嵌套深度

    "max-depth": ["error", 4], // 强制可嵌套的块的最大深度

    "linebreak-style": ["error", "unix"], // 换行符风格

    "max-params": ["error", 6], // 强制函数定义中最多允许的参数数量

    "no-empty-pattern": ["error"], // 禁止使用空解构模式

    "no-useless-escape": ["error"], // 禁用不必要的转义字符

    "no-unsafe-negation": ["error"], // 禁止对关系运算符的左操作数使用否定操作符

    "no-magic-numbers": ["error", { "ignoreArrayIndexes": true }], // 禁用魔术数字

    "no-empty": ["error", { "allowEmptyCatch": true }], // 禁止出现空语句块

    "no-cond-assign": ["error", "always"], // 禁止条件表达式中出现赋值操作符

    "multiline-comment-style": ["error", "starred-block"], // 强制对多行注释使用特定风格

    "multiline-ternary": ["error", "always-multiline"], // 要求或禁止在三元操作数中间换行

    "new-cap": ["error", { "capIsNew": false }], // 要求构造函数首字母大写

    "eol-last": ["error", "always"], // 要求或禁止文件末尾存在空行

  },
};
