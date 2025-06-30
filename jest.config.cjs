module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.[jt]sx?$": "babel-jest",
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|svg)$' : '<rootDir>/__mocks__/fileMock.js',
        "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js"
    },
   setupFilesAfterEnv: ["<rootDir>/setupTests.js"]
}