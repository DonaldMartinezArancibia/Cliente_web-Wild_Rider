/**
 * Configuración en formato eslintrc (no flat config) a propósito:
 * `gatsby develop` ejecuta ESLint con la API de la v8 (useEslintrc, extensions,
 * rulePaths), que la v9 eliminó. Además, Gatsby detecta este archivo y deja de
 * aplicar su configuración por defecto.
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: "detect" },
  },
  extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
  rules: {
    // El nuevo JSX transform no requiere React en scope.
    "react/react-in-jsx-scope": "off",
    // El contenido viene de Hygraph sin tipos; los PropTypes serían ruido.
    "react/prop-types": "off",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
  ignorePatterns: [
    ".cache/",
    "public/",
    "node_modules/",
    "graphcms-fragments/",
    "static/",
  ],
}
