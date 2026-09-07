import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',

  testEnvironment: 'node',

  extensionsToTreatAsEsm: ['.ts'],

  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: './tsconfig.json',
      },
    ],
  },

  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  roots: ['<rootDir>/src'],

  testMatch: ['**/*.test.ts'],

  clearMocks: true,

  restoreMocks: true,

  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/server.ts',
    '!src/config/**',
    '!src/generated/**',
  ],

  coverageDirectory: 'coverage',

  coverageReporters: ['text', 'html', 'lcov'],

  verbose: true,
};

export default config;