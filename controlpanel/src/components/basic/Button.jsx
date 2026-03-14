import styles from "./Button.module.scss";

/* eslint-disable react/button-has-type */
const Button = ({ link, type, name, display, elemId, style = "" }) => {
    const onClickHandler = () => {
        if (link) {
            console.log(link);
        }
    };
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
    return (
        <>
            <button id={elemId} className={`${displayClasses} ${styles.btn}`} onClick={onClickHandler} type={type}>{name}</button>
            {style !== "" && (
                <style type="text/css">
                    {style}
                </style>
            )}
        </>
    );
};

export default Button;
