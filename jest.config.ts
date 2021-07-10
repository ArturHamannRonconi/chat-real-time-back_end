export default {
  clearMocks: true,
  preset: 'ts-jest',
  coverageProvider: 'v8',
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/$1',
    '@appTypes/(.*)': ['<rootDir>/src/@types/appTypes/$1'],
    '@config/(.*)': ['<rootDir>/src/config/$1'],
    '@accounts/(.*)': ['<rootDir>/src/modules/accounts/$1'],
    '@utils/(.*)': ['<rootDir>/src/utils/$1']
  }
}
