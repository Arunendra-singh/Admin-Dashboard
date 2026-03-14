import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { LANGUAGE_GUID, WEBSITE_GUID } from "~/components/common/vars";
import { useQueryGetAllImprintMethods, UpdateImprintMethodsAPI } from "common/components/graphQL/queries/imprintmethod/imprint-methods";
import { useEffect, useState } from "react";
import { PopupV3 } from "~/helpers/PopupV3";
import { useQueryLanguages } from "common/components/graphQL/queries/languages/languages";
import CustomToggle from "~/components/common/custom-toggle";

const EditImprintMethod = ({ Data, showPopup, closePopup }) => {
    const [UpdateEventThemeData] = useMutation(UpdateImprintMethodsAPI);
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
    const { data: eventData, refetch } = useQuery(useQueryGetAllImprintMethods, {
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
                imprintMethodName: formData.Name,
                languageGuid: selectedLanguage !== "" ? selectedLanguage : storedLanguage || LANGUAGE_GUID,
                websiteGuid: WEBSITE_GUID,
                imprintMethodGuid: Data[2][0].id,
                isactive: activeOn
            }
        }).then((data) => {
            if (data.data.addUpdateImprintMethod.statuscode === 200) {
                closePopup();
                setQueryEventSearch(null);
                PopupV3({
                    content: "<p class=text-center>Imprint method has been updated successfully.</p>",
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
                setActiveOn((prev) => !prev);
                PopupV3({
                    content: `<p class=text-center>${data.data.addUpdateImprintMethod.message === "" ? "You can't update as this imprint methods as this is already assigned to the products. please un-assign and try again." : data.data.addUpdateImprintMethod.message}</p>`,
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
        setQueryEventSearch({ imprintmethodGuid: { eq: Data[2][0].id }, languageGuid: { eq: e.target.value } });
    };

    useEffect(() => {
        if (queryEventSearch !== null) {
            refetch();
        }
    }, [queryEventSearch]);

    useEffect(() => {
        if (eventData !== undefined && queryEventSearch !== null) {
            if (eventData?.imprintMethods?.items !== null) {
                setValue("Name", eventData?.imprintMethods?.items[0]?.imprintMethodName);
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
                <ModalTitle>Edit Imprint Method</ModalTitle>
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
                                maxLength={100}
                                {...register("Name", {
                                    required: "Please enter valid imprint method name",
                                    pattern: {
                                        message: "Please enter valid imprint method name"
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

export default EditImprintMethod;
