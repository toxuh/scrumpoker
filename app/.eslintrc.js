const errorOnProduction =
  process.env.NODE_ENV === 'production' ? 'error' : 'warn';

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  extends: [
    'react-app',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:jest/all',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],

  plugins: ['jsx-a11y', 'jest', 'prettier', '@typescript-eslint'],

  rules: {
    'prettier/prettier': 'error',

    'import/namespace': 'error',
    'import/default': 'error',
    'sort-imports': ['error', { ignoreDeclarationSort: true }],

    'react/boolean-prop-naming': 'error',
    'react/prop-types': 0,

    'react-hooks/exhaustive-deps': 'off',

    'react/sort-prop-types': [
      'error',
      {
        requiredFirst: true,
        callbacksLast: true,
        sortShapeProp: true,
        noSortAlphabetically: true,
      },
    ],
    'react/jsx-sort-props': [
      'error',
      {
        reservedFirst: true,
        shorthandLast: true,
        callbacksLast: true,
        noSortAlphabetically: true,
      },
    ],

    'jest/no-hooks': 'off',

    'no-console': errorOnProduction,
    'no-alert': errorOnProduction,
    'no-debugger': errorOnProduction,
  },

  overrides: [
    {
      // conceptually constants, action types, actions,
      // selectors, typedefs, utils and components
      // are collections of exports
      // so it is ok to don't prefer default export here
      files: [
        '**/constants.js',
        '**/constants.ts',
        '**/types.js',
        '**/types.ts',
        '**/utils/index.ts',
        '**/components/index.ts',
        '**/containers/index.ts',
      ],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
    {
      // we don't use our tests in the app source
      // so it is ok to import dev dependencies in `*.test.js?(x)` files
      // and props spreading is sometimes a handy feature in tests
      files: ['**/*.test.js?(x)', '**/*.test.ts?(x)', '**/utils/tests/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-props-no-spreading': 'off',
      },
    },
    {
      // Storybook is a dev dependency (we don't use it in the app source)
      files: ['**/*.stories.js?(x)', '**/*.stories.ts?(x)', '**/.storybook/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      // it is ok to write to `config` param in storybook's webpack config
      // see:
      // https://storybook.js.org/docs/configurations/custom-webpack-config/
      files: ['**/.storybook/webpack.config.js'],
      rules: {
        'no-param-reassign': [
          'error',
          {
            ignorePropertyModificationsFor: ['config'],
          },
        ],
      },
    },
    {
      // these are service files that are not included in the app source
      // so we can adjust some linter rules
      files: [
        '**/setupTests.js',
        '**/setupTests.ts',
        '**/craco.config.js',
        '**/jest.config.js',
        '**/webpack.config.js',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],

  env: {
    'jest/globals': true,
  },

  ignorePatterns: ['serviceWorker.js'],
};
