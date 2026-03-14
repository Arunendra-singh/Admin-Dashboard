module.exports = {
    "at-rule-empty-line-before": ["always", { except: ["after-same-name", "first-nested"] }],
    "block-closing-brace-newline-before": "always-multi-line",
    "block-closing-brace-space-before": "always-single-line",
    "block-opening-brace-newline-after": "always-multi-line",
    "block-opening-brace-space-after": "always-single-line",
    "block-opening-brace-space-before": "always",
    "declaration-block-semicolon-space-after": "always-single-line", // rules in a single line
    "declaration-colon-space-after": "always",
    "declaration-colon-space-before": "never",
    indentation: [4],
    linebreaks: "windows",
    "max-empty-lines": 2,
    "max-line-length": 99999,
    "no-descending-specificity": null,
    "rule-empty-line-before": ["always", { except: ["first-nested"] }],
    "scss/at-extend-no-missing-placeholder": null,
    "scss/operator-no-unspaced": null,
    "selector-list-comma-newline-after": "always",
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global", "local"] }]
};
