/**
 * @fileOverview jest test runner configuration
 */
module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'reports/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  reporters: ['default', ['jest-junit', { outputDirectory: 'reports/tests', outputName: 'TEST-unit.xml' }]],
  rootDir: '../',
  roots: ['./src'],
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.ts', '**/*.test.tsx', '!**/__tests__/**/*.test.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
