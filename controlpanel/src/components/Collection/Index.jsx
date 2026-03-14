/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { PopupV3 } from "common/utils/PopupV3";
import { v4 as uuidv4 } from "uuid";
import { useMutationSaveCategory } from "common/components/graphQL/mutations/Collection/useMutationSaveCategory";
import { UpdateCategoryProductCount, ClearCategoryCache, checkAliasExists, checkCategory } from "common/components/graphQL/queries/Js/CacheManager";
import "../../styles/pages/addsalesflyer.scss";
import axios from "axios";
import { CDN_URL, COOKIE_DETAILS, CURRENCY_GUID, LANGUAGE_GUID, WEBSITE_GUID, TOKENS, WEBSITE_URL } from "common/utils/vars";
import { useLocation, useNavigate } from "react-router-dom";
import Ckeditor from "react-ckeditor-component/lib/ckeditor";
import FormFieldValidations from "~/helpers/customvalidation";
import Store from "~/Store";
import Input from "../../helpers/Input";
import TextArea from "../shared/TextArea";

const CollectionCreate = ({ categoryEditData, isEdit, collectionGuid }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [CollectionImage, setCollectionImage] = useState(null);
    const [OfferBannerImage, setOfferBannerImage] = useState(null);
    const [MenuBannerImage, setMenuBannerImage] = useState(null);
    const [BannerImage, setBannerImage] = useState(null);
    const [CollectionImageUrl, setCollectionImageUrl] = useState("");
    const [OfferBannerImageUrl, setOfferBannerImageUrl] = useState("");
    const [MenuBannerImageUrl, setMenuBannerImageUrl] = useState("");
    const [BannerImageUrl, setBannerImageUrl] = useState("");
    const [showcollection, setShowCollection] = useState(true);
    const [showofferbanner, setShowOfferBanner] = useState(true);
    const [showmenuOfferBanner, setShowMenuOfferBanner] = useState(true);
    const [showBanner, setShowBanner] = useState(true);
    const [Selectedtype, setSelectedtype] = useState(null);
    const [categoryType, setCategoryType] = useState([]);
    const [charCount, setCharCount] = useState(0);
    const [charCountTitle, setCharCountTitle] = useState(0);
    const [charCountKeywords, setCharCountKeywords] = useState(0);
    const [BannerText, setBannerText] = useState("");
    const [isOn, setOn] = useState(true);
    const [showIcon, setshowIcon] = useState(true);
    const [CategorylistingImage, setCategorylistingImage] = useState(null);
    const [showCategorylistingImage, setShowCategoryListingImage] = useState(true);
    const [CategorylistingImageUrl, setCategorylistingImageUrl] = useState("");
    // const [editordescriptionText, setEditordescriptionText] = useState(RichTextEditor?.createEmptyValue());
    // const [editorfurtherDescriptionText, setEditorFurtherDescriptionText] = useState(RichTextEditor?.createEmptyValue());
    const [activeTab, setActiveTab] = useState("Global");
    const [descriptionTextPayload, setDescriptionText] = useState("");
    const [furtherDescriptionTextPayload, setfurtherDescriptionText] = useState("");
    // const [setFurtherDescriptionpayload] = useState("");
    // const [furtherDescriptionText, setFurtherDescriptionText] = useState([]);
    const [globalsetting] = Store.useStore((store) => store?.globalsetting);
    const [resources] = Store.useStore((store) => store?.resources);
    const [IconImage, setIconImage] = useState(null);
    const [IconImageUrl, setIconImageUrl] = useState("");
    const [Url, seturl] = useState("");
    const [SageList, setSageList] = useState([]);
    const [ASIList, setASIList] = useState([]);
    const [DCList, setDCList] = useState([]);
    const [DCSubList, setDCSubList] = useState([]);
    const [UpdateSaveCategory] = useMutation(useMutationSaveCategory);
    const {
        register,
        setValue,
        getValues,
        formState: { errors },
        handleSubmit
    } = useForm({ defaultValues: categoryEditData?.categoryData });
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    // const fileInputRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);
    // useEffect(() => {
    //     if (isEdit && categoryEditData) {
    //         const { collectionImageName, menuBannerImageName, offerBannerImageName } = categoryEditData?.categoryData || {};

    //         const setFileInput = (fileName, path, refIndex) => {
    //             if (fileName) {
    //                 const myFile = new File([`${CDN_URL}/${WEBSITE_GUID}/${path}/Default/`], fileName, {});
    //                 const dataTransfer = new DataTransfer();
    //                 dataTransfer.items.add(myFile);
    //                 if (fileInputRefs[refIndex]?.current) {
    //                     fileInputRefs[refIndex].current.files = dataTransfer.files;
    //                 }
    //             }
    //         };

    //         setFileInput(collectionImageName, "Collections", 0);
    //         setFileInput(menuBannerImageName, "MenuImage", 2);
    //         setFileInput(offerBannerImageName, "OfferBanner", 1);
    //         setFileInput(offerBannerImageName, "Banners", 3);
    //     }
    // }, [isEdit, categoryEditData, resources, CDN_URL, WEBSITE_GUID]);

    useEffect(() => {
        if (isEdit && categoryEditData) {
            const { collectionImageName, menuBannerImageName, offerBannerImageName, collectionBannerImageName, iconImageName, categorylistingImageName } = categoryEditData?.categoryData || {};

            const setImageData = (fileName, collectionpath, path, setImageUrl, setImage, setShow) => {
                if (fileName) {
                    const url = collectionpath ? `${CDN_URL}/${WEBSITE_GUID}/${collectionpath}/${path}/${fileName}` : `${CDN_URL}/${WEBSITE_GUID}/${path}/Default/${fileName}`;
                    setImageUrl(url);
                    setImage(fileName);
                    setShow(false);
                }
            };

            setImageData(collectionImageName, "", "Collections", setCollectionImageUrl, setCollectionImage, setShowCollection);
            setImageData(menuBannerImageName, "Collections", "MenuImage", setMenuBannerImageUrl, setMenuBannerImage, setShowMenuOfferBanner);
            setImageData(offerBannerImageName, "Collections", "OfferBanner", setOfferBannerImageUrl, setOfferBannerImage, setShowOfferBanner);
            setImageData(collectionBannerImageName, "", "Banners", setBannerImageUrl, setBannerImage, setShowBanner);
            setImageData(iconImageName, "", "Collections", setIconImageUrl, setIconImage, setshowIcon);
            setImageData(categorylistingImageName, "Collections", "CategorylistingImage", setCategorylistingImageUrl, setCategorylistingImage, setShowCategoryListingImage);
        }
    }, [isEdit, categoryEditData?.categoryData, CDN_URL, WEBSITE_GUID, setCollectionImageUrl, setCollectionImage, setShowCollection, setMenuBannerImageUrl, setMenuBannerImage, setShowMenuOfferBanner, setOfferBannerImageUrl, setOfferBannerImage, setShowOfferBanner, setBannerImageUrl, setBannerImage, setShowBanner, setCategorylistingImageUrl, setCategorylistingImage, setShowCollection]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const [sageCategoryName, setSageCategoryName] = useState("");
    const [asiCategoryName, setASICategoryName] = useState("");
    const [DcSubCategoryName, setDcSubCategoryName] = useState("");
    const [DcCategoryName, setDcCategoryName] = useState("");

    const handleSageChange = (event) => {
        setSageCategoryName(event.target.value);
    };
    const handleASIChange = (event) => {
        setASICategoryName(event.target.value);
    };
    const handleDCChange = (event) => {
        setDcCategoryName(event.target.value);
    };
    const handleSubDCChange = (event) => {
        setDcSubCategoryName(event.target.value);
    };
    const [parentCategory, setParentCategory] = useState([]);
    const [selectedParentGuid, setSelectedParentGuid] = useState("");
    const collectioguid = location.search !== "" && location.search !== null && location.search !== undefined ? location.search.replace("?", "") : "";

    useEffect(() => {
        const Value = getValues();
        if (isEdit && categoryEditData?.categoryData !== undefined) {
            if (Value.collectionName === "" || Value.collectionName !== categoryEditData?.categoryData?.collectionName) {
                setValue("collectionName", categoryEditData?.categoryData?.collectionName);
            }
            if (Value.alias === "" || Value.alias !== categoryEditData?.categoryData?.alias) {
                setValue("alias", categoryEditData?.categoryData?.alias);
                seturl(categoryEditData?.categoryData?.alias);
                setValue("url", `${WEBSITE_URL}category/${categoryEditData?.categoryData?.alias || ""}`);
            }
            if (Value.isActive === "" || Value.isActive !== categoryEditData?.categoryData?.isActive) {
                setOn(categoryEditData?.categoryData?.isActive);
            }
            if (Value.collectionImageAlt === "" || Value.collectionImageAlt !== categoryEditData?.categoryData?.collectionImageAlt) {
                setValue("collectionImageAlt", categoryEditData?.categoryData?.collectionImageAlt);
            }
            if (Value.bannerText === "" || Value.bannerText !== categoryEditData?.categoryData?.bannerText) {
                setValue("bannerText", categoryEditData?.categoryData?.bannerText);
                setBannerText(categoryEditData?.categoryData?.bannerText);
            }
            if (Value.offerBannerImageAlt === "" || Value.offerBannerImageAlt !== categoryEditData?.categoryData?.offerBannerImageAlt) {
                setValue("offerBannerImageAlt", categoryEditData?.categoryData?.offerBannerImageAlt);
            }
            if (Value.menuBannerImageAlt === "" || Value.menuBannerImageAlt !== categoryEditData?.categoryData?.menuBannerImageAlt) {
                setValue("menuBannerImageAlt", categoryEditData?.categoryData?.menuBannerImageAlt);
            }
            if (Value.metaTitle === "" || Value.metaTitle !== categoryEditData?.categoryData?.metaTitle) {
                setValue("metaTitle", categoryEditData?.categoryData?.metaTitle);
                setCharCountTitle(categoryEditData?.categoryData?.metaTitle?.length || 0);
            }
            if (Value.metaDescription === "" || Value.metaDescription !== categoryEditData?.categoryData?.metaDescription) {
                setValue("metaDescription", categoryEditData?.categoryData?.metaDescription);
                setCharCount(categoryEditData?.categoryData?.metaDescription?.length || 0);
            }
            if (Value.metaKeywords === "" || Value.metaKeywords !== categoryEditData?.categoryData?.metaKeywords) {
                setValue("metaKeywords", categoryEditData?.categoryData?.metaKeywords);
                setCharCountKeywords(categoryEditData?.categoryData?.metaKeywords?.length || 0);
            }
            if (Value.metaRobots === "" || Value.metaRobots !== categoryEditData?.categoryData?.metaRobots) {
                setValue("metaRobots", categoryEditData?.categoryData?.metaRobots);
            }
            if (Value.canonicalLink === "" || Value.canonicalLink !== categoryEditData?.categoryData?.canonicalLink) {
                setValue("canonicalLink", categoryEditData?.categoryData?.canonicalLink);
            }
            if (Value.displayOrder === "" || Value.displayOrder !== categoryEditData?.categoryData?.displayOrder) {
                setValue("displayOrder", categoryEditData?.categoryData?.displayOrder);
            }
            if (Value.h1Tag === "" || Value.h1Tag !== categoryEditData?.categoryData?.h1Tag) {
                setValue("h1Tag", categoryEditData?.categoryData?.h1Tag);
            }
            if (Value.isExcludedFromSitemap === "" || Value.isExcludedFromSitemap !== categoryEditData?.categoryData?.isExcludedFromSitemap) {
                setIsChecked(categoryEditData?.categoryData?.isExcludedFromSitemap);
                setValue("isExcludedFromSitemap", categoryEditData?.categoryData?.isExcludedFromSitemap);
            }
            if (Value.collectionType === "" || Value.collectionType !== categoryEditData?.categoryData?.collectionType) {
                setValue("collectionType", categoryEditData?.categoryData?.collectionType);
                setSelectedtype(categoryEditData?.categoryData?.collectionType);
            }
            if (Value.parentCollectionGuid === "" || Value.parentCollectionGuid !== categoryEditData?.categoryData?.parentCollectionGuid) {
                setValue("parentCollectionGuid", categoryEditData?.categoryData?.parentCollectionGuid);
                setSelectedParentGuid(categoryEditData?.categoryData?.parentCollectionGuid);
            }
            if (Value.descriptionText === "" || Value.descriptionText !== categoryEditData?.categoryData?.descriptionText) {
                setValue("descriptionText", categoryEditData?.categoryData?.descriptionText);
                setDescriptionText(categoryEditData?.categoryData?.descriptionText);
            }
            if (Value.furtherDescriptionText === "" || Value.furtherDescriptionText !== categoryEditData?.categoryData?.furtherDescriptionText) {
                setValue("furtherDescriptionText", categoryEditData?.categoryData?.furtherDescriptionText);
                setfurtherDescriptionText(categoryEditData?.categoryData?.furtherDescriptionText);
            } if (Value.categorylistingImageAlt === "" || Value.categorylistingImageAlt !== categoryEditData?.categoryData?.categorylistingImageAlt) {
                setValue("categorylistingImageAlt", categoryEditData?.categoryData?.categorylistingImageAlt);
            }
            if (Value.bannerImageAlt === "" || Value.bannerImageAlt !== categoryEditData?.categoryData?.bannerImageAlt) {
                setValue("bannerImageAlt", categoryEditData?.categoryData?.bannerImageAlt || "");
            }
            if (Value.asiCategoryName === "" || Value.asiCategoryName !== categoryEditData?.categoryData?.asiCategoryName) {
                setValue("asiCategoryName", categoryEditData?.categoryData?.asiCategoryName || "");
                setASICategoryName(categoryEditData?.categoryData?.asiCategoryName || "");
            }
            if (Value.sageCategoryName === "" || Value.sageCategoryName !== categoryEditData?.categoryData?.sageCategoryName) {
                setValue("sageCategoryName", categoryEditData?.categoryData?.sageCategoryName || "");
                setSageCategoryName(categoryEditData?.categoryData?.sageCategoryName || "");
            }
            if (Value?.dcCategoryName === "" || Value?.dcCategoryName !== categoryEditData?.categoryData?.dcCategoryName) {
                setValue("dcCategoryName", categoryEditData?.categoryData?.dcCategoryName || "");
                setDcCategoryName(categoryEditData?.categoryData?.dcCategoryName || "");
            }
            if (Value?.dcSubCategoriesName === "" || Value?.dcSubCategoriesName !== categoryEditData?.categoryData?.dcSubCategoriesName) {
                setValue("dcSubCategoriesName", categoryEditData?.categoryData?.dcSubCategoriesName || "");
                setDcSubCategoryName(categoryEditData?.categoryData?.dcSubCategoriesName || "");
            }
            if (Value?.sapCategoryID === "" || Value?.sapCategoryID !== categoryEditData?.categoryData?.sapCategoryID) {
                setValue("sapCategoryID", categoryEditData?.categoryData?.sapCategoryID || "");
                setDcSubCategoryName(categoryEditData?.categoryData?.sapCategoryID || "");
            }
        } else if (collectioguid !== "" && categoryEditData) {
            setValue("collectionType", "Category");
            setSelectedtype("Category");
        }
    }, [categoryEditData?.categoryData, isEdit, collectioguid]);

    useEffect(() => {
        // Mapping the listParentCollections to the format needed for the dropdown
        if (collectionGuid !== "" && categoryEditData) {
            let values = categoryEditData?.listParentCollections.map((item) => ({
                disabled: item.disabled,
                selected: item.selected,
                text: item.text || item.collectionTypeName,
                value: item.value,
                categorytype: item?.categorytype
            }));
            const collectionguid = collectionGuid !== "" && collectionGuid !== null ? collectionGuid : location.search.replace("?", "");
            const matchingItems = categoryEditData?.listParentCollections.filter((item) => item.value === collectionguid);
            values = values?.sort((a, b) => {
                if (a?.value === matchingItems) return -1;
                if (b?.value === matchingItems) return 1;
                return 0;
            });
            setParentCategory(values);
            setValue("parentCollectionGuid", matchingItems[0]?.parentcategoryguid || matchingItems[0]?.value);
            setSelectedParentGuid(matchingItems[0]?.parentcategoryguid || matchingItems[0]?.value);
        } else {
            let values = categoryEditData?.listParentCollections.map((item) => ({
                disabled: item.disabled,
                selected: item.selected,
                text: item.text || item.collectionTypeName,
                value: item.value,
                categorytype: item?.categorytype
            }));
            setParentCategory(values);
            const collectionguid = collectionGuid !== "" && collectionGuid !== null ? collectionGuid : location.search.replace("?", "");

            // Set the initially selected value
            const matchingItems = categoryEditData?.listParentCollections.filter((item) => item.value === collectionguid);
            values = values?.sort((a, b) => {
                if (a?.value === matchingItems) return -1;
                if (b?.value === matchingItems) return 1;
                return 0;
            });
            if (matchingItems !== undefined) {
                setValue("parentCollectionGuid", matchingItems[0]?.parentcategoryguid || matchingItems[0]?.value);
                setSelectedParentGuid(matchingItems[0]?.parentcategoryguid || matchingItems[0]?.value);
            }
        }
        if (categoryEditData) {
            const Categorytypeall = categoryEditData?.listCollectionTypes.map((item) => item?.collectionTypeName);
            let valuesdata = Categorytypeall?.map((type) => ({
                name: type,
                value: type,
                label: type
            }));
            valuesdata = valuesdata?.sort((a, b) => {
                if (a?.value === "Category") return -1;
                if (b?.value === "Category") return 1;
                return 0;
            });
            setCategoryType(valuesdata);
            if (isEdit) {
                setSelectedtype(categoryEditData?.categoryData?.collectionType);
            } else {
                setSelectedtype("Category");
            }
        }
        const Categorytypeall = categoryEditData?.listSage?.map((item) => item?.value);
        const SageListdata = Categorytypeall?.map((type) => ({
            name: type,
            value: type,
            label: type
        }));
        setSageList(SageListdata);
        const CategoryASI = categoryEditData?.listAsi?.map((item) => item?.value);
        const ASIListdata = CategoryASI?.map((type) => ({
            name: type,
            value: type,
            label: type
        }));
        setASIList(ASIListdata);
        const CategoryDC = categoryEditData?.listDC?.map((item) => item?.value);
        const DCListdata = CategoryDC?.map((type) => ({
            name: type,
            value: type,
            label: type
        }));
        setDCList(DCListdata);
        const CategorySubDC = categoryEditData?.listSubDC?.map((item) => item?.value);
        const DCListsubdata = CategorySubDC?.map((type) => ({
            name: type,
            value: type,
            label: type
        }));
        setDCSubList(DCListsubdata);
    }, [categoryEditData, collectioguid]);

    const handleChange = (e) => {
        setSelectedParentGuid(e.target.value);
    };

    const onSubmit = async (data, e) => {
        let isalias = false;
        let checkproduct = false;
        const guid = selectedParentGuid !== "" ? selectedParentGuid : data?.parentCollectionGuid;
        if (guid) {
            checkproduct = await checkCategory(guid);
        }
        if (Selectedtype !== null && !isEdit) {
            isalias = await checkAliasExists(data?.alias);
        }
        if (Selectedtype !== null && data?.collectionName !== "" && data?.alias !== "" && !isalias && !checkproduct) {
            if (!isEdit) {
                const variables = {
                    entity: {
                        alias: data?.alias,
                        asiCategoryName,
                        sageCategoryName,
                        bannerImageAlt: data?.bannerImageAlt,
                        bannerText: data?.bannerText,
                        canonicalLink: data?.canonicalLink,
                        categorylistingImageAlt: data?.categorylistingImageAlt,
                        categorylistingImageName: CategorylistingImage,
                        collectionBannerImageName: BannerImage,
                        collectionGuid: "",
                        collectionImageAlt: data?.collectionImageAlt,
                        collectionImageName: CollectionImage,
                        collectionName: data?.collectionName,
                        collectionType: Selectedtype,
                        dcCategoryName: DcCategoryName,
                        dcSubCategoriesName: DcSubCategoryName,
                        descriptionText: descriptionTextPayload,
                        displayOrder: data?.displayOrder !== undefined && data?.displayOrder !== null && data?.displayOrder !== "" ? parseInt(data?.displayOrder, 10) : 0,
                        featureIconImageAlt: data?.featureIconImageAlt,
                        furtherDescriptionText: furtherDescriptionTextPayload,
                        h1Tag: data?.h1Tag,
                        iconImageName: IconImage,
                        isActive: isOn,
                        isAllAssignedProducts: false,
                        isExcludedFromSitemap: isChecked,
                        isNewSection: false,
                        isProductMirroring: false,
                        menuBannerImageAlt: data?.menuBannerImageAlt,
                        menuBannerImageName: MenuBannerImage,
                        metaDescription: data?.metaDescription,
                        metaKeywords: data?.metaKeywords,
                        metaRobots: data?.metaRobots,
                        metaTitle: data?.metaTitle,
                        offerBannerImageAlt: data?.offerBannerImageAlt,
                        offerBannerImageName: OfferBannerImage,
                        parentCollectionGuid: selectedParentGuid !== "" ? selectedParentGuid : data?.parentCollectionGuid,
                        productCount: 0,
                        sapCategoryID: data?.sapCategoryID
                    }
                };
                UpdateSaveCategory({
                    variables
                }).then((res) => {
                    if (res?.data?.saveCategory?.statuscode === 200) {
                        ClearCategoryCache();
                        UpdateCategoryProductCount();
                        PopupV3({
                            content: res?.data?.saveCategory?.message,
                            // content: "Sales Flyer Added Successfully",
                            classes: "forgotPassAlert addSalesFlyerNew text-center no-footer",
                            type: "Success",
                            timeout: 800000,
                            pos: 5,
                            actions: [
                                {
                                    dismiss: true,
                                    text: "OK",
                                    do: () => {
                                        window.location.href = "/v2/Collection/GetAllCollection";
                                    }
                                }
                            ]
                        });
                    }
                });
            } else {
                const variables = {
                    entity: {
                        alias: data?.alias,
                        asiCategoryName,
                        sageCategoryName,
                        bannerImageAlt: data?.bannerImageAlt,
                        bannerText: data?.bannerText,
                        canonicalLink: data?.canonicalLink,
                        categorylistingImageAlt: data?.categorylistingImageAlt,
                        categorylistingImageName: CategorylistingImage,
                        collectionBannerImageName: BannerImage,
                        collectionGuid: data?.collectionGuid !== undefined && data?.collectionGuid !== "" ? data?.collectionGuid : categoryEditData?.categoryData?.collectionGuid,
                        collectionImageAlt: data?.collectionImageAlt,
                        collectionImageName: CollectionImage,
                        collectionName: data?.collectionName,
                        collectionType: data?.collectionType !== "" ? data?.collectionType : Selectedtype,
                        dcCategoryName: DcCategoryName,
                        dcSubCategoriesName: DcSubCategoryName,
                        descriptionText: descriptionTextPayload,
                        displayOrder: data?.displayOrder !== undefined && data?.displayOrder !== null && data?.displayOrder !== "" ? parseInt(data?.displayOrder, 10) : 0,
                        featureIconImageAlt: data?.featureIconImageAlt,
                        furtherDescriptionText: furtherDescriptionTextPayload,
                        h1Tag: data?.h1Tag,
                        iconImageName: IconImage,
                        isActive: isOn,
                        isAllAssignedProducts: false,
                        isExcludedFromSitemap: isChecked,
                        isNewSection: false,
                        isProductMirroring: false,
                        menuBannerImageAlt: data?.menuBannerImageAlt,
                        menuBannerImageName: MenuBannerImage,
                        metaDescription: data?.metaDescription,
                        metaKeywords: data?.metaKeywords,
                        metaRobots: data?.metaRobots,
                        metaTitle: data?.metaTitle,
                        offerBannerImageAlt: data?.offerBannerImageAlt,
                        offerBannerImageName: OfferBannerImage,
                        parentCollectionGuid: selectedParentGuid,
                        productCount: 0,
                        sapCategoryID: data?.sapCategoryID
                    }
                };
                UpdateSaveCategory({
                    variables
                }).then((res) => {
                    if (res?.data?.saveCategory?.statuscode === 200) {
                        ClearCategoryCache();
                        UpdateCategoryProductCount();
                        PopupV3({
                            content: res?.data?.saveCategory?.message,
                            // content: "Sales Flyer Updated Successfully",
                            classes: "forgotPassAlert text-center no-footer",
                            type: "Success",
                            pos: 5,
                            actions: [
                                {
                                    text: "Ok",
                                    classes: "ok",
                                    dismiss: true,
                                    do: () => {
                                        window.location.href = "/v2/Collection/GetAllCollection";
                                    }
                                }
                            ]
                        });
                    }
                });
                e.preventDefault();
            }
        } else if (Selectedtype === null) {
            PopupV3({
                content: "Please select Collection Type",
                classes: "forgotPassAlert text-center no-footer",
                type: "Warning",
                pos: 5,
                actions: [
                    {
                        text: "Ok",
                        classes: "ok",
                        dismiss: true,
                        do: () => { }
                    }
                ]
            });
        } else if (data?.collectionName === "") {
            PopupV3({
                content: resources?.["Category.valCollectionName"],
                classes: "forgotPassAlert text-center no-footer",
                type: "Warning",
                pos: 5,
                actions: [
                    {
                        text: "Ok",
                        classes: "ok",
                        dismiss: true,
                        do: () => { }
                    }
                ]
            });
        } else if (data?.alias === "") {
            PopupV3({
                content: "Please enter Alias Name",
                classes: "forgotPassAlert text-center no-footer",
                type: "Warning",
                pos: 5,
                actions: [
                    {
                        text: "Ok",
                        classes: "ok",
                        dismiss: true,
                        do: () => { }
                    }
                ]
            });
        } else if (isalias) {
            PopupV3({
                content: "Alias already assigned to other category",
                classes: "forgotPassAlert text-center no-footer",
                type: "Warning",
                pos: 5,
                actions: [
                    {
                        text: "Ok",
                        classes: "ok",
                        dismiss: true,
                        do: () => { }
                    }
                ]
            });
        } else if (checkproduct) {
            PopupV3({
                content: resources["Category.CategoryhasProduct"],
                classes: "forgotPassAlert text-center no-footer",
                type: "Warning",
                pos: 5,
                actions: [
                    {
                        text: "Ok",
                        classes: "ok",
                        dismiss: true,
                        do: () => { }
                    }
                ]
            });
        }
    };

    async function uploadremove(imagetype) {
        let result = "";
        try {
            let url = "";
            const tokens = TOKENS.SaaS_ProductAdmin_Microservice_Token;
            if (imagetype === "CollectionImageName") {
                url = `https://productadmin.ewizsaas.com/api/upload/UploadImage?action=remove&type=CollectionImage&Guid=${CollectionImage}&WebsiteGuid=${WEBSITE_GUID}`;
            } else if (imagetype === "offerBannerImage") {
                url = `https://productadmin.ewizsaas.com/api/upload/UploadImage?action=remove&type=OfferBannerImage&Guid=${OfferBannerImage}&WebsiteGuid=${WEBSITE_GUID}`;
            } else if (imagetype === "menuBannerImageName") {
                url = `https://productadmin.ewizsaas.com/api/upload/UploadImage?action=remove&type=MenuBannerImage&Guid=${MenuBannerImage}&WebsiteGuid=${WEBSITE_GUID}`;
            } else if (imagetype === "BannerImageName") {
                url = `https://productadmin.ewizsaas.com/api/upload/UploadImage?action=remove&type=BannerImage&Guid=${MenuBannerImage}&WebsiteGuid=${WEBSITE_GUID}`;
            } else if (imagetype === "IconImageName") {
                url = `https://productadmin.ewizsaas.com/api/upload/UploadImage?action=remove&type=IconImage&Guid=${MenuBannerImage}&WebsiteGuid=${WEBSITE_GUID}`;
            } else if (imagetype === "categorylistingImage") {
                url = `https://productadmin.ewizsaas.com/api/upload/UploadImage?action=remove&type=CategorylistingImage&Guid=${MenuBannerImage}&WebsiteGuid=${WEBSITE_GUID}`;
            }
            result = axios.post(
                url,
                {},
                {
                    headers: {
                        WebSiteGuid: WEBSITE_GUID,
                        LanguageGuid: LANGUAGE_GUID,
                        CookieDetails: COOKIE_DETAILS,
                        CurrencyGuid: CURRENCY_GUID,
                        authorization: tokens ? `Bearer ${tokens}` : ""
                    }
                }
            );
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }

        return result;
    }

    const handleRemoveImage = (imagetype) => {
        PopupV3({
            content: resources.CollectionAddImageRemoveConfirmation,
            type: "Confirm", // Assuming you have different types like 'warning', 'info', etc.
            title: resources.CollectionAddImageRemoveConfirmation,
            actions: [
                {
                    dismiss: true,
                    text: "Yes",
                    do: async () => {
                        // Mark this function as async
                        try {
                            await uploadremove(imagetype); // Ensure 'upload' function is defined
                            // if (res?.status === 200) {
                            if (imagetype === "CollectionImageName") {
                                setCollectionImage("");
                                setCollectionImageUrl("");
                                setShowCollection(true);
                                document.getElementById("collectionImageName").value = "";
                            } else if (imagetype === "offerBannerImage") {
                                setOfferBannerImageUrl("");
                                setShowOfferBanner(true);
                                setOfferBannerImage("");
                                document.getElementById("offerBannerImageName").value = "";
                            } else if (imagetype === "menuBannerImageName") {
                                setMenuBannerImage("");
                                setMenuBannerImageUrl("");
                                setShowMenuOfferBanner(true);
                                document.getElementById("menuBannerImageName").value = "";
                            } else if (imagetype === "BannerImageName") {
                                setBannerImage("");
                                setBannerImageUrl("");
                                setShowBanner(true);
                                document.getElementById("collectionBannerImageName").value = "";
                            } else if (imagetype === "IconImageName") {
                                setIconImage("");
                                setshowIcon(true);
                                setIconImageUrl("");
                                document.getElementById("IconImageFineUploader").value = "";
                            } else if (imagetype === "categorylistingImage") {
                                setCategorylistingImage("");
                                setShowCategoryListingImage(true);
                                setCategorylistingImageUrl("");
                                document.getElementById("categorylistingImage").value = "";
                            }
                            // }
                        } catch (error) {
                            console.error("Error uploading image:", error);
                        }
                    }
                },
                {
                    text: "No",
                    dismiss: true
                }
            ]
        });
    };

    async function upload(uploadImagePayload, Filetype) {
        let result = "";
        const token = TOKENS.SaaS_ProductImportExport_Microservice_Token;
        try {
            let url = "";
            if (Filetype === "CollectionImageName") {
                url = `https://productadmin.ewizsaas.com/api/upload/UploadImage?action=add&type=CollectionImage&Guid=&WebsiteGuid=${WEBSITE_GUID}&LanguageGuid=3238bf6d-ddcb-4f65-aadb-3eee730fb9c8&qquuid=${uploadImagePayload.qquuid}&qqtotalfilesize=${uploadImagePayload.filesize}&qqfile=${uploadImagePayload.filename}`;
            } else if (Filetype === "offerBannerImage") {
                url = `https://productadmin.ewizsaas.com/api/upload/UploadImage?action=add&type=OfferBannerImage&Guid=&WebsiteGuid=${WEBSITE_GUID}&LanguageGuid=3238bf6d-ddcb-4f65-aadb-3eee730fb9c8&qquuid=${uploadImagePayload.qquuid}&qqtotalfilesize=${uploadImagePayload.filesize}&qqfile=${uploadImagePayload.filename}`;
            } else if (Filetype === "menuBannerImageName") {
                url = `https://productadmin.ewizsaas.com/api/upload/UploadImage?action=add&type=MenuBannerImage&Guid=&WebsiteGuid=${WEBSITE_GUID}&LanguageGuid=3238bf6d-ddcb-4f65-aadb-3eee730fb9c8&qquuid=${uploadImagePayload.qquuid}&qqtotalfilesize=${uploadImagePayload.filesize}&qqfile=${uploadImagePayload.filename}`;
            } else if (Filetype === "BannerImageName") {
                url = `https://productadmin.ewizsaas.com/api/upload/UploadImage?action=add&type=CollectionBannerImage&Guid=&WebsiteGuid=${WEBSITE_GUID}&LanguageGuid=3238bf6d-ddcb-4f65-aadb-3eee730fb9c8&qquuid=${uploadImagePayload.qquuid}&qqtotalfilesize=${uploadImagePayload.filesize}&qqfile=${uploadImagePayload.filename}`;
            } else if (Filetype === "IconImageName") {
                url = `https://productadmin.ewizsaas.com/api/upload/UploadImage?action=add&type=IconImage&Guid=&WebsiteGuid=${WEBSITE_GUID}&LanguageGuid=3238bf6d-ddcb-4f65-aadb-3eee730fb9c8&qquuid=${uploadImagePayload.qquuid}&qqtotalfilesize=${uploadImagePayload.filesize}&qqfile=${uploadImagePayload.filename}`;
            } else if (Filetype === "categorylistingImage") {
                url = `https://productadmin.ewizsaas.com/api/upload/UploadImage?action=add&type=CategorylistingImage&Guid=&WebsiteGuid=${WEBSITE_GUID}&LanguageGuid=3238bf6d-ddcb-4f65-aadb-3eee730fb9c8&qquuid=${uploadImagePayload.qquuid}&qqtotalfilesize=${uploadImagePayload.filesize}&qqfile=${uploadImagePayload.filename}`;
            }
            result = await axios.post(url, uploadImagePayload.formData, {
                headers: {
                    WebSiteGuid: WEBSITE_GUID,
                    LanguageGuid: LANGUAGE_GUID,
                    CookieDetails: COOKIE_DETAILS,
                    CurrencyGuid: CURRENCY_GUID,
                    authorization: token ? `Bearer ${token}` : ""
                }
            });
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }

        return result;
    }
    // const convertHtmlToText = (html) => {
    //     const isshow = html.includes("&lt;");
    //     if (isshow) {
    //         const div = document.createElement("div");
    //         div.innerHTML = html;
    //         return div.textContent || div.innerText || "";
    //     }
    //     return html;
    // };
    // const textdescriptionText = convertHtmlToText(editordescriptionText?.toString("html") || "");
    // const textfurtherDescription = convertHtmlToText(editorfurtherDescriptionText?.toString("html") || "");
    // const onRichtextDescriptionTextChange = (value) => {
    //     // const htmldescription = value?.toString("html");
    //     // const description = convertHtmlToText(htmldescription);
    //     // // setDescriptionTextpayload(description);
    //     // const descriptionreplace = description?.replace(/<\/?head>|<\/?body>|<\/?h1>|<\/?p>/g, "");
    //     // setDescriptionText(descriptionreplace);
    //     setEditordescriptionText(value);
    // };

    // const onRichtextFurtherDescriptionChange = (value) => {
    //     // const htmlFurtherDescription = value?.toString("html");
    //     // const FurtherDescription = convertHtmlToText(htmlFurtherDescription);
    //     // const cleanDescription = FurtherDescription?.replace(/<\/?ul>/g, "") // Remove <ul> and </ul>
    //     //     .trim();

    //     // const items = cleanDescription
    //     //     ?.split("<li>")
    //     //     ?.filter((item) => item?.trim() !== "")
    //     //     ?.map((item) => ({
    //     //         id: uuidv4(), // Generate a unique id for each item
    //     //         text: item?.replace("</li>", "")?.trim()
    //     //     }));
    //     // const FurtherDescriptionreplace = FurtherDescription?.replace(/<\/?(head|body|h1|p|ul|li)>/g, "");
    //     // setFurtherDescriptionText(items);
    //     setEditorFurtherDescriptionText(value);
    // };

    // useEffect(() => {
    //     if (isEdit && categoryEditData?.categoryData) {
    //         // const { descriptionText, furtherDescriptionText } = categoryEditData?.categoryData;
    //         if (categoryEditData?.categoryData?.descriptionText !== null && categoryEditData?.categoryData?.descriptionText !== "") {
    //             onRichtextDescriptionTextChange(RichTextEditor?.createValueFromString(categoryEditData?.categoryData?.descriptionText, "html"));
    //         }
    //         if (categoryEditData?.categoryData?.furtherDescriptionText !== null && categoryEditData?.categoryData?.furtherDescriptionText !== "") {
    //             onRichtextFurtherDescriptionChange(RichTextEditor?.createValueFromString(categoryEditData?.categoryData?.furtherDescriptionText, "html"));
    //         }
    //     }
    // }, [isEdit, categoryEditData?.categoryData]);
    const onImageChange = async (event, typeimage) => {
        const fileimage = event?.target?.files[0]; // Get the first file from the input
        if (!fileimage) {
            console.error("No file selected.");
            return;
        }
        const { size, type } = fileimage;
        let fileSize = {};
        if (typeimage === "CollectionImageName") {
            const numbers = categoryEditData?.collectionImageDim?.match(/\d+/g);
            let result = 0;
            if (numbers && numbers?.length === 2) {
                const num1 = parseInt(numbers[0], 10);
                const num2 = parseInt(numbers[1], 10);
                result = num1 * num2;
            }
            fileSize = size < result;
        } else if (typeimage === "offerBannerImage") {
            const numbers = categoryEditData?.offerBannerImageDim?.match(/\d+/g);
            let result = 0;
            if (numbers && numbers?.length === 2) {
                const num1 = parseInt(numbers[0], 10);
                const num2 = parseInt(numbers[1], 10);
                result = num1 * num2;
            }
            fileSize = size < result;
        } else if (typeimage === "menuBannerImageName") {
            const numbers = categoryEditData?.menuBannerImageDim?.match(/\d+/g);
            let result = 0;
            if (numbers && numbers?.length === 2) {
                const num1 = parseInt(numbers[0], 10);
                const num2 = parseInt(numbers[1], 10);
                result = num1 * num2;
            }
            fileSize = size < result;
        } else if (typeimage === "BannerImageName") {
            const numbers = categoryEditData?.collectionBannerDim?.match(/\d+/g);
            let result = 0;
            if (numbers && numbers?.length === 2) {
                const num1 = parseInt(numbers[0], 10);
                const num2 = parseInt(numbers[1], 10);
                result = num1 * num2;
            }
            fileSize = size < result;
        } else if (typeimage === "IconImageName") {
            // fileSize = size < 1024;
        }
        const extension = type?.split("/").pop();
        const validExtensions = [resources?.["CollectionAddEdit.allowedExtensions"]];
        const atLeastOneConditionMet = validExtensions[0]?.includes(extension);
        if (fileSize && atLeastOneConditionMet) {
            const flyerImage = "some-flyer-image-guid.jpg"; // Replace with actual flyer image variable
            const imgguid = flyerImage?.split(".")[0];
            if (!imgguid) {
                console.error("flyerImage is not defined or has an invalid format.");
                return;
            }

            const filedata = new FormData();
            filedata.append("files", fileimage);
            const uploadImagePayload = {
                qquuid: uuidv4(),
                filename: fileimage?.name,
                filesize: fileimage?.size,
                formData: filedata // Ensure filedata is a FormData object
            };

            try {
                const res = await upload(uploadImagePayload, typeimage);
                if (res?.data?.success === true) {
                    if (type !== "application/pdf") {
                        if (typeimage === "CollectionImageName") {
                            setCollectionImage(res?.data?.name);
                            setCollectionImageUrl(res?.data?.src);
                            setShowCollection(false);
                        } else if (typeimage === "offerBannerImage") {
                            setOfferBannerImage(res?.data?.name);
                            setOfferBannerImageUrl(res?.data?.src);
                            setShowOfferBanner(false);
                        } else if (typeimage === "menuBannerImageName") {
                            setMenuBannerImage(res?.data?.name);
                            setMenuBannerImageUrl(res?.data?.src);
                            setShowMenuOfferBanner(false);
                        } else if (typeimage === "BannerImageName") {
                            setBannerImage(res?.data?.name);
                            setBannerImageUrl(res?.data?.src);
                            setShowBanner(false);
                        } else if (typeimage === "IconImageName") {
                            setIconImage(res?.data?.name);
                            setshowIcon(false);
                            setIconImageUrl(res?.data?.src);
                        } else if (typeimage === "categorylistingImage") {
                            setCategorylistingImage(res?.data?.name);
                            setShowCategoryListingImage(false);
                            setCategorylistingImageUrl(res?.data?.src);
                        }
                    }
                } else {
                    if (typeimage === "CollectionImageName") {
                        setCollectionImageUrl("");
                        setCollectionImage("");
                        setShowCollection(true);
                        document.getElementById("collectionImageName").value = "";
                    } else if (typeimage === "offerBannerImage") {
                        setOfferBannerImageUrl("");
                        document.getElementById("offerBannerImageName").value = "";
                        setOfferBannerImage("");
                        setShowOfferBanner(true);
                    } else if (typeimage === "menuBannerImageName") {
                        setMenuBannerImage("");
                        setMenuBannerImageUrl("");
                        setShowMenuOfferBanner(true);
                        document.getElementById("menuBannerImageName").value = "";
                    } else if (typeimage === "BannerImageName") {
                        setBannerImage("");
                        setBannerImageUrl("");
                        document.getElementById("collectionBannerImageName").value = "";
                        setShowBanner(true);
                    } else if (typeimage === "IconImageName") {
                        setIconImage("");
                        setshowIcon(true);
                        setIconImageUrl("");
                        document.getElementById("IconImageFineUploader").value = "";
                    } else if (typeimage === "categorylistingImage") {
                        setCategorylistingImage("");
                        setShowCategoryListingImage(true);
                        setCategorylistingImageUrl("");
                        document.getElementById("categorylistingImage").value = "";
                    }
                    PopupV3({
                        content: res?.data?.info,
                        classes: "forgotPassAlert text-center no-footer",
                        type: "Warning",
                        timeout: 5000,
                        pos: 5,
                        actions: [
                            {
                                text: "Ok",
                                classes: "ok",
                                dismiss: true
                            }
                        ]
                    });
                }
            } catch (error) {
                console.error("Error uploading the image:", error);
            }
        } else {
            if (typeimage === "CollectionImageName") {
                setCollectionImageUrl("");
                document.getElementById("collectionImageName").value = "";
            } else if (typeimage === "offerBannerImage") {
                setOfferBannerImageUrl("");
                document.getElementById("offerBannerImageName").value = "";
            } else if (typeimage === "menuBannerImageName") {
                setMenuBannerImageUrl("");
                document.getElementById("menuBannerImageName").value = "";
            } else if (typeimage === "BannerImageName") {
                setBannerImageUrl("");
                document.getElementById("collectionBannerImageName").value = "";
            } else if (typeimage === "IconImageName") {
                setIconImageUrl("");
                document.getElementById("IconImageFineUploader").value = "";
            } else if (typeimage === "categorylistingImage") {
                setCategorylistingImageUrl("");
                document.getElementById("categorylistingImage").value = "";
            }
            PopupV3({
                content: resources?.CollectionAddEditExtensionValidation,
                classes: "text-center",
                type: "Warning",
                size: "md",
                pos: 1
            });
        }
    };

    const ToggleNew = () => {
        const toggle = () => {
            setOn((prevIsOn) => !prevIsOn);
        };

        return (
            <div className="toggle-button">
                <label className={`slider ${isOn ? "on" : "off"}`}>
                    <input id="isActive" name="isActive" type="checkbox" checked={isOn} onChange={toggle} />
                    <div className="sort" />
                </label>
            </div>
        );
    };
    const onSelectType = (e) => {
        setSelectedtype(e.target.value);
    };
    const onHandleText = (e) => {
        setBannerText(e.target.value);
    };
    const redirectionHome = () => {
        navigate("/v2/Collection/GetAllCollection");
    };

    const onChange = (evt) => {
        const newContent = evt?.editor?.getData();
        setDescriptionText(newContent);
    };

    const onBlur = () => {
        // Handle blur event if needed
    };

    const afterPaste = (evt) => {
        const newContent = evt?.editor?.getData();
        setDescriptionText(newContent);
    };
    const onChangeDescripation = (evt) => {
        const newContent = evt?.editor?.getData();
        setfurtherDescriptionText(newContent);
    };

    const afterPasteDescripation = (evt) => {
        const newContent = evt?.editor?.getData();
        setfurtherDescriptionText(newContent);
    };
    function stripHTML(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        return doc.body.textContent || "";
    }
    const allowedExtensions = resources?.["CollectionAddEdit.allowedExtensions"]?.replace(/'/g, "")?.toUpperCase() || [];
    return (
        <section className="midContent">
            <div className={`AddSalesFlyer-Main AddEditCollection ${isEdit ? "EditcollectionPage" : ""}`} id="jumbo-header">
                <div className="left-form ">
                    <div className="form-sec h-100">
                        <div className="header-addsales d-flex align-items-center">
                            <h3 className="ml-3">{isEdit !== true ? "Add" : "Edit"}</h3>
                        </div>
                        <div className="rectangleTab">
                            <div className="tabbable-panel">
                                <div className="tabbable-line">
                                    <ul className="nav nav-tabs">
                                        <li className={activeTab === "Global" ? "nav-item active" : "nav-item"}>
                                            <button type="button" className="nav-link" onClick={() => handleTabClick("Global")}>
                                                Global
                                            </button>
                                        </li>
                                        <li className={activeTab === "Elements" ? "nav-item active" : "nav-item"}>
                                            <button type="button" className="nav-link" onClick={() => handleTabClick("Elements")}>
                                                Elements
                                            </button>
                                        </li>
                                        <li className={activeTab === "SEO" ? "nav-item active" : "nav-item"}>
                                            <button type="button" className="nav-link" onClick={() => handleTabClick("SEO")}>
                                                SEO
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            {activeTab === "Global" && (
                                                <div className="tab-pane fade show active" id="tab_default_1">
                                                    <div className="FormDiv pb-5 globalsection" id="GlobalSec">
                                                        <div className="form-group collectionType required input-text">
                                                            <label htmlFor="CollectionType">Collection Type </label>
                                                            <div className="SelectCollect">
                                                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <mask id="mask0_1890_2198" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="17">
                                                                        <rect y="0.320312" width="16" height="16" fill="#D9D9D9" />
                                                                    </mask>
                                                                    <g mask="url(#mask0_1890_2198)">
                                                                        <path d="M8 10.5703L4 6.5703L4.93333 5.63696L8 8.70363L11.0667 5.63696L12 6.5703L8 10.5703Z" fill="#667B84" />
                                                                    </g>
                                                                </svg>
                                                                <select
                                                                    id="collectionType"
                                                                    name="collectionType"
                                                                    disabled={!!isEdit || collectioguid !== ""}
                                                                    className="form-control clsCollcetionAddEdit_ColllectionType"
                                                                    // {...register("collectionType", {
                                                                    //     onChange: onSelectType
                                                                    // })}
                                                                    onChange={onSelectType}
                                                                    value={Selectedtype}

                                                                >
                                                                    {categoryType?.map((type) => (
                                                                        <option key={type.value} value={type.value} selected={Selectedtype?.toLowerCase() === type.value?.toLowerCase()}>
                                                                            {type.label}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <Input
                                                            inputType="text"
                                                            className="clsCollcetionAddEdit_ColllectionName"
                                                            // placeholder="Enter name"
                                                            labelName="Name"
                                                            customClass="clsCollcetionAddEdit_ColllectionName"
                                                            fieldId="collectionName"
                                                            name="collectionName"
                                                            errroMsg={errors?.collectionName?.message}
                                                            required={true}
                                                            _maxLength={100}
                                                            customProps={register("collectionName", {
                                                                required: resources?.["SalesFlyer.FlyerNameWarning"],
                                                                // pattern: {
                                                                //     value: FormFieldValidations.specialCharRegex.value,
                                                                //     message: FormFieldValidations.specialCharRegex.message
                                                                // }
                                                                onChange: (e) => {
                                                                    let input = e.target.value;
                                                                    let formattedInput = "";
                                                                    if (input.trim() !== " ") {
                                                                        input = input.trim().replace(/\W+(?!$)/g, "-");
                                                                        input = input.trim().replace(/_/g, "-");
                                                                        input = input.trim().replace(/\W$/, "");
                                                                        formattedInput = input;
                                                                    }
                                                                    setValue("collectionName", e.target.value);
                                                                    setValue("alias", formattedInput);
                                                                    seturl(formattedInput);
                                                                    // setValue("url", `${WEBSITE_URL}category/${e.target.value}`);
                                                                }
                                                            })}
                                                        />
                                                        {Selectedtype !== "Section" && Selectedtype !== "Featured Icon" && Selectedtype !== "Supplier" && Selectedtype !== "Brand" && (
                                                            <div className="form-group clsCollcetionAddEdit_ParentCollection">
                                                                {/* <label htmlFor="parentCollection">Parent Collection</label>
                                                            <select className="form-control" id="parentCollection">
                                                                <option>Backpack</option>
                                                            </select> */}
                                                                <label htmlFor="parentCollectionSelect">Parent Collection</label>
                                                                <div className="SelectCollect">
                                                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <mask id="mask0_1890_2198" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="17">
                                                                            <rect y="0.320312" width="16" height="16" fill="#D9D9D9" />
                                                                        </mask>
                                                                        <g mask="url(#mask0_1890_2198)">
                                                                            <path d="M8 10.5703L4 6.5703L4.93333 5.63696L8 8.70363L11.0667 5.63696L12 6.5703L8 10.5703Z" fill="#667B84" />
                                                                        </g>
                                                                    </svg>
                                                                    <select disabled={collectioguid !== ""} id="parentCollectionGuid" name="parentCollectionGuid" className="form-control" value={selectedParentGuid} onChange={handleChange}>
                                                                        <option value="">-- Select a Parent Collection --</option>
                                                                        {parentCategory?.map((item) => (
                                                                            <option key={item.value} value={item.value}>
                                                                                {item.text}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <input type="hidden" id="parentCollectionGuid" name="parentCollectionGuid" className="control-label" value={selectedParentGuid} />
                                                            </div>
                                                        )}
                                                        <Input
                                                            inputType="text"
                                                            className="clsCollcetionAddEdit_Alias"
                                                            // placeholder="Enter alias"
                                                            labelName="Alias"
                                                            customClass="clsCollcetionAddEdit_Alias"
                                                            fieldId="alias"
                                                            name="alias"
                                                            errroMsg={errors?.alias?.message}
                                                            _maxLength={100}
                                                            required
                                                            customProps={register("alias", {
                                                                onChange: (e) => {
                                                                    let input = e.target.value;
                                                                    let formattedInput = "";
                                                                    if (input.trim() !== " ") {
                                                                        input = input.trim().replace(/\W+(?!$)/g, "-");
                                                                        input = input.trim().replace(/_/g, "-");
                                                                        input = input.trim().replace(/\W$/, "");
                                                                        formattedInput = input;
                                                                    }
                                                                    setValue("alias", formattedInput);
                                                                    seturl(formattedInput);
                                                                }
                                                                // required: resources?.["SalesFlyer.FlyerNameWarning"],
                                                                // pattern: {
                                                                //     value: FormFieldValidations.specialCharRegex.value,
                                                                //     message: FormFieldValidations.specialCharRegex.message
                                                                // }
                                                            })}
                                                        />
                                                        <label className="form-group urlcontrolpanel">{`${WEBSITE_URL?.toLowerCase()}category/${Url}`}</label>
                                                        {/* <Input inputType="text" placeholder={`${WEBSITE_URL}category`} _maxLength={100} labelName="URL" customClass="clsCollcetionAddEdit_Url" fieldId="url" name="url" isReadOnly={true} customProps={register("url", {})} /> */}
                                                        {resources?.Sage?.toLowerCase() === "true" && (
                                                            <div className="form-group input-text">
                                                                <label htmlFor="SageCategoryName">Sage</label>
                                                                <div className="SelectCollect">
                                                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <mask id="mask0_1890_2198" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="17">
                                                                            <rect y="0.320312" width="16" height="16" fill="#D9D9D9" />
                                                                        </mask>
                                                                        <g mask="url(#mask0_1890_2198)">
                                                                            <path d="M8 10.5703L4 6.5703L4.93333 5.63696L8 8.70363L11.0667 5.63696L12 6.5703L8 10.5703Z" fill="#667B84" />
                                                                        </g>
                                                                    </svg>
                                                                    <select
                                                                        value={sageCategoryName}
                                                                        onChange={handleSageChange}
                                                                        className="form-control clsCollcetionAddEdit_SageCategoryName"
                                                                        id="SageCategoryName"
                                                                        placeholder="Please select sage Category"
                                                                    >
                                                                        {SageList?.map((item) => (
                                                                            <option key={item.value} value={item.value}>
                                                                                {item.label}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {resources?.ASI?.toLowerCase() === "true" && (
                                                            <div className="form-group  input-text">
                                                                <label htmlFor="ASICategoryName">ASI</label>
                                                                <div className="SelectCollect">
                                                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <mask id="mask0_1890_2198" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="17">
                                                                            <rect y="0.320312" width="16" height="16" fill="#D9D9D9" />
                                                                        </mask>
                                                                        <g mask="url(#mask0_1890_2198)">
                                                                            <path d="M8 10.5703L4 6.5703L4.93333 5.63696L8 8.70363L11.0667 5.63696L12 6.5703L8 10.5703Z" fill="#667B84" />
                                                                        </g>
                                                                    </svg>
                                                                    <select
                                                                        value={asiCategoryName}
                                                                        onChange={handleASIChange}
                                                                        className="form-control clsCollcetionAddEdit_SageCategoryName"
                                                                        id="ASICategoryName"
                                                                        placeholder="Please select ASI Category"
                                                                    >
                                                                        <option value="">Please select ASI Category</option>
                                                                        {ASIList?.map((item) => (
                                                                            <option key={item.value} value={item.value}>
                                                                                {item.label}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {resources?.DC?.toLowerCase() === "true" &&
                                                            (
                                                                <>
                                                                    <div className="form-group  input-text">
                                                                        <label htmlFor="DCCategoryName">DC Category Name</label>
                                                                        <div className="SelectCollect">
                                                                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <mask id="mask0_1890_2198" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="17">
                                                                                    <rect y="0.320312" width="16" height="16" fill="#D9D9D9" />
                                                                                </mask>
                                                                                <g mask="url(#mask0_1890_2198)">
                                                                                    <path d="M8 10.5703L4 6.5703L4.93333 5.63696L8 8.70363L11.0667 5.63696L12 6.5703L8 10.5703Z" fill="#667B84" />
                                                                                </g>
                                                                            </svg>
                                                                            <select
                                                                                value={DcCategoryName}
                                                                                onChange={handleDCChange}
                                                                                className="form-control"
                                                                                id="DCCategoryName"
                                                                                placeholder="Select DCCategory Name"
                                                                            >
                                                                                <option value="">Select DCCategory Name</option>
                                                                                {DCList?.map((item) => (
                                                                                    <option key={item.value} value={item.value}>
                                                                                        {item.label}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-group  input-text">
                                                                        <label htmlFor="DCSubCategoriesName">DC Subcategory Name</label>
                                                                        <div className="SelectCollect">
                                                                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <mask id="mask0_1890_2198" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="17">
                                                                                    <rect y="0.320312" width="16" height="16" fill="#D9D9D9" />
                                                                                </mask>
                                                                                <g mask="url(#mask0_1890_2198)">
                                                                                    <path d="M8 10.5703L4 6.5703L4.93333 5.63696L8 8.70363L11.0667 5.63696L12 6.5703L8 10.5703Z" fill="#667B84" />
                                                                                </g>
                                                                            </svg>
                                                                            <select
                                                                                value={DcSubCategoryName}
                                                                                onChange={handleSubDCChange}
                                                                                className="form-control"
                                                                                id="DCSubCategoriesName"
                                                                                placeholder="Select DCSubCategories Name"
                                                                            >
                                                                                <option value="">Select DCSubCategories Name</option>
                                                                                {DCSubList?.map((item) => (
                                                                                    <option key={item.value} value={item.value}>
                                                                                        {item.label}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        <Input inputType="text" placeholder="SAPCategoryID" labelName="SAPCategoryID" fieldId="sapCategoryID" customClass="SAPCategoryIDNew" name="sapCategoryID" customProps={register("sapCategoryID", {})} />
                                                        <div className="form-group stutes d-flex justify-content-between clsCollcetionAddEdit_Status">
                                                            <label className="col-lg-6 p-0">Status</label>
                                                            <div className="col-lg-6 p-0 d-flex align-items-center justify-content-between">
                                                                <label>{isOn ? "Active" : "Inactive"}</label>
                                                                <div className="toggle-button">
                                                                    <ToggleNew />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="footer-addsales mt-5 d-flex align-items-center justify-content-center justify-content-lg-end">
                                                        <button type="button" className="btn btn_search mr-2 btn-sm" onClick={redirectionHome}>
                                                            Cancel
                                                        </button>
                                                        <button type="submit" className="btn btn_create btn-sm">
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            {activeTab === "Elements" && (
                                                <div className="tab-pane fade show active" id="tab_default_2">
                                                    <div className="FormDiv pb-5" id="ElementsSec">
                                                        <div className="form-group clsCollcetionAddEdit_DescriptionText">
                                                            <label htmlFor="description">Description</label>
                                                            {/* <div id="cke_Description" className="cke_1658 cke cke_reset cke_chrome cke_editor_Description cke_ltr cke_browser_webkit" style={{ width: "100%" }}> */}
                                                            <Ckeditor
                                                                activeClass="p10"
                                                                content={descriptionTextPayload}
                                                                events={{
                                                                    blur: (e) => onBlur(e),
                                                                    afterPaste: (e) => afterPaste(e),
                                                                    change: (e) => onChange(e)
                                                                }}
                                                            />{" "}
                                                            {/* </div> */}
                                                        </div>
                                                        <div className="form-group clsCollcetionAddEdit_FurtherDescriptionText">
                                                            <label htmlFor="furtherDescription">Further Description</label>
                                                            <Ckeditor
                                                                activeClass="p10"
                                                                content={furtherDescriptionTextPayload}
                                                                events={{
                                                                    blur: (e) => onBlur(e),
                                                                    afterPaste: (e) => afterPasteDescripation(e),
                                                                    change: (e) => onChangeDescripation(e)
                                                                }}
                                                            />
                                                        </div>
                                                        {Selectedtype !== "Featured Icon" && (
                                                            <>
                                                                <div className="form-group">
                                                                    <label htmlFor="collectionImage">Collection Image</label>
                                                                    {CollectionImage === "" || CollectionImage === null ? <input type="file" className="form-control clsCollcetionAddEdit_CollectionImage" id="collectionImageName" accept="image/png,image/jpeg,image/jpg,image/gif" name="collectionImageName" {...register("collectionImageName", {})} onChange={(e) => onImageChange(e, "CollectionImageName")} /> : <input type="text" id="collectionImageName" name="collectionImageName" value={CollectionImage} readOnly placeholder="No file chosen" />}
                                                                    <div className="uploadSect">
                                                                        {showcollection !== true ? (
                                                                            <span className="icon-trash-add d-flex align-items-center justify-content-center" onClick={() => handleRemoveImage("CollectionImageName")}>
                                                                                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path
                                                                                        d="M12 2.31055H9.5V1.81055C9.5 1.41272 9.34196 1.03119 9.06066 0.749887C8.77936 0.468582 8.39782 0.310547 8 0.310547H5C4.60218 0.310547 4.22064 0.468582 3.93934 0.749887C3.65804 1.03119 3.5 1.41272 3.5 1.81055V2.31055H1C0.867392 2.31055 0.740215 2.36323 0.646447 2.45699C0.552679 2.55076 0.5 2.67794 0.5 2.81055C0.5 2.94316 0.552679 3.07033 0.646447 3.1641C0.740215 3.25787 0.867392 3.31055 1 3.31055H1.5V12.3105C1.5 12.5758 1.60536 12.8301 1.79289 13.0177C1.98043 13.2052 2.23478 13.3105 2.5 13.3105H10.5C10.7652 13.3105 11.0196 13.2052 11.2071 13.0177C11.3946 12.8301 11.5 12.5758 11.5 12.3105V3.31055H12C12.1326 3.31055 12.2598 3.25787 12.3536 3.1641C12.4473 3.07033 12.5 2.94316 12.5 2.81055C12.5 2.67794 12.4473 2.55076 12.3536 2.45699C12.2598 2.36323 12.1326 2.31055 12 2.31055ZM4.5 1.81055C4.5 1.67794 4.55268 1.55076 4.64645 1.45699C4.74021 1.36323 4.86739 1.31055 5 1.31055H8C8.13261 1.31055 8.25979 1.36323 8.35355 1.45699C8.44732 1.55076 8.5 1.67794 8.5 1.81055V2.31055H4.5V1.81055ZM10.5 12.3105H2.5V3.31055H10.5V12.3105ZM5.5 5.81055V9.81055C5.5 9.94316 5.44732 10.0703 5.35355 10.1641C5.25979 10.2579 5.13261 10.3105 5 10.3105C4.86739 10.3105 4.74021 10.2579 4.64645 10.1641C4.55268 10.0703 4.5 9.94316 4.5 9.81055V5.81055C4.5 5.67794 4.55268 5.55076 4.64645 5.45699C4.74021 5.36323 4.86739 5.31055 5 5.31055C5.13261 5.31055 5.25979 5.36323 5.35355 5.45699C5.44732 5.55076 5.5 5.67794 5.5 5.81055ZM8.5 5.81055V9.81055C8.5 9.94316 8.44732 10.0703 8.35355 10.1641C8.25979 10.2579 8.13261 10.3105 8 10.3105C7.86739 10.3105 7.74021 10.2579 7.64645 10.1641C7.55268 10.0703 7.5 9.94316 7.5 9.81055V5.81055C7.5 5.67794 7.55268 5.55076 7.64645 5.45699C7.74021 5.36323 7.86739 5.31055 8 5.31055C8.13261 5.31055 8.25979 5.36323 8.35355 5.45699C8.44732 5.55076 8.5 5.67794 8.5 5.81055Z"
                                                                                        fill="#2E3B41"
                                                                                    />
                                                                                </svg>
                                                                            </span>
                                                                        ) : (
                                                                            <svg className="uploadImge" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M8.25 12.9822V6.86968L6.3 8.81968L5.25 7.73218L9 3.98218L12.75 7.73218L11.7 8.81968L9.75 6.86968V12.9822H8.25ZM4.5 15.9822C4.0875 15.9822 3.7345 15.8354 3.441 15.5419C3.1475 15.2484 3.0005 14.8952 3 14.4822V12.2322H4.5V14.4822H13.5V12.2322H15V14.4822C15 14.8947 14.8533 15.2479 14.5597 15.5419C14.2662 15.8359 13.913 15.9827 13.5 15.9822H4.5Z" fill="#2E3B41" />
                                                                            </svg>
                                                                        )}
                                                                    </div>
                                                                    <span>
                                                                        <p> File: {allowedExtensions} | Size: 1 MB </p>
                                                                        {"  "}
                                                                        <p>
                                                                            {" "}
                                                                            Dimension: {globalsetting?.["CollectionImage-Width"]} x {globalsetting?.["CollectionImage-Height"]} px
                                                                        </p>
                                                                    </span>
                                                                </div>
                                                                <Input
                                                                    inputType="text"
                                                                    className="clsCollcetionAddEdit_CollectionImageAlt"
                                                                    placeholder="Enter Collection Image Alt"
                                                                    labelName="Collection Image Alt"
                                                                    customClass="clsCollcetionAddEdit_CollectionImageAlt"
                                                                    fieldId="collectionImageAlt"
                                                                    name="collectionImageAlt"
                                                                    errroMsg={errors?.collectionImageAlt?.message}
                                                                    customProps={register("collectionImageAlt", {
                                                                        // required: resources?.["SalesFlyer.FlyerNameWarning"],
                                                                        // pattern: {
                                                                        //     value: FormFieldValidations.specialCharRegex.value,
                                                                        //     message: FormFieldValidations.specialCharRegex.message
                                                                        // }
                                                                    })}
                                                                />
                                                                <Input
                                                                    inputType="text"
                                                                    className="clsCollcetionAddEdit_BannerText"
                                                                    labelName="Banner Text"
                                                                    customClass="clsCollcetionAddEdit_BannerText"
                                                                    fieldId="bannerText"
                                                                    name="bannerText"
                                                                    errroMsg={errors?.bannerText?.message}
                                                                    customProps={register("bannerText", {
                                                                        // pattern: {
                                                                        //     value: FormFieldValidations.specialCharRegex.value,
                                                                        //     message: FormFieldValidations.specialCharRegex.message
                                                                        // },
                                                                        onChange: (e) => onHandleText(e)
                                                                    })}
                                                                />
                                                                <div className="form-group">
                                                                    <label htmlFor="offerBannerImage">Offer Banner Image</label>
                                                                    {OfferBannerImage === "" || OfferBannerImage === null ? <input type="file" className="form-control clsCollcetionAddEdit_OfferBannerImageName" id="offerBannerImageName" accept="image/png,image/jpeg,image/jpg,image/gif" name="offerBannerImageName" {...register("offerBannerImageName", {})} onChange={(e) => onImageChange(e, "offerBannerImage")} /> : <input type="text" id="offerBannerImageName" name="offerBannerImageName" value={OfferBannerImage} readOnly placeholder="No file chosen" />}
                                                                    <div className="uploadSect">
                                                                        {showofferbanner !== true ? (
                                                                            <span className="icon-trash-add d-flex align-items-center justify-content-center" onClick={() => handleRemoveImage("offerBannerImage")}>
                                                                                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path
                                                                                        d="M12 2.31055H9.5V1.81055C9.5 1.41272 9.34196 1.03119 9.06066 0.749887C8.77936 0.468582 8.39782 0.310547 8 0.310547H5C4.60218 0.310547 4.22064 0.468582 3.93934 0.749887C3.65804 1.03119 3.5 1.41272 3.5 1.81055V2.31055H1C0.867392 2.31055 0.740215 2.36323 0.646447 2.45699C0.552679 2.55076 0.5 2.67794 0.5 2.81055C0.5 2.94316 0.552679 3.07033 0.646447 3.1641C0.740215 3.25787 0.867392 3.31055 1 3.31055H1.5V12.3105C1.5 12.5758 1.60536 12.8301 1.79289 13.0177C1.98043 13.2052 2.23478 13.3105 2.5 13.3105H10.5C10.7652 13.3105 11.0196 13.2052 11.2071 13.0177C11.3946 12.8301 11.5 12.5758 11.5 12.3105V3.31055H12C12.1326 3.31055 12.2598 3.25787 12.3536 3.1641C12.4473 3.07033 12.5 2.94316 12.5 2.81055C12.5 2.67794 12.4473 2.55076 12.3536 2.45699C12.2598 2.36323 12.1326 2.31055 12 2.31055ZM4.5 1.81055C4.5 1.67794 4.55268 1.55076 4.64645 1.45699C4.74021 1.36323 4.86739 1.31055 5 1.31055H8C8.13261 1.31055 8.25979 1.36323 8.35355 1.45699C8.44732 1.55076 8.5 1.67794 8.5 1.81055V2.31055H4.5V1.81055ZM10.5 12.3105H2.5V3.31055H10.5V12.3105ZM5.5 5.81055V9.81055C5.5 9.94316 5.44732 10.0703 5.35355 10.1641C5.25979 10.2579 5.13261 10.3105 5 10.3105C4.86739 10.3105 4.74021 10.2579 4.64645 10.1641C4.55268 10.0703 4.5 9.94316 4.5 9.81055V5.81055C4.5 5.67794 4.55268 5.55076 4.64645 5.45699C4.74021 5.36323 4.86739 5.31055 5 5.31055C5.13261 5.31055 5.25979 5.36323 5.35355 5.45699C5.44732 5.55076 5.5 5.67794 5.5 5.81055ZM8.5 5.81055V9.81055C8.5 9.94316 8.44732 10.0703 8.35355 10.1641C8.25979 10.2579 8.13261 10.3105 8 10.3105C7.86739 10.3105 7.74021 10.2579 7.64645 10.1641C7.55268 10.0703 7.5 9.94316 7.5 9.81055V5.81055C7.5 5.67794 7.55268 5.55076 7.64645 5.45699C7.74021 5.36323 7.86739 5.31055 8 5.31055C8.13261 5.31055 8.25979 5.36323 8.35355 5.45699C8.44732 5.55076 8.5 5.67794 8.5 5.81055Z"
                                                                                        fill="#2E3B41"
                                                                                    />
                                                                                </svg>
                                                                            </span>
                                                                        ) : (
                                                                            <svg className="uploadImge" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M8.25 12.9822V6.86968L6.3 8.81968L5.25 7.73218L9 3.98218L12.75 7.73218L11.7 8.81968L9.75 6.86968V12.9822H8.25ZM4.5 15.9822C4.0875 15.9822 3.7345 15.8354 3.441 15.5419C3.1475 15.2484 3.0005 14.8952 3 14.4822V12.2322H4.5V14.4822H13.5V12.2322H15V14.4822C15 14.8947 14.8533 15.2479 14.5597 15.5419C14.2662 15.8359 13.913 15.9827 13.5 15.9822H4.5Z" fill="#2E3B41" />
                                                                            </svg>
                                                                        )}
                                                                    </div>
                                                                    <span>
                                                                        <p> File: {allowedExtensions} | Size: 1 MB </p> {"  "}
                                                                        <p>
                                                                            {" "}
                                                                            Dimension: {globalsetting?.["OfferBannerImage-Width"]} x {globalsetting?.["OfferBannerImage-Height"]}px
                                                                        </p>
                                                                    </span>
                                                                </div>
                                                                <Input
                                                                    inputType="text"
                                                                    className="clsCollcetionAddEdit_OfferBannerImageAlt"
                                                                    labelName="Offer Banner Image Alt"
                                                                    customClass="clsCollcetionAddEdit_OfferBannerImageAlt"
                                                                    fieldId="offerBannerImageAlt"
                                                                    name="offerBannerImageAlt"
                                                                    errroMsg={errors?.offerBannerImageAlt?.message}
                                                                    customProps={register("offerBannerImageAlt", {
                                                                        // pattern: {
                                                                        //     value: FormFieldValidations.specialCharRegex.value,
                                                                        //     message: FormFieldValidations.specialCharRegex.message
                                                                        // }
                                                                    })}
                                                                />
                                                                <div className="form-group">
                                                                    <label htmlFor="offerBannerImage">Banner Image</label>
                                                                    {BannerImage === "" || BannerImage === null ? <input type="file" className="form-control clsCollcetionAddEdit_BannerImage" id="collectionBannerImageName" accept="image/png,image/jpeg,image/jpg,image/gif" name="collectionBannerImageName" {...register("collectionBannerImageName", {})} onChange={(e) => onImageChange(e, "BannerImageName")} /> : <input type="text" id="collectionBannerImageName" name="collectionBannerImageName" value={BannerImage} readOnly placeholder="No file chosen" />}
                                                                    <div className="uploadSect">
                                                                        {showBanner !== true ? (
                                                                            <span className="icon-trash-add d-flex align-items-center justify-content-center" onClick={() => handleRemoveImage("BannerImageName")}>
                                                                                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path
                                                                                        d="M12 2.31055H9.5V1.81055C9.5 1.41272 9.34196 1.03119 9.06066 0.749887C8.77936 0.468582 8.39782 0.310547 8 0.310547H5C4.60218 0.310547 4.22064 0.468582 3.93934 0.749887C3.65804 1.03119 3.5 1.41272 3.5 1.81055V2.31055H1C0.867392 2.31055 0.740215 2.36323 0.646447 2.45699C0.552679 2.55076 0.5 2.67794 0.5 2.81055C0.5 2.94316 0.552679 3.07033 0.646447 3.1641C0.740215 3.25787 0.867392 3.31055 1 3.31055H1.5V12.3105C1.5 12.5758 1.60536 12.8301 1.79289 13.0177C1.98043 13.2052 2.23478 13.3105 2.5 13.3105H10.5C10.7652 13.3105 11.0196 13.2052 11.2071 13.0177C11.3946 12.8301 11.5 12.5758 11.5 12.3105V3.31055H12C12.1326 3.31055 12.2598 3.25787 12.3536 3.1641C12.4473 3.07033 12.5 2.94316 12.5 2.81055C12.5 2.67794 12.4473 2.55076 12.3536 2.45699C12.2598 2.36323 12.1326 2.31055 12 2.31055ZM4.5 1.81055C4.5 1.67794 4.55268 1.55076 4.64645 1.45699C4.74021 1.36323 4.86739 1.31055 5 1.31055H8C8.13261 1.31055 8.25979 1.36323 8.35355 1.45699C8.44732 1.55076 8.5 1.67794 8.5 1.81055V2.31055H4.5V1.81055ZM10.5 12.3105H2.5V3.31055H10.5V12.3105ZM5.5 5.81055V9.81055C5.5 9.94316 5.44732 10.0703 5.35355 10.1641C5.25979 10.2579 5.13261 10.3105 5 10.3105C4.86739 10.3105 4.74021 10.2579 4.64645 10.1641C4.55268 10.0703 4.5 9.94316 4.5 9.81055V5.81055C4.5 5.67794 4.55268 5.55076 4.64645 5.45699C4.74021 5.36323 4.86739 5.31055 5 5.31055C5.13261 5.31055 5.25979 5.36323 5.35355 5.45699C5.44732 5.55076 5.5 5.67794 5.5 5.81055ZM8.5 5.81055V9.81055C8.5 9.94316 8.44732 10.0703 8.35355 10.1641C8.25979 10.2579 8.13261 10.3105 8 10.3105C7.86739 10.3105 7.74021 10.2579 7.64645 10.1641C7.55268 10.0703 7.5 9.94316 7.5 9.81055V5.81055C7.5 5.67794 7.55268 5.55076 7.64645 5.45699C7.74021 5.36323 7.86739 5.31055 8 5.31055C8.13261 5.31055 8.25979 5.36323 8.35355 5.45699C8.44732 5.55076 8.5 5.67794 8.5 5.81055Z"
                                                                                        fill="#2E3B41"
                                                                                    />
                                                                                </svg>
                                                                            </span>
                                                                        ) : (
                                                                            <svg className="uploadImge" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M8.25 12.9822V6.86968L6.3 8.81968L5.25 7.73218L9 3.98218L12.75 7.73218L11.7 8.81968L9.75 6.86968V12.9822H8.25ZM4.5 15.9822C4.0875 15.9822 3.7345 15.8354 3.441 15.5419C3.1475 15.2484 3.0005 14.8952 3 14.4822V12.2322H4.5V14.4822H13.5V12.2322H15V14.4822C15 14.8947 14.8533 15.2479 14.5597 15.5419C14.2662 15.8359 13.913 15.9827 13.5 15.9822H4.5Z" fill="#2E3B41" />
                                                                            </svg>
                                                                        )}
                                                                    </div>
                                                                    <span>
                                                                        <p> File: {allowedExtensions} | Size: 1 MB </p> {"  "}
                                                                        <p>
                                                                            {" "}
                                                                            Dimension: {globalsetting?.["Collection-Banner-Width"]} x {globalsetting?.["Collection-Banner-Height"]}px
                                                                        </p>
                                                                    </span>
                                                                </div>
                                                                <Input
                                                                    inputType="text"
                                                                    className="clsCollcetionAddEdit_BannerImageAlt"
                                                                    labelName="Banner Image alt"
                                                                    customClass="clsCollcetionAddEdit_BannerImageAlt"
                                                                    fieldId="bannerImageAlt"
                                                                    name="bannerImageAlt"
                                                                    errroMsg={errors?.bannerImageAlt?.message}
                                                                    customProps={register("bannerImageAlt", {
                                                                        // pattern: {
                                                                        //     value: FormFieldValidations.specialCharRegex.value,
                                                                        //     message: FormFieldValidations.specialCharRegex.message
                                                                        // },
                                                                    })}
                                                                />
                                                                <div className="form-group">
                                                                    <label htmlFor="menuBannerImage">Menu Banner Image</label>
                                                                    {MenuBannerImage === "" || MenuBannerImage === null ? <input type="file" className="form-control clsCollcetionAddEdit_MenuBannerImageName" id="menuBannerImageName" accept="image/png,image/jpeg,image/jpg,image/gif" name="menuBannerImageName" {...register("menuBannerImageName", {})} onChange={(e) => onImageChange(e, "menuBannerImageName")} /> : <input type="text" id="menuBannerImageName" name="menuBannerImageName" value={MenuBannerImage} readOnly placeholder="No file chosen" />}
                                                                    <div className="uploadSect">
                                                                        {showmenuOfferBanner !== true ? (
                                                                            <span className="icon-trash-add d-flex align-items-center justify-content-center" onClick={() => handleRemoveImage("menuBannerImageName")}>
                                                                                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path
                                                                                        d="M12 2.31055H9.5V1.81055C9.5 1.41272 9.34196 1.03119 9.06066 0.749887C8.77936 0.468582 8.39782 0.310547 8 0.310547H5C4.60218 0.310547 4.22064 0.468582 3.93934 0.749887C3.65804 1.03119 3.5 1.41272 3.5 1.81055V2.31055H1C0.867392 2.31055 0.740215 2.36323 0.646447 2.45699C0.552679 2.55076 0.5 2.67794 0.5 2.81055C0.5 2.94316 0.552679 3.07033 0.646447 3.1641C0.740215 3.25787 0.867392 3.31055 1 3.31055H1.5V12.3105C1.5 12.5758 1.60536 12.8301 1.79289 13.0177C1.98043 13.2052 2.23478 13.3105 2.5 13.3105H10.5C10.7652 13.3105 11.0196 13.2052 11.2071 13.0177C11.3946 12.8301 11.5 12.5758 11.5 12.3105V3.31055H12C12.1326 3.31055 12.2598 3.25787 12.3536 3.1641C12.4473 3.07033 12.5 2.94316 12.5 2.81055C12.5 2.67794 12.4473 2.55076 12.3536 2.45699C12.2598 2.36323 12.1326 2.31055 12 2.31055ZM4.5 1.81055C4.5 1.67794 4.55268 1.55076 4.64645 1.45699C4.74021 1.36323 4.86739 1.31055 5 1.31055H8C8.13261 1.31055 8.25979 1.36323 8.35355 1.45699C8.44732 1.55076 8.5 1.67794 8.5 1.81055V2.31055H4.5V1.81055ZM10.5 12.3105H2.5V3.31055H10.5V12.3105ZM5.5 5.81055V9.81055C5.5 9.94316 5.44732 10.0703 5.35355 10.1641C5.25979 10.2579 5.13261 10.3105 5 10.3105C4.86739 10.3105 4.74021 10.2579 4.64645 10.1641C4.55268 10.0703 4.5 9.94316 4.5 9.81055V5.81055C4.5 5.67794 4.55268 5.55076 4.64645 5.45699C4.74021 5.36323 4.86739 5.31055 5 5.31055C5.13261 5.31055 5.25979 5.36323 5.35355 5.45699C5.44732 5.55076 5.5 5.67794 5.5 5.81055ZM8.5 5.81055V9.81055C8.5 9.94316 8.44732 10.0703 8.35355 10.1641C8.25979 10.2579 8.13261 10.3105 8 10.3105C7.86739 10.3105 7.74021 10.2579 7.64645 10.1641C7.55268 10.0703 7.5 9.94316 7.5 9.81055V5.81055C7.5 5.67794 7.55268 5.55076 7.64645 5.45699C7.74021 5.36323 7.86739 5.31055 8 5.31055C8.13261 5.31055 8.25979 5.36323 8.35355 5.45699C8.44732 5.55076 8.5 5.67794 8.5 5.81055Z"
                                                                                        fill="#2E3B41"
                                                                                    />
                                                                                </svg>
                                                                            </span>
                                                                        ) : (
                                                                            <svg className="uploadImge" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M8.25 12.9822V6.86968L6.3 8.81968L5.25 7.73218L9 3.98218L12.75 7.73218L11.7 8.81968L9.75 6.86968V12.9822H8.25ZM4.5 15.9822C4.0875 15.9822 3.7345 15.8354 3.441 15.5419C3.1475 15.2484 3.0005 14.8952 3 14.4822V12.2322H4.5V14.4822H13.5V12.2322H15V14.4822C15 14.8947 14.8533 15.2479 14.5597 15.5419C14.2662 15.8359 13.913 15.9827 13.5 15.9822H4.5Z" fill="#2E3B41" />
                                                                            </svg>
                                                                        )}
                                                                    </div>
                                                                    <span>
                                                                        <p> File: {allowedExtensions} | Size: 1 MB </p> {"  "}
                                                                        <p>
                                                                            {" "}
                                                                            Dimension: {globalsetting?.["MenuBannerImage-Width"]} x {globalsetting?.["MenuBannerImage-Height"]}px
                                                                        </p>
                                                                    </span>
                                                                </div>
                                                                <Input
                                                                    inputType="text"
                                                                    className="clsCollcetionAddEdit_MenuBannerImageAltName"
                                                                    labelName="Menu Banner Image Alt"
                                                                    customClass="clsCollcetionAddEdit_MenuBannerImageAltName"
                                                                    fieldId="menuBannerImageAlt"
                                                                    name="menuBannerImageAlt"
                                                                    errroMsg={errors?.menuBannerImageAlt?.message}
                                                                    customProps={register("menuBannerImageAlt", {
                                                                        // pattern: {
                                                                        //     value: FormFieldValidations.specialCharRegex.value,
                                                                        //     message: FormFieldValidations.specialCharRegex.message
                                                                        // }
                                                                    })}
                                                                />
                                                                {WEBSITE_GUID === "CA95212E-1CBC-4330-87DF-3DD5D3661085" && (
                                                                    <>
                                                                        <div className="form-group">
                                                                            <label htmlFor="categorylistingImage">Category Hexagonal Image</label>
                                                                            {CategorylistingImage === "" || CategorylistingImage === null ? <input type="file" className="form-control clsCollcetionAddEdit_CategorylistingImage" id="categorylistingImage" accept="image/png,image/jpeg,image/jpg,image/gif" name="categorylistingImage" {...register("categorylistingImage", {})} onChange={(e) => onImageChange(e, "categorylistingImage")} /> : <input type="text" id="categorylistingImage" name="categorylistingImage" value={CategorylistingImage} readOnly placeholder="No file chosen" />}
                                                                            <div className="uploadSect">
                                                                                {showCategorylistingImage !== true ? (
                                                                                    <span className="icon-trash-add d-flex align-items-center justify-content-center" onClick={() => handleRemoveImage("categorylistingImage")}>
                                                                                        <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path
                                                                                                d="M12 2.31055H9.5V1.81055C9.5 1.41272 9.34196 1.03119 9.06066 0.749887C8.77936 0.468582 8.39782 0.310547 8 0.310547H5C4.60218 0.310547 4.22064 0.468582 3.93934 0.749887C3.65804 1.03119 3.5 1.41272 3.5 1.81055V2.31055H1C0.867392 2.31055 0.740215 2.36323 0.646447 2.45699C0.552679 2.55076 0.5 2.67794 0.5 2.81055C0.5 2.94316 0.552679 3.07033 0.646447 3.1641C0.740215 3.25787 0.867392 3.31055 1 3.31055H1.5V12.3105C1.5 12.5758 1.60536 12.8301 1.79289 13.0177C1.98043 13.2052 2.23478 13.3105 2.5 13.3105H10.5C10.7652 13.3105 11.0196 13.2052 11.2071 13.0177C11.3946 12.8301 11.5 12.5758 11.5 12.3105V3.31055H12C12.1326 3.31055 12.2598 3.25787 12.3536 3.1641C12.4473 3.07033 12.5 2.94316 12.5 2.81055C12.5 2.67794 12.4473 2.55076 12.3536 2.45699C12.2598 2.36323 12.1326 2.31055 12 2.31055ZM4.5 1.81055C4.5 1.67794 4.55268 1.55076 4.64645 1.45699C4.74021 1.36323 4.86739 1.31055 5 1.31055H8C8.13261 1.31055 8.25979 1.36323 8.35355 1.45699C8.44732 1.55076 8.5 1.67794 8.5 1.81055V2.31055H4.5V1.81055ZM10.5 12.3105H2.5V3.31055H10.5V12.3105ZM5.5 5.81055V9.81055C5.5 9.94316 5.44732 10.0703 5.35355 10.1641C5.25979 10.2579 5.13261 10.3105 5 10.3105C4.86739 10.3105 4.74021 10.2579 4.64645 10.1641C4.55268 10.0703 4.5 9.94316 4.5 9.81055V5.81055C4.5 5.67794 4.55268 5.55076 4.64645 5.45699C4.74021 5.36323 4.86739 5.31055 5 5.31055C5.13261 5.31055 5.25979 5.36323 5.35355 5.45699C5.44732 5.55076 5.5 5.67794 5.5 5.81055ZM8.5 5.81055V9.81055C8.5 9.94316 8.44732 10.0703 8.35355 10.1641C8.25979 10.2579 8.13261 10.3105 8 10.3105C7.86739 10.3105 7.74021 10.2579 7.64645 10.1641C7.55268 10.0703 7.5 9.94316 7.5 9.81055V5.81055C7.5 5.67794 7.55268 5.55076 7.64645 5.45699C7.74021 5.36323 7.86739 5.31055 8 5.31055C8.13261 5.31055 8.25979 5.36323 8.35355 5.45699C8.44732 5.55076 8.5 5.67794 8.5 5.81055Z"
                                                                                                fill="#2E3B41"
                                                                                            />
                                                                                        </svg>
                                                                                    </span>
                                                                                ) : (
                                                                                    <svg className="uploadImge" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M8.25 12.9822V6.86968L6.3 8.81968L5.25 7.73218L9 3.98218L12.75 7.73218L11.7 8.81968L9.75 6.86968V12.9822H8.25ZM4.5 15.9822C4.0875 15.9822 3.7345 15.8354 3.441 15.5419C3.1475 15.2484 3.0005 14.8952 3 14.4822V12.2322H4.5V14.4822H13.5V12.2322H15V14.4822C15 14.8947 14.8533 15.2479 14.5597 15.5419C14.2662 15.8359 13.913 15.9827 13.5 15.9822H4.5Z" fill="#2E3B41" />
                                                                                    </svg>
                                                                                )}
                                                                            </div>
                                                                            <span>
                                                                                <p> File: {allowedExtensions} | Size: 1 MB </p> {"  "}
                                                                                <p>
                                                                                    {" "}
                                                                                    Dimension: {globalsetting?.["CategorlistingImage-Width"]} x {globalsetting?.["CategorlistingImage-Height"]}px
                                                                                </p>
                                                                            </span>
                                                                        </div>
                                                                        <Input
                                                                            inputType="text"
                                                                            className="clsCollcetionAddEdit_CategorylistingImageAltName"
                                                                            labelName="Category Listing Image Alt"
                                                                            customClass="clsCollcetionAddEdit_CategorylistingImageAltName"
                                                                            fieldId="categorylistingImageAlt"
                                                                            name="categorylistingImageAlt"
                                                                            errroMsg={errors?.categorylistingImageAlt?.message}
                                                                            customProps={register("categorylistingImageAlt", {
                                                                                // pattern: {
                                                                                //     value: FormFieldValidations.specialCharRegex.value,
                                                                                //     message: FormFieldValidations.specialCharRegex.message
                                                                                // }
                                                                            })}
                                                                        />
                                                                    </>
                                                                )}
                                                            </>
                                                        )}{" "}
                                                        {(Selectedtype === "Featured Icon" || Selectedtype === "Bags" || Selectedtype === "In-House Golf Balls" || Selectedtype === "SER") && (
                                                            <>
                                                                <div className="form-group">
                                                                    <label htmlFor="offerIconImage">Icon Image</label>
                                                                    {IconImage === "" || IconImage === null ? <input type="file" className="form-control" id="IconImageFineUploader" accept="image/png,image/jpeg,image/jpg,image/gif" name="IconImageFineUploader" {...register("IconImageFineUploader", {})} onChange={(e) => onImageChange(e, "IconImageName")} /> : <input type="text" id="IconImageFineUploader" name="IconImageFineUploader" value={IconImage} readOnly placeholder="No file chosen" />}
                                                                    <div className="uploadSect">
                                                                        {showIcon !== true ? (
                                                                            <span className="icon-trash-add d-flex align-items-center justify-content-center" onClick={() => handleRemoveImage("IconImageName")}>
                                                                                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path
                                                                                        d="M12 2.31055H9.5V1.81055C9.5 1.41272 9.34196 1.03119 9.06066 0.749887C8.77936 0.468582 8.39782 0.310547 8 0.310547H5C4.60218 0.310547 4.22064 0.468582 3.93934 0.749887C3.65804 1.03119 3.5 1.41272 3.5 1.81055V2.31055H1C0.867392 2.31055 0.740215 2.36323 0.646447 2.45699C0.552679 2.55076 0.5 2.67794 0.5 2.81055C0.5 2.94316 0.552679 3.07033 0.646447 3.1641C0.740215 3.25787 0.867392 3.31055 1 3.31055H1.5V12.3105C1.5 12.5758 1.60536 12.8301 1.79289 13.0177C1.98043 13.2052 2.23478 13.3105 2.5 13.3105H10.5C10.7652 13.3105 11.0196 13.2052 11.2071 13.0177C11.3946 12.8301 11.5 12.5758 11.5 12.3105V3.31055H12C12.1326 3.31055 12.2598 3.25787 12.3536 3.1641C12.4473 3.07033 12.5 2.94316 12.5 2.81055C12.5 2.67794 12.4473 2.55076 12.3536 2.45699C12.2598 2.36323 12.1326 2.31055 12 2.31055ZM4.5 1.81055C4.5 1.67794 4.55268 1.55076 4.64645 1.45699C4.74021 1.36323 4.86739 1.31055 5 1.31055H8C8.13261 1.31055 8.25979 1.36323 8.35355 1.45699C8.44732 1.55076 8.5 1.67794 8.5 1.81055V2.31055H4.5V1.81055ZM10.5 12.3105H2.5V3.31055H10.5V12.3105ZM5.5 5.81055V9.81055C5.5 9.94316 5.44732 10.0703 5.35355 10.1641C5.25979 10.2579 5.13261 10.3105 5 10.3105C4.86739 10.3105 4.74021 10.2579 4.64645 10.1641C4.55268 10.0703 4.5 9.94316 4.5 9.81055V5.81055C4.5 5.67794 4.55268 5.55076 4.64645 5.45699C4.74021 5.36323 4.86739 5.31055 5 5.31055C5.13261 5.31055 5.25979 5.36323 5.35355 5.45699C5.44732 5.55076 5.5 5.67794 5.5 5.81055ZM8.5 5.81055V9.81055C8.5 9.94316 8.44732 10.0703 8.35355 10.1641C8.25979 10.2579 8.13261 10.3105 8 10.3105C7.86739 10.3105 7.74021 10.2579 7.64645 10.1641C7.55268 10.0703 7.5 9.94316 7.5 9.81055V5.81055C7.5 5.67794 7.55268 5.55076 7.64645 5.45699C7.74021 5.36323 7.86739 5.31055 8 5.31055C8.13261 5.31055 8.25979 5.36323 8.35355 5.45699C8.44732 5.55076 8.5 5.67794 8.5 5.81055Z"
                                                                                        fill="#2E3B41"
                                                                                    />
                                                                                </svg>
                                                                            </span>
                                                                        ) : (
                                                                            <svg className="uploadImge" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M8.25 12.9822V6.86968L6.3 8.81968L5.25 7.73218L9 3.98218L12.75 7.73218L11.7 8.81968L9.75 6.86968V12.9822H8.25ZM4.5 15.9822C4.0875 15.9822 3.7345 15.8354 3.441 15.5419C3.1475 15.2484 3.0005 14.8952 3 14.4822V12.2322H4.5V14.4822H13.5V12.2322H15V14.4822C15 14.8947 14.8533 15.2479 14.5597 15.5419C14.2662 15.8359 13.913 15.9827 13.5 15.9822H4.5Z" fill="#2E3B41" />
                                                                            </svg>
                                                                        )}
                                                                    </div>
                                                                    <span>
                                                                        <p> File: {allowedExtensions} | Size: 1 MB </p> {"  "}
                                                                    </span>
                                                                </div>
                                                                <Input
                                                                    inputType="text"
                                                                    labelName="Icon Image Alt"
                                                                    fieldId="featureIconImageAlt"
                                                                    name="featureIconImageAlt"
                                                                    placeholder="Icon Image alt"
                                                                    errroMsg={errors?.featureIconImageAlt?.message}
                                                                    customProps={register("featureIconImageAlt", {
                                                                    })}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="footer-addsales mt-5 d-flex align-items-center justify-content-center justify-content-lg-end">
                                                        <button type="button" className="btn btn_search mr-2 btn-sm" onClick={redirectionHome}>
                                                            Cancel
                                                        </button>
                                                        <button type="submit" className="btn btn_create btn-sm">
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            {activeTab === "SEO" && (
                                                <div className="tab-pane fade show active" id="tab_default_3">
                                                    <div className="FormDiv pb-5" id="SEOSec">
                                                        <div className="form-group">
                                                            <div className="tooltipSec clsCollcetionAddEdit_MetaTitle">
                                                                <label htmlFor="seoCollectionType">Meta Title</label>
                                                                <TextArea
                                                                    fieldId="metaTitle"
                                                                    name="metaTitle"
                                                                    className="form-control clsCollcetionAddEdit_MetaTitle"
                                                                    _maxLength={80}
                                                                    customProps={register("metaTitle", {
                                                                        onChange: (e) => {
                                                                            const inputLength = e.target.value.length;
                                                                            setCharCountTitle(inputLength);
                                                                        }
                                                                    })}
                                                                />
                                                            </div>
                                                            <span className="text-right">
                                                                {parseInt(0 + charCountTitle, 10)} of {80} characters used
                                                            </span>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="tooltipSec">
                                                                <label htmlFor="seoName clsCollcetionAddEdit_MetaDescription">Meta Description </label>
                                                                <TextArea
                                                                    className="form-control"
                                                                    _maxLength={150}
                                                                    fieldId="metaDescription"
                                                                    name="metaDescription"
                                                                    customProps={register("metaDescription", {
                                                                        onChange: (e) => {
                                                                            const inputLength = e.target.value.length;
                                                                            setCharCount(inputLength);
                                                                        }
                                                                    })}
                                                                />
                                                            </div>
                                                            <span className="text-right">
                                                                {parseInt(0 + charCount, 10)} of {150} characters used
                                                            </span>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="tooltipSec">
                                                                <label htmlFor="seoParentCollection">Meta Keywords </label>
                                                                <TextArea
                                                                    className="form-control clsCollcetionAddEdit_MetaKeywords"
                                                                    _maxLength={150}
                                                                    fieldId="metaKeywords"
                                                                    name="metaKeywords"
                                                                    customProps={register("metaKeywords", {
                                                                        onChange: (e) => {
                                                                            const inputLength = e.target.value.length;
                                                                            setCharCountKeywords(inputLength);
                                                                        }
                                                                    })}
                                                                />
                                                            </div>
                                                            <span className="text-right">
                                                                {parseInt(0 + charCountKeywords, 10)} of {150} characters used
                                                            </span>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="tooltipSec">
                                                                <label htmlFor="seoAlias">Meta Robots </label>
                                                                <Input inputType="text" className="clsCollcetionAddEdit_MetaRobots" customClass="clsCollcetionAddEdit_MetaRobots" fieldId="metaRobots" name="metaRobots" errroMsg={errors?.metaRobots?.message} customProps={register("metaRobots", {})} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="tooltipSec">
                                                                <label htmlFor="seoUrl">Canonical Link </label>
                                                                <Input inputType="text" className="clsCollcetionAddEdit_CanonicalLink" customClass="clsCollcetionAddEdit_CanonicalLink" fieldId="canonicalLink" name="canonicalLink" errroMsg={errors?.canonicalLink?.message} customProps={register("canonicalLink", {})} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="tooltipSec">
                                                                <label htmlFor="seoUrl">Display Order </label>
                                                            </div>
                                                            <Input
                                                                inputType="text"
                                                                className="clsCollcetionAddEdit_DisplayOrder"
                                                                customClass="clsCollcetionAddEdit_DisplayOrder"
                                                                fieldId="displayOrder"
                                                                name="displayOrder"
                                                                errroMsg={errors?.displayOrder?.message}
                                                                customProps={register("displayOrder", {
                                                                    pattern: {
                                                                        value: FormFieldValidations.number.value,
                                                                        message: FormFieldValidations.number.message
                                                                    }
                                                                })}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="tooltipSec">
                                                                <label htmlFor="seoUrl">Heading (H1) </label>
                                                            </div>
                                                            <Input inputType="text" className="clsCollcetionAddEdit_Heading" customClass="clsCollcetionAddEdit_Heading" fieldId="h1Tag" name="h1Tag" errroMsg={errors?.h1Tag?.message} customProps={register("h1Tag", {})} />
                                                        </div>

                                                        <div className="form-group sitemap">
                                                            <input label="Exclude from Sitemap" type="checkbox" className="clsCollcetionAddEdit_Heading" id="isExcludedFromSitemap" name="isExcludedFromSitemap" checked={isChecked} onChange={handleCheckboxChange} />
                                                            <label>Exclude from Sitemap</label>
                                                        </div>
                                                    </div>
                                                    <div className="footer-addsales mt-5 d-flex align-items-center justify-content-center justify-content-lg-end">
                                                        <button type="button" className="btn btn_search mr-2 btn-sm" onClick={redirectionHome}>
                                                            Cancel
                                                        </button>
                                                        <button type="submit" className="btn btn_create btn-sm">
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Drag_img d-flex  p-5 clsSalesCreate_ImgAlt">
                    <div className="right-imgAdd">
                        <div className="frame-wrapper1">
                            <div className="description-labels-values-parent">
                                <div className="description-labels-values">
                                    <div className="description-pairs mb-3 mr-3 desc">
                                        <div className="description-label-value">
                                            <b className="description mb-2">Description</b>
                                            <br />
                                            <br />
                                            <div className="descriptedSec mb-2">{stripHTML(descriptionTextPayload)}</div>
                                        </div>
                                    </div>
                                    <div className="description-pairs1 mb-3 mr-3 further-Desc">
                                        <div className="further-description-wrapper">
                                            <b className="further-description mb-2">Further Description</b>
                                        </div>
                                        <br />
                                        <div className="zippered-main-compartment-container mb-3" dangerouslySetInnerHTML={{ __html: furtherDescriptionTextPayload }} />
                                    </div>
                                    {Selectedtype !== "Featured Icon" && (
                                        <div className="frame-wrapper2 mb-3 mr-3 bannerText">
                                            <div className="banner-text-parent">
                                                <b className="banner-text mb-2">Banner Text</b>
                                                <br />
                                                <div className="promotional-bags-printed">{BannerText !== "" ? BannerText : ""}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {Selectedtype !== "Featured Icon" && (
                                    <div className="collection-image-parent">
                                        <p className="collection-image">Collection Image</p>
                                        {CollectionImageUrl !== "" && <img className="salesimage" loading="lazy" data-value={CollectionImage} src={CollectionImageUrl !== "" ? CollectionImageUrl : ""} alt="" />}
                                        {showcollection !== false && <img className="salesimage collectiondefault" loading="lazy" alt="" src={`${CDN_URL}/8FF00A25-B6ED-4799-9D2F-412DBA1F7C66/Collection/Default/default_172X172.jpg`} />}
                                    </div>
                                )}
                            </div>
                        </div>
                        {Selectedtype !== "Featured Icon" && (
                            <div className="collection-image-parent mb-5">
                                <b className="collection-image mb-3">Banner Image</b>
                                <br />
                                {BannerImageUrl !== "" && <img className="offerbanner" loading="lazy" data-value={BannerImage} src={BannerImageUrl !== "" ? BannerImageUrl : ""} alt="" />}
                                {showBanner !== false && <img className="offerbanner collectiondefault" loading="lazy" alt="" src={`${CDN_URL}/8FF00A25-B6ED-4799-9D2F-412DBA1F7C66/Collection/Default/default_1440X234.jpg`} />}
                            </div>
                        )}{" "}
                        {(Selectedtype === "Featured Icon" || Selectedtype === "Bags" || Selectedtype === "In-House Golf Balls" || Selectedtype === "SER") && (
                            <div className="collection-image-parent">
                                <b className="collection-image mb-2">Icon Image</b>
                                <br />
                                {IconImageUrl !== "" && <img className="offerbanner" loading="lazy" data-value={IconImage} src={IconImageUrl !== "" ? IconImageUrl : ""} alt="" />}
                                {showIcon !== false && <img className="offerbanner collectiondefault" loading="lazy" alt="" src={`${CDN_URL}/8FF00A25-B6ED-4799-9D2F-412DBA1F7C66/Collection/Default/default_1440X234.jpg`} />}
                            </div>
                        )}  {Selectedtype !== "Featured Icon" && WEBSITE_GUID === "CA95212E-1CBC-4330-87DF-3DD5D3661085" && (
                            <div className="collection-image-parent mb-5">
                                <b className="collection-image mb-3">Category Hexagonal Image</b>
                                <br />
                                {CategorylistingImageUrl !== "" && <img className="offerbanner hexagonalBanner" loading="lazy" data-value={CategorylistingImage} src={CategorylistingImageUrl !== "" ? CategorylistingImageUrl : ""} alt="" />}
                                {showCategorylistingImage !== false && <img className="offerbanner collectiondefault" loading="lazy" alt="" src={`${CDN_URL}/8FF00A25-B6ED-4799-9D2F-412DBA1F7C66/Collection/Default/default_1440X234.jpg`} />}
                            </div>
                        )}
                        {Selectedtype !== "Featured Icon" && (
                            <div className="OrderImage d-flex">
                                <div className="collection-image-parent-1">
                                    <b className="collection-image mb-2">Offer Banner Image</b>
                                    <br />
                                    {OfferBannerImageUrl !== "" && <img className="offerbanner" loading="lazy" data-value={OfferBannerImage} src={OfferBannerImageUrl !== "" ? OfferBannerImageUrl : ""} alt="" />}
                                    {showofferbanner !== false && <img className="offerbanner collectiondefault mt-3" loading="lazy" alt="" src={`${CDN_URL}/8FF00A25-B6ED-4799-9D2F-412DBA1F7C66/Collection/Default/default_270X123.jpg`} />}
                                </div>
                                <div className="collection-image-parent-2">
                                    <b className="collection-image mb-2">Menu Banner Image</b>
                                    <br />
                                    {MenuBannerImageUrl !== "" && <img className="menubanner" data-value={MenuBannerImage} src={MenuBannerImageUrl !== "" ? MenuBannerImageUrl : ""} alt="" />}
                                    {showmenuOfferBanner !== false && <img className="menubanner collectiondefault mt-3" alt="" src={`${CDN_URL}/8FF00A25-B6ED-4799-9D2F-412DBA1F7C66/Collection/Default/default_560X250.jpg`} />}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default CollectionCreate;
