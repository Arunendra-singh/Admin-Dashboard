import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SeoTag() {
    const location = useLocation();
    const [seoDetails, setSeoDetails] = useState({
        pagetitle: "",
        metadescription: "",
        metakeyword: "",
        metarobots: "",
        pagelanguagecontentguid: ""
    });
    useEffect(() => {
        const pathname = location.pathname.split("/");
        if (pathname[2] === "EventThemes") {
            setSeoDetails({
                pagetitle: "Event Themes",
                metadescription: "Event Themes",
                metakeyword: "EventThemes",
                metarobots: "Event Themes",
                pagelanguagecontentguid: ""
            });
        } else if (pathname[2] === "Industries") {
            setSeoDetails({
                pagetitle: "Industries",
                metadescription: "Industries",
                metakeyword: "Industries",
                metarobots: "Industries",
                pagelanguagecontentguid: ""
            });
        } else if (pathname[2] === "ProductMaterials") {
            setSeoDetails({
                pagetitle: "Product Materials",
                metadescription: "ProductMaterials",
                metakeyword: "ProductMaterials",
                metarobots: "ProductMaterials",
                pagelanguagecontentguid: ""
            });
        } else if (pathname[2] === "ImprintColor") {
            setSeoDetails({
                pagetitle: "Imprint Color",
                metadescription: "ImprintColor",
                metakeyword: "ImprintColor",
                metarobots: "ImprintColor",
                pagelanguagecontentguid: ""
            });
        } else if (pathname[2] === "ImprintMethod") {
            setSeoDetails({
                pagetitle: "Imprint Methods",
                metadescription: "ImprintMethod",
                metakeyword: "ImprintMethod",
                metarobots: "ImprintMethod",
                pagelanguagecontentguid: ""
            });
        }
    }, [location]);

    return (
        <Helmet>
            <title>{seoDetails?.pagetitle}</title>
            <meta name="description" content={seoDetails?.metadescription} />
            <meta name="keywords" content={seoDetails?.metakeyword} />
            <meta name="robots" content={seoDetails?.metarobots} />
            <meta name="pagelanguagecontentguid" content={seoDetails?.pagelanguagecontentguid} />
        </Helmet>
    );
}
