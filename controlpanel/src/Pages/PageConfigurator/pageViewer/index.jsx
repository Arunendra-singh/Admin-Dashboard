/* eslint-disable quote-props */
import { useMutation } from "@apollo/client";
import { useState, useEffect, createElement, Fragment, useCallback } from "react";
import { TOKENS, MS_URL, CDN_URL, WEBSITE_GUID } from "common/utils/vars";
import html2canvas from "html2canvas";
import { UpdateObjectByKeyValue } from "common/utils";
import { useLocation } from "react-router-dom";
import { useMutationAddUpdatePageConfigurator } from "common/components/graphQL/mutations/PageConfigurator/useMutationAddUpdatePageConfigurator";
import { useMutationAddUpdatePage } from "common/components/graphQL/mutations/PageConfigurator/useMutationAddUpdatePage";
import DraggableRowContainer from "~/components/Configurator/builder/DraggableRowContainer";
import DraggableParent from "~/components/Configurator/builder/DraggableParent";
import ComponentSelector from "~/components/Configurator/builder/ComponentSelector";
import Heading from "~/components/basic/Heading";
import Link from "~/components/basic/Link";
import Button from "~/components/basic/Button";
import Image from "~/components/basic/Image";
import ButtonWithIcon from "~/components/basic/ButtonWithIcon";
import ConfigWrapper from "~/components/Configurator/builder/ConfigWrapper";
import AddRowToPage from "~/components/Configurator/builder/AddRowToPage";
import Hello from "~/components/elements/Hello";
import Dummy from "~/components/elements/Dummy";
import { configuration } from "~/helpers/json/config.json";
import BuilderBreadCrumb from "~/components/elements/BuilderBreadCrumb";
import rowDivider from "~/helpers/json/rowDividerData";
import uploadImage from "~/helpers/uploadImage";
import { PopupV3 } from "../../../helpers/PopupV3";
import "../styles/pages/index.scss";

const Components = {
    Hello,
    Dummy,
    BuilderBreadCrumb,
    DraggableRowContainer,
    DraggableParent,
    ComponentSelector,
    Heading,
    Image,
    Link,
    Button,
    ButtonWithIcon
};

