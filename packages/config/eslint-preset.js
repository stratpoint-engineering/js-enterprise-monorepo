module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },
  rules: {
    // Base ESLint rules
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "no-unused-vars": "off", // Handled by TypeScript
    "no-use-before-define": "off", // Handled by TypeScript

    // TypeScript rules
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-explicit-any": "warn",

    // Import rules
    "import/no-unresolved": "error",
    "import/named": "error",
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        "alphabetize": { order: "asc", caseInsensitive: true }
      }
    ],
    "import/no-duplicates": "error",
  },
  overrides: [
    // React files
    {
      files: ["**/*.{jsx,tsx}"],
      extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      rules: {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "jsx-a11y/anchor-is-valid": "warn",
      },
      settings: {
        react: {
          version: "detect",
        },
      },
    },
    // Test files
    {
      files: ["**/*.test.{js,ts,jsx,tsx}", "**/*.spec.{js,ts,jsx,tsx}"],
      extends: ["plugin:jest/recommended"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
};
