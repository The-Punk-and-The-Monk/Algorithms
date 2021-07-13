// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');
module.exports = {
    verbose: true,
    preset: 'ts-jest/presets/js-with-ts',
    rootDir: path.join(__dirname, ''),
    testRegex: ['\.(ts|js)'],
    testPathIgnorePatterns: ['/node_modules/', '/scripts/'],
    // 使用 ts-jest 来执行 typescript 编写的测试用例
    transform: {
        '.*\\.tsx?$': 'ts-jest',
    },
    snapshotSerializers: ['jest-serializer-html'],
    // collectCoverageFrom: [
    //     // glob模式，非正则模式
    //     'src/**/*.{js,jsx,ts,tsx}',
    //     '!**/*.d.ts',
    //     '!**/test/**',
    //     '!**/dist/**',
    // ],
    // Jest 环境准备好后的拓展脚本
    // setupFiles: ['jest-localstorage-mock', './test/unit_test_setup/enzyme.config.ts'],
    moduleNameMapper: {
        // 文件资源的 mock
        // '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/__mocks__/fileMock.js',
        // 样式文件的 mock
        // '\\.(css|less)$': '<rootDir>/test/__mocks__/styleMock.js',
        // 配置src目录的导入
        '^src/(.*)$': '<rootDir>/src/$1',
        // 配置test目录的导入
        '^test/(.*)$': '<rootDir>/test/$1',
    },
    globals: {
        // Defineplugin的变量
        // BRANCH: 'test_branch',
        // COMMIT_HASH: 'test_hash',
        // 'ts-jest': {
        //     tsconfig: '<rootDir>/tsconfig.test.json',
        //     // diagnostics: false,
        //     // 需要把babel-react-scoped-css 禁掉
        //     babelConfig: {
        //         plugins: [
        //             '@babel/plugin-transform-runtime',
        //             'react-hot-loader/babel',
        //         ],
        //         presets: [
        //             '@babel/preset-react',
        //             [
        //                 '@babel/preset-env',
        //                 {
        //                     useBuiltIns: 'usage',
        //                     corejs: 3.6,
        //                 },
        //             ],
        //         ],
        //     },
        // },
    },
    // Indicates whether the coverage information should be collected while executing the test
    // collectCoverage: true,
    // // Use this configuration option to add custom reporters to Jest
    reporters: ['default'],
    // coverageReporters: ['json', 'lcov', 'text', 'clover'],
    defaultTestBaseInfo: {
        author: 'markflin',
        priority: 'P0',
        casetype: 'unit',
    },
};
