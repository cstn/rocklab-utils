/**
 * @fileOverview jest test runner configuration
 */

module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'reports/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  reporters: ['default', ['jest-junit', { outputDirectory: 'reports/tests', outputName: 'TEST-unit.xml' }]],
  rootDir: '../',
  roots: ['./src'],
  testMatch: ['**/*.test.js', '**/*.test.ts'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
};
