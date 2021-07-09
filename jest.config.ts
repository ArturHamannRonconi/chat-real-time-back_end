export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text-summary'],
  collectCoverageFrom: [
    '<rootDir>/src/modules*.ts',
    '<rootDir>/src/modules*.ts'
  ],
  preset: 'ts-jest',
  coverageProvider: 'v8',
  testMatch: [
    'src/modules*.spec.ts',
  ],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/$1',
    '@appTypes/(.*)': ['<rootDir>/src/@types/appTypes/$1'],
    '@config/(.*)': ['<rootDir>/src/config/$1'],
    '@accounts/(.*)': ['<rootDir>/src/modules/accounts/$1'],
    '@utils/(.*)': ['<rootDir>/src/utils/$1']
  }
}
