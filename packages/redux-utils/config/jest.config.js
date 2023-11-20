/**
 * @fileOverview jest test runner configuration
 */
module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'reports/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  reporters: ['default', ['jest-junit', { outputDirectory: 'reports/tests', outputName: 'TEST-unit.xml' }]],
  rootDir: '../',
  roots: ['./src'],
  setupFiles: ['<rootDir>/config/jest.polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/config/jest.setup.ts'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
};
