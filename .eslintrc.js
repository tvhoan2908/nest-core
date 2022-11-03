module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    "unused-imports"
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', "commitlint.config.js"],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    semi: "error",
    quotes: ["error", "double"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "no-unused-vars": ["error", { "vars": "all" }],
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports-ts": 2,
    'prettier/prettier': ['error', { singleQuote: false, endOfLine: "auto" }],
    "indent": "off",
    "max-len": ["error", { code: 200 }],
    "max-lines": ["error", { max: 500 }],
    "newline-before-return": "error",
  },
};
