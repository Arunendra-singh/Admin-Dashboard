/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
// import React, { useState, useEffect, useRef, createElement, Fragment, useCallback } from "react";
import { CDN_URL, WEBSITE_GUID } from "common/utils/vars";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryGetallSeo } from "common/components/graphQL/queries/PageConfigurator/useQueryGetAllSeo";
import { useMutationAddSeo } from "common/components/graphQL/mutations/PageConfigurator/useMutationSeo";
import { useQueryGetPages } from "common/components/graphQL/queries/PageConfigurator/useQueryGetPages";
import { useQueryGetPageConfigurator } from "common/components/graphQL/queries/PageConfigurator/useQueryGetPageConfigurator";
import { useQueryCheckPageExist } from "common/components/graphQL/queries/PageConfigurator/useQueryCheckPageExist";
import { PopupV3 } from "../../../helpers/PopupV3";
import PageContainer from "../../../hoc/PageContainer";
import { categories } from "../../../helpers/json/components.json";
import SearchComponent from "../../../components/shared/SearchBox";
import ConfigSetting from "../../../components/Configurator/builder/ConfigSetting";
import RowSetting from "../../../components/Configurator/builder/RowSetting";
// import FormFieldValidations from "../../../helpers/customvalidation";
import styls from "../styles/pages/pageBuilder.module.scss";