const ConfigElem = ({ type, element, props = {}, children = [], content = "", elemId = "", elementConfig = [] }) => {
    useEffect(() => {
        // Function to remove a specific CSS file by its href
        const removeCSSFile = (href) => {
            const linkElement = document.querySelector(`link[href="${href}"]`);
            if (linkElement) {
                linkElement.parentNode.removeChild(linkElement);
                // console.log(`CSS file ${href} removed from head`);
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
    if (type === "html") {
        const _elemConfig = elementConfig;
        if (elementConfig.length > 0) {
            _elemConfig.forEach((elem) => {
                // eslint-disable-next-line no-param-reassign
                elem.propsValue = props[`${elem.propsName}`];
            });
        }

        return (
            <ConfigWrapper type={type} elemId={elemId} elementConfig={_elemConfig}>
                {
                    createElement(
                        element,
                        { id: elemId },
                        // [props.content, children.map((c, i) => <ConfigElem key={i} {...c} />)]
                        [props.content, children.map((c) => <ConfigElem key={c.id} {...c} />)]
                        // [props.content, children.map((c) => <ConfigElem key={c.id} {...c} dangerouslySetInnerHTML={{ __html: props.content }} />)]
                    )
                }
                <style>{props.style}</style>
            </ConfigWrapper>
        );
    }
    if (type === "jsx") {
        const _elemConfig = elementConfig;
        if (elementConfig.length > 0) {
            _elemConfig.forEach((elem) => {
                // eslint-disable-next-line no-param-reassign
                elem.propsValue = props[`${elem.propsName}`];
            });
        }

        if (element === "ComponentSelector" || element === "DraggableRowContainer" || element === "DraggableParent") {
            return createElement(
                Components[element],
                (element !== "DraggableParent") ? { ...props, elemId } : props,
                // children.map((c, i) => <ConfigElem key={i} {...c} />
                children.map((c) => <ConfigElem key={c.id} {...c} />)
            );
        }

        return (
            <ConfigWrapper type={type} elemId={elemId} elementConfig={_elemConfig}>
                {createElement(
                    Components[element],
                    { ...props, elemId },
                    // children.map((c, i) => <ConfigElem key={i} {...c} />)
                    children.map((c) => <ConfigElem key={c.id} {...c} />)
                )}
            </ConfigWrapper>
        );
    }
    if (type === "text") {
        return (
            <ConfigWrapper type={type} elemId={elemId}>
                {content}
            </ConfigWrapper>
        );
    }
    if (type === "textEditor") {
        const _elemConfig = elementConfig;
        if (elementConfig.length > 0) {
            _elemConfig.forEach((elem) => {
                // eslint-disable-next-line no-param-reassign
                elem.propsValue = props[`${elem.propsName}`];
            });
        }

        return (
            <ConfigWrapper type={type} elemId={elemId} elementConfig={_elemConfig}>
                {
                    createElement(
                        element,
                        { id: elemId, dangerouslySetInnerHTML: { __html: props.content } },
                    )
                }
            </ConfigWrapper>
        );
    }
    if (type === "root") {
        return createElement(
            Fragment,
            props,
            // children.map((c, i) => <ConfigElem key={i} {...c} />)
            children.map((c) => <ConfigElem key={c.id} {...c} />)
        );
    }
    return (
        <ConfigWrapper type={type} elemId={elemId}>
            {createElement(Fragment)}
        </ConfigWrapper>
    );
};

const useQueryloc = () => new URLSearchParams(useLocation().search);
const PageViewer = () => {
    const [loading, setLoading] = useState(false); // Loader state
    const isIframe = window.self !== window.top;
    if (!isIframe) {
        document.body.classList.add("preview-mode");
        // window.location.href = window.location.origin;
    }

    const generateId = () => `elem-${new Date().getTime()}-${Math.random().toString(36).slice(2)}`;

    const objquery = useQueryloc();
    const myParam = objquery.get("grid");

    if (Number.isInteger(parseInt(myParam, 10)) && configuration.children[0].children.length > 0 && configuration.children[0].children[0].elemId === "dr_1") {
        let gridval = parseInt(myParam, 10);
        if (gridval > 8 || gridval < 1) {
            gridval = 1;
        }
        const _val = rowDivider[gridval - 1]?.colSpan;
        const colSpan = _val;
        const _children = [];
        for (let i = 0; i < colSpan.length; i++) {
            const _elemId = generateId();
            const obj = {
                type: "jsx",
                element: "ComponentSelector",
                elemId: _elemId,
                props: {
                    cols: colSpan[i]
                }
            };
            _children.push(obj);
        }

        const _elemId = generateId();
        const newConfig = {
            type: "jsx",
            element: "DraggableRowContainer",
            props: {
                cols: colSpan.length,
                gridColumn: {
                    desktop: colSpan.join("fr ").concat("fr"),
                    tablet: colSpan.join("fr ").concat("fr"),
                    mobile: colSpan.join("fr ").concat("fr")
                }
            },
            children: _children,
            elemId: _elemId
        };
        configuration.children[0].children[0] = newConfig;
    }

    const [config, setConfig] = useState(configuration);

    const updateConfig = (data) => {
        const _config = { ...config };
        UpdateObjectByKeyValue(_config, "elemId", data?.elemId, data?.component); // update object with key "c" and value 123 with new object { c: 456, x: "new value" }
        setConfig(_config);
    };

    const addNewRowToConfig = useCallback((newConfigData) => {
        const _config = { ...config };
        _config.children[0].children.push(newConfigData); // will push the new config in DraggableParent children object
        setConfig(_config);
    }, [config]);

    const deleteRowFromConfig = useCallback((elemId) => {
        const _config = { ...config };
        const index = _config.children[0].children.findIndex((datat) => datat.elemId === elemId);
        _config.children[0].children.splice(index, 1);
        setConfig(_config);
    }, [config]);

    // javascript Copy code
    function deepClone(obj) {
        if (obj === null || typeof obj !== "object") {
            return obj;
        }
        if (obj instanceof Date) {
            return new Date(obj);
        }
        if (Array.isArray(obj)) {
            return obj.map((item) => deepClone(item));
        }
        const clonedObj = {};

        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }

        return clonedObj;
    }

    const cloneRowFromConfig = useCallback((elemId) => {
        const _config = { ...config };
        const index = _config.children[0].children.findIndex((datat) => datat?.elemId === elemId) + 1;
        const data = _config.children[0].children.find((datat) => datat?.elemId === elemId);
        const _data = deepClone(data);
        _data.elemId = generateId();

        _data.children.forEach((child, index1) => {
            _data.children[index1] = { ...child, elemId: generateId() };
        });

        _config.children[0].children.splice(index, 0, _data);
        setConfig(_config);
    }, [config]);

    const copyRowFromConfig = useCallback((elemId) => {
        const _config = { ...config };
        const index = _config.children[0].children.findIndex((datat) => datat?.elemId === elemId) + 1;
        const data = _config.children[0].children.find((datat) => datat?.elemId === elemId);
        const _data = deepClone(data);

        let _col = 0;
        // _data.children.map((_children) => _col++);
        _data.children.forEach(() => _col++);
        // creating row with column
        const _val = rowDivider[_col - 1]?.colSpan;
        const colSpan = _val;
        const _children = [];
        for (let i = 0; i < colSpan.length; i++) {
            const _elemId = generateId();
            const obj = {
                type: "jsx",
                element: "ComponentSelector",
                elemId: _elemId,
                props: {
                    cols: colSpan[i]
                }
            };
            _children.push(obj);
        }

        const _elemId = generateId();
        const newConfig = {
            type: "jsx",
            element: "DraggableRowContainer",
            props: {
                cols: colSpan.length,
                gridColumn: {
                    desktop: colSpan.join("fr ").concat("fr"),
                    tablet: colSpan.join("fr ").concat("fr"),
                    mobile: colSpan.join("fr ").concat("fr")
                }
            },
            children: _children,
            elemId: _elemId
        };

        _config.children[0].children.splice(index, 0, newConfig);
        setConfig(_config);
    }, [config]);

    const removeRowColumn = useCallback((elemId) => {
        const _config = { ...config };
        _config.children[0].children.forEach((child) => {
            const index = child.children.findIndex((_child1) => _child1.elemId === elemId);
            if (index !== -1) {
                if (child.children.length > 1) {
                    child.children.splice(index, 1);
                    const colsCount = child.props.cols - 1;
                    // child.props.cols = colsCount;

                    const childProps = child.props;
                    childProps.cols = colsCount;

                    const _val = rowDivider[colsCount - 1]?.colSpan;
                    const colSpan = _val;

                    const gridColumn = {
                        desktop: colSpan.join("fr ").concat("fr"),
                        tablet: colSpan.join("fr ").concat("fr"),
                        mobile: colSpan.join("fr ").concat("fr")
                    };
                    const constChild = child.props;
                    constChild.gridColumn = gridColumn;
                }
                // else {
                //     alert("Row should have at least one column.");
                // }
            }
        });
        setConfig(_config);
    }, [config]);

    const arrangRowPosition = useCallback((elemId) => {
        console.log(elemId);
        const _config = { ...config };
        const newArray = [];
        document.querySelectorAll("#builder-canvas .pb-container .pb-row").forEach((row) => {
            newArray.push(_config?.children[0]?.children.find((datat) => datat?.elemId === row?.id));
        });

        _config.children[0].children = newArray;
        setConfig(_config);
    }, [config]);

    async function uploadCSS(cssString, pageName) {
        // API details
        const apiUrl = `${MS_URL.CATALOG}api/upload/UpdateTempCss`; // 'https://catalogbeta.ewizsaas.com/api/upload/UpdateTempCss';
        const token = TOKENS.SaaS_ControlPanel_Microservice_Token;
        const apiHeaders = {
            authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
            "WebsiteGuid": WEBSITE_GUID,
        };
        const apiBody = {
            actionType: "add",
            CSS: cssString,
            CssName: pageName
        };

        let cssfilepath;
        // Send CSS to the API
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: apiHeaders,
                body: JSON.stringify(apiBody)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            if (result?.data?.url) {
                cssfilepath = result?.data?.url;
            }
        } catch (error) {
            console.error("Error uploading CSS:", error);
        }
        return cssfilepath;
    }

    async function createAndApplyCSS(elemId, data) {
        // Create a new <style> element
        let ruleFound = false;
        let style = document.createElement("style");
        style.type = "text/css";
        // const id = document.getElementById(elemId).closest('.pb-row').id;
        const id = elemId;
        // Define CSS rules
        let css = "";
        let cssimg = "";
        let parentCss = "";

        const imageSize = data?.props["image size"];
        const width = data.props.width === undefined || null ? "200" : data.props.width;
        const height = data.props.height === undefined || null ? "200" : data.props.height;
        const bradius = data.props["border radius"];

        // Construct parent CSS
        if (data?.props?.alignment && imageSize !== undefined) {
            parentCss = `
                #${id} {
                    ${data?.props?.alignment !== "undefined" && data?.props?.alignment !== undefined ? `text-align :${data?.props?.alignment};` : ""}
                }
            `;
        }
        // Construct image CSS
        if (imageSize !== undefined) {
            cssimg = `
            #${id} img{   
                ${height !== "undefined" && height !== undefined ? `height:${height}${data?.props?.size};` : ""}             
                ${width !== "undefined" && width !== undefined ? `width:${width}${data?.props?.size};` : ""}
                ${data?.props?.BorderWidth !== "undefined" && data?.props?.BorderWidth !== undefined ? `border-width:${data?.props?.BorderWidth}px;` : ""}
                ${data?.props["border type"] !== "undefined" && data?.props["border type"] !== undefined ? `border-style:${data?.props["border type"]};` : ""}
                ${data?.props?.bordercolor !== "undefined" && data?.props?.bordercolor !== undefined ? `border-color:${data?.props?.bordercolor}` : ""};
                border-radius:${data?.props?.top}${bradius} ${data?.props?.right}${bradius} ${data?.props?.bottom}${bradius} ${data?.props?.left}${bradius};
                box-shadow:${data?.props?.x}px ${data?.props?.y}px ${data?.props?.blur}px ${data?.props?.spread}px ${data?.props?.color};
            }
        `;
        }
        // Construct additional styles if needed
        if (data?.props && imageSize === undefined) {
            css = `
            #${id}{
                ${data?.props?.alignment !== "undefined" && data?.props?.alignment !== undefined ? `text-align :${data?.props?.alignment};` : ""}                
                ${data?.props["text color"] !== "undefined" && data?.props["text color"] !== undefined ? `color :${data?.props["text color"]};` : ""}
                ${data?.props["background color"] !== "undefined" && data?.props["background color"] !== undefined ? `background-color :${data?.props["background color"]};` : ""}
                ${data?.props?.fontFamily !== "undefined" && data?.props?.fontFamily !== undefined ? `font-family :${data?.props?.fontFamily};` : ""}
                ${data?.props?.fontSize !== "undefined" && data?.props?.fontSize !== undefined ? `font-size :${data?.props?.fontSize}px;` : ""}
                ${data?.props?.fontWeight !== "undefined" && data?.props?.fontWeight !== undefined ? `font-weight :${data?.props?.fontWeight};` : ""}
                ${data?.props?.textTransform !== "undefined" && data?.props?.textTransform !== undefined ? ` text-transform :${data?.props?.textTransform};` : ""}
            }
        `;
        }

        // Create or access a <style> element
        style = document.getElementById("pageTemplateCss");
        if (!style) {
            style = document.createElement("style");
            style.id = "pageTemplateCss";
            document.head.appendChild(style);
        }
        const styleSheet = style.sheet;

        // Insert CSS rules
        if (parentCss || css) {
            try {
                if (styleSheet.cssRules) {
                    for (let i = 0; i < styleSheet.cssRules.length; i++) {
                        if (styleSheet.cssRules[i].selectorText === `#${id}`) {
                            styleSheet.deleteRule(i); // Remove the old rule
                            if (parentCss) styleSheet.insertRule(parentCss, i); // Add the new parent rule
                            if (css) styleSheet.insertRule(css, i); // Add the new CSS rule
                            ruleFound = true;
                            break;
                        }
                    }
                }
            } catch (error) {
                console.error("Error inserting CSS rules:", error);
            }
        }

        // Insert image rules
        if (cssimg) {
            try {
                for (let i = 0; i < styleSheet.cssRules.length; i++) {
                    if (styleSheet.cssRules[i].selectorText === `#${id} img`) {
                        styleSheet.deleteRule(i); // Remove the old rule
                        styleSheet.insertRule(cssimg, i); // Add the new image rule
                        ruleFound = true;
                        break;
                    }
                }
            } catch (error) {
                console.error("Error inserting image CSS rules:", error);
            }
        }

        // If no rule was found, insert the new rules at the end
        if (!ruleFound) {
            if (parentCss) styleSheet.insertRule(parentCss, styleSheet.cssRules.length);
            if (css) styleSheet.insertRule(css, styleSheet.cssRules.length);
            if (cssimg) styleSheet.insertRule(cssimg, styleSheet.cssRules.length);
        }
    }

    const [AddUpdatePageConfigurator] = useMutation(useMutationAddUpdatePageConfigurator);
    const [addUpdatePage] = useMutation(useMutationAddUpdatePage);

    const createPageCSS = () => {
        let CSSData = "";
        const style = document.getElementById("pageTemplateCss");
        if (style !== undefined && style !== null) {
            const styleSheet = style.sheet;
            if (styleSheet !== undefined && styleSheet !== null) {
                for (let i = 0; i < styleSheet.cssRules.length; i++) {
                    CSSData += `${style.sheet.cssRules[i].selectorText} {${style.sheet.cssRules[i].style.cssText}}`;
                }
            }
        }
        CSSData = CSSData.replaceAll("\n", "");
        return CSSData;
    };

    const navigatePage = (_PageConfigurationGuid) => {
        window.top.postMessage(
            {
                type: "post-pagesaved",
                elemId: _PageConfigurationGuid
            },
            "*"
        );
    };

    // Function to replace multiple CSS placeholders in the cshtml string
    function replaceCSSPlaceholders(cshtml, cssPaths) {
        let updatedCshtml = cshtml; // Create a new variable to hold the updated string
        cssPaths.forEach((filePath, index) => {
            updatedCshtml = updatedCshtml.replace(`@@replacecss${index}@@`, filePath);
        });
        return updatedCshtml; // Return the updated string
    }

    const postConfigData = async (data, isPreview, pageKey) => {
        const cssfile = createPageCSS();
        const cssFilePath = await uploadCSS(cssfile, pageKey);
        const styleCssPath = `${CDN_URL}/controlpanel/build/assets/style.css?V=${new Date().getTime()}`;
        const cssLinktag = `<link rel="stylesheet preload" id="siteCssId" href="${styleCssPath}?V=${new Date().getTime()}" as="style" onload="this.onload=null; this.rel='stylesheet'" onerror="this.onerror=null; this.rel='stylesheet'" /><link rel="stylesheet preload" id="PageCssId" href="${cssFilePath}" as="style" onload="this.onload=null; this.rel='stylesheet'" onerror="this.onerror=null; this.rel='stylesheet'" />`;
        const linkElement = document.createElement("link");
        linkElement.rel = "stylesheet";
        linkElement.href = `${cssFilePath}?V=${new Date().getTime()}`;
        const staticPagecss = `${cssFilePath}?V=${new Date().getTime()}`;

        // Append the <link> element to the document's <head> tag
        const head = document.head || document.getElementsByTagName("head")[0];
        head.appendChild(linkElement);

        const screenshotdiv = document.getElementById("builder-canvas");

        if (screenshotdiv) {
            const elementsToHide = screenshotdiv.querySelectorAll(".skip_iframe");
            elementsToHide.forEach((el) => { const ele = el; ele.style.display = "none"; });

            const bordertohide = screenshotdiv.querySelectorAll("#builder-canvas .pb-container");
            bordertohide.forEach((el) => { const ele = el; ele.style.border = "none"; });
            // bordertohide.forEach((el) => { const ele = el; ele.classList.add("noborder"); });

            html2canvas(screenshotdiv, { useCORS: true }).then(async (canvas) => {
                const imgData = canvas.toDataURL("image/jpeg");

                // const link = document.createElement("a");
                // link.href = imgData;
                // link.download = "screenshot.jpeg";
                // link.click();

                elementsToHide.forEach((el) => { const ele = el; ele.style.display = ""; });
                bordertohide.forEach((el) => { const ele = el; ele.style.border = ""; });
                // bordertohide.forEach(el => el.classList.remove("noborder"));

                const imageurl = await uploadImage(imgData);
                // Array of CSS file paths
                const cssFilePaths = [
                    styleCssPath,
                    staticPagecss,
                ];
                // let updatedCshtml;
                // Function to replace multiple CSS placeholders in the cshtml string
                // function replaceCSSPlaceholders(cshtml, cssPaths) {
                //     updatedCshtml = cshtml; // Create a new variable to hold the updated string
                //     cssPaths.forEach((filePath, index) => {
                //         updatedCshtml = updatedCshtml.replace(`@@replacecss${index}@@`, filePath);
                //     });
                //     return updatedCshtml; // Return the updated string
                // }
                // console.log(updatedCshtml, 'updatedCshtml');
                const updatedData = {
                    ...data,
                    cshtml: replaceCSSPlaceholders(data.cshtml, cssFilePaths),
                    cssFilePath: cssFilePaths ? JSON.stringify(cssLinktag) : null,
                    configJson: JSON.stringify(config),
                    pageThumbnail: imageurl
                };

                AddUpdatePageConfigurator({
                    variables: {
                        entity: updatedData,
                    },
                }).then((res) => {
                    const isSuccess = res.data.addUpdatePageConfigurator.statuscode === 200;
                    const popupMessage = res.data.addUpdatePageConfigurator.message || "Page Configuration updated successfully.";
                    const addedGuid = res.data?.addUpdatePageConfigurator?.data?.pageGuid;
                    if (!isPreview && isSuccess) {
                        PopupV3({
                            content: popupMessage,
                            type: isSuccess ? "Success" : "Error",
                            title: isSuccess ? "Success" : "Error",
                            classes: "pageConfiqPopup",
                            actions: [
                                {
                                    text: "Ok",
                                    classes: "btn-info",
                                    dismiss: true,
                                    do: () => navigatePage(addedGuid),
                                },
                            ],
                        });
                    } else if (pageKey === "" || !isSuccess) {
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
                                },
                            ],
                        });
                    } else {
                        const baseUrl = window.location.origin;
                        const url = `${baseUrl}/info/${pageKey}`;
                        window.open(url, "_blank");
                    }
                });
            });
        }
    };

    const updateFunction = (updatedData) => {
        addUpdatePage({
            variables: {
                entity: updatedData,
            },
        }).then((res) => {
            if (res?.data?.addUpdatePage?.statuscode === 200) {
                const addedGuid = res.data?.addUpdatePage?.data?.pageGuid;
                PopupV3({
                    content: res?.data?.addUpdatePage?.message || "Page Configuration updated successfully.",
                    type: "Success",
                    title: "Success",
                    classes: "pageConfiqPopup",
                    actions: [
                        {
                            text: "Ok",
                            classes: "btn-info",
                            dismiss: true,
                            do: () => navigatePage(addedGuid),
                        },
                    ],
                });
            } else {
                PopupV3({
                    content: res?.data?.addUpdatePage?.message,
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
        });
    };

    const postPageData = async (varData) => {
        const cssfile = createPageCSS();
        const cssFilePath = await uploadCSS(cssfile, varData?.pageKey);
        const styleCssPath = `${CDN_URL}/controlpanel/build/assets/style.css?V=${new Date().getTime()}`;
        const cssLinktag = `<link rel="stylesheet preload" id="siteCssId" href="${styleCssPath}?V=${new Date().getTime()}}" as="style" onload="this.onload=null; this.rel='stylesheet'" onerror="this.onerror=null; this.rel='stylesheet'" /><link rel="stylesheet preload" id="PageCssId" href="${cssFilePath}" as="style" onload="this.onload=null; this.rel='stylesheet'" onerror="this.onerror=null; this.rel='stylesheet'" />`;
        const linkElement = document.createElement("link");
        linkElement.rel = "stylesheet";
        linkElement.href = cssFilePath;
        const staticPagecss = `${cssFilePath}?V=${new Date().getTime()}`;

        // Append the <link> element to the document's <head> tag
        const head = document.head || document.getElementsByTagName("head")[0];
        head.appendChild(linkElement);

        const screenshotdiv = document.getElementById("builder-canvas");
        let imageurl = "";
        const cssFilePaths = [
            styleCssPath,
            staticPagecss,
        ];
        if (screenshotdiv) {
            const elementsToHide = screenshotdiv.querySelectorAll(".skip_iframe");
            elementsToHide.forEach((el) => { const ele = el; ele.style.display = "none"; });

            const bordertohide = screenshotdiv.querySelectorAll("#builder-canvas .pb-container");
            bordertohide.forEach((el) => { const ele = el; ele.style.border = "none"; });

            html2canvas(screenshotdiv, { useCORS: true }).then(async (canvas) => {
                const imgData = canvas.toDataURL("image/jpeg");
                elementsToHide.forEach((el) => { const ele = el; ele.style.display = ""; });
                bordertohide.forEach((el) => { const ele = el; ele.style.border = ""; });

                imageurl = await uploadImage(imgData);

                const updatedData = {
                    ...varData,
                    cshtml: replaceCSSPlaceholders(varData.cshtml, cssFilePaths),
                    cssFilePath: cssFilePath ? JSON.stringify(cssLinktag) : null,
                    configJson: JSON.stringify(config),
                    pageThumbnail: imageurl
                };
                updateFunction(updatedData);
            });
        } else {
            const updatedData = {
                ...varData,
                cshtml: replaceCSSPlaceholders(varData.cshtml, cssFilePaths),
                cssFilePath: cssFilePath ? JSON.stringify(cssLinktag) : null,
                configJson: JSON.stringify(config)
            };
            updateFunction(updatedData);
        }
    };

    const onMessageHandler = async (event) => {
        console.log("onMessageHandler called...");
        if (event.data.type === "post-configdata") {
            postConfigData(event.data.settings, event.data.isPreview, event.data.pageKey);
            return;
        }
        if (event.data.type === "post-pagedata") {
            postPageData(event.data.settings);
            return;
        }

        const data = JSON.parse(event.data);

        // Function to fetch the CSS from a given link
        async function fetchCSSFromLink(cssLink) {
            try {
                const response = await fetch(cssLink);
                if (!response.ok) {
                    throw new Error(`Error fetching CSS from ${cssLink}: ${response.status}`);
                }
                const cssText = await response.text();
                // console.log("Fetched CSS: ", cssText); // Check if the content is correct
                return cssText; // Return the CSS text
            } catch (error) {
                console.error(error);
                return null;
            }
        }

        function cssToObject(cssString) {
            // Remove spaces and newlines for easier processing
            const cleanedCSS = cssString.replace(/\s+/g, " ");
            // Split the CSS string into individual blocks
            const blocks = cleanedCSS.split("}").filter((block) => block.trim() !== "");
            const result = {};

            blocks.forEach((block) => {
                const [selector, styles] = block.split("{");
                const elemId = selector.trim().replace("#", "").split(" ")[0]; // Remove '#' from the ID
                const isImage = selector.includes("img");
                // Parse the styles into an object
                const stylesObj = styles.trim().split(";").reduce((acc, style) => {
                    const [property, value] = style.split(":").map((item) => item.trim());
                    if (property && value) {
                        acc[property] = value;
                    }
                    return acc;
                }, {});

                const boxShadow = stylesObj["box-shadow"] || "rgb(0, 0, 0) 0px 0px 0px 0px"; // Default value
                const boxShadowParts = boxShadow.split(" ");

                let boxShadowColor;
                let offsetIndex;

                if (boxShadowParts[0].startsWith("rgb")) {
                    // RGB format
                    boxShadowColor = `${boxShadowParts[0]} ${boxShadowParts[1]} ${boxShadowParts[2]}`; // Combine rgb values
                    offsetIndex = 3;
                } else if (boxShadowParts[0].startsWith("#")) {
                    // Hex format
                    boxShadowColor = boxShadowParts[0]; // Hex value
                    offsetIndex = 1;
                }
                const borderRadius = stylesObj["border-radius"] || "0px";
                const borderRadiusParts = borderRadius.split(" ");
                // Check how many parts the border-radius has and set values accordingly
                let top; let right; let bottom; let left;

                if (borderRadiusParts.length === 1) {
                    // Single value: apply the same to all sides
                    top = borderRadiusParts[0].replace("px", "");
                    right = borderRadiusParts[0].replace("px", "");
                    bottom = borderRadiusParts[0].replace("px", "");
                    left = borderRadiusParts[0].replace("px", "");
                } else if (borderRadiusParts.length === 2) {
                    // Two values: apply first to top-left/bottom-right and second to top-right/bottom-left
                    top = borderRadiusParts[0].replace("px", "");
                    bottom = borderRadiusParts[0].replace("px", "");
                    right = borderRadiusParts[1].replace("px", "");
                    left = borderRadiusParts[1].replace("px", "");
                } else if (borderRadiusParts.length === 4) {
                    // Four values: apply each to top, right, bottom, left
                    top = borderRadiusParts[0].replace("px", "");
                    right = borderRadiusParts[1].replace("px", "");
                    bottom = borderRadiusParts[2].replace("px", "");
                    left = borderRadiusParts[3].replace("px", "");
                } else {
                    // Default case (in case of unexpected input)
                    top = "0";
                    right = "0";
                    bottom = "0";
                    left = "0";
                }
                // Create the image element object in the desired format
                const newComponent = isImage
                    ? {
                        "props": {
                            "BorderWidth": stylesObj["border-width"] ? stylesObj["border-width"].replace("px", "") : "1",
                            "border type": stylesObj["border-style"] || "none",
                            "bordercolor": stylesObj["border-color"] || "transparent",
                            "image size": "custom", // Assuming custom size, adjust if needed
                            "size": "px",
                            "width": stylesObj.width ? stylesObj.width.replace("px", "") : "150",
                            "height": stylesObj.height ? stylesObj.height.replace("px", "") : "150",
                            "top": top || "0",
                            "right": right || "0",
                            "bottom": bottom || "0",
                            "left": left || "0",
                            "border radius": "px", // Replace or calculate as needed
                            "x": boxShadowParts[offsetIndex].replace("px", "") || "0", // x-offset
                            "y": boxShadowParts[offsetIndex + 1].replace("px", "") || "0", // y-offset
                            "spread": boxShadowParts[offsetIndex + 3].replace("px", "") || "0", // spread-radius
                            "blur": boxShadowParts[offsetIndex + 2].replace("px", "") || "0", // blur-radius
                            "color": boxShadowColor || "0",
                            "alignment": stylesObj["text-align"] || stylesObj["text-align"],

                        },
                        "elemId": elemId,
                        "element": "Image"
                    }
                    : {
                        "props": {
                            "alignment": stylesObj["text-align"] || "left",
                            "text color": stylesObj.color || "#000000",
                            "fontFamily": stylesObj["font-family"] || "default",
                            "fontWeight": stylesObj["font-weight"] || "normal",
                            "fontSize": stylesObj["font-size"] ? stylesObj["font-size"].replace("px", "") : "16",
                            "textTransform": stylesObj["text-transform"] || "none",
                            "background color": stylesObj["background-color"] || "transparent"
                        },
                        "elemId": elemId,
                        "element": ""
                    };
                // If this elemId already exists, merge the styles
                if (result[elemId]) {
                    if (result[elemId].component) {
                        // Merge the component props if the element already has component props
                        result[elemId].component.props = {
                            ...result[elemId].component.props,
                            ...newComponent.component.props
                        };
                    } else {
                        // Merge the general props if no component props exist
                        result[elemId].props = {
                            ...result[elemId].props,
                            ...newComponent.props
                        };
                    }
                } else {
                    // If the element doesn't exist in the result, add it
                    result[elemId] = newComponent;
                }

                // Apply the CSS to the DOM element
                createAndApplyCSS(isImage ? newComponent?.elemId : newComponent.elemId, isImage ? newComponent : newComponent);
            });

            return Object.values(result); // Return the array of components
        }

        if (data.type === "append-template") {
            const _config = { ...config };
            if (data.editpage) {
                deleteRowFromConfig(config.children[0].children[0].elemId);
            }

            if (data.cssFilePath) {
                // const href = extractHrefFromLinkTag(data.cssFilePath);
                const htmlString = data?.cssFilePath;

                // Regex to match href attributes in link tags
                const regex = /<link[^>]+href="([^"]+)"/g;

                let secondHref = null;
                let match;
                let count = 0;

                // Extract href values and stop at the second match
                // eslint-disable-next-line no-cond-assign
                while ((match = regex.exec(htmlString)) !== null) {
                    count++;
                    if (count === 2) {
                        secondHref = match[1]; // match[1] contains the href value
                        break;
                    }
                }
                console.log(secondHref);
                if (secondHref && secondHref !== "undefined") {
                    const cssContent = await fetchCSSFromLink(`${secondHref}?V=${new Date().getTime()}`);
                    cssToObject(cssContent);
                } else {
                    console.error("No href found in the CSS link tag.");
                }
            }

            data.configjson.children.forEach((_children1) => {
                _config.children[0].children.push(_children1);
            });
            setConfig(_config);
        }
        if (data.type === "select-element") {
            updateConfig(data);
            if (data.elemId !== null && data.elemId !== undefined) {
                createAndApplyCSS(data.elemId, data.component);
            }
        }

        if (data.type === "remove-element") {
            const _data = {
                component: {
                    type: "jsx", element: "ComponentSelector", elemId: data.elemId
                },
                elemId: data.elemId
            };
            updateConfig(_data);
        }

        if (data.type === "remove-row") {
            deleteRowFromConfig(data.elemId);
        }

        if (data.type === "clone-row-setting") {
            cloneRowFromConfig(data.elemId);
        }

        if (data.type === "copy-layout") {
            copyRowFromConfig(data.elemId);
        }
        if (data.type === "remove-row-column") {
            removeRowColumn(data.elemId);
        }

        if (data.type === "element-position-change") {
            arrangRowPosition(data.elemId);
        }
    };

    useEffect(() => {
        window.addEventListener("message", onMessageHandler, false);
        setLoading(true); // Show loader
        // Set timeout to hide loader after 5 seconds
        setTimeout(() => {
            setLoading(false); // Hide loader
        }, 5000);
        const leftSidebar = document.querySelector(".left-sidebar");
        if (leftSidebar) {
            leftSidebar.remove();
        }

        // Remove .header-container
        const headerContainer = document.querySelector(".header-container");
        if (headerContainer) {
            headerContainer.remove();
        }
        return () => {
            window.removeEventListener("message", onMessageHandler);
        };
    }, []);

    return (
        <>  {loading && <div className="pageConfiqloader"><div className="loader"><div className="loader-inner line-scale"><div /><div /><div /><div /><div /></div></div></div>}
            <div style={{ visibility: loading ? "hidden" : "visible" }}>
                <ConfigElem {...config} />
                <AddRowToPage addNewRowToConfig={addNewRowToConfig} />
            </div>
        </>
    );
};

export default PageViewer;
