const CommonStyleRules = require("common/lint-configs/stylelint.rules");

module.exports = {
    extends: ["stylelint-config-recommended-scss"],
    rules: {
        ...CommonStyleRules,
        "font-family-no-missing-generic-family-keyword": [true, { ignoreFontFamilies: ["icomoon", "arial", "Poppins", "demo", "athena_promo_new"] }]
    }
};
