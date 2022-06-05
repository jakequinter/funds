const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setupTests.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/test-utils',
    '<rootDir>/src/mocks',
  ],
  moduleNameMapper: {
    '^@/pages(.*)$': '<rootDir>/pages/$1',
    '^@/components(.*)$': '<rootDir>/src/components/$1',
    '^@/hooks(.*)$': '<rootDir>/src/hooks/$1',
    '^@/lib(.*)$': '<rootDir>/src/lib/$1',
    '^@/utils(.*)$': '<rootDir>/src/utils/$1',
    '^@/data(.*)$': '<rootDir>/src/data/$1',
    '^@/test-utils(.*)$': '<rootDir>/src/test-utils/$1',
  },

  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
