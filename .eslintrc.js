module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'standard-with-typescript',
        'prettier',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
    },
    plugins: ['react', 'only-warn', 'prettier', 'simple-import-sort'],
    rules: {
        semi: ['error', 'always'],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        '@typescript-eslint/semi': 'off',
        'max-len': ['error', { code: 120 }],
        // Indent with 4 spaces
        indent: 'off',
        '@typescript-eslint/indent': 'off',
        // Indent JSX with 4 spaces
        'react/jsx-indent': ['error', 4],

        // Indent props with 4 spaces
        'react/jsx-indent-props': ['error', 4],

        // remove curly braces inside JSX props, children, and/or JSX prop values
        'react/jsx-curly-brace-presence': [
            'error',
            { props: 'never', children: 'never' },
        ],

        'react/display-name': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/self-closing-comp': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                tabWidth: 4,
                endOfLine: 'auto',
                trailingComma: 'es5',
            },
        ],
        '@typescript-eslint/no-misused-promises': [
            'error',
            { checksVoidReturn: false },
        ],
        '@typescript-eslint/no-floating-promises': 'off',
        'react/react-in-jsx-scope': 'off',
    },
    overrides: [
        {
            files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
            rules: {
                'simple-import-sort/imports': [
                    'error',
                    {
                        groups: [
                            // react
                            ['^react', '^@?\\w'],
                            // absolute paths.
                            [
                                '^(utils|assets|components|panels|modals|pages|redux|types|hooks)(/.*|$)',
                            ],
                            // relative imports
                            [
                                '^\\./(?=.*/)(?!/?$)',
                                '^\\.(?!/?$)',
                                '^\\./?$',
                                '^\\.\\.(?!/?$)',
                                '^\\.\\./?$',
                            ],
                            // not matched
                            ['^'],
                            //types
                            ['^.+\\.?(types)$'],
                            // Style imports.
                            ['^.+\\.?(css)$'],
                        ],
                    },
                ],
            },
        },
    ],
};
