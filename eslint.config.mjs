import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import parserTs from '@typescript-eslint/parser'
import pluginTs from '@typescript-eslint/eslint-plugin'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  // Configuração para arquivos JavaScript
  {
    files: ['**/*.js'],
    ...js.configs.recommended,
  },

  // Configuração para arquivos TypeScript
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTs,
    },
    rules: {
      ...pluginTs.configs.recommended.rules,
    },
  },

  // Prettier para evitar conflitos de formatação
  prettier,
])
