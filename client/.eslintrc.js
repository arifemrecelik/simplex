module.exports = {
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

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/attributes-order': 'error',
    'vue/html-indent': [
      'error',
      2,
    ],
    'vue/html-end-tags': 'warn',
    'vue/require-default-prop': 'warn',
    'vue/no-confusing-v-for-v-if': 'warn',
    'vue/no-empty-pattern': 'warn',
    'vue/no-irregular-whitespace': 'warn',
    'vue/no-reserved-component-names': 'error',
    'vue/attribute-hyphenation': 'warn',
    'vue/no-multi-spaces': 'warn',
    'vue/no-template-shadow': 'warn',
    'vue/this-in-template': 'warn',
    'vue/order-in-components': 'error',
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
        normal: 'any',
        component: 'always',
      },
      svg: 'always',
      math: 'always',
    }],
    'vue/html-quotes': [
      'error',
      'double',
    ],
    'max-len': [
      'error', {
        code: 250,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-plusplus': [
      'error', { allowForLoopAfterthoughts: true },
    ],
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
