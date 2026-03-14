import { CDN_URL, WEBSITE_GUID } from "common/utils/vars";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const EditPageConfigurator = () => {
    useEffect(() => {
        // Function to remove a specific CSS file by its href
        const removeCSSFile = (href) => {
            const linkElement = document.querySelector(`link[href="${href}"]`);
            if (linkElement) {
                linkElement.parentNode.removeChild(linkElement);
                console.log(`CSS file ${href} removed from head`);
            }
        };

        // List of CSS files to remove
        const cssFilesToRemove = [
            `${CDN_URL}/${WEBSITE_GUID}/css/admin.css`,
            `${CDN_URL}/${WEBSITE_GUID}/css/site.css`// Add more if needed
        ];

        // Wait until the DOM is fully loaded and remove each CSS file
        cssFilesToRemove.forEach(removeCSSFile);

        // Cleanup (optional) when component unmounts
        return () => {
        };
    }, []);
    const location = useLocation();
    return (
        <div>
            Edit Page Management {location}
        </div>
    );
};

export default EditPageConfigurator;
