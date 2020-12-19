// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    // Stop running tests after `n` failures
    bail: 10,
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,
    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: [
        './lib/controllers/*.js'
    ],
    // The directory where Jest should output its coverage files
    coverageDirectory: './.coverage',
    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: [
        '/node_modules/'
    ],
    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: [
        'html',
        'text'
    ],
    // Make calling deprecated APIs throw helpful error messages
    errorOnDeprecated: true,
    // The paths to modules that run some code to configure or set up the testing environment before each test
    setupFiles: [
        './lib/test/setup.js'
    ],
    // The test environment that will be used for testing
    testEnvironment: 'node',
    // The glob patterns Jest uses to detect test files
    testMatch: [
        '**/lib/**/*.test.js'
    ]
};
