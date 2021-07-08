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
}
