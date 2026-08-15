module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // The real config reads import.meta.env, which Jest cannot parse.
    '^.*constants/config$': '<rootDir>/src/test/configStub.js'
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  extensionsToTreatAsEsm: ['.jsx']
};
