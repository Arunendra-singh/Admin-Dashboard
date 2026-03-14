/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { LANGUAGE_GUID, WEBSITE_GUID } from "~/components/common/vars";
import { UpdateImprintColorAPI, useQueryGetAllImprintColors } from "common/components/graphQL/queries/ImprintColor/imprint-color";
import { PopupV3 } from "~/helpers/PopupV3";
import { useEffect, useState } from "react";
import { useQueryLanguages } from "common/components/graphQL/queries/languages/languages";

const EditImprintColor = ({ Data, showPopup, closePopup }) => {
    const [UpdateEventThemeData] = useMutation(UpdateImprintColorAPI);
    const formDefaultValues = {
        Name: Data[0].rowValue,
        HexValue: Data[1].rowValue
    };
    const [colorHexValue, setColorHexValue] = useState(Data[1].rowValue);
    const [languageListItems, setLanguageListItems] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [queryEventSearch, setQueryEventSearch] = useState(null);
    const storedLanguage = localStorage.getItem("languageguid");
    const { data: languagesList } = useQuery(useQueryLanguages, {
        variables: {
            skip: 10,
            where: null,
            order: null
        }
    });
    const { data: eventData, refetch } = useQuery(useQueryGetAllImprintColors, {
        variables: {
            pageno: 1,
            pagesize: 25,
            where: queryEventSearch,
            order: null
        }
    });
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm({ defaultValues: formDefaultValues });

    useEffect(() => {
        if (languagesList !== undefined) {
            setLanguageListItems(languagesList.languageGuidList.items.languageList);
        }
    }, [languagesList]);

    const selectionChange = (e) => {
        setSelectedLanguage(e.target.value);
        setQueryEventSearch({ imprintColorGuid: { eq: Data[2][0].id }, languageGuid: { eq: e.target.value } });
    };

    useEffect(() => {
        if (queryEventSearch !== null) {
            refetch();
        }
    }, [queryEventSearch]);

    useEffect(() => {
        if (eventData !== undefined && queryEventSearch !== null) {
            if (eventData?.imprintColors?.items !== null) {
                setValue("Name", eventData?.imprintColors?.items[0]?.colorName);
                setValue("HexValue", eventData?.imprintColors?.items[0]?.colorHexValue);
                setColorHexValue(eventData?.imprintColors?.items[0]?.colorHexValue);
            } else {
                setValue("Name", "");
            }
        }
    }, [eventData]);

    const onSubmit = async (formData) => {
        UpdateEventThemeData({
            variables: {
                colorName: formData.Name,
                languageGuid: selectedLanguage !== "" ? selectedLanguage : storedLanguage || LANGUAGE_GUID,
                colorHexValue: formData.HexValue,
                websiteGuid: WEBSITE_GUID,
                imprintColorGuid: Data[2][0].id,
                isactive: true
            }
        }).then((data) => {
            if (data.data.addUpdateImprintColors.statuscode === 200) {
                setQueryEventSearch(null);
                closePopup();
                PopupV3({
                    content: "<p class=text-center>Imprint color has been updated successfully.</p>",
                    type: "Success",
                    classes: "EventThemePopup GAUpdateTrack_Update",
                    actions: [
                        {
                            classes: "btn-info GAUpdateTrack_Update",
                            dismiss: true,
                            text: "Ok"
                        }
                    ]
                });
            } else {
                PopupV3({
                    content: `<p class=text-center>${data.data.addUpdateImprintColors.message === "" ? "You can't update this imprint color as this is already assigned to the products. please un-assign and try again." : data.data.addUpdateImprintColors.message}</p>`,
                    type: "Warning",
                    title: "Alert",
                    classes: "EventThemePopup",
                    actions: [
                        {
                            classes: "btn-info",
                            dismiss: true,
                            text: "Ok"
                        }
                    ]
                });
            }
        });
    };

    const clearTheEventThemeHistory = () => {
        setQueryEventSearch(null);
        closePopup();
    };

    const hexValueChange = (e) => {
        setColorHexValue(e.target.value);
    };

    return (
        <Modal className="EventThemePopup" size="md" show={showPopup} onHide={() => clearTheEventThemeHistory()}>
            <ModalHeader closeButton={true}>
                <ModalTitle>Edit Imprint Color</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form className="EditThemeform" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="Name">
                            Color Name <span className="mandatory">*</span>
                        </label>
                        <input
                            className="form-control"
                            id="Name"
                            type="text"
                            {...register("Name", {
                                required: "Please enter color name",
                                pattern: {
                                    message: "Enter color name"
                                }
                            })}
                        />
                    </div>
                    <div className="errorMessage">{errors?.Name?.message}</div>
                    <div className="ColorImprintMainDiv">
                        <div className="ColorImprintInput">
                            <div className="form-group">
                                <label className="form-label" htmlFor="Name">
                                    Color Hex Value <span className="mandatory">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    id="HexValue"
                                    disabled={storedLanguage && selectedLanguage === "" ? storedLanguage !== "3238bf6d-ddcb-4f65-aadb-3eee730fb9c8" : selectedLanguage !== "3238bf6d-ddcb-4f65-aadb-3eee730fb9c8"}
                                    onChangeCapture={hexValueChange}
                                    type="text"
                                    {...register("HexValue", {
                                        required: "Please enter color hex value",
                                        pattern: {
                                            value: /^#([0-9A-Fa-f]{3}){1,2}$/,
                                            message: "Enter color hex value"
                                        }
                                    })}
                                />
                            </div>
                            <div className="errorMessage">{errors?.HexValue?.message}</div>
                        </div>
                        <div className="ColorImprintHexColor">
                            <span style={{ backgroundColor: colorHexValue }} />
                        </div>
                    </div>
                    {languageListItems !== undefined && (
                        <div className="form-group dropdownLanguage">
                            <label className="form-label" htmlFor="language">
                                Select Language
                            </label>
                            <select id="language" className="form-control" {...register("language")} onChange={selectionChange}>
                                {languageListItems?.map((language) => (
                                    <option value={language.languageGuid} selected={language.languageGuid === (storedLanguage ?? LANGUAGE_GUID)}>
                                        {language.languageName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="form-action-buttons mb-3">
                        <button type="submit" className="btn btn-info mt-3 GAUpdateTrack_Update">
                            Submit
                        </button>
                        <button type="submit" className="btn btn-cancel mt-3" onClick={() => clearTheEventThemeHistory()}>
                            cancel
                        </button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default EditImprintColor;
