module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.[jt]sx?$": "babel-jest",
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|svg)$' : '<rootDir>/__mocks__/fileMock.js',
        "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js"
    },
   setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
   collectCoverageFrom: [
       "src/**/*.{js,jsx}",
       "!src/main.jsx",
       "!src/index.css",
       "!src/assets/**",
       "!**/node_modules/**",
   ],
   coveragePathIgnorePatterns: [
       "/node_modules/",
       "/__mocks__/",
       "/__tests__/",
   ],
   coverageReporters: ["lcov", "text", "html"],
   coverageDirectory: "coverage"
}
