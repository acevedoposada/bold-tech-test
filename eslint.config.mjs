import { readFileSync } from 'fs';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const prettierConfig = JSON.parse(
  readFileSync(new URL('./.prettierrc', import.meta.url), 'utf-8'),
);

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierRecommended,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '**/*.test.ts',
    '**/*.test.tsx',
  ]),
  {
    rules: {
      'prettier/prettier': ['error', prettierConfig],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]);
