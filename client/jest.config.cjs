module.exports = {
    preset: 'ts-jest',
    testEnvironment: '@happy-dom/jest-environment',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.test.ts', '**/*.test.tsx'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__mocks__/fileMock.cjs'
    },
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: '<rootDir>/tsconfig.app.json',
            useESM: true
        }],
    },
};
