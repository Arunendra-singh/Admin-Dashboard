/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LANGUAGE_GUID, WEBSITE_GUID } from "~/components/common/vars";
import { AddProductMaterialAPI } from "common/components/graphQL/queries/productmaterials/product-materials";
import { PopupV3 } from "~/helpers/PopupV3";

const AddProductMaterial = ({ showPopup, closePopup }) => {
    const [AddEventThemeData] = useMutation(AddProductMaterialAPI);
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
                productMaterialName: formData.Name,
                languageGuid: LANGUAGE_GUID,
                websiteGuid: WEBSITE_GUID,
                productMaterialGuid: ""
            }
        }).then((data) => {
            if (data.data.addUpdateProductMaterials.statuscode === 200) {
                closePopup();
                PopupV3({
                    content: "<p class=text-center>Product material has been added successfully.</p>",
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
                    content: `<p class=text-center>${data.data.addUpdateProductMaterials.message}</p>`,
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
                <ModalTitle>Add Product Material</ModalTitle>
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
                            {...register("Name", {
                                required: "Enter Valid Product Material Name",
                                pattern: {
                                    value: /^(?! ).+/,
                                    message: "Please Enter Valid Product Material Name"
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

export default AddProductMaterial;