const Categories = ({ onDragStartHandler, searchResult, searchQuery }) => {
    const categoriesToRender = searchResult.length > 0 ? searchResult : categories;

    return categoriesToRender.map((category) => {
        // Filter components within the category based on the search query
        const filteredComponents = category.components.filter((comp) =>
            comp.label.toLowerCase().includes(searchQuery.toLowerCase()));

        // Only render the category if there are matching components
        if (filteredComponents.length > 0) {
            return (
                <div className="element-category" key={category.name}>
                    {/* <strong className="title">
                        {category.name} ({filteredComponents.length})
                    </strong> */}
                    <ul className="element-list">
                        {filteredComponents.map((comp) => (
                            <li key={comp.label} data-comp={JSON.stringify(comp)} onDragStart={onDragStartHandler} className="dropable" draggable>
                                <i className={comp.icon ?? ""} />
                                <span>{comp.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }

        // If no components match the query, don't render the category
        return null;
    });
};

const useQuerySearchParams = () => new URLSearchParams(useLocation().search);

const PageBuilder = (isEdit) => {
    const iframeRef = useRef(null);
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

        const tourButton = document.querySelector(".taketour_btn");
        if (tourButton) {
            tourButton.style.display = "none";
        }
    }, []);

    const objquery = useQuerySearchParams();
    const myParam = objquery.get("grid");
    const myParampageguid = objquery.get("pageguid");
    const myTemplateid = objquery.get("templateid");

    const navigate = useNavigate();

    let iframeurl = "/v2/PageViewer";
    if (Number.isInteger(parseInt(myParam, 10))) {
        iframeurl += `?grid=${myParam}`;
    }
    const [size] = useState("desktop");
    const [selectedTab, setSelectedTab] = useState("Global");
    const [elementData, setElementData] = useState(null);
    // const [seoData, setSeoData] = useState(null);
    const [rowSettingData, setRowSettingData] = useState(null);
    const [minimizeSetting] = useState(false);
    const [minimizeComponent] = useState(false);
    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [iframeData, setiframeData] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [globalData, setGlobalData] = useState({ pageKey: "", pageURL: "", pageGuid: myParampageguid });
    const [showKeyError, setshowKeyError] = useState(false);
    const [showUrlError, setshowUrlError] = useState(false);
    const regex = /^[a-zA-Z0-9-]+$/;
    const [errorTitleMsg, seterrorTitleMsg] = useState("");
    const [errorUrlMsg, seterrorUrlMsg] = useState("");
    const {
        register,
        handleSubmit,
        setValue,
    } = useForm({
        defaultValues: {
            pagetitle: "",
            alias: "",
            metaTitle: "",
            metaDescription: "",
            metaKeywords: "",
            metaRobots: "",
            canonicalLink: "",
        }
    });

    if (myParampageguid) {
        const filters = {
            skip: 0,
            take: 1,
            where: { isReact: { eq: true }, pageGuid: { eq: myParampageguid ?? "" } }
        };

        const { data: dataPage } = useQuery(useQueryGetPages, {
            variables: filters
        });

        useEffect(() => {
            if (dataPage) {
                setGlobalData((prevData) => ({
                    ...prevData,
                    pageKey: dataPage.pages.items[0].pageKey,
                    pageURL: dataPage.pages.items[0].pageURL,
                    pageGuid: dataPage.pages.items[0].pageGuid
                }));
            }
        }, [dataPage]);

        const { data: seoDetails } = useQuery(useQueryGetallSeo, { variables: { where: { pageGuid: { eq: myParampageguid } } } });

        useEffect(() => {
            if (myParampageguid && seoDetails && seoDetails?.allSeo && seoDetails?.allSeo?.items?.length > 0) {
                const seo = seoDetails?.allSeo?.items[0];
                // Populate form fields with fetched SEO details
                setValue("pagetitle", seo?.pageTitle);
                setValue("metaTitle", seo?.pageTitle);
                setValue("metaDescription", seo?.metaDescription);
                setValue("metaKeywords", seo?.metaKeyword);
                setValue("metaRobots", seo?.metaRobots);
                setValue("canonicalLink", seo?.canonicalLink);
            }
        }, [seoDetails, setValue]);
    }

    const [checkPageKeyQuery, { data: checkPageKeyData }] = useLazyQuery(useQueryCheckPageExist);

    const [checkPageUrlQuery, { data: checkPageUrlData }] = useLazyQuery(useQueryCheckPageExist);

    useEffect(() => {
        if (checkPageKeyData && checkPageKeyData?.isPageExist?.totalCount !== null) {
            if (checkPageKeyData?.isPageExist?.totalCount > 0) {
                setshowKeyError(true);
                seterrorTitleMsg("Page title exist.");
            } else {
                setshowKeyError(false);
                seterrorTitleMsg("");
            }
        }
    }, [checkPageKeyData]);

    useEffect(() => {
        if (checkPageUrlData && checkPageUrlData?.isPageExist?.totalCount !== null) {
            if (checkPageUrlData?.isPageExist?.totalCount > 0) {
                setshowUrlError(true);
                seterrorUrlMsg("Page url exist.");
            } else {
                setshowUrlError(false);
                seterrorUrlMsg("");
            }
        }
    }, [checkPageUrlData]);

    const CheckPageKeyFn = (pageKey, pageUrl) => {
        setshowKeyError(true);
        checkPageKeyQuery({
            variables: {
                pageKey,
                pageUrl,
                pageGuid: myParampageguid ?? "",
            },
        });
    };

    const CheckPageUrlFn = (pageKey, pageUrl) => {
        setshowUrlError(true);
        checkPageUrlQuery({
            variables: {
                pageKey,
                pageUrl,
                pageGuid: myParampageguid ?? "",
            },
        });
    };

    const handlePagetitleChange = (e) => {
        setshowKeyError(true);
        const newPageKey = e.target.value;
        setGlobalData((prevData) => ({ ...prevData, pageKey: newPageKey }));
        if (!regex.test(newPageKey)) {
            setshowKeyError(true);
            seterrorTitleMsg("Invalid Page Title.");
        } else {
            setshowKeyError(false);
            seterrorTitleMsg("");
            CheckPageKeyFn(newPageKey?.trim(), "");
        }
        return true;
    };

    const handleAliasChange = (e) => {
        setshowUrlError(true);
        const newPageURL = e.target.value;

        setGlobalData((prevData) => ({ ...prevData, pageURL: newPageURL }));
        if (!regex.test(newPageURL)) {
            setshowUrlError(true);
            seterrorUrlMsg("Invalid Alias.");
        } else {
            setshowUrlError(false);
            seterrorUrlMsg("");
            CheckPageUrlFn("", newPageURL?.trim());
        }
        return true;
    };

    const onDragStartHandler = (event) => {
        const dataStr = event.currentTarget.dataset.comp;
        if (!dataStr) return;

        event.dataTransfer.setData("text/plain", dataStr);
    };

    const clearElementData = useCallback(() => {
        setElementData(null);
    }, [elementData]);

    const clearRowSettingData = useCallback(() => {
        setRowSettingData(null);
    }, [rowSettingData]);

    const selectedsection = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.id;
        // Check if global data is filled before switching to "Elements" tab
        if ((targetId === "seoview" && (!globalData.pageKey || !globalData.pageURL || myParampageguid === "null" || myParampageguid === "" || myParampageguid === null))) {
            PopupV3({
                content: "Please fill out the Global data and save the page.",
                type: "warning",
                title: "Warning",
                classes: "pageConfiqPopup",
                actions: [
                    {
                        text: "Ok",
                        classes: "btn-info",
                        dismiss: true,
                        // do: () => window.location.reload(),
                    },
                ],
            });
            return; // Prevent switching to Elements tab
        }
        if ((targetId === "elementview" && (!globalData.pageKey || !globalData.pageURL))) {
            PopupV3({
                content: "Please fill out the Global data and save the page.",
                type: "warning",
                title: "Warning",
                classes: "pageConfiqPopup",
                actions: [
                    {
                        text: "Ok",
                        classes: "btn-info",
                        dismiss: true,
                        // do: () => window.location.reload(),
                    },
                ],
            });
            return; // Prevent switching to Elements tab
        }
        const lstdiv = document.querySelectorAll("div.section button");
        lstdiv.forEach((_div) => {
            const div1 = _div;
            div1.className = "";
            const _classname = div1.childNodes[0].textContent.replace("/", "-");
            const _class = `.${_classname}`;
            if (document.querySelector(_class)) {
                document.querySelector(_class).style.display = "none";
            }
        });
        e.currentTarget.className = "selectedsection";
        const _selectedclass = e.currentTarget.childNodes[0].textContent.replace("/", "-");
        setSelectedTab(_selectedclass);
        const _classnm = `.${_selectedclass}`;
        if (document.querySelector(_classnm)) {
            document.querySelector(_classnm).style.display = "block";
        }
        setRowSettingData("");
        if (_selectedclass !== "Layout") {
            setRowSettingData(null);
        }
    };

    const leftpanelvisibility = (subelememt) => {
        if (subelememt) {
            document.querySelector("#formStaticeditor").style.display = "none";
            document.querySelector("#contenteditor").style.display = "";
        } else {
            document.querySelector("#formStaticeditor").style.display = "block";
            document.querySelector("#formStaticeditor #globalview").classList.add("selectedsection");
            // Simulate an event object
            const simulatedEvent = {
                preventDefault: () => { },
                currentTarget: document.querySelector("#formStaticeditor #globalview")
            };

            // Call selectedsection with the simulated event
            selectedsection(simulatedEvent);
            document.querySelector("#contenteditor").style.display = "none";
        }
    };

    const navigatePage = (_PageConfigurationGuid) => {
        const path = "/V2/PageConfigurator/create?pageguid=";
        navigate(path + _PageConfigurationGuid, { state: { PageConfigurationGuid: _PageConfigurationGuid } });
        window.location.reload();
    };
    const onMessageHandler = (event) => {
        const { data } = event;
        if (data.type === "element-setting") {
            leftpanelvisibility(true);
            setElementData({ settings: data.settings, elemId: data.elemId, elemType: data.elemType, style: data.style });
            clearRowSettingData();
            document.getElementById("viewcontentstyle").click();
        }

        if (data.type === "row-setting") {
            leftpanelvisibility(false);
            document.getElementById("layoutview").click();
            setRowSettingData({ settings: data.settings, elemId: data.elemId });
            clearElementData();
        }
        if (data.type === "post-pagesaved") {
            navigatePage(data.elemId);
        }
    };

    useEffect(() => {
        window.addEventListener("message", onMessageHandler, false);
        return () => {
            window.removeEventListener("message", onMessageHandler);
        };
    }, []);

    const removeWhitespace = (_node) => {
        const node = _node;
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = node.textContent.replace(/\s+/g, " ").trim();
            if (!node.textContent) {
                node.remove();
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            node.childNodes.forEach(removeWhitespace);
            // Remove extra whitespace between elements
            if (node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE) {
                node.textContent = node.textContent.replace(/\s+/g, " ").trim();
            }
        }
    };
    const modifyHtmlContent = (html) => {
        // Create a temporary DOM element to work with the HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        // Example criteria: Skip elements with a specific class
        const elementsToRemove = tempDiv.querySelectorAll(".skip_iframe"); // Modify this selector as needed
        elementsToRemove.forEach((element) => element.remove());

        // Remove <script> tags that are not of type 'module'
        const scriptTags = tempDiv.querySelectorAll("script");
        scriptTags.forEach((script) => {
            if (script.type !== "module") {
                script.remove();
            }
        });
        // Remove empty <div> elements
        const allDivs = tempDiv.querySelectorAll("div");
        allDivs.forEach((div) => {
            // Check if the div has any child nodes
            if (!div.hasChildNodes()) {
                // If it has no child nodes, remove it
                div.remove();
            } else {
                // Check if all child nodes are only whitespace text nodes
                const hasOnlyWhitespace = Array.from(div.childNodes).every((node) =>
                    node.nodeType === Node.TEXT_NODE && !node.textContent.trim());

                // Remove the div if it has only whitespace text nodes
                if (hasOnlyWhitespace) {
                    div.remove();
                }
            }
        });
        removeWhitespace(tempDiv);

        // Return the modified HTML
        return tempDiv.innerHTML;
    };

    const saveIframData = (iframeDocument) => {
        let returnVal = "";
        if (iframeDocument) {
            // Get the full HTML including the <head> and <body>
            const html = `
                    <!DOCTYPE html>
                    <html>
                         <head>
                         <link rel='stylesheet' id='siteCssId' href=@@replacecss0@@ type='text/css'>
                         <link rel='stylesheet' id='PageCssId' href=@@replacecss1@@ type='text/css'>
                         </head>
                        <body style={{ background-color: "#fff!important" }}>
                            ${iframeDocument.body.innerHTML}
                        </body>
                    </html>
                `;

            // Process the HTML
            const modifiedHtml = modifyHtmlContent(html); // Process the HTML
            setiframeData(modifiedHtml);
            returnVal = modifiedHtml;
        }
        return returnVal;
    };
    if (myParampageguid || myTemplateid) {
        // iframeurl += `?pageguid=${myParampageguid}`;
        const [filters] = useState({
            skip: 0,
            take: 1,
            where: {
                isReact: { eq: true },
                pageGuid: {
                    eq: myParampageguid ?? myTemplateid
                }
            }
        });
        const { data: responsedata } = useQuery(useQueryGetPageConfigurator, { variables: filters });
        useEffect(() => {
            if (responsedata !== undefined && responsedata?.pageConfiguration?.items.length > 0 &&
                responsedata?.pageConfiguration?.items[0]?.configJson !== undefined &&
                responsedata?.pageConfiguration?.items[0]?.configJson !== null) {
                if (responsedata?.pageConfiguration?.items[0]?.pageGuid === myParampageguid || responsedata.pageConfiguration.items[0].pageGuid === myTemplateid) {
                    const _configJson = JSON.parse(responsedata?.pageConfiguration?.items[0]?.configJson)?.children[0];
                    const _cssFilePath = JSON.parse(responsedata?.pageConfiguration?.items[0]?.cssFilePath); // Extract CSS file path

                    if (_configJson !== undefined && _configJson !== "") {
                        const iframe = document.querySelector("iframe[src*='v2/PageViewer']");
                        if (iframe) {
                            const iframeDocument = iframe?.contentDocument;

                            if (iframeDocument) {
                                const leftSidebar = iframeDocument.querySelector(".left-sidebar");
                                if (leftSidebar) {
                                    leftSidebar.remove();
                                }

                                // Remove .header-container
                                const headerContainer = iframeDocument.querySelector(".header-container");
                                if (headerContainer) {
                                    headerContainer.remove();
                                }
                                // const modifiedHtml = saveIframData(iframeDocument, cssFilePath); // Pass CSS file path here
                                setTimeout(() => {
                                    iframe.contentWindow.postMessage(JSON.stringify({
                                        type: "append-template",
                                        configjson: _configJson,
                                        cssFilePath: _cssFilePath,
                                        editpage: true
                                    }), "*");
                                }, 5000);
                                // setiframeData(modifiedHtml);
                            }
                        }
                    }
                }
            }
        }, [responsedata]);
    }
    const [show] = useState(true);

    const [AddSeo] = useMutation(useMutationAddSeo);
    // { defaultValues: PageConfiguratorData }

    const PostConfigData = (iframe, iframeDocument, previewFlag) => {
        const leftSidebar = iframeDocument.querySelector(".left-sidebar");
        if (leftSidebar) {
            leftSidebar.remove();
        }
        // Remove the .header-container element
        const headerContainer = iframeDocument.querySelector(".header-container");
        if (headerContainer) {
            headerContainer.remove();
        }
        const modifiedHtml = saveIframData(iframeDocument);
        setiframeData(modifiedHtml);
        const varData = { configJson: null, cshtml: modifiedHtml, pageGuid: myParampageguid, isUpdated: true };
        iframe.contentWindow.postMessage(
            {
                type: "post-configdata",
                settings: varData,
                isPreview: previewFlag,
                pageKey: globalData?.pageKey
            },
            "*"
        );
    };

    const onSubmit = async (data, e) => {
        e.preventDefault();

        if (selectedTab === "SEO") {
            const seodata = {
                pageGuid: myParampageguid ?? "",
                pageTitle: data?.metaTitle,
                metaDescription: data?.metaDescription,
                metaKeyword: data?.metaKeywords,
                canonicalLink: data?.canonicalLink,
                metaRobots: data?.metaRobots,
            };

            try {
                let statuscode;

                const response = await AddSeo({ variables: { entity: seodata } });
                const message = response?.data?.addUpdateSeo?.statuscode === 200 ? "SEO data saved successfully." : "An error occurred.";
                const type = response?.data?.addUpdateSeo?.statuscode === 200 ? "Success" : "Error";
                PopupV3({
                    content: message,
                    type,
                    title: statuscode,
                    classes: "pageConfiqPopup",
                    actions: [
                        {
                            text: "Ok",
                            classes: "btn-info",
                            dismiss: true,
                            do: () => window.location.reload(),
                        },
                    ],
                });
            } catch (error) {
                console.error("Error during mutation: ", error);
                PopupV3({
                    content: "Failed to save SEO data.",
                    type: "Error",
                    title: "Error",
                    classes: "pageConfiqPopup",
                    actions: [
                        {
                            text: "Ok",
                            classes: "btn-info",
                            dismiss: true,
                            do: () => window.location.reload(),
                        },
                    ],
                });
            }
        } else if (selectedTab === "Global") {
            if (showKeyError === true || showUrlError === true) {
                return;
            }
            const varData = {
                pageKey: globalData?.pageKey,
                pageURL: globalData?.pageURL,
                isReact: true,
                isActive: true,
                isDeleted: false,
            };

            if (myParampageguid !== null && myParampageguid !== "") {
                varData.pageGuid = myParampageguid;
            }
            const iframe = document.getElementById("wrapperIframe");
            if (iframe) {
                const iframeDocument = iframe.contentDocument;
                if (iframeDocument) {
                    const leftSidebar = iframeDocument.querySelector(".left-sidebar");
                    if (leftSidebar) {
                        leftSidebar.remove();
                    }
                    // Remove the .header-container element
                    const headerContainer = iframeDocument.querySelector(".header-container");
                    if (headerContainer) {
                        headerContainer.remove();
                    }
                    const modifiedHtml = saveIframData(iframeDocument);
                    setiframeData(modifiedHtml);
                    varData.cshtml = modifiedHtml;
                }
            }

            iframe.contentWindow.postMessage(
                {
                    type: "post-pagedata",
                    settings: varData
                },
                "*"
            );
        } else if (selectedTab === "Elements") {
            const iframe = document.getElementById("wrapperIframe");
            if (iframe) {
                const iframeDocument = iframe.contentDocument;
                if (iframeDocument) {
                    const leftSidebar = iframeDocument.querySelector(".left-sidebar");
                    if (leftSidebar) {
                        leftSidebar.remove();
                    }
                    // Remove the .header-container element
                    const headerContainer = iframeDocument.querySelector(".header-container");
                    if (headerContainer) {
                        headerContainer.remove();
                    }
                    PostConfigData(iframe, iframeDocument, false);
                }
            }
        }
    };

    const handlePreviewClick = (e) => {
        e.preventDefault();
        const iframe = document.getElementById("wrapperIframe");
        if (iframe) {
            const iframeDocument = iframe.contentDocument;
            if (iframeDocument) {
                const leftSidebar = iframeDocument.querySelector(".left-sidebar");
                if (leftSidebar) {
                    leftSidebar.remove();
                }
                // Remove the .header-container element
                const headerContainer = iframeDocument.querySelector(".header-container");
                if (headerContainer) {
                    headerContainer.remove();
                }
                PostConfigData(iframe, iframeDocument, true);
                // const baseUrl = "https://beta.ewizsaas.com";//window.location.origin;
                // // const modifiedHtml = saveIframData(iframeDocument);
                // const url = baseUrl + "/info/" + globalData?.pageKey;
                // window.open(url, "_blank");
                // // previewWindow.document.write(modifiedHtml);
                // previewWindow.document.close();
            }
        }
    };

    const handleModalClose = () => {
        setPreviewModalOpen(false);
    };
    const handleSearch = (query) => {
        setSearchQuery(query);

        // If query is empty, show all categories
        if (!query) {
            setSearchResult([]);
        } else {
            // Otherwise, update searchResult to reflect filtered categories (no need to filter here)
            setSearchResult(categories);
        }
    };
    return (
        <PageContainer id="page-builder" fluid classes={styls.page_configurator_create}>
            <section className={styls.page_Config_Editor} id="jumbo-header">
                <aside className={styls.editor_section_left}>
                    <div className="ele_header">
                        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.208984 10.786V9.4112H15.7923V10.786H0.208984ZM0.208984 6.30851V4.93351H15.7923V6.30851H0.208984ZM0.208984 1.83083V0.456055H15.7923V1.83083H0.208984Z" fill="#CCD3D6" />
                        </svg>
                        <h3 className="ele_header_title">{isEdit !== true ? "Create Static Page" : "Edit Static Page"}</h3>
                        &nbsp;
                    </div>

                    <form id="formStaticeditor" onSubmit={handleSubmit(onSubmit)}>
                        <div className="section">
                            <button type="button" onClick={(e) => selectedsection(e)} id="layoutview">Layout</button>
                            <button type="button" onClick={(e) => selectedsection(e)} className="selectedsection" id="globalview">Global</button>
                            <button type="button" onClick={(e) => selectedsection(e)} id="elementview">Elements</button>
                            <button type="button" onClick={(e) => selectedsection(e)} id="seoview">SEO</button>
                        </div>
                        <section className={styls.ele_main_content}>
                            <div className="Layout" style={{ display: "none" }}>
                                {rowSettingData != null && <RowSetting selectedScreen={size} rowSettingData={rowSettingData} clearRowSettingData={clearRowSettingData} />}
                            </div>
                            <div className="Global">
                                <div className="form-group">
                                    <label htmlFor="pagetitle" className="label">
                                        Page Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Page Title"
                                        className="form-control ele_form_control"
                                        id="pagetitle"
                                        name="pagetitle"
                                        maxLength={30}
                                        value={globalData?.pageKey}
                                        onChange={handlePagetitleChange}
                                    />
                                    {showKeyError && (<small className="text-danger" role="alert"> {errorTitleMsg} </small>)}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="alias" className="label">
                                        Alias
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Alias"
                                        className="form-control ele_form_control"
                                        id="alias"
                                        name="alias"
                                        maxLength={30}
                                        defaultValue={globalData?.pageURL}
                                        onChange={handleAliasChange}
                                    />
                                    {showUrlError && (<small className="text-danger" role="alert">  {errorUrlMsg} </small>)}
                                </div>
                            </div>
                            <div className="Elements" style={{ display: "none" }}>
                                <aside id="left" className={`${minimizeComponent ? "showIcons" : ""}`}>
                                    <SearchComponent placeholder="Search items..." onSearch={handleSearch} />
                                    <Categories onDragStartHandler={onDragStartHandler} searchResult={searchResult} searchQuery={searchQuery} />
                                </aside>
                            </div>
                            <div className="SEO" style={{ display: "none" }}>
                                <div className="form-group">
                                    <label htmlFor="metaTitle" className="label">Meta Title  <i className="icon-info" /></label>
                                    <input type="text" id="metaTitle" className="form-control ele_form_control" name="metaTitle" {...register("metaTitle", { maxLength: 70 })} />
                                    <span className="form-noteText">30 of 70 characters used</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="metaDescription" className="label">Meta Description <i className="icon-info" /></label>
                                    <textarea type="text" id="metaDescription" className="form-control ele_form_control" name="metaDescription" {...register("metaDescription", { maxLength: 150 })} />
                                    <span className="form-noteText">140 of 150 characters used</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="metaKeyword" className="label">Meta Keywords  <i className="icon-info" /></label>
                                    <textarea type="text" id="metaKeyword" className="form-control ele_form_control" name="metaKeyword" {...register("metaKeywords", { maxLength: 150 })} />
                                    <span className="form-noteText">125 of 150 characters used</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="metaRobots" className="label">Meta Robots  <i className="icon-info" /></label>
                                    <input type="text" id="metaRobots" className="form-control ele_form_control" name="metaRobots" {...register("metaRobots", { maxLength: 70 })} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="canonicalLink" className="label">Canonical Link  <i className="icon-info" /></label>
                                    <input type="text" id="canonicalLink" className="form-control ele_form_control" name="canonicalLink" {...register("canonicalLink", { maxLength: 150 })} />
                                </div>
                            </div>
                        </section>
                        <section className="ele_footer">
                            <button type="button" className="btn btn_Preivew" onClick={(e) => handlePreviewClick(e)}>
                                <i className="icon icon-eye" /><span>Preview</span>
                            </button>
                            <button type="submit" className="btn btn_create">
                                Save
                            </button>
                        </section>
                    </form>
                    <div id="contenteditor" className="contenteditor" style={{ display: "none" }}>
                        <div className="heading section">
                            <button type="button" onClick={(e) => selectedsection(e)} id="viewcontentstyle">Basic</button>
                            {/* <div className="min-max-icon ico-grid-2-plus" onClick={() => setMinimizeSetting(true)} /> */}
                        </div>
                        <aside id="right" className={`${minimizeSetting ? "editorSection-box minimized" : "editorSection-box"}`}>
                            <div className="Content-Style">
                                {elementData != null && <ConfigSetting elementData={elementData} clearElementData={clearElementData} panel={leftpanelvisibility} />}
                            </div>
                            {/* <div className="Layout">{rowSettingData != null && <RowSetting selectedScreen={size} rowSettingData={rowSettingData} clearRowSettingData={clearRowSettingData} />}</div> */}
                        </aside>
                    </div>
                </aside>
                {/* <div className="Drag_img d-flex align-items-center justify-content-center p-5 clsSalesCreate_ImgAlt"> */}
                <div className={`${styls.editor_section_right} Drag_img`}>
                    <div className="right-imgAdd d-flex" style={{ width: "100%" }}>
                        <div className="nlpSearchWrapper searchByUploadImage drag-area" style={{ width: "100%", border: "none" }}>
                            <section id="viewer" style={{ height: "100%" }}>
                                <div id="iframe-wrapper" className={size}>
                                    <iframe ref={iframeRef} id="wrapperIframe" title="aa" src={iframeurl} />
                                </div>
                            </section>
                        </div>
                        {show !== true && (
                            <span className="icon-trash-add d-flex align-items-center justify-content-center">
                                {/* onClick={handleRemoveImage} */}
                                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 2.31055H9.5V1.81055C9.5 1.41272 9.34196 1.03119 9.06066 0.749887C8.77936 0.468582 8.39782 0.310547 8 0.310547H5C4.60218 0.310547 4.22064 0.468582 3.93934 0.749887C3.65804 1.03119 3.5 1.41272 3.5 1.81055V2.31055H1C0.867392 2.31055 0.740215 2.36323 0.646447 2.45699C0.552679 2.55076 0.5 2.67794 0.5 2.81055C0.5 2.94316 0.552679 3.07033 0.646447 3.1641C0.740215 3.25787 0.867392 3.31055 1 3.31055H1.5V12.3105C1.5 12.5758 1.60536 12.8301 1.79289 13.0177C1.98043 13.2052 2.23478 13.3105 2.5 13.3105H10.5C10.7652 13.3105 11.0196 13.2052 11.2071 13.0177C11.3946 12.8301 11.5 12.5758 11.5 12.3105V3.31055H12C12.1326 3.31055 12.2598 3.25787 12.3536 3.1641C12.4473 3.07033 12.5 2.94316 12.5 2.81055C12.5 2.67794 12.4473 2.55076 12.3536 2.45699C12.2598 2.36323 12.1326 2.31055 12 2.31055ZM4.5 1.81055C4.5 1.67794 4.55268 1.55076 4.64645 1.45699C4.74021 1.36323 4.86739 1.31055 5 1.31055H8C8.13261 1.31055 8.25979 1.36323 8.35355 1.45699C8.44732 1.55076 8.5 1.67794 8.5 1.81055V2.31055H4.5V1.81055ZM10.5 12.3105H2.5V3.31055H10.5V12.3105ZM5.5 5.81055V9.81055C5.5 9.94316 5.44732 10.0703 5.35355 10.1641C5.25979 10.2579 5.13261 10.3105 5 10.3105C4.86739 10.3105 4.74021 10.2579 4.64645 10.1641C4.55268 10.0703 4.5 9.94316 4.5 9.81055V5.81055C4.5 5.67794 4.55268 5.55076 4.64645 5.45699C4.74021 5.36323 4.86739 5.31055 5 5.31055C5.13261 5.31055 5.25979 5.36323 5.35355 5.45699C5.44732 5.55076 5.5 5.67794 5.5 5.81055ZM8.5 5.81055V9.81055C8.5 9.94316 8.44732 10.0703 8.35355 10.1641C8.25979 10.2579 8.13261 10.3105 8 10.3105C7.86739 10.3105 7.74021 10.2579 7.64645 10.1641C7.55268 10.0703 7.5 9.94316 7.5 9.81055V5.81055C7.5 5.67794 7.55268 5.55076 7.64645 5.45699C7.74021 5.36323 7.86739 5.31055 8 5.31055C8.13261 5.31055 8.25979 5.36323 8.35355 5.45699C8.44732 5.55076 8.5 5.67794 8.5 5.81055Z"
                                        fill="#2E3B41"
                                    />
                                </svg>
                            </span>
                        )}
                    </div>
                </div>
            </section>
            {previewModalOpen && (
                <Modal size="lg" show={previewModalOpen} onHide={handleModalClose} animation={true} dialogClassName="modal-90w">
                    {/* <Modal.Header closeButton>
                            <Modal.Title>Preview</Modal.Title>
                        </Modal.Header> */}
                    <Modal.Body>
                        <div dangerouslySetInnerHTML={{ __html: iframeData }} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </PageContainer>
    );
};
export default PageBuilder;
