module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        jest: true,
    },
    extends: 'airbnb',
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'no-console': 0,
        'linebreak-style': ['error', 'windows'],
        indent: ['error', 4],
        semi: ['error', 'never'],
        'no-underscore-dangle': 0,
    },
}
