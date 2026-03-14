import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback, useRef } from "react";
import { CDN_URL, TOKENS, WEBSITE_GUID, MS_URL, LANGUAGE_GUID } from "common/utils/vars";
import axios from "axios";
// import { SketchPicker } from "react-color";
import Ckeditor from "react-ckeditor-component/lib/ckeditor";
import SketchPicker from "react-color";
import selectDropDown from "../../../helpers/utils/selectDropDownData";
import buttonGroup from "../../../helpers/utils/buttonGroup";

const HtmlGenerator = ({ setting, register, getValues, setValue }) => {
    const [uploadedImageUrls, setUploadedImageUrls] = useState({}); // Store URLs per image uploader

    useEffect(() => {
        setUploadedImageUrls({});
    }, [setting]);

    if (setting.fieldType === "textarea") {
        return (
            <div className="frm_grp_inline">
                <label className="textarea-label label" htmlFor={setting.propsName}>{setting.customLabel ? setting.customLabel : setting.propsName}</label>
                <textarea {...register} defaultValue={setting.propsValue} id={setting.propsName} aria-label={setting.propsName} className={`form-control ele_form_control ${setting.disabled ? "disabled" : ""}`} />
            </div>
        );
    }

    if (setting.fieldType === "ckeditor") {
        const updateContent = (newContent) => {
            const objsetting1 = setting;
            objsetting1.propsValue = newContent;
            // const objsetting = { ...setting, propsValue: newContent };
            // const formValues = getValues();
            // if ("content" in formValues && setting.propsName === "content") {
            setValue("content", newContent);
            // }
        };

        const onChange = (evt) => {
            const newContent = evt?.editor?.getData();
            updateContent(newContent);
        };

        const onBlur = () => {
            // Handle blur event if needed
        };

        const afterPaste = (evt) => {
            const newContent = evt?.editor?.getData();
            updateContent(newContent);
        };

        // Effect to call onChange when the editor loads for the first time
        useEffect(() => {
            const initialContent = setting.propsValue;
            if (initialContent) {
                updateContent(initialContent);
            }
        }, [setting.propsValue]);

        return (
            <div className="frm_grp">
                <label className="textarea-label label" htmlFor={setting.propsName}>{setting.customLabel ? setting.customLabel : setting.propsName}</label>
                <Ckeditor
                    id={setting.propsName}
                    {...register}
                    // defaultValue={setting.propsValue}
                    aria-label={setting.propsName}
                    activeClass="ele_form_editorcontrol"
                    content={setting.propsValue}
                    events={{
                        blur: (e) => onBlur(e),
                        afterPaste: (e) => afterPaste(e),
                        change: (e) => onChange(e)
                    }}
                />
            </div>
        );
    }

    if (setting.fieldType === "input" && setting.inputType === "checkbox") {
        return <label className="checkbox-label label" htmlFor={setting.propsName}>{setting.customLabel ? setting.customLabel : setting.propsName} <input {...register} defaultChecked={setting.propsValue} id={setting.propsName} aria-label={setting.propsName} className={`form-control  ${setting.disabled ? "disabled" : ""}`} type={setting.inputType} /></label>;
    }

    if (setting.fieldType === "input" && setting.inputType === "url" && setting.customfield === "imageuploader") {
        const [errorMessage, setErrorMessage] = useState("");

        const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"]; // List of allowed image types

        // Upload file to the server
        const uploadFile = async (file, propsName) => {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const posturl = `${MS_URL.CATALOG}api/upload/uploadimageAPI?type=V2_PageConfigurator&action=add&CurrentSlidePosition=1&fileName=${file.name}&WebsiteGuid=${WEBSITE_GUID}`;
                const token = TOKENS.SaaS_ControlPanel_Microservice_Token;
                const Languageguid = LANGUAGE_GUID;
                const Websiteguid = WEBSITE_GUID;
                const CookieDetails = window.cookiedetails;

                const response = await axios.post(
                    posturl,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            authorization: token ? `Bearer ${token}` : "",
                            Languageguid,
                            Websiteguid,
                            CookieDetails
                        }
                    }
                );

                if (response?.data?.data?.src) {
                    const completeImageUrl = new URL(response.data.data.src, MS_URL.CATALOG).href;
                    setUploadedImageUrls((prevState) => ({
                        ...prevState,
                        [propsName]: completeImageUrl
                    }));
                    console.log("Uploaded Image URL:", completeImageUrl); // Debugging log to ensure URL is correct
                } else {
                    setErrorMessage("Image URL is missing in the response.");
                }
            } catch (error) {
                console.error("Error uploading file", error);
            }
        };

        // Handle file selection and upload
        const handleFileChange = async (event, propsName) => {
            const file = event.target.files[0];
            if (file) {
                if (!allowedImageTypes.includes(file.type)) {
                    setErrorMessage("Invalid file type. Please select an image file (JPEG, PNG, GIF).");
                    setUploadedImageUrls((prevState) => ({
                        ...prevState,
                        [propsName]: ""
                    }));
                    return;
                }

                setErrorMessage(""); // Clear any previous error message
                await uploadFile(file, propsName);
            }
        };

        // Handle image deletion
        const handleDelete = (propsName) => {
            setUploadedImageUrls((prevState) => ({
                ...prevState,
                [propsName]: ""
            }));
            setValue("src", ""); // Assuming setValue is part of your form handling
        };

        const uploadedImageUrl = uploadedImageUrls[setting.propsName]; // Get the uploaded URL for this instance

        if (uploadedImageUrl) {
            const formValues = getValues();
            // Update form state when image uploader content changes
            if ("src" in formValues && setting.propsName === "src") {
                setValue("src", uploadedImageUrl);
            }
        }

        return (
            <>
                <div className={`frm_grp_inline ${setting.group ? setting.propsName.replace(/\s+/g, "") : "ChooseImage"}`}>
                    <label className="input-label label" htmlFor={setting.propsName}>
                        {setting.customLabel ? setting.customLabel : setting.propsName}
                    </label>
                    <i className="icon icon-bx_image-add image-add" />
                    <input
                        id="ImageUrl"
                        aria-label="ImageUrl"
                        className="form-control ele_form_control"
                        type="file"
                        onChange={(e) => handleFileChange(e, setting.propsName)} // Pass propsName to identify the instance
                    />
                </div>
                {errorMessage && <small className="error-message">{errorMessage}</small>}

                {uploadedImageUrl && (
                    <div className="ImageViewer">
                        <i className="icon icon-trash ico-btndelete" onClick={() => handleDelete(setting.propsName)} />
                        <img
                            className="uploadedImageView"
                            alt="Uploaded"
                            src={uploadedImageUrl} // Ensure this has the correct URL
                            width="100%"
                            height="auto"
                        />
                    </div>
                )}

                <div className="frm_grp_inline imageUrl">
                    <label className="input-label label" htmlFor={setting.propsName}>{setting.propsName}</label>
                    <input {...register} defaultValue={setting.propsValue} id={setting.propsName} aria-label={setting.propsName} className="form-control ele_form_control" type={setting.inputType} />
                </div>
            </>
        );
    }

    if (setting.fieldType === "input") {
        return (
            <div className={`frm_grp_inline ${setting.group ? setting.propsName.replace(/\s+/g, "") : ""}`}>
                <label className="input-label label" htmlFor={setting.propsName}>{setting.customLabel ? setting.customLabel : setting.propsName}</label>
                <input {...register} defaultValue={setting.propsValue} id={setting.propsName} aria-label={setting.propsName} className={`form-control ele_form_control ${setting.disabled ? "disabled" : ""}`} type={setting.inputType} />
            </div>
        );
    }

    if (setting.fieldType === "select") {
        const [selectOptions, setSelectedOption] = useState([]);
        const [selectedValue, setSelectedValue] = useState(setting.propsValue);
        const [selectedName, setSelectedName] = useState(setting.propsValue);
        const [dropdownVisible, setDropdownVisible] = useState(false);

        const loadOptionData = async () => {
            const path = window.location.host.indexOf("localhost") > -1 ? "src/helpers/json/collectionOptionsList.json" : `${CDN_URL}/${WEBSITE_GUID}/build/js/collectionOptionsList.json`;
            const response = await fetch(path);
            const jsonData = await response.json();
            setSelectedName(jsonData.data.filter((s) => s.alias === setting.propsValue)[0].name);

            const objectData = await jsonData.data.reduce(
                (group, arr) => {
                    const { type } = arr;
                    // eslint-disable-next-line no-param-reassign
                    group[type] = group[type] ?? [];
                    group[type].push(arr);
                    return group;
                },
                {}
            );
            setSelectedOption(objectData);
        };

        useEffect(() => {
            if (setting.apiCallToFetchOption.includes("Category")) {
                loadOptionData();
            } else {
                const _selectDropDown = Object.fromEntries(Object.entries(selectDropDown).filter(([key]) => key.includes(setting.apiCallToFetchOption)));
                const _selectedData = _selectDropDown[`${setting.apiCallToFetchOption}`].filter((s) => setting.propsValue === s.alias)[0];

                setSelectedOption(_selectDropDown);
                setSelectedName(_selectedData.name);
                setSelectedValue(_selectedData.alias);
            }
        }, [setting]);

        const toggleSelectOption = useCallback((alias, name) => {
            setSelectedValue(alias);
            setSelectedName(name);

            // need this only when we have section name & title and change the title value if we change the section from select
            const formValues = getValues();
            if ("sectionTitle" in formValues && setting.propsName === "sectionName") {
                setValue("sectionTitle", name);
            } else if ("textTransform" in formValues && setting.propsName === "textTransform") {
                setValue("textTransform", name);
            } else if ("fontWeight" in formValues && setting.propsName === "fontWeight") {
                setValue("fontWeight", name);
            } else if ("type" in formValues && setting.propsName === "type") {
                setValue("type", alias);
            } else if ("fontFamily" in formValues && setting.propsName === "fontFamily") {
                setValue("fontFamily", alias);
            } else if ("border type" in formValues && setting.propsName === "border type") {
                setValue("border type", alias);
            }

            setDropdownVisible(false);
        }, [selectedValue]);

        const handleDropdownToggle = () => {
            setDropdownVisible((prev) => !prev); // Toggle dropdown visibility
        };

        return (
            <div className={`frm_grp_inline ${setting.group ? setting.propsName.replace(/\s+/g, "") : ""}`}>
                <label className="input-label label" htmlFor={setting.propsName}>{setting.customLabel ? setting.customLabel : setting.propsName}</label>
                <input {...register} defaultValue={setting.propsValue} id={setting.propsName} aria-label={setting.propsName} className="form-control ele_form_control " type="hidden" />
                <button className="customDropdownBtn" type="button" onClick={handleDropdownToggle}>{selectedName}</button>
                {dropdownVisible && (
                    <ul className={`customDropdown mainUl drop${setting.propsName.replace(/\s+/g, "")} ${setting.disabled ? "disabled" : ""}`}>
                        {Object.keys(selectOptions).map((group) => (
                            <li key={group} label={group}>
                                <span className="groupHeading">{group}</span>
                                <ul className="customDropdown subUl">
                                    {selectOptions[group].map((opt) => <li className={`${selectedValue === opt.alias ? "selected" : ""}`} onClick={() => toggleSelectOption(opt.alias, opt.name)} key={opt.alias} value={opt.alias}>{opt.name}</li>)}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }

    if (setting.fieldType === "buttongroup") {
        const setbtnbocolor = () => {
            if (document.getElementsByClassName(`btn_group_${setting.buttonGroupType}`).length) {
                const btns = document.getElementsByClassName(`btn_group_${setting.buttonGroupType}`)[0].childNodes;
                btns.forEach((btn) => {
                    if (btn.classList.contains("active")) {
                        btn.classList.remove("active");
                    }
                });
            }
        };
        // setbtnbocolor();
        const onClickHandler = useCallback((e) => {
            e.preventDefault();
            setbtnbocolor();
            e.target.classList.add("active");
            const objsetting = setting;
            objsetting.propsValue = e.target.value;
            if (setting.buttonGroupType === "alignment") {
                setValue("alignment", e.target.value);
            } else {
                setValue("display", e.target.value);
            }
        }, []);
        const buttons = buttonGroup[setting.buttonGroupType] || [];
        return (
            <div className={`frm_grp_inline ${setting.group ? setting.propsName.replace(/\s+/g, "") : ""}`}>
                <label className="input-label-inline label" htmlFor={setting.propsName}>{setting.customLabel ? setting.customLabel : setting.propsName}</label>
                <div className={`btn_group_${setting.buttonGroupType}`} style={{ display: "flex" }}>
                    {buttons.map((objbutton) => (
                        <button
                            key={objbutton.alias}
                            onClick={(e) => onClickHandler(e)}
                            className={`${objbutton.class} ${setting?.propsValue === objbutton.alias && "active"}`}
                            value={objbutton.alias}
                            type="button"
                            aria-label={objbutton.alias}
                        />
                    ))}
                </div>
                <input {...register} defaultValue={setting.propsValue} name={setting.propsName} id={setting.propsName} aria-label={setting.propsName} className="form-control" type="hidden" />
            </div>
        );
    }

    if (setting.fieldType === "multibuttongroup") {
        const onClickHandler = useCallback((e) => {
            e.preventDefault();
            // Toggle the 'active' class on the clicked button
            e.target.classList.toggle("active");
            // Get all buttons in the group
            const btns = Array.from(document.getElementsByClassName(`btn_group_${setting.buttonGroupType}`)[0].childNodes);

            // Extract the values of all active buttons
            const selectedValues = btns
                .filter((btn) => btn.classList.contains("active"))
                .map((btn) => btn.value);

            // Update the propsValue with the selected values
            const objsetting = setting;
            objsetting.propsValue = selectedValues;

            // Update the corresponding value in the form
            if (setting.buttonGroupType === "display") {
                setValue("display", selectedValues);
            }
        }, []);

        const buttons = buttonGroup[setting.buttonGroupType] || [];
        return (
            <div className={`frm_grp_inline ${setting.group ? setting.propsName.replace(/\s+/g, "") : ""}`}>
                <label className="input-label-inline label" htmlFor={setting.propsName}>
                    {setting.customLabel ? setting.customLabel : setting.propsName}
                </label>
                <div className={`btn_group_${setting.buttonGroupType}`} style={{ display: "flex" }}>
                    {buttons.map((objbutton) => (
                        <button
                            key={objbutton.alias}
                            onClick={(e) => onClickHandler(e)}
                            className={`${objbutton.class} ${setting?.propsValue?.includes(objbutton.alias) && "active"}`}
                            value={objbutton.alias}
                            type="button"
                            aria-label={objbutton.alias}
                        />
                    ))}
                </div>
                <input
                    {...register}
                    defaultValue={setting.propsValue}
                    name={setting.propsName}
                    id={setting.propsName}
                    aria-label={setting.propsName}
                    className="form-control"
                    type="hidden"
                />
            </div>
        );
    }
    if (setting.fieldType === "color-picker") {
        const colorPickerRef = useRef(null);

        const [color, setColor] = useState(setting.propsValue);
        const [showPicker, setShowPicker] = useState(false);
        // const [pickerTimeout, setPickerTimeout] = useState(null); // Add state to hold the timeout

        useEffect(() => {
            const handleOutsideClick = (event) => {
                if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
                    setShowPicker(false);
                }
            };
            document.addEventListener("mousedown", handleOutsideClick);
            return () => {
                document.removeEventListener("mousedown", handleOutsideClick);
            };
        }, [colorPickerRef, setShowPicker]);

        const setcolorval = (colorval) => {
            if (setting.propsName === "color") {
                setValue("color", colorval);
            } else if (setting.propsName === "background color") {
                setValue("background color", colorval);
            } else if (setting.propsName === "bordercolor") {
                setValue("bordercolor", colorval);
            } else {
                setValue("text color", colorval);
            }
        };
        setcolorval(setting.propsValue);
        const handleChangeComplete = (objcolor, event) => {
            if (event && (event.target.classList.contains("saturation-white") || event.target.classList.contains("saturation-black"))) {
                // Close the picker only when the user selects a color from the top color panel
                setShowPicker(false);
            }
            setColor(objcolor.hex);
            console.log(color);
            const objsetting = setting;
            objsetting.propsValue = objcolor.hex;
            setcolorval(objcolor.hex);
        };
        const closeshowPicker = () => {
            setShowPicker(false);
        };
        // useEffect(() => {
        //     if (showPicker) {
        //         // Set a timeout to automatically close the picker after 5 seconds (5000 milliseconds)
        //         const timeout = setTimeout(() => {
        //             setShowPicker(false);
        //         }, 2500);
        //         setPickerTimeout(timeout); // Store the timeout ID
        //         return () => clearTimeout(timeout); // Cleanup timeout on unmount or when showPicker changes
        //     }
        //     return undefined;
        // }, [showPicker]);
        const hexToRgb = (hex) => {
            // Remove the hash at the start if it's there
            const objhex = hex.replace(/^#/, "");
            // hex = hex.replace(/^#/, '');

            // Parse the r, g, b values from the hex code
            const bigint = parseInt(objhex, 16);

            // Calculate RGB components
            const r = Math.floor(bigint / 0x10000);
            const g = Math.floor((bigint % 0x10000) / 0x100);
            const b = bigint % 0x100;

            return { r, g, b };
        };

        const calculateLightness = (hex) => {
            const { r, g, b } = hexToRgb(hex);
            const lightness = (r + g + b) / 3;
            const percentage = (lightness / 255) * 100;
            return percentage;
        };

        const lightnessPercentage = calculateLightness(setting.propsValue);

        // Function to calculate lightness percentage

        return (
            <div className={`frm_grp_inline ${setting.group ? setting.propsName.replace(/\s+/g, "") : ""}`}>
                <label className="input-label-inline label" htmlFor={setting.propsName}>{setting.customLabel ? setting.customLabel : setting.propsName}</label>
                {showPicker && (
                    <div className="colorPicker" style={{ position: "fixed", zIndex: 1, bottom: "15px" }} ref={colorPickerRef}>
                        <button type="button" className="btnClosed" onClick={closeshowPicker}> <i className="icon-XCircle-1" /></button>
                        <SketchPicker
                            color={setting.propsValue}
                            onChangeComplete={handleChangeComplete}
                        />
                    </div>
                )}
                <div className="btn_group_color" onClick={() => setShowPicker(!showPicker)}>
                    <button
                        className="btn_clr"
                        type="button"
                        style={{
                            width: "30px", height: "25px", backgroundColor: setting.propsValue
                        }}
                        aria-label="colorbutton"
                    />
                    <button className="btn_clr_code" type="button">{setting.propsValue}</button>
                    <button className="btn_clr_opacity" type="button">{`${lightnessPercentage.toFixed(0)} %`}</button>
                </div>
            </div>
        );
    }

    if (setting.fieldType !== undefined && setting.fieldType.startsWith("multifields.")) {
        if (setting.fieldType === "multifields.input") {
            // Check if propsName is one of 'top', 'right', 'bottom', or 'left', and if propsValue is empty, set it to "0"
            let defaultValue;
            const onInputBlur = (e) => {
                const val = e.target.value;
                const formValues = getValues();
                // Check if the input is completely blank
                if (val === "") {
                    // Set the defaultValue to "0" if propsValue is empty and propsName is one of 'top', 'right', 'bottom', or 'left'
                    defaultValue = (["top", "right", "bottom", "left", "x", "y", "blur", "spread"].includes(setting.propsName) && setting.propsValue === "") ? "0" : setting.propsValue;
                    // Trigger any additional logic for a blank input
                    // Reset the form value for the current setting
                    if ("top" in formValues && setting.propsName === "top") {
                        setValue("top", defaultValue);
                    } else if ("right" in formValues && setting.propsName === "right") {
                        setValue("right", defaultValue);
                    } else if ("bottom" in formValues && setting.propsName === "bottom") {
                        setValue("bottom", defaultValue);
                    } else if ("left" in formValues && setting.propsName === "left") {
                        setValue("left", defaultValue);
                    } else if ("x" in formValues && setting.propsName === "x") {
                        setValue("x", defaultValue);
                    } else if ("y" in formValues && setting.propsName === "y") {
                        setValue("y", defaultValue);
                    } else if ("blur" in formValues && setting.propsName === "blur") {
                        setValue("blur", defaultValue);
                    } else if ("spread" in formValues && setting.propsName === "spread") {
                        setValue("spread", defaultValue);
                    }
                } else {
                    // Handle other cases, such as two-digit input
                    defaultValue = /^\d{2}$/.test(val) ? val : setting.propsValue;
                    if (["top", "right", "bottom", "left", "x", "y", "blur", "spread"].includes(setting.propsName) && !formValues[setting.propsName]) {
                        // Example: Show an error message or reset value
                        console.log(`Please enter a value for ${setting.propsName}`);
                        setValue(setting.propsName, "0"); // Resetting value if empty
                    }
                }
            };
            return (
                <div className={`frm_grp_inline ${setting.propsName.replace(/\s+/g, "")}`}>
                    {setting.propsName && <label className="input-label label d-none" htmlFor={setting.propsName}>{setting.customLabel ? setting.customLabel : setting.propsName}</label>}
                    <input {...register} defaultValue={setting.propsValue} id={setting.propsName} aria-label={setting.propsName} className={`form-control ele_form_control ${setting.disabled ? "disabled" : ""}`} type={setting.inputType} onBlur={onInputBlur} />
                </div>
            );
        }
        if (setting.fieldType === "multifields.select") {
            const [selectOptions, setSelectedOption] = useState([]);
            const [selectedValue, setSelectedValue] = useState(setting.propsValue);
            const [selectedName, setSelectedName] = useState(setting.propsValue);
            const [dropdownVisible, setDropdownVisible] = useState(false);

            const loadOptionData = async () => {
                const path = window.location.host.indexOf("localhost") > -1 ? "src/helpers/json/collectionOptionsList.json" : `${CDN_URL}/${WEBSITE_GUID}/build/js/collectionOptionsList.json`;
                const response = await fetch(path);
                const jsonData = await response.json();
                setSelectedName(jsonData.data.filter((s) => s.alias === setting.propsValue)[0].name);

                const objectData = await jsonData.data.reduce(
                    (group, arr) => {
                        const { type } = arr;
                        // eslint-disable-next-line no-param-reassign
                        group[type] = group[type] ?? [];
                        group[type].push(arr);
                        return group;
                    },
                    {}
                );
                setSelectedOption(objectData);
            };

            useEffect(() => {
                if (setting.apiCallToFetchOption.includes("Category")) {
                    loadOptionData();
                } else {
                    const _selectDropDown = Object.fromEntries(Object.entries(selectDropDown).filter(([key]) => key.includes(setting.apiCallToFetchOption)));
                    const _selectedData = _selectDropDown[`${setting.apiCallToFetchOption}`].filter((s) => setting.propsValue === s.alias)[0];

                    setSelectedOption(_selectDropDown);
                    setSelectedName(_selectedData.name);
                    setSelectedValue(_selectedData.alias);
                }
            }, [setting]);

            const toggleSelectOption = useCallback((alias, name) => {
                setSelectedValue(alias);
                setSelectedName(name);

                // need this only when we have section name & title and change the title value if we change the section from select
                const formValues = getValues();

                if ("sectionTitle" in formValues && setting.propsName === "sectionName") {
                    setValue("sectionTitle", name);
                } else if ("textTransform" in formValues && setting.propsName === "textTransform") {
                    setValue("textTransform", name);
                } else if ("fontWeight" in formValues && setting.propsName === "fontWeight") {
                    setValue("fontWeight", name);
                } else if ("type" in formValues && setting.propsName === "type") {
                    setValue("type", alias);
                } else if ("fontFamily" in formValues && setting.propsName === "fontFamily") {
                    setValue("fontFamily", alias);
                }

                setDropdownVisible(false);
            }, [selectedValue]);

            const handleDropdownToggle = ((obj) => {
                setDropdownVisible((prev) => !prev); // Toggle dropdown visibility
                const dropdowns = document.querySelectorAll(".customDropdownBtn");
                dropdowns.forEach((dropdown) => {
                    if (dropdown !== obj.target) {
                        const dropdownList = dropdown.nextElementSibling;
                        if (dropdownList && dropdownList.classList.contains("mainUl")) {
                            dropdownList.style.display = "none";
                            setDropdownVisible(false); // Toggle dropdown visibility
                        }
                    }
                });

                const dropdownList = obj.target.nextElementSibling;
                if (dropdownList && dropdownList.classList.contains("mainUl")) {
                    dropdownList.style.display = dropdownList.style.display === "block" ? "none" : "block";
                    setDropdownVisible(dropdownList.style.display === "block");
                } else {
                    setDropdownVisible(true);
                }
            });

            return (
                <div className={`frm_grp_inline ${setting.propsName.replace(/\s+/g, "")}`}>
                    {setting.propsName && <label className="input-label label d-none" htmlFor={setting.propsName}>{setting.customLabel ? setting.customLabel : setting.propsName}</label>}
                    <input {...register} defaultValue={setting.propsValue} id={setting.propsName} aria-label={setting.propsName} className="form-control ele_form_control " type="hidden" />
                    <button className="customDropdownBtn" type="button" onClick={(e) => handleDropdownToggle(e)}>{selectedName}</button>
                    {dropdownVisible && (
                        <ul className={`customDropdown mainUl ${setting.disabled ? "disabled" : ""}`}>
                            {Object.keys(selectOptions).map((group) => (
                                <li key={group} label={group}>
                                    <span className="groupHeading">{group}</span>
                                    <ul className="customDropdown subUl">
                                        {selectOptions[group].map((opt) => <li className={`${selectedValue === opt.alias ? "selected" : ""}`} onClick={() => toggleSelectOption(opt.alias, opt.name)} key={opt.alias} value={opt.alias}>{opt.name}</li>)}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            );
        }
    }

    return <div>test</div>;
};

const ConfigSetting = ({ elementData = {}, panel }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
        setValue
    } = useForm();

    // const [animate, setAnimation] = useState(true);
    // const [style, showStyles] = useState(false);

    useEffect(() => {
        reset();
    }, [elementData]);

    const onSubmit = async (data) => {
        const iframe = document.querySelector("iframe[src*='v2/PageViewer']");
        iframe.contentWindow.postMessage(JSON.stringify({
            type: "select-element",
            component: {
                props: {
                    ...data
                }
            },
            elemId: elementData.elemId
        }), "*");
        panel(false);
    };

    const cancelClick = (e) => {
        e.preventDefault();
        panel(false);
    };
    // Group settings by their 'group' property
    const groupedSettings = elementData.settings.reduce((acc, setting) => {
        const group = setting.group || "ungrouped";
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(setting);
        return acc;
    }, {});

    // const toggleBtn = useCallback(() => {
    //     setAnimation(!animate);
    // }, [animate]);

    // const toggleStyle = useCallback(() => {
    //     showStyles(!style);
    // }, [style]);

    return (
        <div className="configurations">
            {/* <strong type="button" onClick={toggleBtn} className={`toggleBtn ${animate ? "show" : ""}`}>Element Setting</strong> */}
            <form onSubmit={handleSubmit(onSubmit)} className="element-setting animate">
                <div className="form-section">
                    {/* {elementData.settings.map((setting) => (
                        <div className={`${setting.group} form-group`} key={setting.propsName}>
                            <HtmlGenerator
                                setting={setting}
                                getValues={getValues}
                                setValue={setValue}
                                register={register(setting.propsName, { required: setting.required ? "field required" : "" })}
                            />
                            <small className="text-danger">{errors[`${setting.propsName}`]?.message}</small>
                        </div>
                    ))} */}
                    {Object.entries(groupedSettings).map(([group, settings]) => (
                        group === "ungrouped" ? (
                            settings.map((setting) => (
                                <div className="form-group">
                                    <HtmlGenerator key={setting.propsName} setting={setting} register={register(setting.propsName)} getValues={getValues} setValue={setValue} />
                                    {errors[`${setting.propsName}`]?.message && (<small className="text-danger">{errors[`${setting.propsName}`]?.message}</small>)}
                                </div>
                            ))
                        ) : (
                            <div key={group} className={`multicontrols-formgroup ${group.replace(/\s+/g, "")}-group`}>
                                <label className="input-label label" htmlFor={group}>{group}</label>
                                <div className="form-group">
                                    {settings.map((setting) => (
                                        <>
                                            <HtmlGenerator key={setting.propsName} setting={setting} register={register(setting.propsName)} getValues={getValues} setValue={setValue} />
                                            {errors[`${setting.propsName}`]?.message && (<small className="text-danger">{errors[`${setting.propsName}`]?.message}</small>)}
                                        </>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
                <div className="footer-form-actions d-flex justify-content-lg-end">
                    <button className="btn btn_cancel" type="button" onClick={(e) => cancelClick(e)}>Cancel</button>
                    <button className="btn btn_create" type="submit">Save</button>
                    {/* <button className="btn btn-outline-primary" type="button" onClick={toggleStyle}>Add Css</button> */}
                </div>
            </form>
        </div>
    );
};

export default ConfigSetting;
