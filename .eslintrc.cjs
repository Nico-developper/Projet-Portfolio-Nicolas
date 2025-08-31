module.exports = {
    root: true,
    env: { browser: true, es2021: true, node: true },
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    settings: { react: { version: "detect" } },
    plugins: ["react", "unused-imports"],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",

        "eslint-config-prettier",
    ],
    rules: {
        "no-unused-vars": "off",

        "unused-imports/no-unused-imports": "error",

        "unused-imports/no-unused-vars": [
            "warn",
            {
                vars: "all",
                varsIgnorePattern: "^_",
                args: "after-used",
                argsIgnorePattern: "^_",
            },
        ],

        "react/prop-types": "off",
    },
};
