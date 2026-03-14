/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { PopupV3 } from "common/utils/PopupV3";
// import FormFieldValidations from "~/helpers/utils/customvalidation";
import FormFieldValidations from "../../helpers/customvalidation";
import { v4 as uuidv4 } from "uuid";
// import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { useMutationGetAddSalesFlyer } from "common/components/graphQL/mutations/Sales/useMutationGetAddSalesFlyer";
import { useQueryGetMasterType } from "common/components/graphQL/queries/Sales/useQueryGetMasterType";
import "../../styles/pages/addsalesflyer.scss";
import axios from "axios";
import { CDN_URL, COOKIE_DETAILS, CURRENCY_GUID, LANGUAGE_GUID, WEBSITE_GUID, REACT_APP_API_ENDPOINT, TOKENS } from "common/utils/vars";
import { useNavigate } from "react-router-dom";
import Input from "../../helpers/Input";
import Select from "../../helpers/Select";
import Store from "~/Store";
import moment from "moment";

// import { useNavigate } from "react-router-dom";

const AddSalesFlyer = ({ salesFlyerEditData, isEdit }) => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [formdateformat, setformdateformat] = useState("");
    const [todateformat, settodateformat] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [file, setFile] = useState(null);
    // const [myFile, setMyFile] = useState("");
    const [sequenceNumber, setSequenceNumber] = useState(1);
    const [base64url, Setbase64url] = useState("");
    const imgUrl = `${CDN_URL}/${WEBSITE_GUID}/Marcomm/SalesFlyer/Default/`;
    const navigate = useNavigate();
    const [imagevalue, Setimagevalue] = useState(null);
    const [Selectedtype, setSelectedtype] = useState(null);
    const [Type, setType] = useState([]);
    const [isOn, setOn] = useState(true);
    const token = TOKENS?.SaaS_ControlPanel_Microservice_Token;
    const incrementSequenceNumber = () => {
        setSequenceNumber((prevNumber) => prevNumber + 1);
    };
    const [state, setState] = useState("");
    const [show, setshow] = useState(true);
    const [globalsetting] = Store.useStore((store) => store?.globalsetting);
    const [resources] = Store.useStore((store) => store?.resources);

    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit
    } = useForm({ defaultValues: salesFlyerEditData });
    const [UpdateSalesFlyerData] = useMutation(useMutationGetAddSalesFlyer);
    const { data: mastertype } = useQuery(useQueryGetMasterType);

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (mastertype?.masterFlyersList?.items !== undefined) {
            const typeall = mastertype?.masterFlyersList?.items?.map((item) => item?.flyerType);
            const values = typeall?.map((type) => ({
                name: type,
                value: type,
                label: type
            }));
            setType(values);
        }
        // }
    }, [mastertype, isEdit, salesFlyerEditData]);

    useEffect(() => {
        if (isEdit) {
            const { flyerPDF } = salesFlyerEditData;
            if (flyerPDF !== null && flyerPDF !== undefined) {
                const myFile = new File([imgUrl], flyerPDF, {
                    // type: "text/plain",
                    // lastModified: new Date()
                });

                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(myFile);
                if (fileInputRef.current) {
                    fileInputRef.current.files = dataTransfer.files;
                }
            }
        } else {
            setValue("sequence", resources?.SequenceForAdd);
        }
    }, [salesFlyerEditData, resources]);
    function formatDateToMMDDYYYY(startDateUTS) {
        const date = new Date(startDateUTS);
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const day = String(date?.getDate()).padStart(2, "0");
        const year = date?.getFullYear();
        return `${month}/${day}/${year}`;
    }
    useEffect(() => {
        if (salesFlyerEditData) {
            const { startDateUTS, expirationDateUTS, flyerPDF } = salesFlyerEditData;
            setFromDate(startDateUTS ? formatDateToMMDDYYYY(startDateUTS) : "");
            setToDate(expirationDateUTS ? formatDateToMMDDYYYY(expirationDateUTS) : "");
            const flyerImage = `${imgUrl}${salesFlyerEditData.flyerImage}`;
            setshow(false);
            setState(flyerImage);

            // setState(flyerImage);
            setFile(flyerPDF);
            Setimagevalue(salesFlyerEditData.flyerImage);
            setValue("flyerImage", flyerImage);
            setOn(salesFlyerEditData.isActive);
            // document.getElementById("file").value(flyerPDF);
        }
    }, [salesFlyerEditData]);

    const onSubmit = (data, e) => {
        if (state === null || state === "") {
            PopupV3({
                content: "Upload Sales Flyer Image",
                type: "Warning",
                title: "Warning"
            });
            // } else if (toDate === null || toDate === "") {
            //     PopupV3({
            //         content: "Enter Sales Flyer Expiration Date",
            //         type: "Warning",
            //         title: "Warning"
            //     });
        } else if (!isEdit) {
            const variables = {
                entity: { flyerName: data?.flyerName, flyerPDF: file, flyerImage: imagevalue, sequence: parseInt(data?.sequence, 10), keywords: data?.keywords, url: data?.url, imageAlt: data?.imageAlt, isActive: isOn, startDateUTS: fromDate !== "" ? new Date(fromDate).toISOString() : null, expirationDateUTS: toDate !== "" ? new Date(toDate).toISOString() : null, createdDateUtc: new Date().toISOString(), websiteGuid: WEBSITE_GUID, languageGuid: LANGUAGE_GUID, flyerType: Selectedtype !== null ? Selectedtype : Type[0].name }
                // entity: { flyerName: data?.flyerName, flyerPDF: file, flyerImage: data.flyerImage[0]?.name, sequence: parseInt(data?.sequence, 10), keywords: data?.keywords, imageAlt: data?.imageAlt, isActive: data?.isActive, startDateUTS: data.FromDate, expirationDateUTS: data.ToDate, createdDateUtc: new Date().toISOString(), websiteGuid: "8FF00A25-B6ED-4799-9D2F-412DBA1F7C66", languageGuid: LANGUAGE_GUID, flyerType: "Select Flyers" }
            };
            UpdateSalesFlyerData({
                variables
            }).then((res) => {
                if (res?.data?.addUpdateSalesFlyer?.statuscode === 200) {
                    PopupV3({
                        content: "Sales Flyer Added Successfully",
                        classes: "forgotPassAlert addSalesFlyerNew text-center no-footer",
                        type: "Success",
                        timeout: 800000,
                        pos: 5,
                        actions: [
                            {
                                dismiss: true,
                                text: "OK",
                                do: () => {
                                    window.location.href = "/v2/SalesFlyer";
                                }
                            }
                        ]
                    });
                }
            });
        } else {
            const variables = {
                entity: { flyerName: data?.flyerName, salesFlyerGuid: salesFlyerEditData?.salesFlyerGuid, flyerPDF: file, flyerImage: imagevalue, sequence: parseInt(data?.sequence, 10), keywords: data?.keywords, url: data?.url, imageAlt: data?.imageAlt, isActive: isOn, startDateUTS: fromDate !== "" ? new Date(fromDate).toISOString() : salesFlyerEditData?.startDateUTS, expirationDateUTS: toDate !== "" ? new Date(toDate).toISOString() : salesFlyerEditData?.expirationDateUTS, createdDateUtc: new Date().toISOString(), websiteGuid: WEBSITE_GUID, languageGuid: LANGUAGE_GUID, flyerType: Selectedtype !== null ? Selectedtype : data?.flyerType }
            };
            UpdateSalesFlyerData({
                variables
            }).then((res) => {
                if (res?.data?.addUpdateSalesFlyer?.statuscode === 200) {
                    PopupV3({
                        content: res?.data?.addUpdateSalesFlyer?.message,
                        // content: "Sales Flyer Updated Successfully",
                        classes: "forgotPassAlert text-center no-footer",
                        type: "Success",
                        pos: 5,
                        actions: [
                            {
                                text: "Ok",
                                classes: "ok",
                                dismiss: true,
                                do: () => {
                                    window.location.href = "/v2/SalesFlyer";
                                }
                            }
                        ]
                    });
                }
            });
            e.preventDefault();
            incrementSequenceNumber();
        }
    };

    async function uploadremove() {
        const result = axios.post(`https://catalog.ewizsaas.com/api/upload/UploadImage?action=remove&type=SalesFlyer&Guid=${imagevalue}&WebsiteGuid=${WEBSITE_GUID}`, {
            headers: { WebSiteGuid: WEBSITE_GUID, LanguageGuid: LANGUAGE_GUID, CookieDetails: COOKIE_DETAILS, CurrencyGuid: CURRENCY_GUID }
        });

        return result;
    }
    async function uploadpdfremove() {
        const result = axios.post(`https://catalog.ewizsaas.com/api/upload/UploadImage?action=remove&type=SalesFlyerPDF&Guid=${file}&WebsiteGuid=${WEBSITE_GUID}`, {
            headers: { WebSiteGuid: WEBSITE_GUID, LanguageGuid: LANGUAGE_GUID, CookieDetails: COOKIE_DETAILS, CurrencyGuid: CURRENCY_GUID }
        });

        return result;
    }

    const handleRemoveFile = () => {
        PopupV3({
            content: "Are you sure want to delete the pdf?",
            type: "Confirm", // Assuming you have different types like 'warning', 'info', etc.
            title: "Are you sure want to delete the pdf?",
            actions: [
                {
                    dismiss: true,
                    text: "Yes",

                    do: async () => {
                        // Mark this function as async
                        try {
                            const res = await uploadpdfremove(); // Ensure 'upload' function is defined
                            if (res?.status === 200) {
                                document.getElementById("filePDF").value = "";
                                setFile(null);
                                // }
                            }
                        } catch (error) {
                            console.error("Error uploading image:", error);
                        }
                    }
                },
                {
                    text: "No",
                    dismiss: true
                }
            ]
        });
    };
    const handleRemoveImage = async () => {
        PopupV3({
            content: "Are you sure want to delete the image?",
            type: "Confirm", // Assuming you have different types like 'warning', 'info', etc.
            title: "Are you sure want to delete the image?",
            actions: [
                {
                    dismiss: true,
                    text: "Yes",
                    do: async () => {
                        // Mark this function as async
                        try {
                            const res = await uploadremove(); // Ensure 'upload' function is defined
                            if (res?.status === 200) {
                                // if (type !== "application/pdf") {
                                // document.getElementById("dragImageFile").value = "";
                                setState("");
                                setshow(true);
                                Setimagevalue("");
                                // }
                            }
                        } catch (error) {
                            console.error("Error uploading image:", error);
                        }
                    }
                },
                {
                    text: "No",
                    dismiss: true
                }
            ]
        });
    };
    // const convertDateFormat = (dateStr) => {
    //     const [month, day, year] = dateStr.split("/");

    //     // Create a new Date object using the parsed components
    //     const date = new Date(`${year}-${month}-${day}`);

    //     return date;
    // };
    const validateDate = (startDate, endDate) => {
        const from = new Date(startDate);
        const to = new Date(endDate);

        // Extract year, month, and date
        const fromDateValue = from.getFullYear() * 10000 + (from.getMonth() + 1) * 100 + from.getDate();
        const toDateValue = to.getFullYear() * 10000 + (to.getMonth() + 1) * 100 + to.getDate();

        return fromDateValue <= toDateValue;
    };

    const handlefromdate = (e) => {
        const selectedDate = e.target.value;
        setFromDate(selectedDate);

        if (toDate && !validateDate(selectedDate, toDate)) {
            PopupV3({
                content: "End Date should be greater than Start Date",
                type: "Warning",
                title: "Warning",
                actions: [
                    {
                        dismiss: true,
                        text: "OK"
                    }
                ]
            });
            setFromDate("");
        } else {
            setDisabled(false);
        }
    };

    const handletodate = (e) => {
        const selectedDate = e.target.value;
        setToDate(selectedDate);

        if (fromDate && !validateDate(fromDate, selectedDate)) {
            PopupV3({
                content: "End Date should be greater than Start Date",
                type: "Warning",
                title: "Warning",
                actions: [
                    {
                        dismiss: true,
                        text: "OK"
                    }
                ]
            });
            setToDate("");
        }
    };

    // const extractBase64 = (dataURL) => dataURL.split(",")[1];

    async function upload(uploadImagePayload, Filetype) {
        let result = "";
        try {
            if (Filetype === "PDF") {
                result = await axios.post(`https://catalog.ewizsaas.com/api/upload/UploadImage?action=add&type=SalesFlyerPDF&Guid=&WebsiteGuid=${WEBSITE_GUID}&Orientation=Landscape&CatalogType=PDF&LanguageGuid=3238bf6d-ddcb-4f65-aadb-3eee730fb9c8&qquuid=${uploadImagePayload.qquuid}&qqtotalfilesize=${uploadImagePayload.filesize}&qqfile=${uploadImagePayload.filename}`, uploadImagePayload.formData, {
                    headers: {
                        WebSiteGuid: WEBSITE_GUID,
                        LanguageGuid: LANGUAGE_GUID,
                        CookieDetails: COOKIE_DETAILS,
                        CurrencyGuid: CURRENCY_GUID
                    }
                });
            } else {
                result = await axios.post(`https://catalog.ewizsaas.com/api/upload/UploadImage?action=add&type=SalesFlyer&Guid=&WebsiteGuid=${WEBSITE_GUID}&Orientation=Landscape&CatalogType=FLYER&LanguageGuid=3238bf6d-ddcb-4f65-aadb-3eee730fb9c8&qquuid=${uploadImagePayload.qquuid}&qqtotalfilesize=${uploadImagePayload.filesize}&qqfile=${uploadImagePayload.filename}`, uploadImagePayload.formData, {
                    headers: {
                        WebSiteGuid: WEBSITE_GUID,
                        LanguageGuid: LANGUAGE_GUID,
                        CookieDetails: COOKIE_DETAILS,
                        CurrencyGuid: CURRENCY_GUID
                    }
                });
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }

        return result;
    }

    const uploadtest = async (uploadImagePayload) => {
        const res = await upload(uploadImagePayload, "PDF");
        if (res.status === 200) {
            setFile(res?.data?.name);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const maxSize = resources?.["SalesFlyer.ValidatePDFSize"]; // 5MB in bytes
        const allowedTypes = ["application/pdf"]; // Array of allowed MIME types

        if (selectedFile) {
            if (selectedFile.size > maxSize) {
                // setError("File size is too large. Max size allowed is 5MB.");
                PopupV3({
                    content: "File size is too large. Max size allowed is 5MB.",
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
                document.getElementById("filePDF").value = "";
                setFile("");
            } else if (!allowedTypes.includes(selectedFile.type)) {
                PopupV3({
                    content: "Only PDF files are allowed.",
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
                document.getElementById("filePDF").value = "";
                setFile("");
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onload = () => {
                    // const base64String = reader.result.split(",")[1];
                    // Setbase64url(base64String);
                    const fileimage = event.target.files[0];
                    const filedata = new FormData();
                    filedata.append("files", fileimage);
                    const uploadImagePayload = {
                        qquuid: uuidv4(),
                        filename: fileimage.name,
                        filesize: fileimage.size,
                        formData: filedata // Ensure filedata is a FormData object
                    };

                    const resp = uploadtest(uploadImagePayload);
                    if (resp.status === 200) {
                        setFile(resp?.data?.name);
                    }
                };

                reader.onerror = (error) => {
                    console.error("File reading error:", error);
                };
            }
        }
    };

    const onImageChange = async (event) => {
        const fileimage = event.target.files[0]; // Get the first file from the input
        if (!fileimage) {
            console.error("No file selected.");
            return;
        }

        const { size, type } = fileimage;

        const fileSize = size < resources?.["SalesFlyer.ValidateImageSize"]; // Check if file size is less than 10MB
        const extension = type.split("/").pop();
        const validExtensions = [resources?.["SalesFlyer.allowedExtensions"]];
        const atLeastOneConditionMet = validExtensions[0].includes(extension);
        // const cleanedExtension = extension.replace(/'/g, "");
        // const atLeastOneConditionMet = validExtensions.includes(cleanedExtension);
        if (fileSize && atLeastOneConditionMet) {
            const flyerImage = "some-flyer-image-guid.jpg"; // Replace with actual flyer image variable
            const imgguid = flyerImage?.split(".")[0];
            if (!imgguid) {
                console.error("flyerImage is not defined or has an invalid format.");
                return;
            }

            const filedata = new FormData();
            filedata.append("files", fileimage);
            const uploadImagePayload = {
                qquuid: uuidv4(),
                filename: fileimage.name,
                filesize: fileimage.size,
                formData: filedata // Ensure filedata is a FormData object
            };

            try {
                const res = await upload(uploadImagePayload);
                if (res?.data?.success === true) {
                    if (type !== "application/pdf") {
                        Setimagevalue(res?.data?.name);
                        setState(res?.data?.src);
                        setshow(false);
                    }
                } else {
                    setState("");
                    setshow(true);
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
            setState("");
            document.getElementById("dragImageFile").value = "";
            PopupV3({
                content: "File size or type doesn't match",
                classes: "text-center",
                type: "Warning",
                size: "md",
                pos: 1
            });
        }
    };

    const ToggleNew = () => {
        const toggle = () => {
            setOn((prevIsOn) => !prevIsOn);
        };

        return (
            <div className="toggle-button">
                <label className={`slider ${isOn ? "on" : "off"}`}>
                    <input type="checkbox" checked={isOn} onChange={toggle} />
                    <div className="sort" />
                </label>
            </div>
        );
    };
    const [startDateInputType, setStartDateInputType] = useState("text");
    const [endDateInputType, setEndDateInputType] = useState("text");

    const handleFocusStartDate = () => {
        setStartDateInputType("date");
    };
    const handleFocusEndDate = () => {
        setEndDateInputType("date");
    };

    const handleBlur = (event) => {
        if (event.target.value === "") {
            setStartDateInputType("text");
            setEndDateInputType("text");
        }
    };
    const onSelectType = (e) => {
        setSelectedtype(e.target.value);
    };
    const redirectionHome = () => {
        navigate("/v2/SalesFlyer/");
    };
    let today = new Date();
    const dd = `0${today.getDate()}`.slice(-2); // today.getDate();
    const mm = `0${today.getMonth() + 1}`.slice(-2); // today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    const allowedExtensions = resources?.["SalesFlyer.allowedExtensions"]?.replace(/'/g, "")?.toUpperCase() || [];

    return (
        <section className="midContent">
            <div className="AddSalesFlyer-Main d-lg-flex flex-lg-wrap align-items-lg-stretch" id="jumbo-header">
                <div className="left-form position-relative">
                    <div className="form-sec h-100">
                        <div className="header-addsales d-flex align-items-center mb-3">
                            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.208984 10.786V9.4112H15.7923V10.786H0.208984ZM0.208984 6.30851V4.93351H15.7923V6.30851H0.208984ZM0.208984 1.83083V0.456055H15.7923V1.83083H0.208984Z" fill="#CCD3D6" />
                            </svg>

                            <h3 className="ml-3">{isEdit !== true ? "Create Sales Flyer" : "Edit Sales Flyer"}</h3>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="FormDiv pb-5">
                                <Select
                                    fieldId="flyerType"
                                    inputType="flyerType"
                                    labelName="Flyer Type"
                                    placeholder="Select Type"
                                    className="form-control"
                                    customClass="flyerType"
                                    errorMsg={errors?.flyerType?.message}
                                    selectOptions={Type}
                                    customProps={register("flyerType", {
                                        pattern: {
                                            value: FormFieldValidations.flyerType.value,
                                            message: FormFieldValidations.flyerType.message
                                        },
                                        onChange: (e) => onSelectType(e)
                                    })}
                                />
                                <div className="Filemaindiv ">
                                    <div className="form-group">
                                        <label htmlFor="file">
                                            File{" "}
                                            <span className="redMendat" style={{ color: "red" }}>
                                                *
                                            </span>
                                        </label>
                                        <div className="pdfInput clsSalesCreate_file">
                                            <input type="file" onChange={(e) => handleFileChange(e)} ref={fileInputRef} className="form-control clsSales_AddPDF" id="filePDF" placeholder="Upload File" name="flyerPDF" required={resources?.["SalesFlyer.FlyerPDFWarning"]} />
                                            {file && (
                                                <div className="pdficondelete">
                                                    <span className="icon-trash-add" onClick={handleRemoveFile}>
                                                        <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M12 2.31055H9.5V1.81055C9.5 1.41272 9.34196 1.03119 9.06066 0.749887C8.77936 0.468582 8.39782 0.310547 8 0.310547H5C4.60218 0.310547 4.22064 0.468582 3.93934 0.749887C3.65804 1.03119 3.5 1.41272 3.5 1.81055V2.31055H1C0.867392 2.31055 0.740215 2.36323 0.646447 2.45699C0.552679 2.55076 0.5 2.67794 0.5 2.81055C0.5 2.94316 0.552679 3.07033 0.646447 3.1641C0.740215 3.25787 0.867392 3.31055 1 3.31055H1.5V12.3105C1.5 12.5758 1.60536 12.8301 1.79289 13.0177C1.98043 13.2052 2.23478 13.3105 2.5 13.3105H10.5C10.7652 13.3105 11.0196 13.2052 11.2071 13.0177C11.3946 12.8301 11.5 12.5758 11.5 12.3105V3.31055H12C12.1326 3.31055 12.2598 3.25787 12.3536 3.1641C12.4473 3.07033 12.5 2.94316 12.5 2.81055C12.5 2.67794 12.4473 2.55076 12.3536 2.45699C12.2598 2.36323 12.1326 2.31055 12 2.31055ZM4.5 1.81055C4.5 1.67794 4.55268 1.55076 4.64645 1.45699C4.74021 1.36323 4.86739 1.31055 5 1.31055H8C8.13261 1.31055 8.25979 1.36323 8.35355 1.45699C8.44732 1.55076 8.5 1.67794 8.5 1.81055V2.31055H4.5V1.81055ZM10.5 12.3105H2.5V3.31055H10.5V12.3105ZM5.5 5.81055V9.81055C5.5 9.94316 5.44732 10.0703 5.35355 10.1641C5.25979 10.2579 5.13261 10.3105 5 10.3105C4.86739 10.3105 4.74021 10.2579 4.64645 10.1641C4.55268 10.0703 4.5 9.94316 4.5 9.81055V5.81055C4.5 5.67794 4.55268 5.55076 4.64645 5.45699C4.74021 5.36323 4.86739 5.31055 5 5.31055C5.13261 5.31055 5.25979 5.36323 5.35355 5.45699C5.44732 5.55076 5.5 5.67794 5.5 5.81055ZM8.5 5.81055V9.81055C8.5 9.94316 8.44732 10.0703 8.35355 10.1641C8.25979 10.2579 8.13261 10.3105 8 10.3105C7.86739 10.3105 7.74021 10.2579 7.64645 10.1641C7.55268 10.0703 7.5 9.94316 7.5 9.81055V5.81055C7.5 5.67794 7.55268 5.55076 7.64645 5.45699C7.74021 5.36323 7.86739 5.31055 8 5.31055C8.13261 5.31055 8.25979 5.36323 8.35355 5.45699C8.44732 5.55076 8.5 5.67794 8.5 5.81055Z"
                                                                fill="#2E3B41"
                                                            />
                                                        </svg>
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <p>Size: 5 MB | Format: PDF</p>
                                    </div>
                                </div>
                                <Input
                                    inputType="text"
                                    className="clsSalesCreate_FlyerName"
                                    placeholder="Enter name"
                                    labelName="Name"
                                    customClass="clsSalesCreate_FlyerName"
                                    fieldId="flyerName"
                                    name="flyerName"
                                    _maxLength={50}
                                    errroMsg={errors?.flyerName?.message}
                                    required
                                    customProps={register("flyerName", {
                                        required: resources?.["SalesFlyer.FlyerNameWarning"]
                                    })}
                                />
                                <Input
                                    inputType="text"
                                    className="form-control img-alt clsSales_Alt clsSalesCreate_ImgAlt"
                                    placeholder="Enter Image Alt Text"
                                    labelName="Image Alt Text"
                                    customClass="clsSalesCreate_ImgAlt"
                                    fieldId="imageAlt"
                                    name="imageAlt"
                                    _maxLength={30}
                                    errroMsg={errors?.imageAlt?.message}
                                    customProps={register("imageAlt", {
                                        // required: "Enter image alt text",
                                        // pattern: {
                                        //     value: FormFieldValidations.alphabetsWithSpace.value,
                                        //     message: FormFieldValidations.alphabetsWithSpace.message
                                        // }
                                    })}
                                />

                                <Input
                                    inputType="text"
                                    className="form-control clsSalesCreate_Sequence"
                                    placeholder="Enter Sequence"
                                    labelName="Sequence"
                                    fieldId="sequence"
                                    name="sequence"
                                    customClass="clsSalesCreate_Sequence"
                                    required
                                    _maxLength={5}
                                    errroMsg={errors?.sequence?.message}
                                    custProps={`sequence${isEdit ? "" : "clsSalesFlyerCreate"}`}
                                    customProps={register("sequence", {
                                        required: "Enter Valid sequence No.",
                                        pattern: {
                                            value: FormFieldValidations.number.value,
                                            message: FormFieldValidations.number.message
                                        }
                                    })}
                                />

                                <div className="form-group keyword clsSalesCreate_Keywords">
                                    <label htmlFor="Sequence">Keyword </label>
                                    <input type="text" className="form-control" placeholder="Enter keyword" id="keyword" name="keywords" {...register("keywords", {})} />
                                </div>
                                <div className="form-group Salesflyerurl clsSalesCreate_SalesFlyerURLs" style={{ display: "none" }}>
                                    <label htmlFor="Sequence">URL </label>
                                    <input type="text" className="form-control txtSalesFlyerURLs " placeholder="Enter URL" id="SalesFlyerURL" name="url" {...register("url", {})} />
                                </div>
                                <div className="form-group date">
                                    <div className="start">
                                        <label htmlFor="enddata">Start Date</label>
                                        <input placeholder="Start Date" min={today} className="form-control w-100" id="FromDateSearch" value={fromDate} {...register("FromDate", {})} onChange={(e) => handlefromdate(e)} type={startDateInputType} onFocus={handleFocusStartDate} onBlur={handleBlur} />
                                        {/* <input type="date" className="form-control startdate clsSales_StartDate" aria-label="fromdate" id="FromDateSearch" value={fromDate} {...register("FromDate", {})} onChange={(e) => handlefromdate(e)} placeholder="From Date" /> */}
                                    </div>
                                    <div className="enddate clsSalesCreate_ExpirationDate">
                                        {/* <Input
                                            inputType="date"
                                            className="form-control clsSales_EndDate"
                                            placeholder="End Date"
                                            labelName="End Date"
                                            fieldId="ToDate"
                                            name="ToDate"
                                            required
                                            errroMsg={errors?.sequence?.message}
                                            onChange={(e) => handletodate(e)}
                                            type={endDateInputType}
                                            onFocus={handleFocusEndDate}
                                            onBlur={handleBlur}
                                            customProps={register("ToDate", {
                                                required: "Enter expried date",
                                                pattern: {
                                                    value: FormFieldValidations.number.value,
                                                    message: FormFieldValidations.number.message
                                                }
                                            })}
                                        /> */}
                                        <label htmlFor="enddata">
                                            End Date{" "}
                                            {/* <span className="redMendat" style={{ color: "red" }}>
                                                *
                                            </span> */}
                                        </label>
                                        <input placeholder="End Date" min={today} className="form-control w-100" id="ToDateSearch" value={toDate} {...register("ToDate", {})} onChange={(e) => handletodate(e)} type={endDateInputType} onFocus={handleFocusEndDate} onBlur={handleBlur} />
                                        {/* <input type="date" className="form-control enddate1 clsSales_EndDate" id="ToDateSearch" aria-label="expiredate" value={toDate} {...register("ToDate", {})} onChange={(e) => handletodate(e)} placeholder="To Date" /> */}
                                    </div>
                                </div>

                                <div className="form-group stutes d-flex justify-content-between clsSalesCreate_IsActive">
                                    <label className="col-lg-6 p-0">Status</label>
                                    <div className="col-lg-6 p-0 d-flex align-items-center justify-content-between">
                                        <label>{isOn ? "Active" : "Inactive"}</label>
                                        <div className="toggle-button">
                                            <ToggleNew />
                                        </div>
                                    </div>
                                    {/* <label className="switch">
                                        <input type="checkbox" className="clsSales_Active" checked name="isActive" {...register("isActive", { required: true })} />
                                        <span className="slider round" />
                                    </label>{" "} */}
                                </div>
                            </div>
                            <div className="footer-addsales mt-5 d-flex align-items-center justify-content-center justify-content-lg-end clsSales_Cancel">
                                <button type="button" onClick={redirectionHome} className="btn btn_search mr-2 btn-sm">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn_create btn-sm clsSalesCreate_SaveFlyer">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="Drag_img d-flex align-items-center justify-content-center p-5 clsSalesCreate_Imgupload">
                    <div className="right-imgAdd d-flex">
                        {/* <span className="icon-trash-add" onClick={handleRemoveImage}>
                            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 2.31055H9.5V1.81055C9.5 1.41272 9.34196 1.03119 9.06066 0.749887C8.77936 0.468582 8.39782 0.310547 8 0.310547H5C4.60218 0.310547 4.22064 0.468582 3.93934 0.749887C3.65804 1.03119 3.5 1.41272 3.5 1.81055V2.31055H1C0.867392 2.31055 0.740215 2.36323 0.646447 2.45699C0.552679 2.55076 0.5 2.67794 0.5 2.81055C0.5 2.94316 0.552679 3.07033 0.646447 3.1641C0.740215 3.25787 0.867392 3.31055 1 3.31055H1.5V12.3105C1.5 12.5758 1.60536 12.8301 1.79289 13.0177C1.98043 13.2052 2.23478 13.3105 2.5 13.3105H10.5C10.7652 13.3105 11.0196 13.2052 11.2071 13.0177C11.3946 12.8301 11.5 12.5758 11.5 12.3105V3.31055H12C12.1326 3.31055 12.2598 3.25787 12.3536 3.1641C12.4473 3.07033 12.5 2.94316 12.5 2.81055C12.5 2.67794 12.4473 2.55076 12.3536 2.45699C12.2598 2.36323 12.1326 2.31055 12 2.31055ZM4.5 1.81055C4.5 1.67794 4.55268 1.55076 4.64645 1.45699C4.74021 1.36323 4.86739 1.31055 5 1.31055H8C8.13261 1.31055 8.25979 1.36323 8.35355 1.45699C8.44732 1.55076 8.5 1.67794 8.5 1.81055V2.31055H4.5V1.81055ZM10.5 12.3105H2.5V3.31055H10.5V12.3105ZM5.5 5.81055V9.81055C5.5 9.94316 5.44732 10.0703 5.35355 10.1641C5.25979 10.2579 5.13261 10.3105 5 10.3105C4.86739 10.3105 4.74021 10.2579 4.64645 10.1641C4.55268 10.0703 4.5 9.94316 4.5 9.81055V5.81055C4.5 5.67794 4.55268 5.55076 4.64645 5.45699C4.74021 5.36323 4.86739 5.31055 5 5.31055C5.13261 5.31055 5.25979 5.36323 5.35355 5.45699C5.44732 5.55076 5.5 5.67794 5.5 5.81055ZM8.5 5.81055V9.81055C8.5 9.94316 8.44732 10.0703 8.35355 10.1641C8.25979 10.2579 8.13261 10.3105 8 10.3105C7.86739 10.3105 7.74021 10.2579 7.64645 10.1641C7.55268 10.0703 7.5 9.94316 7.5 9.81055V5.81055C7.5 5.67794 7.55268 5.55076 7.64645 5.45699C7.74021 5.36323 7.86739 5.31055 8 5.31055C8.13261 5.31055 8.25979 5.36323 8.35355 5.45699C8.44732 5.55076 8.5 5.67794 8.5 5.81055Z"
                                    fill="#2E3B41"
                                />
                            </svg>
                        </span> */}
                        <div className="nlpSearchWrapper searchByUploadImage drag-area">
                            <h4 className="mb-4">
                                Upload Cover Image{" "}
                                <span className="redMendat" style={{ color: "red" }}>
                                    *
                                </span>
                            </h4>
                            {show !== false && (
                                <>
                                    <div className="dragDropImageWrapper drag-center cls">
                                        <input type="file" id="dragImageFile" aria-label="Search" className="ImageFile clsSales_AddImage" multiple="" accept="image/png,image/jpeg" name="flyerImage" {...register("flyerImage", {})} onChange={(e) => onImageChange(e)} />
                                        <div className="textContent">
                                            <div className="icon">
                                                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        opacity="0.2"
                                                        d="M29.75 6.34082H7.25C6.95163 6.34082 6.66548 6.45935 6.45451 6.67033C6.24353 6.8813 6.125 7.16745 6.125 7.46582V29.9658C6.125 30.2642 6.24353 30.5503 6.45451 30.7613C6.66548 30.9723 6.95163 31.0908 7.25 31.0908H8.47203L23.8916 15.6699C23.996 15.5653 24.1201 15.4823 24.2567 15.4257C24.3933 15.3691 24.5397 15.3399 24.6875 15.3399C24.8353 15.3399 24.9817 15.3691 25.1183 15.4257C25.2549 15.4823 25.379 15.5653 25.4834 15.6699L30.875 21.0629V7.46582C30.875 7.16745 30.7565 6.8813 30.5455 6.67033C30.3345 6.45935 30.0484 6.34082 29.75 6.34082ZM14 16.4658C13.555 16.4658 13.12 16.3339 12.75 16.0866C12.38 15.8394 12.0916 15.488 11.9213 15.0769C11.751 14.6657 11.7064 14.2133 11.7932 13.7769C11.88 13.3404 12.0943 12.9395 12.409 12.6248C12.7237 12.3102 13.1246 12.0959 13.561 12.0091C13.9975 11.9222 14.4499 11.9668 14.861 12.1371C15.2722 12.3074 15.6236 12.5958 15.8708 12.9658C16.118 13.3358 16.25 13.7708 16.25 14.2158C16.25 14.8126 16.0129 15.3849 15.591 15.8068C15.169 16.2288 14.5967 16.4658 14 16.4658Z"
                                                        fill="#667B84"
                                                    />
                                                    <path
                                                        d="M29.75 5.21582H7.25C6.65326 5.21582 6.08097 5.45287 5.65901 5.87483C5.23705 6.29679 5 6.86908 5 7.46582V29.9658C5 30.5626 5.23705 31.1349 5.65901 31.5568C6.08097 31.9788 6.65326 32.2158 7.25 32.2158H29.75C30.3467 32.2158 30.919 31.9788 31.341 31.5568C31.7629 31.1349 32 30.5626 32 29.9658V7.46582C32 6.86908 31.7629 6.29679 31.341 5.87483C30.919 5.45287 30.3467 5.21582 29.75 5.21582ZM7.25 7.46582H29.75V18.3474L26.278 14.8739C25.8561 14.4523 25.284 14.2155 24.6875 14.2155C24.091 14.2155 23.5189 14.4523 23.097 14.8739L8.00516 29.9658H7.25V7.46582ZM29.75 29.9658H11.1875L24.6875 16.4658L29.75 21.5283V29.9658ZM14 17.5908C14.6675 17.5908 15.32 17.3929 15.875 17.022C16.4301 16.6512 16.8626 16.1241 17.1181 15.5074C17.3735 14.8907 17.4404 14.2121 17.3102 13.5574C17.1799 12.9027 16.8585 12.3013 16.3865 11.8293C15.9145 11.3573 15.3131 11.0359 14.6584 10.9057C14.0037 10.7754 13.3251 10.8423 12.7084 11.0977C12.0917 11.3532 11.5646 11.7858 11.1938 12.3408C10.8229 12.8958 10.625 13.5483 10.625 14.2158C10.625 15.1109 10.9806 15.9694 11.6135 16.6023C12.2464 17.2352 13.1049 17.5908 14 17.5908ZM14 13.0908C14.2225 13.0908 14.44 13.1568 14.625 13.2804C14.81 13.404 14.9542 13.5797 15.0394 13.7853C15.1245 13.9909 15.1468 14.2171 15.1034 14.4353C15.06 14.6535 14.9528 14.854 14.7955 15.0113C14.6382 15.1686 14.4377 15.2758 14.2195 15.3192C14.0012 15.3626 13.775 15.3403 13.5695 15.2552C13.3639 15.17 13.1882 15.0258 13.0646 14.8408C12.941 14.6558 12.875 14.4383 12.875 14.2158C12.875 13.9175 12.9935 13.6313 13.2045 13.4203C13.4155 13.2093 13.7016 13.0908 14 13.0908Z"
                                                        fill="#667B84"
                                                    />
                                                </svg>
                                            </div>
                                            <p>Drag &amp; drop image here</p>
                                            <p className="or">or</p>
                                            <button className="btn" id="Browseflyes">
                                                Browse{" "}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="imagedescription">
                                        <p>
                                            Dimensions: Upto {globalsetting?.["Sales-Flyer-Image-Width"]}px x {globalsetting?.["Sales-Flyer-Image-Height"]}px <br /> File: {allowedExtensions} <br /> Size: 5 MB
                                        </p>
                                    </div>
                                </>
                            )}
                            {state !== "" && <img className="salesimage" data-value={imagevalue} src={state !== "" ? state : ""} alt="" />}
                        </div>
                        {show !== true && (
                            <span className="icon-trash-add d-flex align-items-center justify-content-center" onClick={handleRemoveImage}>
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
            </div>
        </section>
    );
};
export default AddSalesFlyer;
