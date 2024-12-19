module.exports = {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest",
        "^.+\\.(svg|png|jpg|jpeg|gif|webp|avif|bmp|ico)$": "jest-transform-stub",
    },
    transformIgnorePatterns: ["/node_modules/(?!nanoid)"],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "\\.(svg|png|jpg|jpeg|gif|webp|avif|bmp|ico)$": "jest-transform-stub",
    },
    testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json",
        },
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
