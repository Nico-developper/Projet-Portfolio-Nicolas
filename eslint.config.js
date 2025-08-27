export default {
    extends: ["eslint:recommended", "plugin:react/recommended"],
    plugins: ["react"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
    },
    rules: {
        "react/prop-types": "off",
        "no-unused-vars": "warn",
        "react/react-in-jsx-scope": "off",
    },
    settings: { react: { version: "detect" } },
};
