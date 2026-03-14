import { createElement } from "react";

const Heading = ({ text, type, elemId, style = "" }) => (
    <>
        {createElement(type, { id: elemId }, text)}
        {style !== "" && (
            <style>
                {style}
            </style>
        )}
    </>
);

export default Heading;
