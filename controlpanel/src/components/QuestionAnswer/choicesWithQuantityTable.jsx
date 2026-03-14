/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import MapQuesPopup from "../../Pages/QuestionAnswer/popUps/mapQuesPopup";
import UploadQtyImagePopup from "../../Pages/QuestionAnswer/popUps/uploadQtyImagePopup";

const ChoicesWithQuantityTable = ({ isChoicesYesWithQuantity, choicesWithQuantity, inputTypeValue, onChoicesUpdate }) => {
    const [choicesOptionsWithQuantity, setChoicesOptionsWithQuantity] = useState(choicesWithQuantity);
    const [mapQuesPopup, setMapQuesPopup] = useState(false);
    const [popupPurpose, setPopupPurpose] = useState(null);
    const [mapQuesData, setMapQuesData] = useState([]);
    const [mapImagePopup, setMapImgPopup] = useState(false);
    const [uploadedImages, setUploadedImages] = useState("");
    const [currentImageUpload, setCurrentImageUpload] = useState(null);

    // Sync prop `choicesWithQuantity` with state when it changes
    useEffect(() => {
        setChoicesOptionsWithQuantity(choicesWithQuantity);
    }, [choicesWithQuantity, choicesOptionsWithQuantity]);

    const updateChoices = (updatedChoices) => {
        setChoicesOptionsWithQuantity(updatedChoices);
        onChoicesUpdate(updatedChoices); // Pass updated data to parent component
    };
    // Set a specific option as default
    const setDefaultOption = (tableIndex, optionIndex) => {
        const updatedChoices = choicesOptionsWithQuantity.map((table, i) => {
            if (i === tableIndex) {
                // Set selected option's IsDefault to true and others to false
                const updatedOptions = table.ChoicesOption.map((option, j) => ({
                    ...option,
                    IsDefault: j === optionIndex,
                }));
                return { ...table, ChoicesOption: updatedOptions };
            }
            return table;
        });
        updateChoices(updatedChoices);
    };

    // Update resetDefault function to reset all options in a table to non-default
    const resetDefault = (tableIndex) => {
        const updatedChoices = choicesOptionsWithQuantity.map((table, i) => {
            if (i === tableIndex) {
                const updatedOptions = table.ChoicesOption.map((option) => ({
                    ...option,
                    IsDefault: false, // Set IsDefault to false for all options
                }));
                return { ...table, ChoicesOption: updatedOptions };
            }
            return table;
        });
        updateChoices(updatedChoices);
    };

    // Handle change for the choices option fields
    const handleChange = (tableIndex, optionIndex, field, value) => {
        const updatedChoices = choicesOptionsWithQuantity.map((table, i) => {
            if (i === tableIndex) {
                // If updating the Quantity field, directly update the table's Quantity
                if (field === "Quantity") {
                    return { ...table, [field]: value };
                }
                // Otherwise, update the specific choice option
                const updatedOptions = table.ChoicesOption.map((option, j) => {
                    if (j === optionIndex) {
                        return { ...option, [field]: value };
                    }
                    return option;
                });
                return { ...table, ChoicesOption: updatedOptions };
            }
            return table;
        });
        updateChoices(updatedChoices);
    };

    // Add more options to a specific table
    const handleAddMoreOptions = (tableIndex) => {
        const updatedChoices = [...choicesOptionsWithQuantity];
        updatedChoices[tableIndex].ChoicesOption.push({
            ChoicesName: "",
            ChoicesCode: "",
            Position: 0,
            Price: 0,
            PriceBreakName: "",
            PriceQuantity: "",
            DependentQuestion: "",
            IsDefault: false,
            SetupCharge: 0,
            Description: "",
            DiscountCode: "0",
            ExtraPriceBreakName: "",
            IsShowAsRadioButton: false,
            IsShowAsQuestionTitle: false,
            ImageNameForQuestionAnswer: ""
        });
        updateChoices(updatedChoices);
    };

    // Duplicate the entire table
    const handleAddMoreTable = () => {
        const newTable = {
            Quantity: "",
            ChoicesOption: [
                {
                    ChoicesName: "",
                    ChoicesCode: "",
                    Position: 0,
                    Price: 0,
                    PriceBreakName: "",
                    PriceQuantity: "",
                    DependentQuestion: "",
                    IsDefault: false,
                    SetupCharge: 0,
                    Description: "",
                    DiscountCode: "0",
                    ExtraPriceBreakName: "",
                    IsShowAsRadioButton: false,
                    IsShowAsQuestionTitle: false,
                    ImageNameForQuestionAnswer: ""
                }
            ]
        };
        updateChoices([...choicesOptionsWithQuantity, newTable]);
    };
    // Add this function within your component
    const removeTable = (tableIndex) => {
        const updatedChoices = choicesOptionsWithQuantity.filter((_, i) => i !== tableIndex);
        updateChoices(updatedChoices);
    };
    // Function to handle removing an option
    const handleRemoveOption = (tableIndex, optionIndex) => {
        const updatedChoices = choicesOptionsWithQuantity.map((table, i) => {
            if (i === tableIndex) {
                const updatedOptions = table.ChoicesOption.filter((_, j) => j !== optionIndex);
                return { ...table, ChoicesOption: updatedOptions };
            }
            return table;
        });
        updateChoices(updatedChoices);
    };
    const mapQAOptions = (tableIndex, optionIndex, mapQues) => {
        setPopupPurpose({ tableIndex, optionIndex });
        setMapQuesData(mapQues);
        setMapQuesPopup(true);
    };

    const handleSaveQuestions = (selectedQuestions, tableIndex, optionIndex) => {
        const updatedChoices = choicesOptionsWithQuantity.map((table, i) => {
            if (i === tableIndex) {
                const updatedOptions = table.ChoicesOption.map((option, j) => {
                    if (j === optionIndex) {
                        return { ...option, DependentQuestion: selectedQuestions }; // Update the specific option with the new quest
                    }
                    return option;
                });
                return { ...table, ChoicesOption: updatedOptions };
            }
            return table;
        });
        updateChoices(updatedChoices); // Call your existing function to update choices
        setMapQuesPopup(false); // Close the popup after saving
    };

    const UploadProofClick = (tableIndex, optionIndex, image) => {
        setUploadedImages(image);
        setCurrentImageUpload({ tableIndex, optionIndex });
        setMapImgPopup(true);
    };

    const handleImageUpload = (selectedImage, tableIndex, optionIndex) => {
        const updatedChoices = choicesOptionsWithQuantity.map((table, i) => {
            if (i === tableIndex) {
                const updatedOptions = table.ChoicesOption.map((option, j) => {
                    if (j === optionIndex) {
                        return { ...option, ImageNameForQuestionAnswer: selectedImage }; // Update the specific option with the new image
                    }
                    return option;
                });
                return { ...table, ChoicesOption: updatedOptions };
            }
            return table;
        });
        updateChoices(updatedChoices); // Call your existing function to update choices
    };

    const closePopup = () => {
        setMapQuesPopup(false);
        setMapImgPopup(false);
    };

    if (!isChoicesYesWithQuantity) return null;

    return (
        <section className="OptionAreaWithQuantity" style={{ display: isChoicesYesWithQuantity ? "block" : "none" }}>
            <div className="headingWithbutton">
                <h4 className="label sectionSubTitle">Choice Option With Quantity</h4>
                <button type="button" className="btn AddMoretable" onClick={handleAddMoreTable}> + Add More Table </button>
            </div>

            <div className="OptionWithQuantity">
                {/* on click of add more option clone below div */}
                {choicesOptionsWithQuantity.map((table, tableIndex) => (
                    <div className="innerQTYDiv" key={uuidv4()}>
                        <div className="form-group col-lg-4 col-md-4 pl-0 pr-0">
                            <label htmlFor="" className="label label-heading">Quantity</label>
                            <input
                                type="number"
                                value={table.Quantity}
                                onChange={(e) => handleChange(tableIndex, null, "Quantity", e.target.value)}
                                placeholder="Quantity"
                                className="Quantity form-control"
                            />
                        </div>
                        <span className="removeTable linkText" onClick={() => removeTable(tableIndex)}><i className="icon icon-trash-2" title="Remove Table" /> Remove Table</span>
                        <button type="button" className="AddMoreOptions" onClick={() => handleAddMoreOptions(tableIndex)}>
                            + Add more options
                        </button>
                        <div className="table-responsive">
                            <table className="table formTable OptionAreaWithQuantity1">
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
                                        <th className="text-center">Options</th>
                                        <th className="text-center">Is Default <span className="resetdefault" onClick={() => resetDefault(tableIndex)}>Reset</span></th>
                                        <th>Show As Question</th>
                                        {/* if inputTypeForAdmin image and image radio display this */}
                                        {(inputTypeValue === "Image" || inputTypeValue === "Image_Radio") && (
                                            <>
                                                <th className="clsradioOption clsCheckBoxOption">{inputTypeValue === "Image" ? "ShowAsRadioButton" : "ShowAsCheckBox"}</th>
                                                <th className="imageUpload">Image</th>
                                            </>
                                        )}
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {table.ChoicesOption.map((option, optionIndex) => (
                                        <tr key={uuidv4()}>
                                            <td className="td0">
                                                <input
                                                    type="text"
                                                    style={{ width: "100px" }}
                                                    className="ChoiceName form-control"
                                                    defaultValue={option.ChoicesName}
                                                    onBlur={(e) => handleChange(tableIndex, optionIndex, "ChoicesName", e.target.value)}
                                                />
                                            </td>
                                            <td className="td1">
                                                <input
                                                    type="text"
                                                    style={{ width: "100px" }}
                                                    className="ChoiceCode form-control"
                                                    defaultValue={option.ChoicesCode}
                                                    onBlur={(e) => handleChange(tableIndex, optionIndex, "ChoicesCode", e.target.value)}
                                                />
                                            </td>
                                            <td className="td2">
                                                <input
                                                    type="number"
                                                    className="Position NumericOnly form-control"
                                                    defaultValue={option.Position}
                                                    onBlur={(e) => handleChange(tableIndex, optionIndex, "Position", e.target.value)}
                                                />
                                            </td>
                                            <td className="td3">
                                                <input
                                                    type="number"
                                                    className="Price form-control"
                                                    defaultValue={option.Price}
                                                    onBlur={(e) => handleChange(tableIndex, optionIndex, "Price", e.target.value)}
                                                />
                                            </td>
                                            <td className="td4">
                                                <input
                                                    type="text"
                                                    className="ExtraPriceBreakName form-control"
                                                    defaultValue={option.ExtraPriceBreakName}
                                                    onBlur={(e) => handleChange(tableIndex, optionIndex, "ExtraPriceBreakName", e.target.value)}
                                                />
                                            </td>
                                            <td className="td5">
                                                <input
                                                    type="number"
                                                    className="SetupCharge form-control"
                                                    defaultValue={option.SetupCharge}
                                                    onBlur={(e) => handleChange(tableIndex, optionIndex, "SetupCharge", e.target.value)}
                                                />
                                            </td>
                                            <td className="td6">
                                                <input
                                                    type="text"
                                                    className="DiscountCode form-control"
                                                    defaultValue={option.DiscountCode}
                                                    onBlur={(e) => handleChange(tableIndex, optionIndex, "DiscountCode", e.target.value)}
                                                />
                                            </td>
                                            <td className="td7">
                                                <input
                                                    type="text"
                                                    style={{ width: "100px" }}
                                                    className="Description form-control"
                                                    defaultValue={option.Description}
                                                    onBlur={(e) => handleChange(tableIndex, optionIndex, "Description", e.target.value)}
                                                />
                                            </td>
                                            <td className="td8">
                                                <select
                                                    className="form-control PriceQuantity"
                                                    defaultValue={option.PriceQuantity}
                                                    onChange={(e) => handleChange(tableIndex, optionIndex, "PriceQuantity", e.target.value)}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="per color">per color</option>
                                                    <option value="each quantity">each quantity</option>
                                                </select>
                                            </td>
                                            <td className="td9 text-center">
                                                <i className="icon icon-edit-1 btnOptions" onClick={() => mapQAOptions(tableIndex, optionIndex, option.DependentQuestion)} id="btnOptions4" />
                                            </td>
                                            <td className="td10 text-center">
                                                <input
                                                    type="radio"
                                                    name={`choiceOptionIsdefault-${tableIndex}-${optionIndex}`} // Use unique name to group radio buttons
                                                    checked={option.IsDefault}
                                                    onChange={() => setDefaultOption(tableIndex, optionIndex)} // Toggle the default state
                                                    className="rdbchoiceOptionIsdefault sbm-checkbox sbm-radio"
                                                />
                                            </td>
                                            <td className="td11 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={option.IsShowAsQuestionTitle}
                                                    onChange={() => handleChange(tableIndex, optionIndex, "IsShowAsQuestionTitle", !option.IsShowAsQuestionTitle)}
                                                    className="chkIsShowAsQuestionTitle sbm-checkbox"
                                                />
                                            </td>
                                            {(inputTypeValue === "Image" || inputTypeValue === "Image_Radio") && (
                                                <>
                                                    <td className="radiotitle td12 text-center" data-label="ShowAsRadioButton">
                                                        <input
                                                            type="checkbox"
                                                            checked={option.IsShowAsRadioButton}
                                                            onChange={() => handleChange(tableIndex, optionIndex, "IsShowAsRadioButton", !option.IsShowAsRadioButton)}
                                                            className="chkIsRadioOptionTitle sbm-checkbox"
                                                        />
                                                    </td>
                                                    <td className="imageUpload td13 text-center" data-label="Image">
                                                        <input type="hidden" className="imageName" defaultValue={option.ImageNameForQuestionAnswer} />
                                                        <button className="btn-upload" type="button" onClick={() => UploadProofClick(tableIndex, optionIndex, option.ImageNameForQuestionAnswer)}>
                                                            Upload <i className="icon-UploadSimple" />
                                                        </button>
                                                    </td>
                                                </>
                                            )}
                                            <td className="td14">
                                                <span className="btn btn-circle btn-icon-only" onClick={() => handleRemoveOption(tableIndex, optionIndex)}>
                                                    <i className="icon icon-trash-2" title="Remove" />
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
            {/* end div */}
            {mapQuesPopup && <MapQuesPopup showPopup={mapQuesPopup} closePopup={closePopup} onSave={handleSaveQuestions} popupFor={popupPurpose} mapQuesData={mapQuesData} />}
            {mapImagePopup && <UploadQtyImagePopup showPopup={mapImagePopup} closePopup={closePopup} onSave={handleImageUpload} tableIndex={currentImageUpload.tableIndex} optionIndex={currentImageUpload.optionIndex} getImageData={uploadedImages} />}
        </section>
    );
};

export default ChoicesWithQuantityTable;
