import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'src/assets/search_background.js']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // React 17+ automatic JSX transform — no need to import React
      'no-unused-vars': ['warn', {
        varsIgnorePattern: '^(_|React)',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_|^err$',
      }],
      // These are valid async-in-effect patterns — downgrade to warn
      'react-hooks/set-state-in-effect': 'warn',
      // Missing deps warnings
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
])
