/**
 * @fileOverview jest test runner configuration
 */

module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'reports/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20,
    },
  },
  reporters: ['default', ['jest-junit', { outputDirectory: 'reports/tests', outputName: 'TEST-unit.xml' }]],
  rootDir: '../',
  roots: ['./src'],
  setupFilesAfterEnv: ['<rootDir>/config/setup.js'],
  testMatch: ['**/*.test.js', '**/*.test.ts'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
};
