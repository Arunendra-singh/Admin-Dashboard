import { SVGImageURI } from "common/utils";

const Image = ({ src, alt, style = "", elemId }) => {
    const placeholderImage = SVGImageURI(200, 200, "#f1f1f1");

    return (
        <>
            <img id={elemId} src={src || placeholderImage} alt={alt} width="auto" height="auto" />
            {style !== "" && (
                <style>
                    {style}
                </style>
            )}
        </>
    );
};

export default Image;
