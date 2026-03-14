/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryGetSalesFlyer } from "common/components/graphQL/queries/Sales/useQueryGetSalesFlyer";
import client from "common/components/graphQL/apolloClient";
// import authToken from "common/components/graphQL/queries/Login/auth_apis";
import { CDN_URL, WEBSITE_GUID, WEBSITE_URL } from "common/utils/vars";
// import storefront from "./images/storefront.svg";
// import Icon from "../../../../public/images/manIcon.svg";
import "../../../styles/layout/header.scss";
import { useGetWebsiteBasedLanguagesData } from "common/hooks/react/api";
import ToggleSwitch from "../../common/ToggleSwitch";
import Sidebar from "../sidebar";

const Header = ({ fill = "#99A7AD", width = "24", height = "25" }) => {
    const location = useLocation();
    const { EmailAddress, FirstName, LastName } = window?.fepermission ?? {};
    const homeOrigin = window.origin;
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState("3238bf6d-ddcb-4f65-aadb-3eee730fb9c8"); // Default value is 'English'
    let totalCount = 0;
    if (location.pathname.toLowerCase().includes("/v2/salesflyer") && !location.pathname.toLowerCase().includes("/v2/salesflyeremail/salesflyerreport")) {
        const { data } = useQuery(useQueryGetSalesFlyer, {
            client,
            take: 500,
            skip: 0,
            variables: {
                filter: {
                    websiteGuid: {
                        eq: WEBSITE_GUID
                    }
                }
            }
        });
        totalCount = data?.salesFlyers?.totalCount;
    }
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [PageNAME, setPageNAME] = useState("");
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const [isOpen, setIsOpen] = useState(false);
    const handleUserClick = () => {
        setIsOpen(!isOpen);
    };
    // Close dropdown when clicking outside of it
    const handleClickOutside = (event) => {
        if (event.target.closest("#menutop") === null) {
            setIsOpen(false);
        }
    };
    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const { data } = useGetWebsiteBasedLanguagesData();
    let languageData = [];
    let isSuccess = false;
    if (location?.pathname?.toLowerCase().includes("/v2/collection/getallcollection") || location?.pathname?.toLowerCase().includes("/v2/collection/create") || location?.pathname?.toLowerCase().includes("/v2/collection/edit") || location?.pathname?.toLowerCase().includes("/v2/collection/assignproducts") || location?.pathname?.toLowerCase().includes("v2/eventthemes/getview") || location?.pathname?.toLowerCase()?.includes("v2/industries/getview") || location?.pathname?.toLowerCase()?.includes("v2/productmaterials/index") || location?.pathname?.toLowerCase()?.includes("v2/imprintcolor") || location?.pathname?.toLowerCase().includes("v2/imprintmethod/getview")) {
        languageData = data;
        isSuccess = true;
    }
    useEffect(() => {
        if (location?.pathname?.toLowerCase().includes("/v2/collection/getallcollection") || location?.pathname?.toLowerCase().includes("/v2/collection/create") || location?.pathname?.toLowerCase().includes("/v2/collection/edit") || location?.pathname?.toLowerCase().includes("/v2/collection/assignproducts") || location?.pathname?.toLowerCase()?.includes("v2/eventthemes/getview") || location?.pathname?.toLowerCase()?.includes("v2/industries/getview") || location?.pathname?.toLowerCase()?.includes("v2/productmaterials/index") || location?.pathname?.toLowerCase()?.includes("v2/imprintcolor") || location?.pathname?.toLowerCase().includes("v2/imprintmethod/getview")) {
            const storedLanguage = localStorage.getItem("languageguid");
            setSelectedLanguage(storedLanguage);
        } else {
            localStorage.removeItem("languageguid");
        }
    }, [location]);

    const [title, setTitle] = useState("");
    const [tooltipforicon, Settooltipforicon] = useState("");
    const [classNameToAdd, SetclassNameToAdd] = useState("");
    useEffect(() => {
        let Title = "";
        let pagename = "";
        let TooltipForIcon = "";
        let ClassName = "";
        if (location.pathname.toLowerCase().includes("/v2/salesflyeremail/salesflyerreport")) {
            Title = "Sales Flyer Report";
            pagename = "salesflyerreport";
            TooltipForIcon = "Flyers are product and business promotional material. Now you can manage all your flyers in one place. Easily sort, customize, share.";
        } else if (location.pathname.toLowerCase().includes("/v2/salesflyer/create")) {
            Title = "Create Sales Flyer";
            pagename = "salesflyeradd";
            TooltipForIcon = "Upload, schedule and sequence your flyer.";
        } else if (location.pathname.toLowerCase().includes("/v2/salesflyer/edit")) {
            pagename = "salesflyeradd";
            Title = "Edit Sales Flyer";
            TooltipForIcon = "Upload, schedule and sequence your flyer.";
        } else if (location.pathname.toLowerCase().includes("/v2/salesflyer")) {
            pagename = "salesflyerlisting";
            Title = `Sales Flyer (${totalCount !== undefined ? totalCount : 0})`;
            TooltipForIcon = "Flyers are product and business promotional material. Now you can manage all your flyers in one place. Easily sort, customize, share.";
        } else if (location.pathname.toLowerCase().includes("v2/collection/getallcollection")) {
            Title = "View Collection";
            pagename = "clsCollcetionListing";
            TooltipForIcon = "A collection is how products appear to your customers. Organize it by category, suppliers, brands, and more.";
        } else if (location.pathname.toLowerCase().includes("v2/collection/create")) {
            Title = "Add Collection";
            pagename = "clsCollcetionAddEdit";
            TooltipForIcon = "Create new categories to better organize your content. Click to add a new category and name it as per requirement.";
        } else if (location.pathname.toLowerCase().includes("v2/collection/edit")) {
            Title = "Edit Collection";
            pagename = "clsCollcetionAddEdit";
            TooltipForIcon = "Modify the existing categories to better organize your content. Click to rename, delete, or add new categories.";
        } else if (location.pathname.toLowerCase().includes("/v2/collection/assignproducts")) {
            Title = "Product Mapping";
            pagename = "ProductMapping";
            TooltipForIcon = "Enhance product recommendation by mapping related products to a category.";
        } else if (location.pathname.toLowerCase().includes("v2/ordercatalog/ordercatalogreport")) {
            Title = "Order Catalog Report";
            pagename = "ordercatalogreport";
            TooltipForIcon = "Order Catalog Report";
        } else if (location.pathname.toLowerCase().includes("/v2/order/orderreport")) {
            Title = "Order Report";
            pagename = "orderreport";
            TooltipForIcon = "This page shows a detailed report of all orders including status, total amounts, and customer information.";
        } else if (location.pathname.toLowerCase().includes("/v2/order/requestquotereport")) {
            Title = "Request Quote Report";
            pagename = "requestquotereport";
            TooltipForIcon = "Request Quote Report";
            ClassName = "request_quote_report";
        } else if (location.pathname.toLowerCase().includes("/v2/order/ordersamplereport")) {
            Title = "Order Sample Report";
            pagename = "ordersamplereport";
            TooltipForIcon = "Order Sample Report";
            ClassName = "order_sample_report";
        } else if (location.pathname.toLowerCase().includes("/v2/contactus/contactusreport")) {
            Title = "Contact Us Report";
            pagename = "contactusreport";
            TooltipForIcon = "Contact Us Report";
            ClassName = "contactus_report";
        } else if (location.pathname.toLowerCase().includes("/v2/newsletter/newsletterreport")) {
            Title = "NewsLetter Report";
            pagename = "newsletterreport";
            TooltipForIcon = "NewsLetter Report";
            ClassName = "newsletter_report";
        } else if (location?.pathname?.toLowerCase()?.includes("v2/eventthemes/getview")) {
            Title = "Event Themes";
            pagename = "EventThemes";
            TooltipForIcon = "Event Themes";
        } else if (location.pathname.toLowerCase().includes("/v2/pageconfigurator")) {
            pagename = "v2pageconfiguratorlisting";
            Title = "Page Management";
            TooltipForIcon = "Web pages are used to display content that doesn't change often. For example an 'About Us' or a 'Generel Info' page.";
        } else if (location?.pathname?.toLowerCase()?.includes("v2/industries/getview")) {
            Title = "Industries";
            pagename = "Industries";
            TooltipForIcon = "Industries";
        } else if (location.pathname.toLowerCase().includes("v2/product/adminindex")) {
            Title = "Product Information Management";
            pagename = "ProductListing";
            TooltipForIcon = "Product Information Management";
        } else if (location.pathname.toLowerCase().includes("/v2/product/create")) {
            Title = "Product Edit";
            pagename = "ProductEdit";
            TooltipForIcon = "Product Edit";
        } else if (location?.pathname?.toLowerCase()?.includes("v2/productmaterials/index")) {
            Title = "Product Materials";
            pagename = "ProductMaterials";
            TooltipForIcon = "Product Materials";
        } else if (location?.pathname?.toLowerCase()?.includes("v2/questionanswer/index")) {
            Title = "Question Answer Management";
            pagename = "v2QuestionAnswerManagementListing";
            TooltipForIcon = "Question Answer Management";
        } else if (location.pathname.toLowerCase().includes("v2/questionanswer/create")) {
            Title = "Add New Question";
            pagename = "v2QuestionAnswerManagementCreate";
            TooltipForIcon = "Create new Question to better organize your content.";
        } else if (location.pathname.toLowerCase().includes("v2/questionanswer/edit")) {
            Title = "Edit Question";
            pagename = "v2QuestionAnswerManagementCreate";
            TooltipForIcon = "Modify the existing Question to better organize your content.";
        } else if (location.pathname.toLowerCase().includes("v2/order/mockupreport")) {
            Title = "Mockups & Samples";
            pagename = "ordermockupreport";
            TooltipForIcon = "Mockups & Samples";
        } else if (location.pathname.toLowerCase().includes("/v2/order/purchaseorderreport")) {
            Title = "Submit PO Report";
            pagename = "purchaseorderreport";
            TooltipForIcon = "Submit PO Report";
        } else if (location?.pathname?.toLowerCase()?.includes("v2/analytics/pagehit")) {
            Title = "Analytics";
            pagename = "Analytics";
            TooltipForIcon = "Analytics";
            ClassName = "analytics_report";
        } else if (location?.pathname?.toLowerCase()?.includes("v2/imprintcolor")) {
            Title = "Imprint Color";
            pagename = "ImprintColor";
            TooltipForIcon = "Imprint Color";
        } else if (location?.pathname?.toLowerCase().includes("v2/imprintmethod/getview")) {
            Title = "Imprint Methods";
            pagename = "ImprintMethods";
            TooltipForIcon = "Imprint Methods";
        }

        setPageNAME(pagename);
        setTitle(Title);
        Settooltipforicon(TooltipForIcon);
        SetclassNameToAdd(ClassName);
    }, [location, totalCount]);

    // const HandleOldAdminindex = () => {
    //     window.location.href = location.pathname.replace("/v2", "");
    // };
    const HandleOldFlyer = () => {
        window.location.href = location.pathname.replace("/v2", "");
        localStorage.removeItem("languageguid");
    };
    const handleLanguageChange = (event) => {
        const selectedLanguageNew = event.target.value;
        setSelectedLanguage(selectedLanguageNew);

        const storedLanguage = localStorage.getItem("languageguid");
        if (storedLanguage === "null" || storedLanguage === null) {
            localStorage.setItem("languageguid", selectedLanguageNew);
        } else {
            localStorage.removeItem("languageguid");
            localStorage.setItem("languageguid", selectedLanguageNew);
        }
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    const hadleredirection = () => {
        navigate("/v2/Collection/GetAllCollection");
    };
    return (
        <>
            <div className={`header-container fixed ${classNameToAdd}`}>
                <div className="row headersec">
                    <div className="pageName">
                        <button className="btn btn-outline-light p-0 mr-2 d-md-block d-lg-none d-none" onClick={toggleSidebar}>
                            <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                                <path d="M172 445h656q19 0 33 13.5t14 33.5v16q0 20-14 33.5T828 555H172q-19 0-33-13.5T125 508v-16q0-20 14-33.5t33-13.5zm0-300h656q19 0 33 13.5t14 33.5v22q0 20-14 34t-33 14H172q-19 0-33-14t-14-34v-22q0-20 14-33.5t33-13.5zm0 593h656q19 0 33 14t14 34v22q0 20-14 33.5T828 855H172q-19 0-33-13.5T125 808v-22q0-20 14-34t33-14z" />
                            </svg>
                        </button>
                        <div className="sidebar-logo d-none" style={{ marginLeft: "-13px" }}>
                            <svg width="40" height="40" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Group 93">
                                    <g id="Group 2">
                                        <path id="Vector 1" d="M0.860352 4.40864C11.8459 5.7869 25.3008 2.41557 30.6551 0.557617C23.399 8.74611 10.775 10.8946 5.3701 10.9452C2.00552 10.8642 0.961694 6.55373 0.860352 4.40864Z" fill="#0E97E7" />
                                        <path id="Vector 2" d="M5.97852 14.5433C18.4639 13.692 28.0712 5.57444 31.3142 1.62207C28.9833 11.503 11.8057 20.4718 10.843 20.4718C10.0728 20.4718 7.27908 16.5195 5.97852 14.5433Z" fill="#0E97E7" />
                                        <path id="Vector 3" d="M13.8828 23.1566C19.4769 20.5622 26.9898 11.6711 30.047 7.5498C30.047 11.4008 23.6624 22.5485 21.7875 25.5888C20.2877 28.021 18.2912 27.5481 17.4805 27.0076L13.8828 23.1566Z" fill="#0E97E7" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        {title !== undefined && (
                            <div className="SelectCollecthead">
                                {(PageNAME?.toLowerCase() === "productmapping" || PageNAME?.toLowerCase() === "clscollcetionaddedit") && (
                                    <svg width={width} height={height} onClick={hadleredirection} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
                                            <rect width="24" height="24" transform="matrix(-1 0 0 1 24 0.826172)" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0)">
                                            <path d="M11.0358 12.8262L15.9644 8.22617L14.4644 6.82617L8.03578 12.8262L14.4644 18.8262L15.9644 17.4262L11.0358 12.8262Z" fill={fill} />
                                        </g>
                                    </svg>
                                )}
                                <div className="head_text d-none d-flex">
                                    {title}
                                    <div className="dropdown ml-2 headericon tooltip">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8.16666 13.167H9.83332V8.16699H8.16666V13.167ZM8.99999 6.50033C9.2361 6.50033 9.43402 6.42046 9.59374 6.26074C9.75346 6.10102 9.83332 5.9031 9.83332 5.66699C9.83332 5.43088 9.75346 5.23296 9.59374 5.07324C9.43402 4.91352 9.2361 4.83366 8.99999 4.83366C8.76388 4.83366 8.56596 4.91352 8.40624 5.07324C8.24652 5.23296 8.16666 5.43088 8.16666 5.66699C8.16666 5.9031 8.24652 6.10102 8.40624 6.26074C8.56596 6.42046 8.76388 6.50033 8.99999 6.50033ZM8.99999 17.3337C7.84721 17.3337 6.76388 17.1149 5.74999 16.6774C4.7361 16.2399 3.85416 15.6462 3.10416 14.8962C2.35416 14.1462 1.76041 13.2642 1.32291 12.2503C0.885406 11.2364 0.666656 10.1531 0.666656 9.00033C0.666656 7.84755 0.885406 6.76421 1.32291 5.75033C1.76041 4.73644 2.35416 3.85449 3.10416 3.10449C3.85416 2.35449 4.7361 1.76074 5.74999 1.32324C6.76388 0.885742 7.84721 0.666992 8.99999 0.666992C10.1528 0.666992 11.2361 0.885742 12.25 1.32324C13.2639 1.76074 14.1458 2.35449 14.8958 3.10449C15.6458 3.85449 16.2396 4.73644 16.6771 5.75033C17.1146 6.76421 17.3333 7.84755 17.3333 9.00033C17.3333 10.1531 17.1146 11.2364 16.6771 12.2503C16.2396 13.2642 15.6458 14.1462 14.8958 14.8962C14.1458 15.6462 13.2639 16.2399 12.25 16.6774C11.2361 17.1149 10.1528 17.3337 8.99999 17.3337ZM8.99999 15.667C10.8611 15.667 12.4375 15.0212 13.7292 13.7295C15.0208 12.4378 15.6667 10.8614 15.6667 9.00033C15.6667 7.13921 15.0208 5.56283 13.7292 4.27116C12.4375 2.97949 10.8611 2.33366 8.99999 2.33366C7.13888 2.33366 5.56249 2.97949 4.27082 4.27116C2.97916 5.56283 2.33332 7.13921 2.33332 9.00033C2.33332 10.8614 2.97916 12.4378 4.27082 13.7295C5.56249 15.0212 7.13888 15.667 8.99999 15.667Z"
                                                fill="#99A7AD"
                                            />
                                        </svg>
                                        <span className="btn p-0 tooltiptext" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" title="">
                                            {tooltipforicon}
                                        </span>
                                        <ul className="dropdown-menu p-2">
                                            <li>
                                                <span className="m-0">Header Info</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                        {location.pathname.toLowerCase().includes("/v2/collection/getallcollection") ||
                            location.pathname.toLowerCase().includes("/v2/collection/create") ||
                            location.pathname.toLowerCase().includes("/v2/collection/edit") ||
                            location.pathname.toLowerCase().includes("/v2/collection/assignproducts") ||
                            location.pathname.toLowerCase().includes("v2/eventthemes/getview") ||
                            location?.pathname?.toLowerCase()?.includes("v2/imprintcolor") ||
                            location?.pathname?.toLowerCase().includes("v2/imprintmethod/getview") ||
                            (location.pathname.toLowerCase().includes("v2/product/create") && (
                                <div className={languageData?.languagelist.length > 1 ? "" : "Languagenew"} id="divMultiLingualDrd">
                                    <div className="renLanguage">
                                        <select id="DrpDwnLanguageGuidsId" className="clsCollcetionAddEdit_Language form-control" aria-label="Select Language" value={selectedLanguage} onChange={handleLanguageChange}>
                                            {isSuccess &&
                                                languageData?.languagelist?.map((language) => (
                                                    <option key={language.languagealias} value={language.languageguid}>
                                                        {language.languagename}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                            ))}

                        {location.pathname.toLowerCase().includes("/v2/ordercatalog") && (
                            <div className="navbarlinks d-none">
                                <svg width="275" height="36" viewBox="0 0 275 36" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={HandleOldFlyer}>
                                    <rect x="0.5" y="0.5" width="274" height="35" rx="5.5" fill="white" />
                                    <rect x="0.5" y="0.5" width="274" height="35" rx="5.5" stroke="#00A7E3" />
                                    <path
                                        d="M20.8865 23.168C20.0932 23.168 19.3792 23 18.7445 22.664C18.1192 22.328 17.6712 21.8987 17.4005 21.376L18.4505 20.592C19.0385 21.4973 19.8598 21.95 20.9145 21.95C21.4465 21.95 21.8852 21.8193 22.2305 21.558C22.5758 21.2873 22.7485 20.9233 22.7485 20.466C22.7485 19.7007 22.2725 19.1407 21.3205 18.786L20.0045 18.282C19.2205 17.9927 18.6465 17.6333 18.2825 17.204C17.9278 16.7653 17.7505 16.21 17.7505 15.538C17.7505 14.7353 18.0398 14.096 18.6185 13.62C19.2065 13.1347 19.9532 12.892 20.8585 12.892C21.4652 12.892 22.0205 13.018 22.5245 13.27C23.0285 13.5127 23.4392 13.8393 23.7565 14.25L22.8045 15.09C22.2538 14.4367 21.5958 14.11 20.8305 14.11C20.3265 14.11 19.9018 14.2407 19.5565 14.502C19.2112 14.754 19.0385 15.0807 19.0385 15.482C19.0385 15.8833 19.1552 16.2007 19.3885 16.434C19.6218 16.6673 20.0045 16.882 20.5365 17.078L21.7405 17.54C22.5058 17.8293 23.0798 18.2027 23.4625 18.66C23.8545 19.1173 24.0505 19.7007 24.0505 20.41C24.0505 21.2407 23.7518 21.908 23.1545 22.412C22.5665 22.916 21.8105 23.168 20.8865 23.168ZM31.568 23L29.832 17.974L28.11 23H27.046L24.666 16H25.926L27.62 21.11L29.37 16H30.294L32.044 21.11L33.738 16H35.012L32.632 23H31.568ZM37.5278 13.886C37.3691 14.0447 37.1684 14.124 36.9258 14.124C36.6831 14.124 36.4778 14.0447 36.3098 13.886C36.1418 13.718 36.0578 13.5127 36.0578 13.27C36.0578 13.0367 36.1418 12.836 36.3098 12.668C36.4778 12.5 36.6831 12.416 36.9258 12.416C37.1684 12.416 37.3691 12.5 37.5278 12.668C37.6864 12.836 37.7658 13.0367 37.7658 13.27C37.7658 13.5127 37.6864 13.718 37.5278 13.886ZM36.3098 23V16H37.5138V23H36.3098ZM42.5121 23.07C41.8681 23.07 41.3501 22.888 40.9581 22.524C40.5661 22.16 40.3701 21.628 40.3701 20.928V17.106H38.8861V16H40.3701V14.054H41.5741V16H43.5901V17.106H41.5741V20.774C41.5741 21.2127 41.6674 21.5207 41.8541 21.698C42.0408 21.8753 42.3348 21.964 42.7361 21.964C43.0908 21.964 43.3754 21.9173 43.5901 21.824V22.902C43.2541 23.014 42.8948 23.07 42.5121 23.07ZM48.1544 23.14C47.0998 23.14 46.2224 22.79 45.5224 22.09C44.8318 21.39 44.4864 20.5267 44.4864 19.5C44.4864 18.4733 44.8318 17.61 45.5224 16.91C46.2224 16.21 47.0998 15.86 48.1544 15.86C48.8638 15.86 49.4984 16.028 50.0584 16.364C50.6278 16.7 51.0711 17.1573 51.3884 17.736L50.3384 18.324C50.1331 17.9133 49.8391 17.5867 49.4564 17.344C49.0831 17.1013 48.6491 16.98 48.1544 16.98C47.4358 16.98 46.8478 17.2227 46.3904 17.708C45.9331 18.1933 45.7044 18.7907 45.7044 19.5C45.7044 20.2093 45.9331 20.8067 46.3904 21.292C46.8478 21.7773 47.4358 22.02 48.1544 22.02C48.6491 22.02 49.0831 21.8987 49.4564 21.656C49.8391 21.4133 50.1331 21.0867 50.3384 20.676L51.3884 21.264C51.0711 21.8427 50.6278 22.3 50.0584 22.636C49.4984 22.972 48.8638 23.14 48.1544 23.14ZM54.1525 23H52.9485V12.5H54.1525V17.078C54.6285 16.266 55.3705 15.86 56.3785 15.86C57.1718 15.86 57.8111 16.1167 58.2965 16.63C58.7818 17.1433 59.0245 17.8293 59.0245 18.688V23H57.8345V18.87C57.8345 18.282 57.6851 17.82 57.3865 17.484C57.0878 17.1387 56.6865 16.966 56.1825 16.966C55.6038 16.966 55.1185 17.1947 54.7265 17.652C54.3438 18.1093 54.1525 18.7347 54.1525 19.528V23ZM67.0531 23.07C66.4091 23.07 65.8911 22.888 65.4991 22.524C65.1071 22.16 64.9111 21.628 64.9111 20.928V17.106H63.4271V16H64.9111V14.054H66.1151V16H68.1311V17.106H66.1151V20.774C66.1151 21.2127 66.2085 21.5207 66.3951 21.698C66.5818 21.8753 66.8758 21.964 67.2771 21.964C67.6318 21.964 67.9165 21.9173 68.1311 21.824V22.902C67.7951 23.014 67.4358 23.07 67.0531 23.07ZM72.6815 23.14C71.6268 23.14 70.7495 22.79 70.0495 22.09C69.3588 21.3807 69.0135 20.5173 69.0135 19.5C69.0135 18.4827 69.3588 17.624 70.0495 16.924C70.7495 16.2147 71.6268 15.86 72.6815 15.86C73.7268 15.86 74.5948 16.2147 75.2855 16.924C75.9855 17.624 76.3355 18.4827 76.3355 19.5C76.3355 20.5173 75.9855 21.3807 75.2855 22.09C74.5948 22.79 73.7268 23.14 72.6815 23.14ZM70.9175 21.292C71.3748 21.7773 71.9628 22.02 72.6815 22.02C73.4001 22.02 73.9835 21.7773 74.4315 21.292C74.8795 20.8067 75.1035 20.2093 75.1035 19.5C75.1035 18.7907 74.8795 18.1933 74.4315 17.708C73.9835 17.2227 73.4001 16.98 72.6815 16.98C71.9628 16.98 71.3748 17.2227 70.9175 17.708C70.4695 18.1933 70.2455 18.7907 70.2455 19.5C70.2455 20.2093 70.4695 20.8067 70.9175 21.292ZM84.5486 23.14C83.494 23.14 82.6166 22.79 81.9166 22.09C81.226 21.3807 80.8806 20.5173 80.8806 19.5C80.8806 18.4827 81.226 17.624 81.9166 16.924C82.6166 16.2147 83.494 15.86 84.5486 15.86C85.594 15.86 86.462 16.2147 87.1526 16.924C87.8526 17.624 88.2026 18.4827 88.2026 19.5C88.2026 20.5173 87.8526 21.3807 87.1526 22.09C86.462 22.79 85.594 23.14 84.5486 23.14ZM82.7846 21.292C83.242 21.7773 83.83 22.02 84.5486 22.02C85.2673 22.02 85.8506 21.7773 86.2986 21.292C86.7466 20.8067 86.9706 20.2093 86.9706 19.5C86.9706 18.7907 86.7466 18.1933 86.2986 17.708C85.8506 17.2227 85.2673 16.98 84.5486 16.98C83.83 16.98 83.242 17.2227 82.7846 17.708C82.3366 18.1933 82.1126 18.7907 82.1126 19.5C82.1126 20.2093 82.3366 20.8067 82.7846 21.292ZM89.9309 23V12.5H91.1349V23H89.9309ZM96.3012 23.14C95.3305 23.14 94.5139 22.7853 93.8512 22.076C93.1979 21.3667 92.8712 20.508 92.8712 19.5C92.8712 18.492 93.1979 17.6333 93.8512 16.924C94.5139 16.2147 95.3305 15.86 96.3012 15.86C96.8145 15.86 97.2905 15.9767 97.7292 16.21C98.1772 16.434 98.5225 16.7233 98.7652 17.078V12.5H99.9692V23H98.7652V21.922C98.5225 22.2767 98.1772 22.5707 97.7292 22.804C97.2905 23.028 96.8145 23.14 96.3012 23.14ZM96.4832 22.034C97.1739 22.034 97.7432 21.7913 98.1912 21.306C98.6392 20.8207 98.8632 20.2187 98.8632 19.5C98.8632 18.7813 98.6392 18.1793 98.1912 17.694C97.7432 17.2087 97.1739 16.966 96.4832 16.966C95.7832 16.966 95.2092 17.2087 94.7612 17.694C94.3132 18.1793 94.0892 18.7813 94.0892 19.5C94.0892 20.2187 94.3132 20.8207 94.7612 21.306C95.2092 21.7913 95.7832 22.034 96.4832 22.034ZM107.727 23.14C107.083 23.14 106.518 23.0047 106.033 22.734C105.547 22.454 105.197 22.048 104.983 21.516L105.963 20.97C106.093 21.3153 106.322 21.586 106.649 21.782C106.975 21.978 107.339 22.076 107.741 22.076C108.086 22.076 108.375 21.992 108.609 21.824C108.842 21.656 108.959 21.4273 108.959 21.138C108.959 20.886 108.865 20.676 108.679 20.508C108.501 20.34 108.189 20.186 107.741 20.046L107.041 19.822C105.874 19.486 105.291 18.8047 105.291 17.778C105.291 17.1993 105.519 16.7373 105.977 16.392C106.443 16.0373 107.017 15.86 107.699 15.86C108.763 15.86 109.533 16.266 110.009 17.078L109.113 17.694C108.73 17.162 108.245 16.896 107.657 16.896C107.339 16.896 107.064 16.9753 106.831 17.134C106.607 17.2833 106.495 17.484 106.495 17.736C106.495 17.9693 106.565 18.17 106.705 18.338C106.854 18.4967 107.115 18.632 107.489 18.744L108.259 18.982C109.528 19.374 110.163 20.06 110.163 21.04C110.163 21.6933 109.934 22.2067 109.477 22.58C109.029 22.9533 108.445 23.14 107.727 23.14ZM114.799 23.14C113.829 23.14 113.012 22.7853 112.349 22.076C111.696 21.3667 111.369 20.508 111.369 19.5C111.369 18.492 111.696 17.6333 112.349 16.924C113.012 16.2147 113.829 15.86 114.799 15.86C115.313 15.86 115.789 15.9767 116.227 16.21C116.675 16.434 117.021 16.7233 117.263 17.078V16H118.467V23H117.263V21.922C117.021 22.2767 116.675 22.5707 116.227 22.804C115.789 23.028 115.313 23.14 114.799 23.14ZM114.981 22.034C115.672 22.034 116.241 21.7913 116.689 21.306C117.137 20.8207 117.361 20.2187 117.361 19.5C117.361 18.7813 117.137 18.1793 116.689 17.694C116.241 17.2087 115.672 16.966 114.981 16.966C114.281 16.966 113.707 17.2087 113.259 17.694C112.811 18.1793 112.587 18.7813 112.587 19.5C112.587 20.2187 112.811 20.8207 113.259 21.306C113.707 21.7913 114.281 22.034 114.981 22.034ZM120.734 23V12.5H121.938V23H120.734ZM127.3 23.14C126.227 23.14 125.354 22.7947 124.682 22.104C124.01 21.4133 123.674 20.5453 123.674 19.5C123.674 18.464 124.015 17.6007 124.696 16.91C125.377 16.21 126.25 15.86 127.314 15.86C128.257 15.86 129.045 16.1773 129.68 16.812C130.324 17.4373 130.646 18.2913 130.646 19.374C130.646 19.514 130.641 19.6353 130.632 19.738H124.892C124.911 20.3913 125.144 20.9373 125.592 21.376C126.049 21.8147 126.623 22.034 127.314 22.034C128.294 22.034 129.022 21.628 129.498 20.816L130.45 21.474C129.769 22.5847 128.719 23.14 127.3 23.14ZM124.976 18.758H129.414C129.321 18.198 129.073 17.7547 128.672 17.428C128.28 17.092 127.813 16.924 127.272 16.924C126.721 16.924 126.227 17.092 125.788 17.428C125.359 17.7547 125.088 18.198 124.976 18.758ZM134.469 23.14C133.825 23.14 133.26 23.0047 132.775 22.734C132.289 22.454 131.939 22.048 131.725 21.516L132.705 20.97C132.835 21.3153 133.064 21.586 133.391 21.782C133.717 21.978 134.081 22.076 134.483 22.076C134.828 22.076 135.117 21.992 135.351 21.824C135.584 21.656 135.701 21.4273 135.701 21.138C135.701 20.886 135.607 20.676 135.421 20.508C135.243 20.34 134.931 20.186 134.483 20.046L133.783 19.822C132.616 19.486 132.033 18.8047 132.033 17.778C132.033 17.1993 132.261 16.7373 132.719 16.392C133.185 16.0373 133.759 15.86 134.441 15.86C135.505 15.86 136.275 16.266 136.751 17.078L135.855 17.694C135.472 17.162 134.987 16.896 134.399 16.896C134.081 16.896 133.806 16.9753 133.573 17.134C133.349 17.2833 133.237 17.484 133.237 17.736C133.237 17.9693 133.307 18.17 133.447 18.338C133.596 18.4967 133.857 18.632 134.231 18.744L135.001 18.982C136.27 19.374 136.905 20.06 136.905 21.04C136.905 21.6933 136.676 22.2067 136.219 22.58C135.771 22.9533 135.187 23.14 134.469 23.14ZM142.445 23V17.106H140.961V16H142.445V14.586C142.445 13.886 142.641 13.3493 143.033 12.976C143.425 12.6027 143.943 12.416 144.587 12.416C144.969 12.416 145.333 12.4767 145.679 12.598V13.662C145.464 13.5687 145.175 13.522 144.811 13.522C144.409 13.522 144.115 13.6107 143.929 13.788C143.742 13.9653 143.649 14.2733 143.649 14.712V16H145.679V17.106H143.649V23H142.445ZM146.995 23V12.5H148.199V23H146.995ZM152.332 25.926H150.988L152.514 22.636L149.448 16H150.778L153.186 21.32L155.58 16H156.924L152.332 25.926ZM161.056 23.14C159.982 23.14 159.11 22.7947 158.438 22.104C157.766 21.4133 157.43 20.5453 157.43 19.5C157.43 18.464 157.77 17.6007 158.452 16.91C159.133 16.21 160.006 15.86 161.07 15.86C162.012 15.86 162.801 16.1773 163.436 16.812C164.08 17.4373 164.402 18.2913 164.402 19.374C164.402 19.514 164.397 19.6353 164.388 19.738H158.648C158.666 20.3913 158.9 20.9373 159.348 21.376C159.805 21.8147 160.379 22.034 161.07 22.034C162.05 22.034 162.778 21.628 163.254 20.816L164.206 21.474C163.524 22.5847 162.474 23.14 161.056 23.14ZM158.732 18.758H163.17C163.076 18.198 162.829 17.7547 162.428 17.428C162.036 17.092 161.569 16.924 161.028 16.924C160.477 16.924 159.982 17.092 159.544 17.428C159.114 17.7547 158.844 18.198 158.732 18.758ZM166.111 23V16H167.315V17.358C167.445 16.9287 167.697 16.5833 168.071 16.322C168.453 16.0607 168.855 15.93 169.275 15.93C169.48 15.93 169.662 15.9487 169.821 15.986V17.232C169.653 17.1573 169.433 17.12 169.163 17.12C168.677 17.12 168.248 17.33 167.875 17.75C167.501 18.17 167.315 18.7627 167.315 19.528V23H166.111ZM175.477 13.886C175.318 14.0447 175.118 14.124 174.875 14.124C174.632 14.124 174.427 14.0447 174.259 13.886C174.091 13.718 174.007 13.5127 174.007 13.27C174.007 13.0367 174.091 12.836 174.259 12.668C174.427 12.5 174.632 12.416 174.875 12.416C175.118 12.416 175.318 12.5 175.477 12.668C175.636 12.836 175.715 13.0367 175.715 13.27C175.715 13.5127 175.636 13.718 175.477 13.886ZM174.259 23V16H175.463V23H174.259ZM177.745 23V16H178.949V17.078C179.425 16.266 180.167 15.86 181.175 15.86C181.969 15.86 182.608 16.1167 183.093 16.63C183.579 17.1433 183.821 17.8293 183.821 18.688V23H182.631V18.87C182.631 18.282 182.482 17.82 182.183 17.484C181.885 17.1387 181.483 16.966 180.979 16.966C180.401 16.966 179.915 17.1947 179.523 17.652C179.141 18.1093 178.949 18.7347 178.949 19.528V23H177.745ZM188.623 23.07C187.979 23.07 187.461 22.888 187.069 22.524C186.677 22.16 186.481 21.628 186.481 20.928V17.106H184.997V16H186.481V14.054H187.685V16H189.701V17.106H187.685V20.774C187.685 21.2127 187.779 21.5207 187.965 21.698C188.152 21.8753 188.446 21.964 188.847 21.964C189.202 21.964 189.487 21.9173 189.701 21.824V22.902C189.365 23.014 189.006 23.07 188.623 23.07ZM194.224 23.14C193.15 23.14 192.278 22.7947 191.606 22.104C190.934 21.4133 190.598 20.5453 190.598 19.5C190.598 18.464 190.938 17.6007 191.62 16.91C192.301 16.21 193.174 15.86 194.238 15.86C195.18 15.86 195.969 16.1773 196.604 16.812C197.248 17.4373 197.57 18.2913 197.57 19.374C197.57 19.514 197.565 19.6353 197.556 19.738H191.816C191.834 20.3913 192.068 20.9373 192.516 21.376C192.973 21.8147 193.547 22.034 194.238 22.034C195.218 22.034 195.946 21.628 196.422 20.816L197.374 21.474C196.692 22.5847 195.642 23.14 194.224 23.14ZM191.9 18.758H196.338C196.244 18.198 195.997 17.7547 195.596 17.428C195.204 17.092 194.737 16.924 194.196 16.924C193.645 16.924 193.15 17.092 192.712 17.428C192.282 17.7547 192.012 18.198 191.9 18.758ZM199.279 23V16H200.483V17.358C200.613 16.9287 200.865 16.5833 201.239 16.322C201.621 16.0607 202.023 15.93 202.443 15.93C202.648 15.93 202.83 15.9487 202.989 15.986V17.232C202.821 17.1573 202.601 17.12 202.331 17.12C201.845 17.12 201.416 17.33 201.043 17.75C200.669 18.17 200.483 18.7627 200.483 19.528V23H199.279ZM204.993 23V17.106H203.509V16H204.993V14.586C204.993 13.886 205.189 13.3493 205.581 12.976C205.973 12.6027 206.491 12.416 207.135 12.416C207.518 12.416 207.882 12.4767 208.227 12.598V13.662C208.013 13.5687 207.723 13.522 207.359 13.522C206.958 13.522 206.664 13.6107 206.477 13.788C206.291 13.9653 206.197 14.2733 206.197 14.712V16H208.227V17.106H206.197V23H204.993ZM212.252 23.14C211.282 23.14 210.465 22.7853 209.802 22.076C209.149 21.3667 208.822 20.508 208.822 19.5C208.822 18.492 209.149 17.6333 209.802 16.924C210.465 16.2147 211.282 15.86 212.252 15.86C212.766 15.86 213.242 15.9767 213.68 16.21C214.128 16.434 214.474 16.7233 214.716 17.078V16H215.92V23H214.716V21.922C214.474 22.2767 214.128 22.5707 213.68 22.804C213.242 23.028 212.766 23.14 212.252 23.14ZM212.434 22.034C213.125 22.034 213.694 21.7913 214.142 21.306C214.59 20.8207 214.814 20.2187 214.814 19.5C214.814 18.7813 214.59 18.1793 214.142 17.694C213.694 17.2087 213.125 16.966 212.434 16.966C211.734 16.966 211.16 17.2087 210.712 17.694C210.264 18.1793 210.04 18.7813 210.04 19.5C210.04 20.2187 210.264 20.8207 210.712 21.306C211.16 21.7913 211.734 22.034 212.434 22.034ZM221.309 23.14C220.254 23.14 219.377 22.79 218.677 22.09C217.986 21.39 217.641 20.5267 217.641 19.5C217.641 18.4733 217.986 17.61 218.677 16.91C219.377 16.21 220.254 15.86 221.309 15.86C222.018 15.86 222.653 16.028 223.213 16.364C223.782 16.7 224.225 17.1573 224.543 17.736L223.493 18.324C223.287 17.9133 222.993 17.5867 222.611 17.344C222.237 17.1013 221.803 16.98 221.309 16.98C220.59 16.98 220.002 17.2227 219.545 17.708C219.087 18.1933 218.859 18.7907 218.859 19.5C218.859 20.2093 219.087 20.8067 219.545 21.292C220.002 21.7773 220.59 22.02 221.309 22.02C221.803 22.02 222.237 21.8987 222.611 21.656C222.993 21.4133 223.287 21.0867 223.493 20.676L224.543 21.264C224.225 21.8427 223.782 22.3 223.213 22.636C222.653 22.972 222.018 23.14 221.309 23.14ZM229.183 23.14C228.109 23.14 227.237 22.7947 226.565 22.104C225.893 21.4133 225.557 20.5453 225.557 19.5C225.557 18.464 225.897 17.6007 226.579 16.91C227.26 16.21 228.133 15.86 229.197 15.86C230.139 15.86 230.928 16.1773 231.563 16.812C232.207 17.4373 232.529 18.2913 232.529 19.374C232.529 19.514 232.524 19.6353 232.515 19.738H226.775C226.793 20.3913 227.027 20.9373 227.475 21.376C227.932 21.8147 228.506 22.034 229.197 22.034C230.177 22.034 230.905 21.628 231.381 20.816L232.333 21.474C231.651 22.5847 230.601 23.14 229.183 23.14ZM226.859 18.758H231.297C231.203 18.198 230.956 17.7547 230.555 17.428C230.163 17.092 229.696 16.924 229.155 16.924C228.604 16.924 228.109 17.092 227.671 17.428C227.241 17.7547 226.971 18.198 226.859 18.758Z"
                                        fill="#667B84"
                                    />
                                    <path d="M261.53 18.5303C261.823 18.2374 261.823 17.7626 261.53 17.4697L256.757 12.6967C256.464 12.4038 255.99 12.4038 255.697 12.6967C255.404 12.9896 255.404 13.4645 255.697 13.7574L259.939 18L255.697 22.2426C255.404 22.5355 255.404 23.0104 255.697 23.3033C255.99 23.5962 256.464 23.5962 256.757 23.3033L261.53 18.5303ZM246 18.75H261V17.25H246V18.75Z" fill="#99A7AD" />
                                </svg>
                            </div>
                        )}
                        {/* {location.pathname.toLowerCase().includes("/v2/product") && (
                            <div className="navbarlinks">
                                <svg width="275" height="36" viewBox="0 0 275 36" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={HandleOldAdminindex}>
                                    <rect x="0.5" y="0.5" width="274" height="35" rx="5.5" fill="white" />
                                    <rect x="0.5" y="0.5" width="274" height="35" rx="5.5" stroke="#00A7E3" />
                                </svg>
                            </div>
                        )} */}
                    </div>
                    <div className="oldNewLink">
                        <div className="navbarlinks">
                            <div className="navlinkswitch" onClick={HandleOldFlyer}>
                                <p>
                                    <span>Switch to old {title?.toLowerCase()} interface</span>
                                    <span className="arrowicon">
                                        {" "}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                                            <path d="M15.5303 6.53033C15.8232 6.23744 15.8232 5.76256 15.5303 5.46967L10.7574 0.696699C10.4645 0.403806 9.98959 0.403806 9.6967 0.696699C9.40381 0.989592 9.40381 1.46447 9.6967 1.75736L13.9393 6L9.6967 10.2426C9.40381 10.5355 9.40381 11.0104 9.6967 11.3033C9.98959 11.5962 10.4645 11.5962 10.7574 11.3033L15.5303 6.53033ZM0 6.75H15V5.25H0V6.75Z" fill="#99A7AD" />
                                        </svg>
                                    </span>
                                </p>
                            </div>
                            {/* )} */}
                        </div>
                    </div>

                    <div className="iconRight">
                        {!location.pathname.toLowerCase().includes("/v2/ordercatalog") && (
                            <div className="taketour_btn">
                                <span>Take a tour</span>
                                {PageNAME !== "" && <ToggleSwitch PageNAME={PageNAME} />}
                            </div>
                        )}
                        {/* <img className="ml-2 mr-2" src={storefront} alt="StoreFront" style={{ height: "24px", width: "24px" }} /> */}
                        <div className="basketIcon">
                            <a href={homeOrigin} title="Home" target="_blank" rel="noreferrer">
                                <svg width="24" height="24" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Storefront">
                                        <path id="Rectangle 12691" opacity="0.2" d="M4.23877 8.52832H19.6389L18.7876 18.937H4.97363L4.23877 8.52832Z" fill="#00A7E3" />
                                        <path
                                            id="Vector"
                                            d="M20.8125 8.25C20.8129 8.18608 20.8042 8.12243 20.7867 8.06094L19.5535 3.74687C19.4706 3.46063 19.2974 3.20887 19.0596 3.02921C18.8219 2.84954 18.5324 2.75159 18.2344 2.75H5.51563C5.21762 2.75159 4.92813 2.84954 4.69038 3.02921C4.45263 3.20887 4.27937 3.46063 4.19649 3.74687L2.96414 8.06094C2.94639 8.12239 2.93742 8.18604 2.9375 8.25V9.625C2.9375 10.1587 3.06175 10.685 3.30041 11.1623C3.53906 11.6396 3.88558 12.0548 4.3125 12.375V18.5625C4.3125 18.7448 4.38493 18.9197 4.51386 19.0486C4.6428 19.1776 4.81766 19.25 5 19.25H18.75C18.9323 19.25 19.1072 19.1776 19.2361 19.0486C19.3651 18.9197 19.4375 18.7448 19.4375 18.5625V12.375C19.8644 12.0548 20.2109 11.6396 20.4496 11.1623C20.6883 10.685 20.8125 10.1587 20.8125 9.625V8.25ZM5.51563 4.125H18.2344L19.2158 7.5625H4.5368L5.51563 4.125ZM9.8125 8.9375H13.9375V9.625C13.9375 10.172 13.7202 10.6966 13.3334 11.0834C12.9466 11.4702 12.422 11.6875 11.875 11.6875C11.328 11.6875 10.8034 11.4702 10.4166 11.0834C10.0298 10.6966 9.8125 10.172 9.8125 9.625V8.9375ZM8.4375 8.9375V9.625C8.43738 9.97967 8.34579 10.3283 8.1716 10.6373C7.99741 10.9462 7.74649 11.205 7.44309 11.3887C7.13968 11.5723 6.79403 11.6747 6.43954 11.6858C6.08504 11.6969 5.73368 11.6164 5.41938 11.452C5.37155 11.4148 5.31895 11.3842 5.26297 11.3609C4.97171 11.1745 4.73201 10.9178 4.56592 10.6144C4.39983 10.3111 4.31268 9.97084 4.3125 9.625V8.9375H8.4375ZM18.0625 17.875H5.6875V12.9937C5.91383 13.0394 6.14412 13.0624 6.375 13.0625C6.90866 13.0625 7.43498 12.9383 7.9123 12.6996C8.38961 12.4609 8.80481 12.1144 9.125 11.6875C9.44519 12.1144 9.86039 12.4609 10.3377 12.6996C10.815 12.9383 11.3413 13.0625 11.875 13.0625C12.4087 13.0625 12.935 12.9383 13.4123 12.6996C13.8896 12.4609 14.3048 12.1144 14.625 11.6875C14.9452 12.1144 15.3604 12.4609 15.8377 12.6996C16.315 12.9383 16.8413 13.0625 17.375 13.0625C17.6059 13.0624 17.8362 13.0394 18.0625 12.9937V17.875ZM18.4862 11.3609C18.4309 11.3842 18.3789 11.4145 18.3315 11.4512C18.0172 11.6157 17.6658 11.6963 17.3113 11.6854C16.9567 11.6744 16.611 11.5722 16.3075 11.3886C16.004 11.205 15.753 10.9463 15.5787 10.6373C15.4044 10.3284 15.3127 9.97972 15.3125 9.625V8.9375H19.4375V9.625C19.4372 9.97092 19.3499 10.3112 19.1837 10.6146C19.0175 10.9179 18.7776 11.1746 18.4862 11.3609Z"
                                            fill="#2E3B41"
                                        />
                                    </g>
                                </svg>
                            </a>
                        </div>

                        <div className="iconUser">
                            <div className={`dropdown ${isOpen ? "show" : ""}`} id="menutop">
                                <button className="btn-account d-none d-md-flex" onClick={handleUserClick} type="button" aria-haspopup="true" aria-expanded={isOpen} id="menutopbtn">
                                    <span className="user-avatar">
                                        <img src={`${CDN_URL}/images/585e4bf3cb11b227491c339a.png`} alt="Eclipse" style={{ height: "30px", width: "30px" }} />
                                    </span>
                                    <span className="account-summary pr-lg-4 d-none d-md-inline">
                                        <span className="ar">Hi,</span>
                                        <span className="account-name">
                                            <label htmlFor="last">
                                                {FirstName}
                                                <span id="last"> {LastName}</span>
                                            </label>
                                        </span>
                                    </span>
                                </button>
                                <span className="arr" />
                                <div className="dropdown-arrow dropdown-arrow-left" />
                                {isOpen && (
                                    <div className={`dropdown-menu userIcon ${isOpen ? "show" : ""}`}>
                                        <a className="dropdown-item" href="#" title={EmailAddress}>
                                            <i className="fa fa-envelope" aria-hidden="true" /> {EmailAddress}
                                        </a>
                                        <a className="dropdown-item" href={`${WEBSITE_URL}logout`}>
                                            <i className="fa fa-sign-out" aria-hidden="true" /> Logout
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`overlay ${isSidebarOpen ? "active" : ""}`} onClick={toggleSidebar} />
        </>
    );
};

export default Header;
