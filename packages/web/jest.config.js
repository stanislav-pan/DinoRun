module.exports = {
  setupFiles: ["./jest.setup.js"],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|svg)$": "jest-transform-stub",
    "^@icons/(.*)$": "<rootDir>/src/client/components/ui/icons/$1",
    "^@hooks/(.*)$": "<rootDir>/src/client/hooks/$1",
    "^@api/(.*)$": "<rootDir>/src/client/core/api/$1",
    "^@redux/(.*)$": "<rootDir>/src/client/redux/$1",
    "^@core/(.*)$": "<rootDir>/src/client/core/$1",
    "^@components/(.*)$": "<rootDir>/src/client/components/$1",
    "^@pages/(.*)$": "<rootDir>/src/client/pages/$1",
    "^@utils/(.*)$": "<rootDir>/src/client/utils/$1",
    "^@client/(.*)$": "<rootDir>/src/client/$1",
  },
};
