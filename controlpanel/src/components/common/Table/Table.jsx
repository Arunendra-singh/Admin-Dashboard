/* eslint-disable jsx-a11y/control-has-associated-label */
import axios from "axios";
import { DialogBox } from "common/components";
import { PopupV3 } from "common/utils";
import { COOKIE_DETAILS, CURRENCY_GUID, LANGUAGE_GUID, REACT_APP_API_ENDPOINT, TOKENS, WEBSITE_GUID, WEBSITE_URL } from "common/utils/vars";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { UpdateCategoryProductCount, ClearCacheProductAdmin } from "common/components/graphQL/queries/Js/CacheManager";
import Store from "~/Store";

const Table1 = ({ data, CollectionDelete, isExpandednew }) => {
    const basicLink = `${REACT_APP_API_ENDPOINT}api/fileupload/ExportSelectedCategories/`;
    const [resources] = Store.useStore((store) => store?.resources);
    const [showPopup, setShowPopup] = useState(false);
    const [CollectionGuid, setCollectionGuid] = useState("");
    const [expandedRows, setExpandedRows] = useState([]);
    const { register } = useForm();
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const handleRowToggle = (rowId) => {
        setExpandedRows((prev) => (prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]));
    };
    const handleClosePopup = () => {
        setShowPopup(false);
    };
    const handleExportClick = (collectionguid) => {
        window.location.href = `${basicLink}${collectionguid}/${WEBSITE_GUID}/${LANGUAGE_GUID}`;
    };
    // const handleMapping = (collectionguid) => {
    //     navigate(`/v2/Collection/AssignProducts/${collectionguid}`, { state: { collectionID: collectionguid } });
    // };
    const handleAddCollectionNew = (parentcollection) => {
        navigate(`/v2/Collection/Create?${parentcollection}`);
    };

    const editCategory = (collectionGuid) => {
        navigate(`/v2/Collection/Edit/${collectionGuid}`, { state: { collectionID: collectionGuid } });
    };
    const importexport = (collectionguid) => {
        setShowPopup(true);
        setCollectionGuid(collectionguid);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    async function upload(uploadImagePayload) {
        let result = "";
        try {
            if (CollectionGuid !== "") {
                result = await axios.post(`https://importexport.ewizsaas.com/api/upload/uploadimage?action=add&WebsiteGuid=${WEBSITE_GUID}&UserGuid=${COOKIE_DETAILS?.UserGuid}&LanguageGuid=${LANGUAGE_GUID}&type=CategoryAdminExcel&collectionGuid=${CollectionGuid}&qquuid=${uploadImagePayload.qquuid}&qqtotalfilesize=${uploadImagePayload.filesize}&qqfile=${uploadImagePayload.filename}`, uploadImagePayload.formData, {
                    headers: {
                        Authorization: `Bearer ${TOKENS?.SaaS_ProductImportExport_Microservice_Token}`,
                        WebSiteGuid: WEBSITE_GUID,
                        LanguageGuid: LANGUAGE_GUID,
                        CurrencyGuid: CURRENCY_GUID,
                        "x-requested-with": "XMLHttpRequest"
                    }
                });
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }

        return result;
    }
    const onExcelImport = async (event) => {
        const Excelfile = event.target.files[0]; // Get the first file from the input
        if (!Excelfile) {
            console.error("No file selected.");
            return;
        }

        const { name } = Excelfile;
        const extension = name.split(".").pop();
        const validExtensions = ["xlsx"];

        if (validExtensions.includes(extension)) {
            const excel = "some-flyer-image-guid.jpg"; // Replace with actual flyer image variable
            const imgguid = excel?.split(".")[0];
            if (!imgguid) {
                console.error("excel is not defined or has an invalid format.");
                return;
            }

            const filedata = new FormData();
            filedata.append("files", Excelfile);

            const uploadImagePayload = {
                qquuid: uuidv4(),
                filename: Excelfile.name,
                filesize: Excelfile.size,
                formData: filedata
            };

            try {
                const res = await upload(uploadImagePayload);
                if (res?.data?.saveresult === "success") {
                    const dataproduct = UpdateCategoryProductCount();
                    if (dataproduct) {
                        ClearCacheProductAdmin();
                    }
                    PopupV3({
                        content: resources["Product.Labels.SuccessfullyMessage"],
                        type: "Success", // Assuming you have different types like 'warning', 'info', etc.
                        title: resources["Product.Labels.SuccessfullyMessage"],
                        actions: [
                            {
                                dismiss: true,
                                text: "Okay",
                                className: "text-center",
                                do: () => {
                                    window.location.reload();
                                }
                            }
                        ]
                    });
                } else {
                    PopupV3({
                        content: res?.data?.info,
                        classes: "forgotPassAlert text-center no-footer",
                        type: "Warning",
                        timeout: 5000,
                        pos: 5,
                        actions: [
                            {
                                text: "Ok",
                                classes: "ok",
                                dismiss: true
                            }
                        ]
                    });
                }
            } catch (error) {
                console.error("Error uploading the image:", error);
            }
        } else {
            document.getElementById("choose").value = "";
            PopupV3({
                content: `${Excelfile?.name} has an invalid extension. Valid extension(s): xlsx.`,
                classes: "text-center",
                type: "Warning",
                size: "md",
                pos: 1
            });
        }
    };

    // eslint-disable-next-line react/no-unstable-nested-components
    const PlusIcon = () => (
        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12.8333 0.291016H1.16667C0.857247 0.291016 0.560501 0.413932 0.341709 0.632724C0.122916 0.851517 0 1.14826 0 1.45768V13.1243C0 13.4338 0.122916 13.7305 0.341709 13.9493C0.560501 14.1681 0.857247 14.291 1.16667 14.291H12.8333C13.1428 14.291 13.4395 14.1681 13.6583 13.9493C13.8771 13.7305 14 13.4338 14 13.1243V1.45768C14 1.14826 13.8771 0.851517 13.6583 0.632724C13.4395 0.413932 13.1428 0.291016 12.8333 0.291016ZM11.0833 7.87435H7.58333V11.3743C7.58333 11.5291 7.52188 11.6774 7.41248 11.7868C7.30308 11.8962 7.15471 11.9577 7 11.9577C6.84529 11.9577 6.69692 11.8962 6.58752 11.7868C6.47812 11.6774 6.41667 11.5291 6.41667 11.3743V7.87435H2.91667C2.76196 7.87435 2.61358 7.81289 2.50419 7.70349C2.39479 7.5941 2.33333 7.44573 2.33333 7.29102C2.33333 7.13631 2.39479 6.98793 2.50419 6.87854C2.61358 6.76914 2.76196 6.70768 2.91667 6.70768H6.41667V3.20768C6.41667 3.05297 6.47812 2.9046 6.58752 2.7952C6.69692 2.68581 6.84529 2.62435 7 2.62435C7.15471 2.62435 7.30308 2.68581 7.41248 2.7952C7.52188 2.9046 7.58333 3.05297 7.58333 3.20768V6.70768H11.0833C11.238 6.70768 11.3864 6.76914 11.4958 6.87854C11.6052 6.98793 11.6667 7.13631 11.6667 7.29102C11.6667 7.44573 11.6052 7.5941 11.4958 7.70349C11.3864 7.81289 11.238 7.87435 11.0833 7.87435Z"
                fill="#667B84"
            />
        </svg>
    );

    // eslint-disable-next-line react/no-unstable-nested-components
    const MinusIcon = () => (
        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.8333 0.500977H1.16667C0.857247 0.500977 0.560501 0.623893 0.341709 0.842685C0.122916 1.06148 0 1.35822 0 1.66764V13.3343C0 13.6437 0.122916 13.9405 0.341709 14.1593C0.560501 14.3781 0.857247 14.501 1.16667 14.501H12.8333C13.1428 14.501 13.4395 14.3781 13.6583 14.1593C13.8771 13.9405 14 13.6437 14 13.3343V1.66764C14 1.35822 13.8771 1.06148 13.6583 0.842685C13.4395 0.623893 13.1428 0.500977 12.8333 0.500977ZM11.0833 8.08431H2.91667C2.76196 8.08431 2.61358 8.02285 2.50419 7.91346C2.39479 7.80406 2.33333 7.65569 2.33333 7.50098C2.33333 7.34627 2.39479 7.19789 2.50419 7.0885C2.61358 6.9791 2.76196 6.91764 2.91667 6.91764H11.0833C11.238 6.91764 11.3864 6.9791 11.4958 7.0885C11.6052 7.19789 11.6667 7.34627 11.6667 7.50098C11.6667 7.65569 11.6052 7.80406 11.4958 7.91346C11.3864 8.02285 11.238 8.08431 11.0833 8.08431Z" fill="#00A7E3" />
        </svg>
    );

    const handleImportClick = (collectionguid, collectionname) => {
        PopupV3({
            content: `${resources["Category.CategoryValidationMessageNew"]} ${collectionname}?`,
            type: "Confirm", // Assuming you have different types like 'warning', 'info', etc.
            title: `${resources["Category.CategoryValidationMessageNew"]} ${collectionname}?`,
            actions: [
                {
                    dismiss: true,
                    text: "Yes",
                    do: () => {
                        importexport(collectionguid);
                    }
                },
                {
                    text: "No",
                    dismiss: true
                }
            ]
        });
    };

    const renderRow = (row, index, level = 0) => {
        let isExpanded = false;
        // let check = false;
        if (isExpandednew !== "") {
            isExpanded = true;
        } else {
            isExpanded = expandedRows?.includes(row.collectionGuid);
        }
        // if (row.parentCollectionGuid === row.collectionGuid) {
        //     check = true;
        // }
        return (
            <React.Fragment key={index}>
                <tr>
                    <td style={{ paddingLeft: `${level * 20}px` }}>
                        <div className="categoryCollection">
                            {row.subCategories && row.subCategories.length > 0 && (
                                <button type="button" className={`expand-button ${isExpanded ? "expanded" : "collapsed"}`} onClick={() => handleRowToggle(row.collectionGuid)} aria-expanded={isExpanded} aria-controls={`row-${row.collectionGuid}`}>
                                    {isExpanded ? <MinusIcon /> : <PlusIcon />}
                                </button>
                            )}
                            {row?.parentCollectionGuid !== null && row?.parentCollectionGuid !== "" && (
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 19.0222L21 14.0222L16 9.02222" stroke="#99A7AD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M21 14.0222H13C7.477 14.0222 3 9.54522 3 4.02222V3.02222" stroke="#99A7AD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                            {row.parentCollectionGuid !== "" ? (
                                <div className="Categorymain">
                                    <b className="MaincategoryName">{row.collectionName}</b>
                                </div>
                            ) : (
                                <b className="SubcategoryName">{row.collectionName}</b>
                            )}
                        </div>
                    </td>
                    <td className={`${row.parentCollectionGuid !== "" ? "" : "SubcategoryName"}`}>{row.collectionType}</td>
                    <td className={`${row.parentCollectionGuid !== "" ? "" : "SubcategoryName"}`}>{row.parentCollectionName}</td>
                    <td className={`${row.parentCollectionGuid !== "" ? "text-center" : "text-center SubcategoryName"}`}>{row.productCount}</td>
                    <td className={`${row.parentCollectionGuid !== "" ? "text-center" : "text-center SubcategoryName"}`}>{row.displayOrder}</td>
                    {(row?.collectionType === "Section" || row?.collectionType === "Featured Icon" || row?.collectionType === "Brand" || row?.collectionType === "Supplier" || row?.subCategories === null || row?.subCategories === undefined || row?.subCategories?.length === 0) ? (
                        <td>
                            <span className="clsCollcetionListing_ProductMapping clsMapurl">
                                <a
                                    className="prodMappingLink"
                                    href={`${WEBSITE_URL}v2/Collection/AssignProducts/${row?.collectionGuid}`}
                                // Uncomment this if you want to handle click via JavaScript:
                                // onClick={(e) => {
                                //     e.preventDefault();
                                //     handleMapping(row?.collectionGuid);
                                // }}
                                >
                                    Mapping
                                </a>
                            </span>
                        </td>
                    ) : (
                        <td />
                    )}{" "}
                    <td className="actionBtn text-right">
                        {row.subCategories && row.subCategories.length > 0 && (
                            <span title="AddCollection" onClick={() => handleAddCollectionNew(row?.collectionGuid)}>
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_4441_14262" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="21">
                                        <rect x="0.720337" y="0.0222168" width="20" height="20" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_4441_14262)">
                                        <path
                                            d="M10.0953 13.9806H11.3453V10.6473H14.6786V9.39726H11.3453V6.06392H10.0953V9.39726H6.76198V10.6473H10.0953V13.9806ZM10.7218 17.9389C9.62677 17.9389 8.59754 17.7311 7.63407 17.3156C6.67059 16.9 5.83254 16.3361 5.1199 15.6237C4.40726 14.9114 3.84302 14.0736 3.42719 13.1106C3.0115 12.1475 2.80365 11.1186 2.80365 10.0237C2.80365 8.92872 3.01143 7.89948 3.42698 6.93601C3.84254 5.97253 4.4065 5.13448 5.11886 4.42184C5.83122 3.7092 6.66893 3.14497 7.63198 2.72913C8.59504 2.31344 9.624 2.10559 10.7189 2.10559C11.8139 2.10559 12.8431 2.31337 13.8066 2.72892C14.77 3.14448 15.6081 3.70844 16.3207 4.4208C17.0334 5.13316 17.5976 5.97087 18.0134 6.93392C18.4291 7.89698 18.637 8.92594 18.637 10.0208C18.637 11.1158 18.4292 12.145 18.0136 13.1085C17.5981 14.072 17.0341 14.91 16.3218 15.6227C15.6094 16.3353 14.7717 16.8995 13.8087 17.3154C12.8456 17.7311 11.8166 17.9389 10.7218 17.9389ZM10.7203 16.6889C12.5814 16.6889 14.1578 16.0431 15.4495 14.7514C16.7411 13.4598 17.387 11.8834 17.387 10.0223C17.387 8.16115 16.7411 6.58476 15.4495 5.29309C14.1578 4.00142 12.5814 3.35559 10.7203 3.35559C8.85921 3.35559 7.28282 4.00142 5.99115 5.29309C4.69948 6.58476 4.05365 8.16115 4.05365 10.0223C4.05365 11.8834 4.69948 13.4598 5.99115 14.7514C7.28282 16.0431 8.85921 16.6889 10.7203 16.6889Z"
                                            fill="#405660"
                                        />
                                    </g>
                                </svg>
                            </span>
                        )}
                        {((row?.subCategories === null || row?.subCategories === undefined || row?.subCategories?.length === 0) && resources?.["Import and Export Display on Category"] === "True") && (
                            <>
                                <span title="Import" onClick={() => handleImportClick(row?.collectionGuid, row.collectionName)}>
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_4201_8558" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="21">
                                            <rect x="0.0803223" y="0.291016" width="20" height="20" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_4201_8558)">
                                            <path d="M10.0803 13.4481L6.52261 9.89039L7.40095 8.98664L9.45532 11.041V4.04102H10.7053V11.041L12.7597 8.98664L13.638 9.89039L10.0803 13.4481ZM5.33678 16.541C4.91581 16.541 4.55949 16.3952 4.26782 16.1035C3.97616 15.8118 3.83032 15.4555 3.83032 15.0346V12.775H5.08032V15.0346C5.08032 15.0987 5.10706 15.1575 5.16053 15.2108C5.21386 15.2643 5.27261 15.291 5.33678 15.291H14.8239C14.888 15.291 14.9468 15.2643 15.0001 15.2108C15.0536 15.1575 15.0803 15.0987 15.0803 15.0346V12.775H16.3303V15.0346C16.3303 15.4555 16.1845 15.8118 15.8928 16.1035C15.6012 16.3952 15.2448 16.541 14.8239 16.541H5.33678Z" fill="#405660" />
                                        </g>
                                    </svg>
                                </span>
                                <span title="Export" onClick={() => handleExportClick(row?.collectionGuid)}>
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_4195_8365" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="21">
                                            <rect x="0.720337" y="0.0222168" width="20" height="20" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_4195_8365)">
                                            <path d="M10.0953 13.1793V6.1793L8.04096 8.23368L7.16263 7.32993L10.7203 3.77222L14.278 7.32993L13.3997 8.23368L11.3453 6.1793V13.1793H10.0953ZM5.9768 16.2722C5.55582 16.2722 5.1995 16.1264 4.90784 15.8347C4.61617 15.543 4.47034 15.1867 4.47034 14.7658V12.5062H5.72034V14.7658C5.72034 14.8299 5.74707 14.8887 5.80055 14.942C5.85388 14.9955 5.91263 15.0222 5.9768 15.0222H15.4639C15.528 15.0222 15.5868 14.9955 15.6401 14.942C15.6936 14.8887 15.7203 14.8299 15.7203 14.7658V12.5062H16.9703V14.7658C16.9703 15.1867 16.8245 15.543 16.5328 15.8347C16.2412 16.1264 15.8849 16.2722 15.4639 16.2722H5.9768Z" fill="#405660" />
                                        </g>
                                    </svg>
                                </span>
                            </>
                        )}
                        <span title="Edit" onClick={() => editCategory(row?.collectionGuid)}>
                            <svg className="previewIcon clsCollcetionListing_Edit" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.75 11.751H2.69613L10.3735 4.0736L9.42737 3.12748L1.75 10.8049V11.751ZM0.625 12.876V10.3376L10.5179 0.449039C10.6312 0.346039 10.7564 0.266477 10.8934 0.210352C11.0306 0.154102 11.1743 0.125977 11.3247 0.125977C11.4751 0.125977 11.6207 0.152664 11.7616 0.206039C11.9026 0.259414 12.0274 0.344289 12.136 0.460664L13.0519 1.38804C13.1683 1.49666 13.2512 1.62166 13.3007 1.76304C13.3502 1.90441 13.375 2.04579 13.375 2.18716C13.375 2.33804 13.3492 2.48198 13.2977 2.61898C13.2463 2.7561 13.1643 2.88135 13.0519 2.99473L3.16337 12.876H0.625ZM9.89219 3.60879L9.42737 3.12748L10.3735 4.0736L9.89219 3.60879Z" fill="#405660" />
                            </svg>
                        </span>
                        <span title="Delete" onClick={() => CollectionDelete(row)}>
                            <svg className="previewIcon clsCollcetionListing_Delete" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.48081 12.8763C2.10681 12.8763 1.78731 12.7438 1.52231 12.479C1.25744 12.214 1.125 11.8945 1.125 11.5205V2.00127H0.375V0.876266H3.75V0.212891H8.25V0.876266H11.625V2.00127H10.875V11.5205C10.875 11.8993 10.7438 12.22 10.4813 12.4825C10.2188 12.745 9.89806 12.8763 9.51919 12.8763H2.48081ZM9.75 2.00127H2.25V11.5205C2.25 11.5878 2.27162 11.6431 2.31487 11.6864C2.35812 11.7296 2.41344 11.7513 2.48081 11.7513H9.51919C9.57694 11.7513 9.62981 11.7272 9.67781 11.6791C9.72594 11.6311 9.75 11.5782 9.75 11.5205V2.00127ZM4.053 10.2513H5.17781V3.50127H4.053V10.2513ZM6.82219 10.2513H7.947V3.50127H6.82219V10.2513Z" fill="#405660" />
                            </svg>
                        </span>
                    </td>
                </tr>
                {isExpanded && row.subCategories && row.subCategories.map((childRow) => renderRow(childRow, level + 1))}
            </React.Fragment>
        );
    };

    return (
        <div className="List-View-header">
            <div id="zero_config_wrapper" className="dataTables_wrapper">
                <div className="table-responsive">
                    <table id="zero_config" className="table table-striped table-bordered dataTable listingCollection ">
                        <thead>
                            <tr>
                                <th className="tblTitle Name text-left clsCollcetionListing_collectionNameHeading">Collection Name</th>
                                <th className="tblTitle Type text-left clsCollcetionListing_collectionTypeHeading">Collection Type</th>
                                <th className="tblTitle Parent text-left clsCollcetionListing_parentCollectionHeading">Parent Collection</th>
                                <th className="tblTitle Products in Category text-center clsCollcetionListing_collectionProductCountHeading">Products in Category</th>
                                <th className="tblTitle Products in Display count text-center clsCollcetionListing_collectionDisplayOrderHeading"> Display Order</th>
                                <th className="tblTitle Mapping text-left clsCollcetionListing_collectionMappingHeading">Product Mapping</th>
                                <th className="tblTitle action text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 ? (
                                data.map((item) => renderRow(item))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center">
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {showPopup ? (
                        <DialogBox title="Confirm" dialogId="FreightEstimator" customClasses="modal-xl" onClose={handleClosePopup}>
                            <div className="collectField">
                                {/* <div className="input-group"> */}
                                <div className="pdfUpload">
                                    <div className="productpdf">
                                        <div className="col-md-12">
                                            <div id="ProductPdfUploader1" className="text-center mb-2">
                                                <div className="qq-uploader">
                                                    <div className="qq-upload-drop-area" style={{ display: "none" }}>
                                                        <span>Drop files here to upload</span>
                                                    </div>
                                                    <div className="qq-upload-button" style={{ position: "relative", overflow: "hidden", direction: "ltr" }}>
                                                        <div>Click here to upload file</div>
                                                        <input id="choose" type="file" name="file" style={{ position: "absolute", right: 0, top: 0, fontFamily: "Arial", fontSize: "118px", margin: 0, padding: 0, cursor: "pointer", opacity: 0, width: "100%" }} {...register("file")} onChange={(e) => onExcelImport(e)} />
                                                    </div>
                                                    <span className="qq-drop-processing d-none">
                                                        <span>Processing dropped files...</span>
                                                        <span className="qq-drop-processing-spinner" />
                                                    </span>
                                                    <ul className="qq-upload-list" />
                                                    <div className="FailureDiv">
                                                        <div className="FailureDivMsg" />
                                                    </div>
                                                </div>
                                            </div>
                                            <span style={{ color: "#000", fontWeight: "bold", textAlign: "center", fontSize: "14px" }}>Note: Valid Only xlsx files.</span>
                                        </div>
                                        <button onClick={handleClosePopup} className="closeexcel" type="button" label="close">
                                            CLOSE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </DialogBox>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Table1;
