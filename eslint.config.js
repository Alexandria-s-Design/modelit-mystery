import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      // Error prevention
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-console': 'off', // Allow console for educational debugging
      'no-debugger': 'warn',
      
      // Best practices
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-var': 'error',
      'prefer-const': 'warn',
      'prefer-arrow-callback': 'warn',
      
      // Code style (light enforcement)
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single', { avoidEscape: true }],
      'indent': ['warn', 4, { SwitchCase: 1 }],
      'comma-dangle': ['warn', 'always-multiline'],
      
      // Relaxed for educational code
      'max-len': 'off',
      'no-magic-numbers': 'off',
    },
  },
  {
    files: ['**/*.test.js', '**/*.spec.js', 'jest.setup.js', 'jest.config.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
  },
  {
    files: ['*.config.js', 'jest.*.js', 'src/config.example.js', 'src/image-generator.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      'archive/',
      'test-screenshots/',
      '__mocks__/',
      'eslint.config.js',
      'jest.config.js',
      'jest.setup.js',
    ],
  },
];
