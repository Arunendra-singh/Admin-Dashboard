/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { PopupV3 } from "common/utils";
import { COOKIE_DETAILS, CURRENCY_GUID, LANGUAGE_GUID, TOKENS, WEBSITE_GUID, CDN_URL } from "common/utils/vars";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import "./questnAnsPopup.scss";

const UploadQtyImagePopup = ({ showPopup, closePopup, onSave, getImageData, tableIndex, optionIndex }) => {
    const [imageValue, setImageValue] = useState("");
    const [imagestate, setImageState] = useState("");
    const [showDragArea, setShowDragArea] = useState(true);
    // console.log(tableIndex, "tableIndex", optionIndex,"optionIndex", getImageData, "image");
    const extUrl = useMemo(() => {
        if (getImageData) {
            return `${CDN_URL}/${WEBSITE_GUID}/QuestionAnswer/${getImageData}`;
        }
        return "";
    }, [getImageData]);

    useEffect(() => {
        if (getImageData) {
            setImageValue(getImageData);
            setImageState(extUrl);
            setShowDragArea(false);
        }
    }, [getImageData, imagestate, imageValue, showDragArea, tableIndex, optionIndex]);

    const showWarningPopup = useCallback((message) => {
        PopupV3({
            content: `<p class="text-center">${message}</p>`,
            classes: "QaPopup text-center",
            type: "Warning",
            timeout: 5000,
            pos: 5,
        });
    }, []);

    const resetImageState = useCallback(() => {
        setImageState("");
        setImageValue("");
        setShowDragArea(true);
    }, []);

    const upload = async (uploadImagePayload) => {
        try {
            const result = await axios.post(`https://productadminbeta.ewizsaas.com/api/upload/UploadImage?action=add&type=QuestionAnswer&WebsiteGuid=${WEBSITE_GUID}&LanguageGuid=${LANGUAGE_GUID}&ax-maxFileSize=${uploadImagePayload.filemaxSize}&qquuid=${uploadImagePayload.qquuid}&qqtotalfilesize=${uploadImagePayload.filesize}&qqfile=${uploadImagePayload.filename}`, uploadImagePayload.formData, {
                headers: {
                    WebSiteGuid: WEBSITE_GUID,
                    LanguageGuid: LANGUAGE_GUID,
                    CookieDetails: COOKIE_DETAILS,
                    CurrencyGuid: CURRENCY_GUID,
                    Authorization: `Bearer ${TOKENS.SaaS_ProductAdmin_Microservice_Token}`
                }
            });
            return result;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    };

    const onImageChange = async (event) => {
        const [fileImage] = event.target.files;
        if (!fileImage) {
            console.error("No file selected.");
            return;
        }

        // Validate if more than one file is selected
        if (event.target.files.length > 1) {
            resetImageState();
            showWarningPopup("You may only upload one file.");
            return;
        }

        const { size, type } = fileImage;
        const fileSizeLimit = 5 * 1024 * 1024; // 5MB size limit
        const validExtensions = ["jpg", "png", "jpeg", "gif"];
        const extension = type.split("/").pop().toLowerCase();
        const isValidExtension = validExtensions.includes(extension);

        if (size <= fileSizeLimit && isValidExtension) {
            const fileData = new FormData();
            fileData.append("files", fileImage);

            const uploadImagePayload = {
                qquuid: uuidv4(),
                filename: fileImage.name,
                filesize: fileImage.size,
                filemaxSize: fileSizeLimit,
                formData: fileData // Ensure fileData is a FormData object
            };

            try {
                const res = await upload(uploadImagePayload);
                if (res?.data?.success === true) {
                    if (type !== "application/pdf") {
                        setImageValue(res?.data?.ElementId);
                        setImageState(res?.data?.src);
                        setShowDragArea(false);
                    }
                } else {
                    resetImageState();
                    showWarningPopup(res?.data?.info);
                }
            } catch (error) {
                console.error("Error uploading the image:", error);
            }
        } else {
            resetImageState();
            showWarningPopup("File size or type doesn't match");
        }
    };

    const uploadRemove = async () => {
        try {
            const result = await axios.post(
                `https://productadminbeta.ewizsaas.com/api/upload/UploadImage?action=remove&type=QuestionAnswer&Guid=${imageValue}&WebsiteGuid=${WEBSITE_GUID}`,
                {},
                {
                    headers: {
                        WebSiteGuid: WEBSITE_GUID,
                        LanguageGuid: LANGUAGE_GUID,
                        CookieDetails: COOKIE_DETAILS,
                        CurrencyGuid: CURRENCY_GUID,
                        Authorization: `Bearer ${TOKENS.SaaS_ProductAdmin_Microservice_Token}`
                    }
                }
            );
            if (result.status === 200) {
                onSave("", tableIndex, optionIndex); // Pass selected image data to parent
                closePopup(); // Close the popup after saving
            } else {
                console.log("Failed to remove image with status:", result.status);
            }
        } catch (error) {
            console.error("Error in uploadRemove:", error);
        }
    };

    const handleRemoveImage = async () => {
        PopupV3({
            content: "<p class='text-center'>Are you sure want to delete the image?</p>",
            type: "Confirm", // Assuming you have different types like 'warning', 'info', etc.
            classes: "QaPopup text-center",
            title: "Are you sure want to delete the image?",
            actions: [
                {
                    dismiss: true,
                    text: "Yes",
                    classes: "btn-info",
                    do: async () => {
                        // Mark this function as async
                        try {
                            const res = await uploadRemove(); // Ensure 'upload' function is defined
                            if (res?.status === 200) {
                                resetImageState();
                            }
                        } catch (error) {
                            console.error("Error uploading image:", error);
                        }
                    }
                },
                {
                    text: "No",
                    classes: "btn-cancel",
                    dismiss: true
                }
            ]
        });
    };

    const saveSelectedImage = () => {
        onSave(imageValue, tableIndex, optionIndex); // Pass selected image data to parent
        closePopup(); // Close the popup after saving
    };

    return (
        <Modal className="MaptoQuesPop" size="lg" show={showPopup} onHide={closePopup}>
            <ModalHeader closeButton={true}>
                <ModalTitle>Upload File</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <>
                    <div className="popupContent-Wrap drag-area">
                        {showDragArea === true ? (
                            <>
                                <div className="dragDropImageWrapper drag-center cls">
                                    <input type="file" className="ImageFile" accept="image/png,image/jpeg" onChange={(e) => onImageChange(e)} />
                                    <div className="textContent text-center">
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
                                        <p>Drag & drop image here</p>
                                        <p className="or">or</p>
                                        <button type="button" className="btn btn-info" id="BrowseImage">
                                            Browse
                                        </button>
                                    </div>
                                </div>
                                <div className="imagedescription">
                                    <p>Please upload a file (jpg, png, jpeg, gif) with a maximum size of 5MB and dimensions of 500x500.</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <input type="file" className="ImageFile" accept="image/png,image/jpeg" onChange={(e) => onImageChange(e)} style={{ visibility: "hidden" }} />
                                <img className="choiceimage" data-value={imageValue} src={imagestate} alt="Uploaded preview" />
                                <span><i className="icon icon-trash-2" onClick={handleRemoveImage} /> Remove Image</span>
                            </>
                        )}
                    </div>
                    <div className="table-action-btns mt-3">
                        <button type="button" className="btn btn-cancel ml-auto" onClick={closePopup}> Cancel </button>
                        <button type="button" className="btn btn-submit" onClick={saveSelectedImage}> Ok </button>
                    </div>
                </>
            </ModalBody>
        </Modal>
    );
};

export default UploadQtyImagePopup;
