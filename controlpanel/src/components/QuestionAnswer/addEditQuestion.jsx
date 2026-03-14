/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import { useSaveQuestionAnswerData, useQAMapProductData, useSaveQAProductMapping } from "common/hooks/react/api";
import { PopupV3 } from "common/utils";
import PageContainer from "../../hoc/PageContainer";
import choicesOptionsList from "../../helpers/json/choicesOptionsList";
import addQaStyle from "./addEditQuestions.module.scss";
import MapQuesPopup from "../../Pages/QuestionAnswer/popUps/mapQuesPopup";
import MapProductPopup from "../../Pages/QuestionAnswer/popUps/mapProductPopup";
import UploadQtyImagePopup from "../../Pages/QuestionAnswer/popUps/uploadQtyImagePopup";
import ChoicesWithQuantityTable from "./choicesWithQuantityTable";
import ChoicesTable from "./choicesTable";

const AddEditQuestion = ({ isEdit, QuestionData, questionAnswerGuid }) => {
    const [isOn, setIsOn] = useState({});
    const [ApplyForAllProducts, setApplyForAllProducts] = useState(false);
    const [Ischoices, setIschoices] = useState(false);
    const [IsChoicesYesWithQuantity, setIsChoicesYesWithQuantity] = useState(false);
    const [showMapProductPopup, setMapProductPopup] = useState(false);
    const [MapProductData, setMapProductData] = useState(null);
    const [popupPurpose, setPopupPurpose] = useState("");
    const [mapQuesPopup, setMapQuesPopup] = useState(false);
    const [mapQuesData, setMapQuesData] = useState([]);
    const [extQuestions, setExtraQuestions] = useState([]);
    const [mapTextDependant, setTextDependant] = useState([]);
    const [selectedChoiceName, setSelectedChoiceName] = useState("");
    const [inputTypeValue, setinputTypeValue] = useState("");
    const [choicesOptions, setChoices] = useState([
        {
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
        }
    ]);

    const [choicesWithQuantity, setChoicesWithQuantity] = useState([
        {
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
        }
    ]);

    const [mapImagePopup, setMapImgPopup] = useState(false);
    const [uploadedImages, setUploadedImages] = useState({});

    const { mutateAsync: saveQuestion } = useSaveQuestionAnswerData();
    const { mutateAsync: saveMappedProducts } = useSaveQAProductMapping();
    const { mutate, data: mapProducts } = useQAMapProductData();

    useEffect(() => {
        if (questionAnswerGuid !== "create") {
            // Trigger the mutation only when questionAnswerGuid is not "create"
            mutate(questionAnswerGuid);
        }
    }, [questionAnswerGuid, mutate]);

    const formDefaultValues = {
        questionAnswerGuid: "",
        questionTitle: "",
        dependentQuestion: "", // for title dependent questions
        randomId: "",
        displayOrder: "0",
        combinedCodeOrder: "0",
        setupRunCharges: "0.0",
        className: "",
        inputTypeForAdmin: "",
        inputValidationForOwner: false,
        visibility: false,
        applyForAllProducts: ApplyForAllProducts,
        questionTitleShow: false,
        isShowAvailableOption: false,
        isTextColor: false,
        isColorType: false,
        isMultiplyByPrice: false,
        isAddParentDiv: false,
        isReadQuantity: false,
        isSetupChargeInclude: false,
        isSelectVsNoneVisible: false,
        isQuestionHide: false,
        isDefaultSelected: false,
        forVS: false,
        isMultiselect: false,
        isExcludeSetupcharge: false,
        isShowZeroPrice: false,
        choices: Ischoices,
        ChoicesName: "",
        isChoicesYesWithQuantity: IsChoicesYesWithQuantity,
        IsPlaceholder: false,
        ExtraQuestions: {
            DependentQuestion: "",
            DefaultQuestion: null
        },
        ChoicesOptions: choicesOptions,
        TextboxOptions: [
            {
                price: 0,
                discountCode: "",
                hintText: [],
                dependentQuestion: "",
                quantity: 0,
                isPlaceholder: false
            }
        ],
        ChoicesOptionsWithQuantity: choicesWithQuantity
    };

    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
        watch
    } = useForm({ defaultValues: formDefaultValues });
    const [hintTextValues, setHintTextValues] = useState(formDefaultValues.TextboxOptions[0].hintText);

    // const inputTypeValue = watch("inputTypeForAdmin"); // Watch the inputTypeForAdmin value
    useEffect(() => {
        if (inputTypeValue === undefined || inputTypeValue === "Textbox" || inputTypeValue === "Textarea") {
            setIschoices(false);
            setValue("choices", false);
            setIsChoicesYesWithQuantity(false);
            setValue("isChoicesYesWithQuantity", false);
            setChoicesWithQuantity(choicesWithQuantity);
            setValue("ChoicesOptionsWithQuantity", choicesWithQuantity);
        }

        if (isEdit && QuestionData) {
            setValue("questionAnswerGuid", QuestionData?.questionAnswerGuid || "");
            setValue("questionTitle", QuestionData?.questionTitle || "");
            setValue("dependentQuestion", QuestionData?.dependentQuestion || "");
            setValue("randomId", QuestionData?.randomId || "");
            setValue("inputTypeForAdmin", QuestionData?.inputTypeForAdmin || "");
            setinputTypeValue(QuestionData?.inputTypeForAdmin);
            setValue("displayOrder", QuestionData?.displayOrder || 0);
            setValue("combinedCodeOrder", QuestionData?.combinedCodeOrder || 0);
            setValue("setupRunCharges", QuestionData?.setupRunCharges || 0);
            setValue("className", QuestionData?.className || "");
            setValue("inputValidationForOwner", QuestionData?.inputValidationForOwner === "yes" || false);
            setValue("visibility", QuestionData?.visibility || false);
            setValue("applyForAllProducts", QuestionData?.applyForAllProducts || false);
            setApplyForAllProducts(QuestionData?.applyForAllProducts || false);
            setValue("questionTitleShow", QuestionData?.questionTitleShow || false);
            setValue("isTextColor", QuestionData?.isTextColor || false);
            setValue("isColorType", QuestionData?.isColorType || false);
            setValue("isMultiplyByPrice", QuestionData?.isMultiplyByPrice || false);
            setValue("isAddParentDiv", QuestionData?.isAddParentDiv || false);
            setValue("isReadQuantity", QuestionData?.isReadQuantity || false);
            setValue("isSetupChargeInclude", QuestionData?.isSetupChargeInclude || false);
            setValue("isQuestionHide", QuestionData?.isQuestionHide || false);
            setValue("isDefaultSelected", QuestionData.isDefaultSelected || false);
            setValue("forVS", QuestionData?.forVS || false);
            setValue("isMultiselect", QuestionData?.isMultiselect || false);
            setValue("isShowZeroPrice", QuestionData?.isShowZeroPrice || false);

            if (QuestionData?.choices === true) {
                setIschoices(true);
                setValue("choices", true);
                setIsChoicesYesWithQuantity(false);
                setValue("isChoicesYesWithQuantity", false);
                setChoicesWithQuantity(choicesWithQuantity);
                setValue("ChoicesOptionsWithQuantity", choicesWithQuantity);
            } else {
                setIschoices(QuestionData?.choices || false);
                setValue("choices", QuestionData?.choices || false);
            }

            if (QuestionData?.choices === false && QuestionData?.choicesName !== "") {
                setValue("ChoicesName", QuestionData?.choicesName);
                setSelectedChoiceName(QuestionData?.choicesName);
                setIsChoicesYesWithQuantity(false);
                setValue("isChoicesYesWithQuantity", false);
                setChoicesWithQuantity(choicesWithQuantity);
                setValue("ChoicesOptionsWithQuantity", choicesWithQuantity);
            }

            if (QuestionData?.choices === true && QuestionData?.isChoicesYesWithQuantity === true) {
                setIsChoicesYesWithQuantity(false);
                setValue("isChoicesYesWithQuantity", false);
                setChoicesWithQuantity(choicesWithQuantity);
                setValue("ChoicesOptionsWithQuantity", choicesWithQuantity);
            } else if (QuestionData?.isChoicesYesWithQuantity === true) {
                setIsChoicesYesWithQuantity(true);
                setValue("isChoicesYesWithQuantity", true);
                setValue("ChoicesName", "");
                setSelectedChoiceName("");
            } else {
                setIsChoicesYesWithQuantity(QuestionData?.isChoicesYesWithQuantity);
                setValue("isChoicesYesWithQuantity", QuestionData?.isChoicesYesWithQuantity);
            }

            setIsChoicesYesWithQuantity(QuestionData?.isChoicesYesWithQuantity || false);
            if (QuestionData && QuestionData?.choicesOptionsWithQuantity?.length > 0) {
                const restructuredData = (data) =>
                    data?.choicesOptionsWithQuantity?.map((table) => ({
                        Quantity: table.quantity || "",
                        ChoicesOption: table.choicesOption?.map((option) => ({
                            ChoicesName: option.choicesName || "",
                            ChoicesCode: option.choicesCode || "",
                            Position: option.position || 0,
                            Price: option.price || 0,
                            PriceBreakName: option.priceBreakName || "",
                            PriceQuantity: option.priceQuantity || "",
                            DependentQuestion: option.dependentQuestion || "",
                            IsDefault: option.isDefault || false,
                            SetupCharge: option.setupCharge || 0,
                            Description: option.description || "",
                            DiscountCode: option.discountCode || "0",
                            ExtraPriceBreakName: option.extraPriceBreakName || "",
                            IsShowAsRadioButton: option.isShowAsRadioButton || false,
                            IsShowAsQuestionTitle: option.isShowAsQuestionTitle || false,
                            ImageNameForQuestionAnswer: option.imageNameForQuestionAnswer || ""
                        }))
                    }));
                const structuredChoices = restructuredData(QuestionData);
                setValue("ChoicesOptionsWithQuantity", structuredChoices);
                setChoicesWithQuantity(structuredChoices);
            }
            setValue("isSelectVsNoneVisible", QuestionData?.isSelectVsNoneVisible || false);
            setValue("isShowAvailableOption", QuestionData?.isShowAvailableOption || false);
            setValue("isExcludeSetupcharge", QuestionData?.isExcludeSetupcharge || false);
            if (QuestionData && QuestionData?.textboxOptions?.length > 0) {
                setTextDependant(QuestionData?.textboxOptions[0]?.dependentQuestion);
                setValue("TextboxOptions[0].price", QuestionData?.textboxOptions[0]?.price || 0);
                setValue("TextboxOptions[0].discountCode", QuestionData?.textboxOptions[0]?.discountCode || "");
                setValue("TextboxOptions[0].hintText", QuestionData?.textboxOptions[0]?.hintText || []);
                setHintTextValues(QuestionData?.textboxOptions[0]?.hintText || []);
                setValue("TextboxOptions[0].isPlaceholder", QuestionData?.textboxOptions[0]?.isPlaceholder || false);
                setValue("TextboxOptions[0].dependentQuestion", QuestionData?.textboxOptions[0]?.dependentQuestion || "");
                setValue("TextboxOptions[0].quantity", QuestionData?.textboxOptions[0]?.quantity || 0);
            }
            // Check if extraQuestions exist in the response
            if (QuestionData && QuestionData?.extraQuestions) {
                const restructuredData = {
                    DependentQuestion: QuestionData?.extraQuestions?.dependentQuestion || "",
                    DefaultQuestion: QuestionData?.extraQuestions?.defaultQuestion || null // Assuming the first item is the default
                };
                setValue("ExtraQuestions", restructuredData);
            }
            if (QuestionData && QuestionData?.dependentQuestion) {
                setMapQuesData(QuestionData?.dependentQuestion);
            }
            if (QuestionData && QuestionData?.lstExtraQuestions) {
                const lstExtraQuestions = QuestionData?.lstExtraQuestions;
                const defaultQuestionGuid = QuestionData?.extraQuestions?.defaultQuestion;
                const updatedExtraQuestions = lstExtraQuestions.map((question) => ({
                    ...question,
                    isDefaultSelected: question?.questionAnswerGuid === defaultQuestionGuid
                }));
                setExtraQuestions(updatedExtraQuestions);
            }
            if (QuestionData?.choices === true && QuestionData?.choicesOptions?.length > 0) {
                setValue("ChoicesOptions", QuestionData?.choicesOptions);
                setChoices(QuestionData?.choicesOptions);
            }

            if (QuestionData?.inputTypeForAdmin === "Textbox" || QuestionData?.inputTypeForAdmin === "Textarea") {
                setIschoices(false);
                setValue("choices", false);
                setIsChoicesYesWithQuantity(false);
                setValue("isChoicesYesWithQuantity", false);
                setChoicesWithQuantity(choicesWithQuantity);
                setValue("ChoicesOptionsWithQuantity", choicesWithQuantity);
            }
        }

        if (mapProducts !== undefined) {
            setMapProductData(mapProducts);
        }
    }, [isEdit, QuestionData, setValue, mapProducts]);

    const mapQAOptions = (purpose) => {
        setPopupPurpose(purpose);
        setMapQuesPopup(true);
    };

    const handleSaveQuestions = (selectedQuestions) => {
        if (popupPurpose === "addExtra") {
            const updatedQuestions = selectedQuestions.map((item, index) => ({
                ...item,
                isDefaultSelected: index === 0
            }));
            const restructuredData = {
                DependentQuestion: updatedQuestions.map((item) => item?.questionAnswerGuid).join(","),
                DefaultQuestion: updatedQuestions[0]?.questionAnswerGuid
            };
            setValue(
                "ExtraQuestions",
                restructuredData || {
                    DependentQuestion: "",
                    DefaultQuestion: null
                }
            );
            setExtraQuestions(updatedQuestions);
        } else if (popupPurpose === "mapQTDependent") {
            setValue("dependentQuestion", selectedQuestions || []);
            setMapQuesData(selectedQuestions);
        } else if (popupPurpose === "TextBoxDependant") {
            setValue("TextboxOptions[0].dependentQuestion", selectedQuestions);
            setTextDependant(selectedQuestions);
        }
        setMapQuesPopup(false);
    };

    const getMapQuesData = (purpose) => {
        if (purpose === "addExtra") {
            return extQuestions;
        }
        if (purpose === "mapQTDependent") {
            return mapQuesData;
        }
        return mapTextDependant;
    };

    // Handle default selection change
    const handleEQDefaultChange = (index, EqGuid) => {
        const updatedQuestions = extQuestions.map((question, idx) => ({
            ...question,
            isDefaultSelected: idx === index
        }));
        setExtraQuestions(updatedQuestions);

        setValue("ExtraQuestions", {
            DependentQuestion: updatedQuestions.map((item) => item?.questionAnswerGuid).join(","),
            DefaultQuestion: EqGuid || null
        });
    };

    const handleRemoveEQ = (EqGuid) => {
        const updatedQuestions = extQuestions.filter((question) => question.questionAnswerGuid !== EqGuid);
        setExtraQuestions(updatedQuestions);

        setValue("ExtraQuestions", {
            DependentQuestion: updatedQuestions.map((item) => item.questionAnswerGuid).join(","),
            DefaultQuestion: updatedQuestions.length ? updatedQuestions[0].questionAnswerGuid : null
        });
    };

    const mapToProducts = () => {
        setMapProductPopup(true);
    };
    const handleSaveProducts = (selectedProducts) => {
        setMapProductData(selectedProducts);
        setMapProductPopup(false);
    };

    const handleSaveUploadImage = (selectedImage) => {
        setUploadedImages(selectedImage);
    };

    const onToggleChange = (field) => {
        setIsOn((prevState) => {
            const newState = {
                ...prevState,
                [field]: !prevState[field]
            };
            return newState;
        });
    };
    const handleIschoices = (Isches) => {
        if (Isches === false) {
            setIschoices(true);
            setValue("choices", true);
            setValue("ChoicesName", "");
            setSelectedChoiceName("");
        } else {
            setIschoices(false);
            setValue("choices", false);
        }
    };

    const handleIsChoicesWithQuantity = (cwithQty) => {
        if (cwithQty === false) {
            setIsChoicesYesWithQuantity(true);
            setValue("isChoicesYesWithQuantity", true);
            setValue("ChoicesName", "");
            setSelectedChoiceName("");
        } else {
            setIsChoicesYesWithQuantity(false);
            setValue("isChoicesYesWithQuantity", false);
            setChoicesWithQuantity(choicesWithQuantity);
            setValue("ChoicesOptionsWithQuantity", choicesWithQuantity);
        }
    };

    const handleChoicesWithQtyUpdate = (updatedChoices) => {
        setChoicesWithQuantity(updatedChoices);
        setValue("ChoicesOptionsWithQuantity", updatedChoices);
    };

    const handleChoicesUpdate = (updatedChoices) => {
        setChoices(updatedChoices);
        setValue("ChoicesOptions", updatedChoices);
    };

    const deleteHintText = (index) => {
        const updatedHintTexts = hintTextValues.filter((_, i) => i !== index);
        setHintTextValues(updatedHintTexts);
        setValue("TextboxOptions[0].hintText", updatedHintTexts);
    };
    const addHintText = () => {
        setHintTextValues((prev) => [...prev, ""]);
        setValue("TextboxOptions[0].hintText", [...hintTextValues, ""]);
    };

    const onSubmit = async (formData) => {
        const addData = {
            QuestionAnswerGuid: formData?.questionAnswerGuid,
            QuestionTitle: formData?.questionTitle,
            DependentQuestion: formData?.dependentQuestion,
            RandomId: formData?.randomId,
            QuestionTitleShow: formData?.questionTitleShow,
            InputTypeForAdmin: formData?.inputTypeForAdmin,
            InputValidationForOwner: formData?.inputValidationForOwner === true ? "yes" : "no",
            DisplayOrder: Number(formData?.displayOrder),
            CombinedCodeOrder: Number(formData?.combinedCodeOrder),
            ApplyForAllProducts: formData?.applyForAllProducts,
            SetupRunCharges: parseFloat(formData.setupRunCharges),
            ClassName: formData?.className,
            Choices: formData?.choices,
            ChoicesName: formData.ChoicesName,
            Visibility: formData?.visibility,
            ChoicesOptions: formData?.ChoicesOptions,
            TextboxOptions: formData?.TextboxOptions,
            ExtraQuestions: formData?.ExtraQuestions,
            IsColorType: formData?.isColorType,
            IsReadQuantity: formData?.isReadQuantity,
            IsQuestionHide: formData?.isQuestionHide,
            IsShowZeroPrice: formData?.isShowZeroPrice,
            IsShowAvailableOption: formData?.isShowAvailableOption,
            IsMultiplyByPrice: formData?.isMultiplyByPrice,
            IsMultiselect: formData?.isMultiselect,
            ChoicesOptionsWithQuantity: formData?.ChoicesOptionsWithQuantity,
            IsChoicesYesWithQuantity: formData?.isChoicesYesWithQuantity,
            IsSetupChargeInclude: formData?.isSetupChargeInclude,
            IsDefaultSelected: formData?.isDefaultSelected,
            IsExcludeSetupcharge: formData?.isExcludeSetupcharge,
            IsTextColor: formData?.isTextColor,
            IsAddParentDiv: formData?.isAddParentDiv,
            ForVS: formData?.forVS,
            IsSelectVsNoneVisible: formData?.isSelectVsNoneVisible,
            IsDeleted: false
        };

        saveQuestion(addData).then((response) => {
            if (response.statuscode === 200) {
                const updatedMappedProducts = MapProductData.map((product) => ({
                    ...product,
                    questionAnswerGuid: response.data
                }));

                saveMappedProducts(updatedMappedProducts)
                    .then((mappedResponse) => {
                        console.log("Mapped products saved successfully:", mappedResponse);
                    })
                    .catch((err) => {
                        console.error("Error saving mapped products:", err);
                    });

                PopupV3({
                    content: isEdit ? "<p class='text-center'>Question Updated Successfully.</p>" : "<p class='text-center'>Question Saved Successfully.</p>",
                    classes: "QaPopup",
                    type: "Success",
                    size: "md",
                    actions: [
                        {
                            text: "OK",
                            classes: "btn-info",
                            do: () => {
                                window.location.href = `${window.location.origin}/v2/QuestionAnswer/Index`;
                            }
                        }
                    ]
                });
            } else {
                PopupV3({
                    content: isEdit ? "<p class='text-center'>Failed to update Question.</p>" : "<p class='text-center'>Failed to save Question.</p>",
                    classes: "QaPopup",
                    type: "error",
                    size: "md",
                    actions: [
                        {
                            text: "OK",
                            classes: "btn-info",
                            do: () => {
                                window.location.href = `${window.location.origin}/v2/QuestionAnswer/Index`;
                            }
                        }
                    ]
                });
            }
        });
    };
    const closePopup = () => {
        setMapProductPopup(false);
        setMapQuesPopup(false);
        setMapImgPopup(false);
    };
    const cancel = () => {
        window.location.href = `${window.location.origin}/v2/QuestionAnswer/Index`;
    };
    return (
        <section className="body-container midContent">
            <PageContainer fluid classes={`page-container mt-5 pt-4 pl-4 pr-4 ${addQaStyle.addNewQA}`}>
                {isEdit && (
                    <div className="pageTitle">
                        <h4 className="sectionSubTitle">{QuestionData?.questionTitle}</h4>
                    </div>
                )}
                <form className="QuetionAnswerform" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="form-group col-lg-4 clsQuestionAnswerCreate_QuestionTitle">
                            <label className="form-label" htmlFor="questionTitle">
                                Question Title <span className="mandatory">*</span>{" "}
                                <span className="mapquestion linkText DependentQuestion" onClick={() => mapQAOptions("mapQTDependent")}>
                                    (Map Dependent Question)
                                </span>
                            </label>
                            <input className="form-control" id="questionTitle" type="text" {...register("questionTitle", { required: "Enter Question Title" })} />
                            <small className="errorMessage">{errors?.questionTitle?.message}</small>
                        </div>
                        <div className="form-group col-lg-4 clsQuestionAnswerCreate_UniqueCode">
                            <label className="form-label" htmlFor="randomId">
                                Unique Code <span className="mandatory">*</span>
                            </label>
                            <input
                                className="form-control"
                                id="randomId"
                                type="text"
                                {...register("randomId", { required: "Enter Valid Unique Code" })}
                            />
                            <small className="errorMessage">{errors?.randomId?.message}</small>
                        </div>
                        <div className="form-group col-lg-4 clsQuestionAnswerCreate_DisplayOrder">
                            <label className="form-label" htmlFor="displayOrder">
                                Display Order
                            </label>
                            <input className="form-control" id="displayOrder" type="number" {...register("displayOrder", { valueAsNumber: true })} />
                            <small className="errorMessage">{errors?.displayOrder?.message}</small>
                        </div>
                        <div className="form-group col-lg-4 clsQuestionAnswerCreate_CombinedCodeOrder">
                            <label className="form-label" htmlFor="combinedCodeOrder">
                                Combined code order
                            </label>
                            <input className="form-control" id="combinedCodeOrder" type="number" {...register("combinedCodeOrder", { valueAsNumber: true })} />
                            <small className="errorMessage">{errors?.combinedCodeOrder?.message}</small>
                        </div>
                        <div className="form-group col-lg-4 clsQuestionAnswerCreate_Charges">
                            <label className="form-label" htmlFor="setupRunCharges">
                                Charges
                            </label>
                            <input className="form-control" id="setupRunCharges" type="number" {...register("setupRunCharges")} />
                        </div>
                        <div className="form-group col-lg-4 clsQuestionAnswerCreate_ClassName">
                            <label className="form-label" htmlFor="className">
                                Class Name
                            </label>
                            <input className="form-control" id="className" type="text" {...register("className")} />
                        </div>
                        <div className="col-md-12">
                            <label className="label sectionSubTitle">Input Type and Validation</label>
                        </div>
                        <div className="form-group col-lg-4 clsQuestionAnswerCreate_InputType">
                            <label className="form-label" htmlFor="inputTypeForAdmin">
                                Input Type
                            </label>
                            <select
                                id="inputTypeForAdmin"
                                className="form-control"
                                {...register("inputTypeForAdmin", { required: "Please select Input Type" })}
                                defaultValue=""
                                onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    setinputTypeValue(selectedValue);
                                    setValue("inputTypeForAdmin", selectedValue);
                                    if (selectedValue === "Textbox" || selectedValue === "Textarea") {
                                        setIschoices(false);
                                        setValue("choices", false);
                                        setIsChoicesYesWithQuantity(false);
                                        setValue("isChoicesYesWithQuantity", false);
                                        setChoicesWithQuantity(choicesWithQuantity);
                                        setValue("ChoicesOptionsWithQuantity", choicesWithQuantity);
                                    }
                                }}
                            >
                                <option value="">Select</option>
                                <option value="Label">Label</option>
                                <option value="Textbox">Textbox</option>
                                <option value="Dropdown">Dropdown</option>
                                <option value="Checkbox">Checkbox</option>
                                <option value="Radio">Radio</option>
                                <option value="Textarea">Textarea</option>
                                <option value="Image">Image</option>
                                <option value="Tab">Tab</option>
                                <option value="Image_Radio">Image_Radio</option>
                            </select>
                            <small className="errorMessage">{errors?.inputTypeForAdmin?.message}</small>
                        </div>
                    </div>
                    <section className="row">
                        <div className="form-group col-lg-4 clsQuestionAnswerCreate_InputValidation">
                            <div className="toggle-radiobutton form-check-inline">
                                <label htmlFor="inputValidationForOwner" className="radio-toggleheading">
                                    Input validation
                                </label>
                                <label htmlFor="" className={`radiobutton ${(QuestionData?.inputValidationForOwner ? QuestionData?.inputValidationForOwner : isOn?.inputValidationForOwner) ? "on" : "off"}`}>
                                    <input type="checkbox" id="inputValidationForOwner" className="togglecheckbox" {...register("inputValidationForOwner")} onChange={() => onToggleChange("inputValidationForOwner")} defaultChecked={QuestionData?.inputValidationForOwner ? QuestionData?.inputValidationForOwner : isOn?.inputValidationForOwner} aria-label="toggleButton" />
                                    <div className="switch" />
                                </label>
                            </div>
                        </div>
                        <div className="form-group col-lg-4">
                            <div className="toggle-radiobutton form-check-inline clsQuestionAnswerCreate_YesVisibility">
                                <label htmlFor="visibility" className="radio-toggleheading">
                                    Visibility
                                </label>
                                <label htmlFor="" className={`radiobutton ${(QuestionData?.visibility ? QuestionData?.visibility : isOn?.visibility) ? "on" : "off"}`}>
                                    <input type="checkbox" id="visibility" className="togglecheckbox" {...register("visibility")} onChange={() => onToggleChange("visibility")} defaultChecked={isOn?.visibility || QuestionData?.visibility} aria-label="toggleButton" />
                                    <div className="switch" />
                                </label>
                            </div>
                        </div>
                        <div className="form-group col-lg-4">
                            <div className="toggle-radiobutton form-check-inline clsQuestionAnswerCreate_YesApplyProd">
                                <label htmlFor="" className="radio-toggleheading">
                                    Apply to all products
                                    {/* on click of yes below btnMapToProducts will hide */}
                                    {ApplyForAllProducts === false && (
                                        <span className="btnMapToProducts ml-2 linkText clsQuestionAnswerCreate_MapProducts" onClick={() => mapToProducts()}>
                                            (Map to Products)
                                        </span>
                                    )}
                                </label>
                                <label htmlFor="applyForAllProducts" className={`radiobutton ${ApplyForAllProducts === true ? "on" : "off"}`}>
                                    <input type="checkbox" id="applyForAllProducts" className="togglecheckbox" {...register("applyForAllProducts")} onChange={() => setApplyForAllProducts(!ApplyForAllProducts)} defaultChecked={ApplyForAllProducts} aria-label="toggleButton" />
                                    <div className="switch" />
                                </label>
                            </div>
                        </div>
                        <div className="form-group col-lg-4">
                            <div className="toggle-radiobutton form-check-inline clsQuestionAnswerCreate_QuestionTitleShowYes">
                                <label htmlFor="questionTitleShow" className="radio-toggleheading">
                                    Question Title Show
                                </label>
                                <label htmlFor="" className={`radiobutton ${(QuestionData?.questionTitleShow ? QuestionData?.questionTitleShow : isOn?.questionTitleShow) ? "on" : "off"}`}>
                                    <input type="checkbox" id="questionTitleShow" className="togglecheckbox" {...register("questionTitleShow")} onChange={() => onToggleChange("questionTitleShow")} defaultChecked={QuestionData?.questionTitleShow ? QuestionData?.questionTitleShow : isOn?.questionTitleShow} aria-label="toggleButton" />
                                    <div className="switch" />
                                </label>
                            </div>
                        </div>
                        <div className="form-group col-lg-4">
                            <div className="toggle-radiobutton form-check-inline clsQuestionAnswerCreate_YesAvlOpt">
                                <label htmlFor="isShowAvailableOption" className="radio-toggleheading">
                                    Show Available Option
                                </label>
                                <label htmlFor="" className={`radiobutton ${(QuestionData?.isShowAvailableOption ? QuestionData?.isShowAvailableOption : isOn?.isShowAvailableOption) ? "on" : "off"}`}>
                                    <input type="checkbox" id="isShowAvailableOption" className="togglecheckbox" {...register("isShowAvailableOption")} onChange={() => onToggleChange("isShowAvailableOption")} defaultChecked={QuestionData?.isShowAvailableOption ? QuestionData?.isShowAvailableOption : isOn?.isShowAvailableOption} aria-label="toggleButton" />
                                    <div className="switch" />
                                </label>
                            </div>
                        </div>
                        <div className="form-group col-lg-4">
                            <div className="toggle-radiobutton form-check-inline">
                                <label htmlFor="isTextColor" className="radio-toggleheading">
                                    Is Text Color
                                </label>
                                <label htmlFor="" className={`radiobutton ${(QuestionData?.isTextColor ? QuestionData?.isTextColor : isOn?.isTextColor) ? "on" : "off"}`}>
                                    <input type="checkbox" id="isTextColor" className="togglecheckbox" {...register("isTextColor")} onChange={() => onToggleChange("isTextColor")} defaultChecked={QuestionData?.isTextColor ? QuestionData?.isTextColor : isOn?.isTextColor} aria-label="toggleButton" />
                                    <div className="switch" />
                                </label>
                            </div>
                        </div>
                        <div className="form-group col-lg-4">
                            <div className="toggle-radiobutton form-check-inline clsQuestionAnswerCreate_YesColorBox">
                                <label htmlFor="isColorType" className="radio-toggleheading">
                                    Show Color Box
                                </label>
                                <label htmlFor="" className={`radiobutton ${(QuestionData?.isColorType ? QuestionData?.isColorType : isOn?.isColorType) ? "on" : "off"}`}>
                                    <input type="checkbox" id="isColorType" className="togglecheckbox" {...register("isColorType")} onChange={() => onToggleChange("isColorType")} defaultChecked={QuestionData?.isColorType ? QuestionData?.isColorType : isOn?.isColorType} aria-label="toggleButton" />
                                    <div className="switch" />
                                </label>
                            </div>
                        </div>
                        <div className="form-group col-lg-4">
                            <div className="toggle-radiobutton form-check-inline clsQuestionAnswerCreate_YesMulPrice">
                                <label htmlFor="isMultiplyByPrice" className="radio-toggleheading">
                                    Multiply by Price
                                </label>
                                <label htmlFor="" className={`radiobutton ${(QuestionData?.isMultiplyByPrice ? QuestionData?.isMultiplyByPrice : isOn?.isMultiplyByPrice) ? "on" : "off"}`}>
                                    <input type="checkbox" id="isMultiplyByPrice" className="togglecheckbox" {...register("isMultiplyByPrice")} onChange={() => onToggleChange("isMultiplyByPrice")} defaultChecked={QuestionData?.isMultiplyByPrice ? QuestionData?.isMultiplyByPrice : isOn?.isMultiplyByPrice} aria-label="toggleButton" />
                                    <div className="switch" />
                                </label>
                            </div>
                        </div>
                        <div className="form-group col-lg-4">
                            <div className="toggle-radiobutton form-check-inline">
                                <label htmlFor="isAddParentDiv" className="radio-toggleheading">
                                    Add Parent Div
                                </label>
                                <label htmlFor="" className={`radiobutton ${(QuestionData?.isAddParentDiv ? QuestionData?.isAddParentDiv : isOn?.isAddParentDiv) ? "on" : "off"}`}>
                                    <input type="checkbox" id="isAddParentDiv" className="togglecheckbox" {...register("isAddParentDiv")} onChange={() => onToggleChange("isAddParentDiv")} defaultChecked={QuestionData?.isAddParentDiv ? QuestionData?.isAddParentDiv : isOn?.isAddParentDiv} aria-label="toggleButton" />
                                    <div className="switch" />
                                </label>
                            </div>
                        </div>
                        <div className="form-group col-lg-4">
                            <div className="toggle-radiobutton form-check-inline clsQuestionAnswerCreate_YesReadQnt">
                                <label htmlFor="isReadQuantity" className="radio-toggleheading">
                                    Read Quantity
                                </label>
                                <label htmlFor="" className={`radiobutton ${(QuestionData?.isReadQuantity ? QuestionData?.isReadQuantity : isOn?.isReadQuantity) ? "on" : "off"}`}>
                                    <input type="checkbox" id="isReadQuantity" className="togglecheckbox" {...register("isReadQuantity")} onChange={() => onToggleChange("isReadQuantity")} defaultChecked={QuestionData?.isReadQuantity ? QuestionData?.isReadQuantity : isOn?.isReadQuantity} aria-label="toggleButton" />
                                    <div className="switch" />
                                </label>
                            </div>
                        </div>
                        <div className="form-group col-lg-4">
                            <div className="toggle-radiobutton form-check-inline clsQuestionAnswerCreate_YesSetUpCharge">
                                <label htmlFor="isSetupChargeInclude" className="radio-toggleheading">
                                    Setup Charge Include
                                </label>
                                <label htmlFor="" className={`radiobutton ${(QuestionData?.isSetupChargeInclude ? QuestionData?.isSetupChargeInclude : isOn?.isSetupChargeInclude) ? "on" : "off"}`}>
                                    <input type="checkbox" id="isSetupChargeInclude" className="togglecheckbox" {...register("isSetupChargeInclude")} onChange={() => onToggleChange("isSetupChargeInclude")} defaultChecked={QuestionData?.isSetupChargeInclude ? QuestionData?.isSetupChargeInclude : isOn?.isSetupChargeInclude} aria-label="toggleButton" />
                                    <div className="switch" />
                                </label>
                            </div>
                        </div>
                        <div className="form-group col-lg-4">
                            <div className="toggle-radiobutton form-check-inline">
                                <label htmlFor="isSelectVsNoneVisible" className="radio-toggleheading">
                                    Hide Select Option
                                </label>
                                <label htmlFor="" className={`radiobutton ${(QuestionData?.isSelectVsNoneVisible ? QuestionData?.isSelectVsNoneVisible : isOn?.isSelectVsNoneVisible) ? "on" : "off"}`}>
                                    <input type="checkbox" id="isSelectVsNoneVisible" className="togglecheckbox" {...register("isSelectVsNoneVisible")} onChange={() => onToggleChange("isSelectVsNoneVisible")} defaultChecked={QuestionData?.isSelectVsNoneVisible ? QuestionData?.isSelectVsNoneVisible : isOn?.isSelectVsNoneVisible} aria-label="toggleButton" />
                                    <div className="switch" />
                                </label>
                            </div>
                        </div>
                        <div className="form-group col-lg-4">
                            <div className="toggle-radiobutton form-check-inline clsQuestionAnswerCreate_YesQutn">
                                <label htmlFor="isQuestionHide" className="radio-toggleheading">
                                    Hide Question
                                </label>
                                <label htmlFor="" className={`radiobutton ${(QuestionData?.isQuestionHide ? QuestionData?.isQuestionHide : isOn?.isQuestionHide) ? "on" : "off"}`}>
                                    <input type="checkbox" id="isQuestionHide" className="togglecheckbox" {...register("isQuestionHide")} onChange={() => onToggleChange("isQuestionHide")} defaultChecked={QuestionData?.isQuestionHide ? QuestionData?.isQuestionHide : isOn?.isQuestionHide} aria-label="toggleButton" />
                                    <div className="switch" />
                                </label>
                            </div>
                        </div>
                        <div className="form-group col-lg-4">
                            <div className="toggle-radiobutton form-check-inline clsQuestionAnswerCreate_YesDefaultSelection">
                                <label htmlFor="isDefaultSelected" className="radio-toggleheading">
                                    Default Selection Off
                                </label>
                                <label htmlFor="" className={`radiobutton ${(QuestionData?.isDefaultSelected ? QuestionData?.isDefaultSelected : isOn?.isDefaultSelected) ? "on" : "off"}`}>
                                    <input type="checkbox" id="isDefaultSelected" className="togglecheckbox" {...register("isDefaultSelected")} onChange={() => onToggleChange("isDefaultSelected")} defaultChecked={QuestionData?.isDefaultSelected ? QuestionData?.isDefaultSelected : isOn?.isDefaultSelected} aria-label="toggleButton" />
                                    <div className="switch" />
                                </label>
                            </div>
                        </div>
                        <div className="form-group col-lg-4">
                            <div className="toggle-radiobutton form-check-inline">
                                <label htmlFor="forVS" className="radio-toggleheading">
                                    For VS
                                </label>
                                <label htmlFor="" className={`radiobutton ${(QuestionData?.forVS ? QuestionData?.forVS : isOn?.forVS) ? "on" : "off"}`}>
                                    <input type="checkbox" id="forVS" className="togglecheckbox" {...register("forVS")} onChange={() => onToggleChange("forVS")} defaultChecked={QuestionData?.forVS ? QuestionData?.forVS : isOn?.forVS} aria-label="toggleButton" />
                                    <div className="switch" />
                                </label>
                            </div>
                        </div>
                        <div className="form-group col-lg-4">
                            <div className="toggle-radiobutton form-check-inline clsQuestionAnswerCreate_YesMultiSelect">
                                <label htmlFor="isMultiselect" className="radio-toggleheading">
                                    Is Multiselect
                                </label>
                                <label htmlFor="" className={`radiobutton ${(QuestionData?.isMultiselect ? QuestionData?.isMultiselect : isOn?.isMultiselect) ? "on" : "off"}`}>
                                    <input type="checkbox" id="isMultiselect" className="togglecheckbox" {...register("isMultiselect")} onChange={() => onToggleChange("isMultiselect")} defaultChecked={QuestionData?.isMultiselect ? QuestionData?.isMultiselect : isOn?.isMultiselect} aria-label="toggleButton" />
                                    <div className="switch" />
                                </label>
                            </div>
                        </div>
                        <div className="form-group col-lg-4">
                            <div className="toggle-radiobutton form-check-inline clsQuestionAnswerCreate_YesExcludeColumnShapes">
                                <label htmlFor="isExcludeSetupcharge" className="radio-toggleheading">
                                    Exclude Colon in Shapes
                                </label>
                                <label htmlFor="" className={`radiobutton ${(QuestionData?.isExcludeSetupcharge ? QuestionData?.isExcludeSetupcharge : isOn?.isExcludeSetupcharge) ? "on" : "off"}`}>
                                    <input type="checkbox" id="isExcludeSetupcharge" className="togglecheckbox" {...register("isExcludeSetupcharge")} onChange={() => onToggleChange("isExcludeSetupcharge")} defaultChecked={QuestionData?.isExcludeSetupcharge ? QuestionData?.isExcludeSetupcharge : isOn?.isExcludeSetupcharge} aria-label="toggleButton" />
                                    <div className="switch" />
                                </label>
                            </div>
                        </div>
                        <div className="form-group col-lg-4">
                            <div className="toggle-radiobutton form-check-inline clsQuestionAnswerCreate_YesShowPrice">
                                <label htmlFor="isShowZeroPrice" className="radio-toggleheading">
                                    Show Zero Price
                                </label>
                                <label htmlFor="" className={`radiobutton ${(QuestionData?.isShowZeroPrice ? QuestionData?.isShowZeroPrice : isOn?.isShowZeroPrice) ? "on" : "off"}`}>
                                    <input type="checkbox" id="isShowZeroPrice" className="togglecheckbox" {...register("isShowZeroPrice")} onChange={() => onToggleChange("isShowZeroPrice")} defaultChecked={QuestionData?.isShowZeroPrice ? QuestionData?.isShowZeroPrice : isOn?.isShowZeroPrice} aria-label="toggleButton" />
                                    <div className="switch" />
                                </label>
                            </div>
                        </div>
                    </section>
                    {/* if input type is textbox and textarea display below section */}
                    {(inputTypeValue === "Textbox" || inputTypeValue === "Textarea") && (
                        <section className="row textboxArea" style={{ display: "block" }}>
                            <div className="col-md-12">
                                <div className="headingWithbutton">
                                    <h4 className="sectionSubTitle">
                                        Textbox/Textarea Options{" "}
                                        <span className="mapQues linkText" id="mapOptions2" onClick={() => mapQAOptions("TextBoxDependant")}>
                                            (Map Dependent Question)
                                        </span>
                                    </h4>
                                    <button type="button" className="btn AddMoreTextbox" onClick={addHintText}>
                                        + Add more options
                                    </button>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-4">
                                        <label className="label"> Price</label>
                                        <input type="text" className="Price form-control" {...register("TextboxOptions[0].price")} />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label className="label"> Discount Code</label>
                                        <input type="text" className="DiscountCode form-control" {...register("TextboxOptions[0].discountCode")} />
                                    </div>
                                    <div className="form-group col-lg-4">
                                        <div className="toggle-radiobutton form-check-inline">
                                            <label htmlFor="IsPlaceholder" className="radio-toggleheading">
                                                Placeholder
                                            </label>
                                            <label htmlFor="" className={`radiobutton ${isOn.IsPlaceholder ? "on" : "off"}`}>
                                                <input type="checkbox" id="IsPlaceholder" className="togglecheckbox" {...register("TextboxOptions[0].isPlaceholder")} onChange={() => onToggleChange("IsPlaceholder")} defaultChecked={isOn.IsPlaceholder} aria-label="toggleButton" />
                                                <div className="switch" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row NoOfTextboxArea">
                                    {watch("TextboxOptions[0].hintText").map((hint, index) => (
                                        <div key={uuidv4()} className="form-group col-md-4 HintTextBox">
                                            <input
                                                type="text"
                                                className="HintText form-control"
                                                {...register(`TextboxOptions[0].hintText.${index}`)} // Register each hint text input
                                                defaultValue={hint} // Set default value if editing
                                            />
                                            <div className="deleteBox" onClick={() => deleteHintText(index)}>
                                                <i className="icon icon-trash-2" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                    <section className="row choicesInfoDetails">
                        <div className="col-md-12">
                            <label className="label sectionSubTitle">Choice Info/Details</label>
                        </div>
                        <div className="col-md-4">
                            {inputTypeValue !== "Textbox" && inputTypeValue !== "Textarea" && Ischoices === false && (
                                <div className="form-group">
                                    <div className="toggle-radiobutton form-check-inline clsQuestionAnswerCreate_Quantity">
                                        <label htmlFor="isChoicesYesWithQuantity" className="radio-toggleheading">
                                            Quantity
                                        </label>
                                        <label htmlFor="" className={`radiobutton ${IsChoicesYesWithQuantity === true ? "on" : "off"}`}>
                                            <input type="checkbox" id="isChoicesYesWithQuantity" className="togglecheckbox" {...register("isChoicesYesWithQuantity")} onChange={() => handleIsChoicesWithQuantity(IsChoicesYesWithQuantity)} defaultChecked={IsChoicesYesWithQuantity} aria-label="toggleButton" />
                                            <div className="switch" />
                                        </label>
                                    </div>
                                </div>
                            )}
                            {inputTypeValue !== "Textbox" && inputTypeValue !== "Textarea" && IsChoicesYesWithQuantity !== true && (
                                <div className="form-group">
                                    <div className="toggle-radiobutton form-check-inline clsQuestionAnswerCreate_YesChoices">
                                        <label htmlFor="choices" className="radio-toggleheading">
                                            Choices
                                        </label>
                                        <label htmlFor="" className={`radiobutton ${Ischoices === true ? "on" : "off"}`}>
                                            <input type="checkbox" id="choices" className="togglecheckbox" {...register("choices")} onChange={() => handleIschoices(Ischoices)} defaultChecked={Ischoices} aria-label="toggleButton" />
                                            <div className="switch" />
                                        </label>
                                    </div>
                                </div>
                            )}
                            {/* only on click of no below select input-box will display(for value yes and quantity it will hide) */}
                            {Ischoices === false && IsChoicesYesWithQuantity === false && (
                                <div className="form-group input-box">
                                    <label htmlFor="ChoicesName">Select Choices</label>
                                    <select
                                        id="ChoicesName"
                                        className="form-control"
                                        value={selectedChoiceName}
                                        onChange={(e) => {
                                            const selectedValue = e.target.value;
                                            setSelectedChoiceName(selectedValue);
                                            setValue("ChoicesName", selectedValue);
                                        }}
                                    >
                                        <option value="">Select</option>
                                        {choicesOptionsList?.choices?.map((choice) => {
                                            if (choice.options) {
                                                return (
                                                    <optgroup key={choice.category} label={choice.category}>
                                                        {choice.options.map((option) => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                );
                                            }

                                            return (
                                                <option key={choice.value} value={choice.value}>
                                                    {choice.label}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            )}
                        </div>
                    </section>
                    {/* hide below two section OptionArea/OptionAreaWithQuantity when input type is  textbox, textarea */}
                    {/* If user Select Choices radio button otion as yes diaply below section */}
                    {inputTypeValue !== "Textbox" && inputTypeValue !== "Textarea" && <ChoicesTable isChoices={Ischoices} inputTypeValue={inputTypeValue} choices={choicesOptions} onChoicesUpdate={handleChoicesUpdate} />}
                    {inputTypeValue !== "Textbox" && inputTypeValue !== "Textarea" && (
                        <ChoicesWithQuantityTable isChoicesYesWithQuantity={IsChoicesYesWithQuantity} inputTypeValue={inputTypeValue} choicesWithQuantity={choicesWithQuantity} onChoicesUpdate={handleChoicesWithQtyUpdate} />
                    )}
                    <section className="ExtraQuestionArea mt-4">
                        <div className="headingWithbutton">
                            <h4 className="label sectionSubTitle">Extra Question</h4>
                            <button type="button" className="btn ExtraQuestion AddMoretable clsQuestionAnswerCreate_ExtQuestion" title="Link to Extra Question" onClick={() => mapQAOptions("addExtra")}>
                                + Add Question
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table className="table formTable" id="Extratab">
                                <thead>
                                    <tr>
                                        <th style={{ width: "20px" }} className="">
                                            <span className="clsQuestionAnswerCreate_SrNo">SrNo.</span>
                                        </th>
                                        <th>
                                            <span className="clsQuestionAnswerCreate_Question">Question</span>
                                        </th>
                                        <th className="text-center">
                                            <span className="clsQuestionAnswerCreate_MinInputType">Input Type</span>
                                        </th>
                                        <th className="text-center">
                                            <span className="clsQuestionAnswerCreate_DefaultDisplay">Default Display</span>
                                        </th>
                                        <th>Display Order</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {extQuestions.map((question, index) => (
                                        <tr key={`eq${question?.questionAnswerGuid}`}>
                                            <td style={{ width: "20px" }} className="EQtd0">
                                                {index + 1}
                                            </td>
                                            <td className="EQtd1">{question?.questionTitle}</td>
                                            <td className="EQtd2 text-center">{question?.inputTypeForAdmin}</td>
                                            <td className="EQtd4 text-center">
                                                <input
                                                    type="radio"
                                                    name="EQchoiceOptionIsdefault"
                                                    className="rdbchoiceOptionIsdefault sbm-checkbox sbm-radio"
                                                    checked={question?.isDefaultSelected}
                                                    onChange={() => handleEQDefaultChange(index, question?.questionAnswerGuid)}
                                                />
                                            </td>
                                            <td className="EQtd5">
                                                <input
                                                    type="text"
                                                    name="EQDisplayOrder"
                                                    className="EQDisplayOrder form-control"
                                                    value={index + 1}
                                                    onChange={(e) => {
                                                        const updatedQuestions = [...extQuestions];
                                                        updatedQuestions[index].displayOrder = e.target.value;
                                                        setExtraQuestions(updatedQuestions);
                                                    }}
                                                />
                                            </td>
                                            <td className="EQtd6">
                                                <span className="btn btn-circle btn-icon-only" onClick={() => handleRemoveEQ(question?.questionAnswerGuid)}>
                                                    <i className="icon icon-trash-2" title="Remove" />
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <div className="form-action-buttons mb-3">
                        <button type="submit" className="btn btn-submit mt-3 GAUpdateTrack_Add">
                            Submit
                        </button>
                        <button type="button" className="btn btn-cancel mt-3" onClick={() => cancel()}>
                            cancel
                        </button>
                    </div>
                </form>
                {showMapProductPopup && <MapProductPopup showPopup={showMapProductPopup} closePopup={closePopup} onSave={handleSaveProducts} mappedProducts={MapProductData} />}
                {mapQuesPopup && <MapQuesPopup showPopup={mapQuesPopup} closePopup={closePopup} onSave={handleSaveQuestions} popupFor={popupPurpose} mapQuesData={getMapQuesData(popupPurpose)} />}
                {mapImagePopup && <UploadQtyImagePopup showPopup={mapImagePopup} closePopup={closePopup} onSave={handleSaveUploadImage} getImageData={uploadedImages} />}
            </PageContainer>
        </section>
    );
};

export default AddEditQuestion;
