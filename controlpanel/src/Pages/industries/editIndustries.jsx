import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { LANGUAGE_GUID, WEBSITE_GUID } from "~/components/common/vars";
import { useQueryGetAllIndustries, UpdateIndustriesAPI } from "common/components/graphQL/queries/industries/industries";
import { useEffect, useState } from "react";
import { PopupV3 } from "~/helpers/PopupV3";
import { useQueryLanguages } from "common/components/graphQL/queries/languages/languages";
import CustomToggle from "~/components/common/custom-toggle";

const EditIndustries = ({ Data, showPopup, closePopup }) => {
    const [UpdateEventThemeData] = useMutation(UpdateIndustriesAPI);
    const { data: languagesList } = useQuery(useQueryLanguages, {
        variables: {
            skip: 10,
            where: null,
            order: null
        }
    });
    const formDefaultValues = {
        Name: Data[0].rowValue
    };
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm({ defaultValues: formDefaultValues });
    const [activeOn, setActiveOn] = useState(Data[1] === "Active");
    const [languageListItems, setLanguageListItems] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [queryEventSearch, setQueryEventSearch] = useState(null);
    const { data: eventData, refetch } = useQuery(useQueryGetAllIndustries, {
        variables: {
            pageno: 1,
            pagesize: 10,
            where: queryEventSearch,
            order: null
        }
    });
    const storedLanguage = localStorage.getItem("languageguid");

    const onSubmit = async (formData) => {
        UpdateEventThemeData({
            variables: {
                industryName: formData.Name,
                languageGuid: selectedLanguage !== "" ? selectedLanguage : storedLanguage || LANGUAGE_GUID,
                websiteGuid: WEBSITE_GUID,
                industryGuid: Data[2][0].id,
                isactive: activeOn
            }
        }).then((data) => {
            if (data.data.addUpdateIndustries.statuscode === 200) {
                closePopup();
                setQueryEventSearch(null);
                PopupV3({
                    content: "<p class=text-center>Industry has been updated successfully.</p>",
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
                    content: `<p class=text-center>${data.data.addUpdateIndustries.message === "" ? "You can't update this industry as this is already assigned to the products. please un-assign and try again." : data.data.addUpdateIndustries.message}</p>`,
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

    const onToggleChange = () => {
        setActiveOn((prev) => !prev);
    };

    useEffect(() => {
        if (languagesList !== undefined) {
            setLanguageListItems(languagesList.languageGuidList.items.languageList);
        }
    }, [languagesList]);

    const selectionChange = (e) => {
        setSelectedLanguage(e.target.value);
        setQueryEventSearch({ industryguid: { eq: Data[2][0].id }, languageGuid: { eq: e.target.value } });
    };

    useEffect(() => {
        if (queryEventSearch !== null) {
            refetch();
        }
    }, [queryEventSearch]);

    useEffect(() => {
        if (eventData !== undefined && queryEventSearch !== null) {
            if (eventData?.industries?.items !== null) {
                setValue("Name", eventData?.industries?.items[0]?.industryName);
            } else {
                setValue("Name", "");
            }
        }
    }, [eventData]);

    const clearTheEventThemeHistory = () => {
        setQueryEventSearch(null);
        closePopup();
    };

    return (
        <Modal className="EventThemePopup" size="md" show={showPopup} onHide={() => clearTheEventThemeHistory()}>
            <ModalHeader closeButton={true}>
                <ModalTitle>Edit Industries</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form className="EditThemeform" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="Name">
                            Name <span className="mandatory">*</span>
                            <input
                                className="form-control"
                                id="Name"
                                type="text"
                                {...register("Name", {
                                    required: "Please Enter Valid Event Theme Name",
                                    pattern: {
                                        message: "Enter Valid Event Theme Name"
                                    }
                                })}
                            />
                        </label>
                    </div>
                    <div className="errorMessage">{errors?.Name?.message}</div>
                    {languageListItems !== undefined && (
                        <div className="form-group dropdownLanguage">
                            <label className="form-label" htmlFor="language">
                                Select Language
                                <select id="language" className="form-control" {...register("language")} onChange={selectionChange}>
                                    {languageListItems?.map((language) => (
                                        <option value={language.languageGuid} selected={language.languageGuid === (storedLanguage ?? LANGUAGE_GUID)}>
                                            {language.languageName}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    )}
                    <div className="activestatusdiv">
                        <div className="form-group">
                            <p className="form-label" htmlFor="isActive">
                                Status
                            </p>
                        </div>
                        <div className="isActiveMainDiv form-group">
                            <p className="form-label" htmlFor="isActive">
                                Active
                            </p>
                            <CustomToggle isDisabled={selectedLanguage !== LANGUAGE_GUID && selectedLanguage !== ""} activeOn={activeOn} onToggleChange={onToggleChange} />
                        </div>
                    </div>
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

export default EditIndustries;
