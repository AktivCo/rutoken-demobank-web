module.exports = {
  parser: '@babel/eslint-parser',
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended', // Recommended rules for React
  ],
  plugins: ['react', ],
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  rules: {
    "consistent-return": "off",
    "react/static-property-placement": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "react/forbid-prop-types": "off",
    "react/display-name": "off",
    "react/no-deprecated": "off",
    "default-param-last": "off",
    "react/state-in-constructor": "off",
    "react/destructuring-assignment": "off",

    "jsx-a11y/no-static-element-interactions": "off",
    "react/prop-types": "off",
    "indent": ["error", "tab"],
    'react/function-component-definition' : 'off',
    "arrow-parens": [
        "error",
        "always"
    ],
    "quotes": [
        2,
        "single",
        "avoid-escape"
    ],
    "indent": [
        "error",
        4
    ],
    "no-extend-native": [
        "error", 
        { 
            "exceptions": [
                "Date"
            ] 
        }
    ],
    "implicit-arrow-linebreak": [
        0,
        "below"
    ],
    "react/jsx-indent": [
        "error",
        4
    ],
    "react/jsx-indent-props": [
        "error",
        4
    ],
    "react/jsx-filename-extension": [
        1,
        {
            "extensions": [
                ".js",
                ".jsx"
            ]
        }
    ],
    'react/jsx-props-no-spreading': 'off',
    "object-shorthand": [
        "warn"
    ],
    "react/no-multi-comp": [
        2,
        {
            "ignoreStateless": true
        }
    ],
    "jsx-a11y/anchor-is-valid": [
        0
    ],
    "jsx-a11y/click-events-have-key-events": [
        0
    ],
    "jsx-a11y/no-autofocus": [
        0
    ],
    "object-curly-newline": [
        "error",
        {
            "multiline": true
        }
    ],
    "max-len": [
        "warn",
        130
    ]
  },
};