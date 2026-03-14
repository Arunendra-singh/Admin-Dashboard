const CommonRules = require("common/lint-configs/eslint.rules");

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: ["plugin:react/recommended", "plugin:import/errors", "plugin:import/warnings", "plugin:import/typescript", "airbnb"],
    overrides: [
        {
            files: ["*.jsx", "*.js"]
        }
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react", "ewiz-custom"],
    rules: {
        ...CommonRules,
        "ewiz-custom/class-name-pattern": [0],
        "no-await-in-loop": [0],
        "no-restricted-syntax": [0],
        "no-console": [0]
    },
    settings: {
        "import/resolver": {
            alias: {
                map: [["~", "./src"]],
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    }
};
