module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: ["standard-with-typescript"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        tsconfigRootDir: __dirname,
        sourceType: "module",
        project: ["tsconfig.json"]
    },
    plugins: ["react"],
    rules: {
        quotes: [1, "double"],
        indent: ["error", 4],
        "@typescript-eslint/explicit-function-return-type": [0],
        "@typescript-eslint/indent": ["error", 4],
        "@typescript-eslint/quotes": [1, "double"],
        "@typescript-eslint/consistent-type-definitions": [0],
        "@typescript-eslint/semi": ["error", "always"],
        "@typescript-eslint/space-before-function-paren": [0],
        "@typescript-eslint/member-delimiter-style": [0],
        "linebreak-style": ["error", "windows"],
        semi: [0],
        "no-console": [2]
    }
};
