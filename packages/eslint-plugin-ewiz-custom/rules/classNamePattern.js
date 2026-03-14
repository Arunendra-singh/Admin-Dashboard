// @ts-check

const { hasProp, getProp } = require("jsx-ast-utils");

const classNamePattern = (context) => {
    const sourceCode = context.getSourceCode().text;
    return {
        JSXOpeningElement: (node) => {
            const clsName = hasProp(node.attributes, "className");
            if (clsName === true) {
                const prop = getProp(node.attributes, "className", true);
                const { range } = prop.value;

                const str = sourceCode.substring(...range);
                const rExp = /\$\{(.+?)\}/g;
                const matches = str.match(rExp);
                let i = 0;
                const hashedString = str.replace(rExp, () => "#" + (i++));

                const templateStr = hashedString.match(/(^{`)|(^{")|(^{')|(^`)|(^")|(^')|.+(?=`$|'$|"$|`}$|'}$|"}$)|(`}$)|('}$)|("}$)|(`$)|('$)|("$)/g);

                if (templateStr === null || templateStr.length !== 3) return;

                const strToReplace = templateStr[1];

                const tmpStr = strToReplace.replace(/^\{`/, "").replace(/`\}$/, "");
                const strArr = tmpStr.split(" ");

                const hasUppercase = /[A-Z]/.test(strToReplace);
                const hasSnakeCase = /_/.test(strToReplace);
                const isCamelCase = strArr.filter(x => x.substring(0, 1) !== "#").some(x => /[A-Z]+(?![a-z])|[A-Z]/g.test(x) && /[a-z]/.test(x.substring(0, 1)));
                const duplicates = strArr.filter((elem, i) => {
                    return strArr.indexOf(elem) !== i
                })

                const kebabize = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())

                let fixedStr = strToReplace.replace(/_/g, "-").split(" ").map(kebabize).join(" ").toLowerCase();
                fixedStr = (templateStr[0] + [...new Set(fixedStr.split(" "))].join(" ") + templateStr[2]).replace(/--/g, "-");
                if (matches !== null) {
                    fixedStr = fixedStr.replace(/#(.?)[0-9]/g, (x) => {
                        const index = Number(x.replace("#", ""));
                        return matches[index]
                    })
                }

                if (duplicates.length > 0) {
                    context.report({
                        node,
                        message: `Class [${duplicates.join(", ")}] has been already declared.`,
                        fix: (fixer) => fixer.replaceTextRange(range, fixedStr)
                    });
                }

                if (hasUppercase) {
                    if (isCamelCase) {
                        context.report({
                            node,
                            message: "Use kebab-case naming convention instead of camelCase for classes.",
                            fix: (fixer) => fixer.replaceTextRange(range, fixedStr)
                        });
                    } else {
                        context.report({
                            node,
                            message: "Class names should contain lowercase letters only.",
                            fix: (fixer) => fixer.replaceTextRange(range, fixedStr)
                        });
                    }
                }

                if (hasSnakeCase) {
                    context.report({
                        node,
                        message: "Use hyphens in class names instead of underscore.",
                        fix: (fixer) => fixer.replaceTextRange(range, fixedStr)
                    });
                }
            }
        }
    };
};
module.exports = { classNamePattern };
