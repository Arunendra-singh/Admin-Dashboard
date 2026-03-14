import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
// import { WEBSITE_NAME } from "common/utils/vars";
import { useGetSEODetails } from "../hooks/react/api/useGetSEODetails";

export const SeoTag = () => {
    const location = useLocation();

    const { status, data } = useGetSEODetails();
    const [seoDetails, setSeoDetails] = useState({
        pagetitle: "",
        metadescription: "",
        metakeyword: "",
        metarobots: "",
        pagelanguagecontentguid: ""
    });
    useEffect(() => {
        const pathname = location.pathname.split("/");
        if (data !== undefined) {
            if (pathname[1] !== "category" && pathname[1] !== "product" && data?.length > 0) {
                if (pathname[1] === "basket" && pathname[2] === "wishlist") {
                    const seoDataComplete = data?.find((item: any) => item.pagetitle.replaceAll(" ", "").toLowerCase() === pathname[2].replaceAll(" ", "").toLowerCase());
                    setSeoDetails(seoDataComplete);
                } else if (pathname[1] === "basket" && pathname[2] === "viewbasket") {
                    const seoDataComplete = data?.find((item: any) => item.pagetitle.replaceAll(" ", "").toLowerCase() === "basketlist");
                    setSeoDetails(seoDataComplete);
                } else if (pathname[1] === "receipt") {
                    const seoDataComplete = data?.find((item: any) => item.pageurl.replaceAll(" ", "").toLowerCase() === "/receipt/:orderguid/:ordernumber");
                    setSeoDetails(seoDataComplete);
                } else if (pathname[1] === "myaccount") {
                    const seoDataComplete = data?.find((item: any) => item.pagetitle.replaceAll(" ", "").toLowerCase() === pathname[1].replaceAll(" ", "").toLowerCase());
                    setSeoDetails(seoDataComplete);
                } else if (pathname[2] === "customerorderreport") {
                    const seoDataComplete = data?.find((item: any) => item.pagetitle.replaceAll(" ", "").toLowerCase() === "orderreport");
                    setSeoDetails(seoDataComplete);
                } else if (pathname[2] === "orderreturn") {
                    setSeoDetails({
                        pagetitle: "Order Return",
                        metadescription: "Order Return",
                        metakeyword: "Order Return",
                        metarobots: "Order Return",
                        pagelanguagecontentguid: "Order Return"
                    });
                } else if (pathname[2] === "MyOrderSampleReport") {
                    setSeoDetails({
                        pagetitle: "Order Sample",
                        metadescription: "Order Sample",
                        metakeyword: "Order Sample",
                        metarobots: "Order Sample",
                        pagelanguagecontentguid: "Order Sample"
                    });
                } else if (pathname[2] === "MyRequestQuoteReport") {
                    setSeoDetails({
                        pagetitle: "Request Quote",
                        metadescription: "Request Quote",
                        metakeyword: "Request Quote",
                        metarobots: "Request Quote",
                        pagelanguagecontentguid: "Request Quote"
                    });
                } else if (pathname[2] === "edit") {
                    const seoDataComplete = data?.find((item: any) => item.pagetitle.replaceAll(" ", "").toLowerCase() === "userprofile");
                    setSeoDetails(seoDataComplete);
                } else if (pathname[2] === "manageaddresses") {
                    setSeoDetails({
                        pagetitle: "Manage Addresses",
                        metadescription: "Manage Addresses",
                        metakeyword: "Manage Addresses",
                        metarobots: "Manage Addresses",
                        pagelanguagecontentguid: "Manage Addresses"
                    });
                } else if (pathname[1] === "edit-history") {
                    setSeoDetails({
                        pagetitle: "Edit History",
                        metadescription: "Edit History",
                        metakeyword: "Edit History",
                        metarobots: "Edit History",
                        pagelanguagecontentguid: "Edit History"
                    });
                } else if (pathname[1] === "improve-your-recommendations") {
                    setSeoDetails({
                        pagetitle: "Recommendations",
                        metadescription: "Recommendations",
                        metakeyword: "Recommendations",
                        metarobots: "Recommendations",
                        pagelanguagecontentguid: "Recommendations"
                    });
                } else if (pathname[1] === "changepassword") {
                    const seoDataComplete = data?.find((item: any) => item.pagetitle.replaceAll(" ", "").toLowerCase() === "changepassword");
                    setSeoDetails(seoDataComplete);
                } else if (pathname[1] === "myreview") {
                    const seoDataComplete = data?.find((item: any) => item.pagetitle.replaceAll(" ", "").toLowerCase() === "myreviews");
                    setSeoDetails(seoDataComplete);
                } else if (pathname[2] === "about-us" && data?.length > 0) {
                    const seoDataComplete = data?.find((item: any) => item.pageurl.replaceAll("/", "").toLowerCase() === pathname[2]);
                    setSeoDetails(seoDataComplete);
                } else if (pathname[1] === "contactus") {
                    const seoDataComplete = data?.find((item: any) => item.metakeyword.replaceAll(" ", "").toLowerCase() === pathname[1]);
                    setSeoDetails(seoDataComplete);
                } else if (pathname[2] === "artwork-information") {
                    const seoDataComplete = data?.find((item: any) => item.pageurl.replaceAll("/", "").toLowerCase() === pathname[2]);
                    setSeoDetails(seoDataComplete);
                } else if (pathname[2] === "faq") {
                    const seoDataComplete = data?.find((item: any) => item.pageurl.replaceAll("/", "").toLowerCase() === pathname[2]);
                    setSeoDetails(seoDataComplete);
                } else if (pathname[2] === "disclaimer") {
                    const seoDataComplete = data?.find((item: any) => item.pageurl.replaceAll("/", "").toLowerCase() === pathname[2]);
                    setSeoDetails(seoDataComplete);
                } else if (pathname[2] === "ordering-information") {
                    const seoDataComplete = data?.find((item: any) => item.pageurl.replaceAll("/", "").toLowerCase() === pathname[2]);
                    setSeoDetails(seoDataComplete);
                } else if (pathname[1] === "ordercatalog") {
                    const seoDataComplete = data?.find((item: any) => item.pagetitle.replaceAll("-", "").toLowerCase() === pathname[1]);
                    setSeoDetails({
                        pagetitle: "Order catalog",
                        metadescription: seoDataComplete?.metadescription,
                        metakeyword: seoDataComplete?.metakeyword,
                        metarobots: seoDataComplete?.metarobots,
                        pagelanguagecontentguid: seoDataComplete?.pageguid
                    });
                } else if (pathname[2]?.toLowerCase() === "proceedtocheckout") {
                    const seoDataComplete = data?.find((item: any) => item.pagetitle.replaceAll(" ", "").toLowerCase() === pathname[2]?.toLowerCase());
                    setSeoDetails(seoDataComplete);
                } else {
                    setSeoDetails({
                        pagetitle: "Home",
                        metadescription: "Home",
                        metakeyword: "Home",
                        metarobots: "Home",
                        pagelanguagecontentguid: ""
                    });
                }
                // else {
                //     const seoDataComplete = data?.find((item: any) => item.pageurl.toLowerCase() === pathname[0]);
                //     setSeoDetails(seoDataComplete);
                // }
            } else if (pathname[1] === "category") {
                const seoDataComplete = data?.find((item: any) => item.pagetitle.replaceAll(" ", "").toLowerCase() === "category");
                setSeoDetails({
                    pagetitle: pathname[2].replaceAll("-", " "),
                    metadescription: seoDataComplete?.metadescription,
                    metakeyword: seoDataComplete?.metakeyword,
                    metarobots: seoDataComplete?.metarobots,
                    pagelanguagecontentguid: seoDataComplete?.pagelanguagecontentguid
                });
            } else if (pathname[1] === "product" && typeof location.state?.productdata?.seodetails !== "undefined") {
                const seoDataComplete = data?.find((item: any) => item.pagetitle.replaceAll(" ", "").toLowerCase() === "productdetail");
                setSeoDetails({
                    pagetitle: pathname[2].replaceAll("-", " "),
                    metadescription: seoDataComplete?.metadescription,
                    metakeyword: seoDataComplete?.metakeyword,
                    metarobots: seoDataComplete?.metarobots,
                    pagelanguagecontentguid: seoDataComplete?.pagelanguagecontentguid
                });
            } else {
                setSeoDetails({
                    pagetitle: "Home",
                    metadescription: "Home",
                    metakeyword: "Home",
                    metarobots: "Home",
                    pagelanguagecontentguid: ""
                });
            }
        }
    }, [location, status, data]);

    return (
        <Helmet>
            <title>{seoDetails?.pagetitle}</title>
            <meta name="description" content={seoDetails?.metadescription} />
            <meta name="keywords" content={seoDetails?.metakeyword} />
            <meta name="robots" content={seoDetails?.metarobots} />
            <meta name="pagelanguagecontentguid" content={seoDetails?.pagelanguagecontentguid} />
        </Helmet>
    );
};

export default SeoTag;
