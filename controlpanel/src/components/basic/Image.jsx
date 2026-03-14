import { SVGImageURI } from "common/utils";

const Image = ({ src, alt, style = "", elemId, display, caption, objwidth, objheight }) => {
    // useEffect(() => {
    //     const img = new window.Image();
    //     img.onload = () => {
    //         objwidth = img.width;
    //         objheight = img.height;
    //         console.log("objwidth : ", objwidth);
    //     };
    //     img.onerror = () => {
    //         console.log('Error loading image.');
    //     };
    //     img.src = src;
    // }, [src]);
    // Get the display classes based on the display prop
    const getDisplayClasses = (cls) => {
        let classes = "";

        // Define a mapping for display options to Bootstrap classes
        if (Array.isArray(cls) && cls.length > 0) {
            if (cls.includes("desktop") && cls.includes("tablet") && !cls.includes("mobile")) {
                classes += " hide-mobile"; // Hide on mobile if desktop and tablet are included
            } else if (cls.includes("desktop") && cls.includes("mobile") && !cls.includes("tablet")) {
                classes += " hide-tablet"; // Hide on tablet if desktop and mobile are included
            } else if (cls.includes("tablet") && cls.includes("mobile") && !cls.includes("desktop")) {
                classes += " hide-desktop"; // Hide on desktop if tablet and mobile are included
            } else if (!(cls.includes("desktop") && cls.includes("tablet") && cls.includes("mobile"))) {
                // Add classes if individual screens need to be hidden based on what's included
                if (cls.includes("mobile") && !cls.includes("desktop") && !cls.includes("tablet")) {
                    classes += " hide-tablet hide-desktop"; // Hide on mobile
                }
                if (cls.includes("tablet") && !cls.includes("desktop") && !cls.includes("mobile")) {
                    classes += " hide-mobile hide-desktop"; // Hide on tablet
                }
                if (cls.includes("desktop") && !cls.includes("tablet") && !cls.includes("mobile")) {
                    classes += " hide-tablet hide-mobile"; // Hide on desktop
                }
            }
        }

        return classes.trim(); // Return the final classes, trimmed for clean output
    };

    // Get the display classes based on the display prop
    const displayClasses = getDisplayClasses(display);
    const placeholderImage = SVGImageURI(200, 200, "#f1f1f1");
    return (
        <div id={elemId} className={displayClasses}>
            <img
                src={src || placeholderImage}
                alt={alt}
                width={objwidth === undefined ? "auto" : objwidth}
                height={objheight === undefined ? "auto" : objheight}
            />
            <div>{caption}</div>
            {style !== "" && (
                <style type="text/css">
                    {style}
                </style>
            )}
        </div>
    );
};

export default Image;
