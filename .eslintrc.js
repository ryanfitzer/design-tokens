module.exports = {
    extends: ['eslint:recommended', 'prettier'],
    env: {
        es2020: true,
        node: true,
    },
    rules: {
        // http://eslint.org/docs/rules/#variables
        'no-unused-vars': [
            2,
            {
                vars: 'all',
                args: 'none',
                ignoreRestSiblings: true,
            },
        ],
    },
};
