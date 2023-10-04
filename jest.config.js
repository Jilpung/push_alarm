module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  baseUrl: './src',
  testMatch: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
};
