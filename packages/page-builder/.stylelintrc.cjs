module.exports = {
    extends: ["stylelint-config-recommended-scss"],
    rules: {
        "at-rule-empty-line-before": [
            "always",
            {
                except: ["after-same-name", "first-nested"]
            }
        ],
        "declaration-block-semicolon-space-after": "always-single-line", // rules in a single line
        indentation: [4],
        linebreaks: "windows",
        "max-line-length": 99999,
        "max-empty-lines": 2,
        "rule-empty-line-before": [
            "always",
            {
                except: ["first-nested"]
            }
        ],
        "no-descending-specificity": null,
        "scss/operator-no-unspaced": null,
        "scss/at-extend-no-missing-placeholder": null,
        "selector-list-comma-newline-after": "always",
        "block-opening-brace-space-before": "always",
        "block-opening-brace-space-after": "always-single-line",
        "block-closing-brace-space-before": "always-single-line",
        "block-opening-brace-newline-after": "always-multi-line",
        "block-closing-brace-newline-before": "always-multi-line",
        "declaration-colon-space-after": "always",
        "declaration-colon-space-before": "never",
        "font-family-no-missing-generic-family-keyword": [true, { ignoreFontFamilies: ["icomoon", "arial", "Poppins", "simple-line-icons", "demo", "ewiz", "Nunito Sans"] }]
    }
};
