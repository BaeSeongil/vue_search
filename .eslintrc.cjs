/* eslint-env node */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended'
  ],
  parserOptions: {
    ecmaVersion: '2021'
  },
  rules: {
    'prefer-const': 'error',
    'no-console': 'warn',
    'semi': ['error', 'always'],
    'arrow-parens': ['error', 'as-needed'],
    'object-curly-spacing': ['error', 'always'],
    'no-multi-spaces': ['error'],
    'vue/max-attributes-per-line': [
      'warn',
      {
        'singleline': 20,
        'multiline': {
          'max': 20
        }
      }
    ],
    "vue/first-attribute-linebreak": "off",
    "vue/no-v-html": "off",
    "vue/html-indent": "off",
    "vue/prop-name-casing": "off"
  },
  ignorePatterns: [
    'node_modules/',
    "src/assets/js/",
    "vite.config.js"
  ],
  globals: {
    SynapEditor: 'readonly',
    synapEditorConfig: 'readonly'
  },
};
