/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import MapQuesPopup from "../../Pages/QuestionAnswer/popUps/mapQuesPopup";
import UploadQtyImagePopup from "../../Pages/QuestionAnswer/popUps/uploadQtyImagePopup";

const ChoicesTable = ({ isChoices, choices, inputTypeValue, onChoicesUpdate }) => {
    const [mapQuesPopup, setMapQuesPopup] = useState(false);
    const [mapQuesData, setMapQuesData] = useState([]);
    const [mapImagePopup, setMapImgPopup] = useState(false);
    const [uploadedImages, setUploadedImages] = useState("");
    const [currentImageUpload, setCurrentImageUpload] = useState(null);
    const [choiceIndex, setChoiceIndex] = useState("");
    const addChoice = () => {
        const newChoice = {
            choicesName: "",
            choicesCode: "",
            choiceGuid: null,
            position: 0,
            price: 0,
            charges: 0,
            priceBreakName: "",
            priceQuantity: "",
            dependentQuestion: null,
            isDefault: false,
            setupCharge: 0,
            description: "",
            imageName: null,
            isImprintAvailable: false,
            colors: null,
            productGuid: null,
            componentCode: null,
            discountCode: "",
            extraPriceBreakName: "",
            isShowAsRadioButton: false,
            isShowAsQuestionTitle: false,
            imageNameForQuestionAnswer: null,
            colorHexValue: null
        };
        onChoicesUpdate((prevChoices) => [
            ...prevChoices,
            newChoice
        ]);
    };

    const updateChoices = (updatedChoices) => {
        // setChoices(updatedChoices);
        onChoicesUpdate(updatedChoices); // Pass updated data to parent component
    };

    // Handle change for the choices option fields
    const handleChange = (index, field, value) => {
        const updatedChoices = [...choices];

        // Determine the new value based on the field type
        let newVal;

        if (field === "position" || field === "price" || field === "setupCharge") {
            newVal = value !== "" && value !== undefined && !Number.isNaN(value) ? parseInt(value, 10) : 0;
        } else {
            newVal = value; // For all other fields, use the value directly
        }
        // Update the specific choice in the updatedChoices array
        updatedChoices[index] = {
            ...updatedChoices[index],
            [field]: newVal
        };
        // Update the state with the new choices
        updateChoices(updatedChoices);
    };

    const setDefaultOption = (optionIndex) => {
        const updatedChoices = choices.map((option, j) => ({
            ...option,
            isDefault: j === optionIndex
        }));

        updateChoices(updatedChoices);
    };

    const resetDefault = () => {
        const updatedChoices = choices.map((option) => ({
            ...option,
            isDefault: false
        }));

        updateChoices(updatedChoices);
    };

    // Function to handle removing an option
    const handleRemoveOption = (optionIndex) => {
        const updatedChoices = choices.filter((_, i) => i !== optionIndex);
        updateChoices(updatedChoices);
    };
    const mapQAOptions = (optionIndex, mapQues) => {
        // setPopupPurpose({ tableIndex, optionIndex });
        setMapQuesData(mapQues ?? []);
        setChoiceIndex(optionIndex);
        setMapQuesPopup(true);
    };

    const handleSaveQuestions = (selectedQuestions) => {
        const updatedChoices = choices.map((choice, i) => {
            if (i === choiceIndex) {
                // Return a new object with the updated dependentQuestion
                return { ...choice, dependentQuestion: selectedQuestions };
            }
            return choice; // Return the original choice if it doesn't match
        });

        updateChoices(updatedChoices); // Call your existing function to update choices
        setMapQuesPopup(false); // Close the popup after saving
    };

    const UploadProofClick = (optionIndex, image) => {
        setUploadedImages(image);
        setCurrentImageUpload(optionIndex);
        setMapImgPopup(true);
    };

    const handleImageUpload = (selectedImage, tableIndex, optionIndex) => {
        const updatedChoices = choices.map((choice, i) => {
            if (i === optionIndex) {
                // Return a new object with the updated dependentQuestion
                return { ...choice, imageNameForQuestionAnswer: selectedImage };
            }
            return choice; // Return the original choice if it doesn't match
        });
        updateChoices(updatedChoices); // Call your existing function to update choices
    };

    const closePopup = () => {
        setMapQuesPopup(false);
        setMapImgPopup(false);
    };

    return (
        <section className="OptionArea" style={{ display: isChoices === true ? "block" : "none" }}>
            <div className="headingWithbutton">
                <h4 className="label sectionSubTitle">Choices (Value Of Your Options)</h4>
                <button type="button" className="btn AddMoreOptions" onClick={() => addChoice()}>
                    + Add more options
                </button>
            </div>
            <div className="table-responsive">
                <table className="table formTable" id="coltab">
                    <thead>
                        <tr>
                            <th>Choice</th>
                            <th>Choice Code</th>
                            <th>Position</th>
                            <th>Price/PriceBreakName</th>
                            <th>Extra PriceBreakName</th>
                            <th>Setup Charge</th>
                            <th>Discount Code</th>
                            <th>Description</th>
                            <th>Select Per Color/Quantity</th>
                            <th>Options</th>
                            <th className="text-center">
                                Is Default <span className="resetdefault" onClick={() => resetDefault()}>Reset</span>
                            </th>
                            <th className="text-center">Show As Question</th>
                            {/* if inputTypeForAdmin image and image radio display this */}
                            {(inputTypeValue === "Image" || inputTypeValue === "Image_Radio") && (
                                <>
                                    <th className="clsradioOption clsCheckBoxOption text-center">{inputTypeValue === "Image" ? "ShowAsRadioButton" : "ShowAsCheckBox"}</th>
                                    <th className="imageUpload text-center">Image</th>
                                </>
                            )}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {choices &&
                            choices?.map((choice, index) => (
                                <tr key={uuidv4()}>
                                    <td className="td0" data-label="Choice">
                                        <input type="text" className="ChoiceName form-control" style={{ width: "100px" }} defaultValue={choice.choicesName} onBlur={(e) => handleChange(index, "choicesName", e.target.value)} />
                                    </td>
                                    <td className="td1" data-label="Choice Code">
                                        <input type="text" className="ChoiceCode  form-control" style={{ width: "100px" }} defaultValue={choice.choicesCode} onBlur={(e) => handleChange(index, "choicesCode", e.target.value)} />
                                    </td>
                                    <td className="td2" data-label="Position">
                                        <input type="number" className="Position NumericOnly form-control" defaultValue={choice.position} onBlur={(e) => handleChange(index, "position", e.target.value)} />
                                    </td>
                                    <td className="td3" data-label="Price/PriceBreakName">
                                        <input type="number" className="Price form-control" defaultValue={choice.price} onBlur={(e) => handleChange(index, "price", e.target.value)} />
                                    </td>
                                    <td className="td4" data-label="Extra PriceBreakName">
                                        <input type="text" className="ExtraPriceBreakName form-control" defaultValue={choice.extraPriceBreakName} onBlur={(e) => handleChange(index, "extraPriceBreakName", e.target.value)} />
                                    </td>
                                    <td className="td5" data-label="Setup Charge">
                                        <input type="number" className="SetupCharge form-control NumericWithDecimal" defaultValue={choice.setupCharge} onBlur={(e) => handleChange(index, "setupCharge", e.target.value)} />
                                    </td>
                                    <td className="td6" data-label="Discount Code">
                                        <input type="text" className="DiscountCode form-control" defaultValue={choice.discountCode} onBlur={(e) => handleChange(index, "discountCode", e.target.value)} />
                                    </td>
                                    <td className="td7" data-label="Description">
                                        <input type="text" className="Description form-control" style={{ width: "100px" }} defaultValue={choice.description} onBlur={(e) => handleChange(index, "description", e.target.value)} />
                                    </td>
                                    <td className="td8" data-label="">
                                        <select className="form-control PriceQuantity" defaultValue={choice.priceQuantity} onChange={(e) => handleChange(index, "priceQuantity", e.target.value)}>
                                            <option value=""> Select</option>
                                            <option value="per color">per color</option>
                                            <option value="each quantity">each quantity</option>
                                        </select>
                                    </td>
                                    <td className="td9 text-center" data-label="Options">
                                        <i className="icon icon-edit-1 btnOptions" onClick={() => mapQAOptions(index, choice?.dependentQuestion)} id="btnOptions3" />
                                    </td>
                                    <td className="td10 text-center" data-label="Is Default Reset">
                                        <input type="radio" name={`choiceOptionIsdefault-${index}`} className="rdbchoiceOptionIsdefault sbm-checkbox sbm-radio" checked={choice.isDefault} onChange={() => setDefaultOption(index)} />
                                    </td>
                                    <td className="td11 text-center" data-label="Show as Question">
                                        <input type="checkbox" name="IsShowAsQuestionTitle" className="chkIsShowAsQuestionTitle sbm-checkbox" checked={choice.isShowAsQuestionTitle} onChange={(e) => handleChange(index, "isShowAsQuestionTitle", e.target.checked)} />{" "}
                                    </td>
                                    {/* if inputTypeForAdmin image and image radio display this */}
                                    {(inputTypeValue === "Image" || inputTypeValue === "Image_Radio") && (
                                        <>
                                            <td className="radiotitle td12 text-center" data-label="ShowAsRadioButton">
                                                <input type="checkbox" name="RadioOptionTitle" className="chkIsRadioOptionTitle sbm-checkbox" checked={choice.isShowAsRadioButton} onChange={(e) => handleChange(index, "isShowAsRadioButton", e.target.checked)} />
                                            </td>
                                            <td className="imageUpload td13 text-center" data-label="Image">
                                                <input type="hidden" className="imageName" defaultValue={choice.imageNameForQuestionAnswer} onChange={(e) => handleChange(index, "imageName", e.target.value)} />
                                                <button className="btn-upload" type="button" onClick={() => UploadProofClick(index, choice.imageNameForQuestionAnswer)}>
                                                    Upload <i className="icon-UploadSimple" />
                                                </button>
                                            </td>
                                        </>
                                    )}
                                    <td className="td14" data-label="">
                                        <span className="btn btn-circle btn-icon-only" onClick={() => handleRemoveOption(index)}>
                                            <i className="icon icon-trash-2" title=" " />
                                        </span>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {mapQuesPopup && <MapQuesPopup showPopup={mapQuesPopup} closePopup={closePopup} onSave={handleSaveQuestions} mapQuesData={mapQuesData} />}
            {mapImagePopup && <UploadQtyImagePopup showPopup={mapImagePopup} closePopup={closePopup} onSave={handleImageUpload} tableIndex={currentImageUpload.tableIndex} optionIndex={currentImageUpload} getImageData={uploadedImages} />}
        </section>
    );
};

export default ChoicesTable;
