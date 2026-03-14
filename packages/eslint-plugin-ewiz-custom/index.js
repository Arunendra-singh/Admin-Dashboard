const { imageSize } = require("./rules/imageSize");
const { imageNoHardcodedURL } = require("./rules/imageNoHardcodedURL");
const { classNamePattern } = require("./rules/classNamePattern");

module.exports = {
    rules: {
        "class-name-pattern": {
            meta: {
                type: "suggestion",
                docs: {
                    description: "Description of the rule"
                },
                fixable: "code",
                schema: [] // no options
            },
            create: classNamePattern
        },
        "image-size": {
            create: imageSize
        },
        "image-no-hardcoded-cdn-url": {
            meta: {
                type: "suggestion",
                docs: {
                    description: "Description of the rule"
                },
                fixable: "code",
                schema: [] // no options
            },
            create: imageNoHardcodedURL
        }
    },
    configs: {
        recommended: {
            plugins: ["react"],
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
            rules: {
                "image-size": 2,
                "image-no-hardcoded-cdn-url": 2,
                "class-name-pattern": 2
            }
        },
        all: {
            plugins: ["react"],
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        }
    }
};
