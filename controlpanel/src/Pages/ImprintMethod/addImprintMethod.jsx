/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LANGUAGE_GUID, WEBSITE_GUID } from "~/components/common/vars";
import { AddImprintMethodsAPI } from "common/components/graphQL/queries/imprintmethod/imprint-methods";
import { PopupV3 } from "~/helpers/PopupV3";

const AddImprintMethod = ({ showPopup, closePopup }) => {
    const [AddEventThemeData] = useMutation(AddImprintMethodsAPI);
    const formDefaultValues = {
        Name: ""
    };

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({ defaultValues: formDefaultValues });

    const onSubmit = async (formData) => {
        AddEventThemeData({
            variables: {
                imprintMethodName: formData.Name,
                languageGuid: LANGUAGE_GUID,
                websiteGuid: WEBSITE_GUID,
                imprintMethodGuid: ""
            }
        }).then((data) => {
            if (data.data.addUpdateImprintMethod.statuscode === 200) {
                closePopup();
                PopupV3({
                    content: "<p class=text-center>Imprint method has been added successfully.</p>",
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
                    content: `<p class=text-center>${data.data.addUpdateImprintMethod.message}</p>`,
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
                <ModalTitle>Add Imprint Method</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form className="EditThemeform" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="Name">
                            Name <span className="mandatory">*</span>
                        </label>
                        <input
                            className="form-control"
                            id="Name"
                            type="text"
                            maxLength={100}
                            {...register("Name", {
                                required: "Please enter valid imprint method name",
                                pattern: {
                                    value: /^(?! ).+/,
                                    message: "Please enter valid imprint method name"
                                }
                            })}
                        />
                    </div>
                    <div className="errorMessage">{errors?.Name?.message}</div>
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

export default AddImprintMethod;
