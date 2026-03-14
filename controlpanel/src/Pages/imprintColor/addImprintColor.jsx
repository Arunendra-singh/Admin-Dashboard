/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LANGUAGE_GUID, WEBSITE_GUID } from "~/components/common/vars";
import { AddImprintColorAPI } from "common/components/graphQL/queries/ImprintColor/imprint-color";
import { PopupV3 } from "~/helpers/PopupV3";

const AddImprintColor = ({ showPopup, closePopup }) => {
    const [AddEventThemeData] = useMutation(AddImprintColorAPI);
    const formDefaultValues = {
        Name: "",
        Color: ""
    };

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({ defaultValues: formDefaultValues });

    const onSubmit = async (formData) => {
        AddEventThemeData({
            variables: {
                colorName: formData.Name,
                colorHexValue: formData.Color,
                languageGuid: LANGUAGE_GUID,
                websiteGuid: WEBSITE_GUID,
                imprintColorGuid: ""
            }
        }).then((data) => {
            if (data.data.addUpdateImprintColors.statuscode === 200) {
                closePopup();
                PopupV3({
                    content: "<p class=text-center>Imprint color has been added successfully.</p>",
                    type: "Success",
                    classes: "EventThemePopup GAUpdateTrack_Add",
                    actions: [
                        {
                            classes: "btn-info GAUpdateTrack_Add",
                            dismiss: true,
                            text: "Ok"
                        }
                    ]
                });
            } else {
                PopupV3({
                    content: `<p class=text-center>${data.data.addUpdateImprintColors.message}</p>`,
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

    return (
        <Modal className="EventThemePopup" size="md" show={showPopup} onHide={() => closePopup()}>
            <ModalHeader closeButton={true}>
                <ModalTitle>Add Imprint Color</ModalTitle>
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
                                required: "Enter valid imprint color name",
                                pattern: {
                                    value: /^(?! ).+/,
                                    message: "Please enter valid imprint color name"
                                }
                            })}
                        />
                    </div>
                    <div className="errorMessage">{errors?.Name?.message}</div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="Name">
                            Color Hex Value <span className="mandatory">*</span>
                        </label>
                        <input
                            className="form-control"
                            id="Color"
                            type="text"
                            {...register("Color", {
                                required: "Enter valid imprint hex color",
                                pattern: {
                                    value: /^#([0-9A-Fa-f]{3}){1,2}$/,
                                    message: "Please enter valid imprint hex color"
                                }
                            })}
                        />
                    </div>
                    <div className="errorMessage">{errors?.Color?.message}</div>
                    <div className="form-action-buttons mb-3">
                        <button type="submit" className="btn btn-cancel mt-3 GAUpdateTrack_Add">
                            Submit
                        </button>
                        <button type="submit" className="btn btn-cancel mt-3" onClick={() => closePopup()}>
                            cancel
                        </button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default AddImprintColor;
