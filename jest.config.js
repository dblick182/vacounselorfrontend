module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts', '!**/node_modules/**'],
  coverageReporters: ['html', 'cobertura'],
  coverageDirectory: './_coverage',
  resolver: 'jest-pnp-resolver',
  setupFiles: ['react-app-polyfill/stable', 'react-app-polyfill/jsdom'],
  testMatch: ['<rootDir>/src/**/*(*.)@(spec|test).[tj]s?(x)'],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '.+\\.(css|scss)$': 'jest-css-modules-transform',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
    '/node_modules/(?!lodash-es).+(js|jsx|ts|tsx)$',
    '/office-ui-fabric-react/lib/Spinner.js',
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['web.js', 'js', 'web.ts', 'ts', 'web.tsx', 'tsx', 'json', 'web.jsx', 'jsx', 'node'],
  reporters: [
    [
      'jest-junit',
      {
        suiteName: 'Unit tests',
        outputDirectory: '<rootDir>/_coverage/',
        outputName: 'unit-test-results.xml',
      },
    ],
    'default',
  ],
};
