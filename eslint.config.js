import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  // Files/directories that ESLint should completely ignore.
  globalIgnores(['dist', 'coverage', 'node_modules']),

  {
    // Apply these rules to TypeScript source files.
    files: ['**/*.{ts,tsx}'],

    extends: [
      // ESLint's recommended JavaScript rules.
      js.configs.recommended,

      // Recommended TypeScript ESLint rules.
      ...tseslint.configs.recommended,

      // Disable ESLint rules that conflict with Prettier.
      eslintConfigPrettier,
    ],

    languageOptions: {
      // Node.js supports modern ECMAScript syntax.
      ecmaVersion: 2022,

      // Tell ESLint that this is a Node.js environment.
      globals: globals.node,
    },
  },
]);
