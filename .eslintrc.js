module.exports = {
  extends: ["airbnb", "airbnb-typescript", "airbnb/hooks", 'plugin:@next/next/recommended',],
  parserOptions: {
    project: ["./tsconfig.json"],
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 8,
    sourceType: "module",
    extraFileExtensions: [".html", ".md", ".json", ".svg", ".tag"],
  },
  
  rules: {
    "react/jsx-props-no-spreading": "off",
    "no-console": ["error", { allow: ["warn", "error", "debug"] }],
    "react-hooks/exhaustive-deps": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "examples/**",
          "examples-native/**",
          "**/example/**",
          "*.js",
          "**/*.test.js",
          "**/*.stories.*",
          "**/scripts/*.js",
          "**/stories/**/*.js",
          "**/__tests__/**/*.js",
          "**/.storybook/**/*.*",
          "*test-utility.jsx",
        ],

      },
    ],
    "import/no-unresolved": [
      "error",
      {
        ignore: ["@storybook"],
      },
    ],
    'import/prefer-default-export': 'off',

  },
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      rules: {
        "react/require-default-props": "off",
        'import/prefer-default-export': 'off',
        "react/prop-types": "off", // we should use types
        "react/forbid-prop-types": "off", // we should use types
      },
    },
    {
      files: ["**/*.d.ts"],
      rules: {
        "vars-on-top": "off",
        "no-var": "off", // this is how typescript works
        "spaced-comment": "off",
      },
    },
  ],
};
