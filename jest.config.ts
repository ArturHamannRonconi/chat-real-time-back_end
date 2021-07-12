export default {
  clearMocks: true,
  preset: 'ts-jest',
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text-summary'],
  setupFiles: ['<rootDir>/jest.setup.ts'],

  collectCoverageFrom: [
    '<rootDir>/src/modules/**/services/**/*.ts',
    '<rootDir>/src/modules/**/controllers/**/*.ts'
  ],
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: {
    '@appTypes/(.*)': ['<rootDir>/src/@types/appTypes/$1'],
    '@config/(.*)': ['<rootDir>/src/config/$1'],
    '@accounts/(.*)': ['<rootDir>/src/modules/accounts/$1'],
    '@shared/(.*)': ['<rootDir>/src/shared/$1'],
    '@utils/(.*)': ['<rootDir>/src/utils/$1']
  }
}
