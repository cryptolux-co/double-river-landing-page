// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      extends: ["plugin:@typescript-eslint/recommended-requiring-type-checking"],
      files: ["*.ts", "*.tsx", "*.astro"],
      parserOptions: {
        project: path.join(__dirname, "tsconfig.json"),
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },
  plugins: ["@typescript-eslint"],
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  rules: {
    "no-nested-ternary": "off",
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "off",
    "no-plusplus": [
      "error",
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        labelComponents: ["Label"],
        labelAttributes: ["label"],
        controlComponents: ["Input", "Select"],
        depth: 1,
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
    "react/jsx-props-no-spreading": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: ["arrow-function"],
        unnamedComponents: "arrow-function",
      },
    ],
    "react/button-has-type": "error",
    "react/no-array-index-key": "error",
    "react/boolean-prop-naming": "error",
    "react/no-deprecated": "error",
    "react/self-closing-comp": "error",
    "react/jsx-pascal-case": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-meaningless-void-operator": "warn",
    "@typescript-eslint/no-confusing-void-expression": "error",
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
    "@typescript-eslint/consistent-type-definitions": [1, "type"],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "no-restricted-exports": "off",
    "no-restricted-imports": [
      "error",
      {
        patterns: ["../"],
      },
    ],
    eqeqeq: "error",
    "no-unneeded-ternary": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "import/prefer-default-export": "off",
    "arrow-body-style": "off",
  },
};

module.exports = config;
