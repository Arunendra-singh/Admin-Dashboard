// @ts-check

const { elementType, hasProp } = require("jsx-ast-utils");

const imageSize = (context) => {
    const MEDIA_ELEMENTS = ["img"];
    return {
        JSXOpeningElement: (node) => {
            const tagName = elementType(node);
            if (!MEDIA_ELEMENTS.includes(tagName)) return;

            const width = hasProp(node.attributes, "width");
            const height = hasProp(node.attributes, "height");

            if (width === false) {
                context.report({
                    node,
                    message: "Missing an explicit `width` prop for media element"
                });
            }
            if (height === false) {
                context.report({
                    node,
                    message: "Missing an explicit `height` prop for media element"
                });
            }
        }
    };
};
module.exports = { imageSize };
