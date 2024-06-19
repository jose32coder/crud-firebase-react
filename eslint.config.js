export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: require('eslint-plugin-react'),
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: require.resolve('@babel/eslint-parser'),
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: [require.resolve('@babel/preset-react')],
        },
      },
    },
    rules: {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "no-unused-vars": ["warn", { "vars": "all", "args": "none", "ignoreRestSiblings": true }],
      "react/react-in-jsx-scope": "off", // Si estás usando React 17+
    },
  },
];
