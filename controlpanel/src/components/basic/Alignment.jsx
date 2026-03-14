import { createElement } from "react";

const Alignment = ({ text, type, elemId, style = "" }) => (
    <>
        {createElement(type, { id: elemId }, text)}
        {style !== "" && (
            <style>
                {style}
            </style>
        )}
    </>
);

export default Alignment;
