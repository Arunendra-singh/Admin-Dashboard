import React, { useCallback, useEffect, useState, useRef, useImperativeHandle } from "react";
import { LazyImage } from "common/components";
import moment from "moment/moment";
import "../../styles/pages/salescard.scss";
import "../../styles/pages/sales-listing.scss";
import "../../styles/layout/CardsContainer.css";
import { useMutation, useQuery } from "@apollo/client";
import { GridContextProvider, GridDropZone, GridItem } from "react-grid-dnd";
import { useGestureResponder } from "react-gesture-responder";
import { CDN_URL, WEBSITE_GUID } from "common/utils/vars";
import { PopupV3 } from "common/utils";
import { useMutationProductEnable } from "common/components/graphQL/mutations/Product/useMutationProductEnable";
import { useMutationProductClone } from "common/components/graphQL/mutations/Product/useMutationProductClone";
import { useMutationProductQuickUpdate } from "common/components/graphQL/mutations/Product/useMutationProductQuickUpdate";
import { useMutationsyncPromoStandardProduct } from "common/components/graphQL/mutations/Product/useMutationsyncPromoStandardProduct";
import { useGetAllProduct } from "common/components/graphQL/queries/Product/useGetAllProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import Store from "~/Store";
import Loader from "../shared/Loader";

const CheckboxComponents = ({ selectedCheckbox, slectedCheckBoxFromLocal, type, selectdata, index, filterChangeHandler }) => {
    const isDisabled = selectedCheckbox?.length >= 10;
    return (
        <div className="checkbox clsProductListing_SelectCheckBox">
            <input disabled={!selectedCheckbox?.includes(type) && isDisabled} aria-labelledby="toggle" type="checkbox" className="clsSales_chkSelectProduct" data-index={index} checked={slectedCheckBoxFromLocal?.includes(selectdata?.productGuid)} onChange={(e) => filterChangeHandler(type, selectdata?.productGuid, e?.target?.checked)} />
        </div>
    );
};
const ToggleNew = ({ item, index, EnableDataAll }) => {
    const [isOn, setOn] = useState(item?.isActive);
    const [EnableData] = useMutation(useMutationProductEnable);
    const toggle = () => {
        setOn((prevIsOn) => !prevIsOn);
        const enbleObject = {
            productGuid: item?.productGuid,
            isActive: !isOn,
            isDeleted: false
        };
        EnableData({
            variables: {
                entity: enbleObject
            }
        }).then((res) => {
            if (res) {
                EnableDataAll();
            }
        });
    };
    return (
        <div className="toggle-button">
            <label className={`slider ${isOn ? "on" : "off"} clsProductListing_StatusCol`} htmlFor={index}>
                <input aria-labelledby="toggle" type="checkbox" id={index} checked={isOn} onChange={toggle} />
                <div className="sort clsProduct_ActiveInactiveToggleNew" />
            </label>
        </div>
    );
};
const Product = React.forwardRef(({ activestatus, slectedCheckBoxFromLocal, resltcount, data, showAction, handleReset, view, selectedCheckboxes, columnName, reversorting, collectionsdata, setupdatecount, selectedStatus, serachkey, isAdvanceSearch, minPriceText, maxPriceText, selectedMasterColors, selectedColl, sortConfig, setSortConfig, setdeletedata }, ref) => {
    const defaultProductImg = `${CDN_URL}/${WEBSITE_GUID}/Products/Medium/default.jpg`;
    const ProductImg = `${CDN_URL}/${WEBSITE_GUID}/Products/Medium/`;
    const [sortedData, setSortedData] = useState(data);
    const [sortOrder, setSortOrder] = useState("DESC");
    const [items, setItems] = useState(data);
    const [filters, setFilters] = useState({});
    const [selectedCheckbox, setSelectedCheckboxes] = useState(slectedCheckBoxFromLocal || []);
    const [DeleteData] = useMutation(useMutationProductEnable);
    const [CloneData] = useMutation(useMutationProductClone);
    const [QuickUpdate] = useMutation(useMutationProductQuickUpdate);
    const [PSSync] = useMutation(useMutationsyncPromoStandardProduct);
    const [pageNumber, setPageNumber] = useState(2);
    const [updateCollection, setupdateCollection] = useState([]);
    const [setdatacount] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCollections, setSelectedCollections] = useState([]);
    const [visibleIndex, setVisibleIndex] = useState(null);
    const showTooltip = (index) => setVisibleIndex(index);
    const hideTooltip = () => setVisibleIndex(null);
    const [searchTerm, setSearchTerm] = useState("");
    // const [activestatus, setActivestatus] = useState("");
    const [resources] = Store.useStore((store) => store?.resources);
    const [isProductMirroringchecked, setisProductMirroringchecked] = useState(false);
    const [collectionarray, setCollectionArray] = useState([]);
    const [isPSLoading, setisPSLoading] = useState(false);
    useEffect(() => {
        if (selectedColl) {
            const newArray = selectedColl?.map((item) => item?.collectionGuid);
            setCollectionArray(newArray);
        }
    }, [selectedColl]);
    const [colorsarray, setcolorsarray] = useState([]);
    useEffect(() => {
        if (selectedMasterColors) {
            const newArray = selectedMasterColors?.map((item) => item?.masterColorGuid);
            setcolorsarray(newArray);
        }
    }, [selectedMasterColors]);
    useEffect(() => {
        const updatedItems = data?.map((item, index) => ({
            ...item,
            newSequence: index + 1
        }));
        setItems(updatedItems);
    }, [data]);

    useEffect(() => {
        if (data && data?.length > 0) {
            setSortedData(data);
            const collectionGuids = [];
            data?.forEach((product) => {
                product?.collectionGuids?.forEach((collection) => {
                    collectionGuids?.push({ productGuid: product?.productGuid, selectedCollections: collection?.collectionGuid });
                });
            });
            setSelectedCollections(collectionGuids);
        }
    }, [data]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const collectionTypes = [...new Set(collectionsdata?.map((collection) => collection?.collectionType))];

    const toggleDropdownVisibility = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const { refetch } = useQuery(useGetAllProduct, {
        take: setdatacount,
        skip: 2,
        variables: {
            filter: {
                websiteGuid: { eq: WEBSITE_GUID }
            },
            productCode: {
                contain: ""
            }
        },
        sort: { modifiedDateUtc: "DESC" }
    });
    const EnableDataAll = async () => {
        const resp = await refetch({
            take: setdatacount,
            skip: 1,
            variables: {
                filter: {
                    websiteGuid: { eq: WEBSITE_GUID }
                },
                productCode: {
                    contain: ""
                }
            },
            sort: { modifiedDateUtc: "DESC" }
        });
        handleReset(resp);
    };

    const filterChangeHandler = useCallback((filterName, label, isChecked) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [label]: isChecked
        }));
        if (isChecked) {
            setSelectedCheckboxes((prevSelected) => [...prevSelected, label]);
        } else {
            setSelectedCheckboxes((prevSelected) => prevSelected?.filter((item) => item !== label));
        }
    }, []);

    useEffect(() => {
        if (selectedCheckbox?.length > 0) {
            localStorage.setItem("selectedCheckboxes", JSON.stringify(selectedCheckbox));
        }
    }, [selectedCheckbox]);

    useEffect(() => {
        setdeletedata(selectedCheckbox);
    }, [selectedCheckbox]);
    const { bind } = useGestureResponder({
        onMoveShouldSet: () => true
    });

    const handleSelectAllChange = useCallback((isChecked) => {
        const updatedFilters = {};
        data?.forEach((item) => {
            updatedFilters[item?.productGuid] = isChecked;
        });
        setFilters(updatedFilters);
        if (isChecked) {
            setSelectedCheckboxes(data?.map((item) => item?.productGuid));
        }
    }, []);
    useEffect(() => {
        if (selectedCheckboxes[0] === "on") {
            handleSelectAllChange(selectedCheckboxes[0] === "on");
        } else {
            handleSelectAllChange(false);
        }
    }, [selectedCheckboxes]);
    const onChange = (sourceId, sourceIndex, targetIndex) => {
        if (columnName?.columnName === "minPrice" || columnName === "minPrice") {
            const nextItems = [...items];
            // Move the source item to the target position
            const [movedItem] = nextItems.splice(sourceIndex, 1);
            nextItems?.splice(targetIndex, 0, movedItem);
            // Update the sequence for each item
            const updatedItems = nextItems?.map((item, index) => ({
                ...item,
                sequence: index + 1, // Use index + 1 if you want 1-based index
                newSequence: index + 1
            }));
            setItems(updatedItems);
        }
    };

    const [sortName, setsortName] = useState("modifiedDateUtc");
    useEffect(() => {
        // Function to handle asynchronous data fetching
        const fetchSortedData = async () => {
            try {
                const { key, direction } = sortConfig;
                // Advance Search Logic Start
                const filter = { websiteGuid: { eq: WEBSITE_GUID }, isactive: { eq: activestatus } };
                if (serachkey !== undefined && serachkey !== null && serachkey !== "") {
                    filter.searchText = { contain: serachkey };
                }
                if (isAdvanceSearch === true && selectedColl !== undefined && selectedColl !== null && selectedColl?.length > 0) {
                    filter.collectionGuids = { eq: collectionarray?.join(",") };
                }
                if (isAdvanceSearch === true && selectedMasterColors !== undefined && selectedMasterColors !== null && selectedMasterColors?.length > 0) {
                    filter.colors = { eq: colorsarray?.join(",") };
                }
                if (isAdvanceSearch === true && minPriceText !== undefined && minPriceText !== null && minPriceText !== "") {
                    filter.minPrice = { gte: parseInt(minPriceText, 10) };
                }
                if (isAdvanceSearch === true && maxPriceText !== undefined && maxPriceText !== null && maxPriceText !== "") {
                    filter.maxPrice = { lte: parseInt(maxPriceText, 10) };
                }
                // End
                if (sortConfig?.key === "" && sortConfig?.direction === "") {
                    const updatedDetails = await refetch({
                        take: setdatacount,
                        skip: 1,
                        filter,
                        sort: { modifiedDateUtc: "DESC" }
                    });
                    setPageNumber(2);
                    if (updatedDetails?.data?.allProducts?.items?.length > 0) {
                        if (updatedDetails?.data?.allProducts?.items?.length > 0) {
                            setSortedData(updatedDetails?.data?.allProducts?.items);
                            setupdatecount(updatedDetails?.data?.allProducts?.items);
                        }
                    }
                } else {
                    const sort = { [key]: direction };
                    const updatedDetails = await refetch({
                        take: setdatacount,
                        skip: 1,
                        filter,
                        sort
                    });
                    setPageNumber(2);
                    if (updatedDetails?.data?.allProducts?.items?.length > 0 && sortName !== "null") {
                        if (updatedDetails?.data?.allProducts?.items?.length > 0) {
                            setSortedData(updatedDetails?.data?.allProducts?.items);
                            setupdatecount(updatedDetails?.data?.allProducts?.items);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching sorted data:", error);
            }
        };
        if (sortedData) {
            fetchSortedData();
        }
    }, [sortName, sortOrder]);

    const handleSort = async (name) => {
        setSortConfig({ key: name, direction: sortOrder });
        setsortName(name);
        const sort = sortOrder === "ASC" ? "DESC" : "ASC";
        setSortOrder(sort);
    };
    useEffect(() => {
        // handleSort("modifiedDateUtc");
        const sort = sortOrder === "ASC" ? "DESC" : "ASC";
        setSortOrder(sort);
    }, []);
    const editProduct = (productguid) => {
        window.location.href = `/Product/Edit/${productguid}`;
    };
    const RemoveProduct = (itemdata) => {
        const enbleObject = {
            productGuid: itemdata?.productGuid,
            isActive: false,
            isDeleted: true
        };
        DeleteData({
            variables: {
                entity: enbleObject
            }
        }).then((res) => {
            if (res?.data?.deleteProductByFilter?.statuscode === 200) {
                PopupV3({
                    content: res?.data?.deleteProductByFilter?.message,
                    type: "Success",
                    title: "Success",
                    classes: "Delete-Product",
                    actions: [
                        {
                            text: "Ok",
                            classes: "ok",
                            dismiss: true,
                            do: () => {
                                EnableDataAll();
                            }
                        }
                    ]
                });
            } else {
                PopupV3({
                    content: res?.data?.deleteProductByFilter?.message,
                    type: "Error",
                    title: "Error",
                    classes: "Delete-Product",
                    actions: [
                        {
                            text: "Ok",
                            classes: "ok",
                            dismiss: true
                        }
                    ]
                });
            }
        });
    };
    const checkDeleteProduct = (itemdata) => {
        PopupV3({
            content: `<div class='delete-confirm'>${resources?.["ProductIndex.deleteconfirmation"]}<span>${itemdata?.productName}</span> </div>`,
            type: "Confirm",
            title: "Success",
            classes: "Delete_Popup",
            actions: [
                {
                    dismiss: true,
                    text: "Yes",
                    classes: "deleteconfirmbtn",
                    do: () => {
                        RemoveProduct(itemdata);
                    }
                },
                {
                    text: "No",
                    dismiss: true
                }
            ]
        });
    };
    const ProductPSSync = (itemdata) => {
        setisPSLoading(true);
        PSSync({
            variables: {
                productGuid: itemdata?.productGuid
            }
        }).then((res) => {
            if (res?.data?.syncPromoStandardProduct?.statuscode === 200) {
                setisPSLoading(false);
                PopupV3({
                    content: res?.data?.syncPromoStandardProduct?.message,
                    type: "Success",
                    title: "Success",
                    classes: "PSSync-Product",
                    actions: [
                        {
                            text: "Ok",
                            classes: "ok",
                            dismiss: true,
                            do: () => {
                                EnableDataAll();
                            }
                        }
                    ]
                });
            } else {
                setisPSLoading(false);
                PopupV3({
                    content: res?.data?.syncPromoStandardProduct?.message,
                    type: "Error",
                    title: "Error",
                    classes: "PSSync-Product",
                    actions: [
                        {
                            text: "Ok",
                            classes: "ok",
                            dismiss: true
                        }
                    ]
                });
            }
        });
    };
    const PSsync = (itemdata) => {
        PopupV3({
            content: `<div class='pssync-confirm'>${resources?.["ProductIndex.syncconfirmation"]}<span>${itemdata?.productName}</span> </div>`,
            type: "Success",
            title: "Success",
            classes: "PS_Popup",
            actions: [
                {
                    dismiss: true,
                    text: "Yes",
                    classes: "pssyncconfirmbtn",
                    do: () => {
                        ProductPSSync(itemdata);
                    }
                },
                {
                    text: "No",
                    dismiss: true
                }
            ]
        });
    };
    const [openRow, setOpenRow] = useState(null);
    const [CloneRow, setCloneRow] = useState(null);
    const [selectedprodguid, setselectedprodguid] = useState(null);
    const QuickEdit = (index, prodguid) => {
        setOpenRow(openRow === index ? null : index);
        setCloneRow(null);
        setIsDropdownVisible(false);
        setselectedprodguid(prodguid);
        setSearchTerm("");
    };

    // collection logic start
    const Collectionref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (Collectionref?.current && !Collectionref?.current?.contains(event?.target)) {
                setIsDropdownVisible(false);
            }
        };

        document?.addEventListener("mousedown", handleClickOutside);
        return () => {
            document?.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const getSelectedColletion = (e, prodguid) => {
        const selectedcollection = e.target.value;
        const isAlreadySelected = selectedCollections?.some((item) => item?.productGuid === prodguid && item?.selectedCollections === selectedcollection);
        setSelectedCollections((prevSelected) => (isAlreadySelected ? prevSelected?.filter((item) => !(item?.productGuid === prodguid && item?.selectedCollections === selectedcollection)) : [...prevSelected, { productGuid: prodguid, selectedCollections: selectedcollection }]));
    };

    useEffect(() => {
        const allSelCallection = collectionsdata?.filter((item) => selectedCollections?.some((selected) => selected?.selectedCollections === item?.collectionGuid && selected?.productGuid === selectedprodguid));
        const collectionguidArray = [];
        allSelCallection?.forEach((itema) => {
            collectionguidArray?.push({
                collectionGuid: itema?.collectionGuid,
                collectionType: itema?.collectionType
            });
        });
        setupdateCollection(collectionguidArray);
    }, [selectedCollections, collectionsdata, openRow]);

    const [SearchFilterData, setSearchFilterData] = useState("");
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    useEffect(() => {
        const filteredCollectionTypes = collectionsdata?.filter((type) => type?.collectionName?.toLowerCase()?.includes(searchTerm));
        setSearchFilterData(filteredCollectionTypes);
    }, [searchTerm]);

    // collection logic End

    const CloneProduct = (index) => {
        setCloneRow(CloneRow === index ? null : index);
        setOpenRow(null);
    };
    const VsProduct = (item) => {
        const productGuid = item?.productGuid;
        if (productGuid) {
            const url = `/imprintsetting/${productGuid}`;
            window.open(url, "_blank");
        } else {
            console.error("Virtual sample is missing.");
        }
    };
    const productCodeRef = useRef([]);
    const handleCloneProduct = (itemdata) => {
        const newProductCode = productCodeRef?.current.value.trim();
        if (newProductCode === undefined || newProductCode === null || newProductCode === "") {
            productCodeRef.current.value = null;
            PopupV3({
                content: resources?.["ProductIndex.Newproductcodevalidation"],
                type: "Warning",
                title: "Warning",
                actions: [
                    {
                        dismiss: true,
                        text: "OK"
                    }
                ]
            });
            return;
        }
        setIsLoading(true);
        const CloneObject = {
            oldValue: itemdata?.productGuid,
            newValue: newProductCode
        };
        CloneData({
            variables: {
                entity: CloneObject
            }
        })
            .then((res) => {
                if (res?.data?.cloneProduct?.statuscode === 200) {
                    PopupV3({
                        content: res?.data?.cloneProduct?.message,
                        type: "Success",
                        title: "Success",
                        classes: "Clone-Product",
                        actions: [
                            {
                                text: "Ok",
                                classes: "ok",
                                dismiss: true,
                                do: () => {
                                    EnableDataAll();
                                    setCloneRow(null);
                                }
                            }
                        ],
                        onDismiss: () => {
                            EnableDataAll();
                            setCloneRow(null);
                        }
                    });
                } else {
                    PopupV3({
                        content: res?.data?.cloneProduct?.message,
                        type: "Warning",
                        title: "Warning",
                        classes: "Clone-Product",
                        actions: [
                            {
                                text: "Ok",
                                classes: "ok",
                                dismiss: true
                            }
                        ]
                    });
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    const ExistProductCode = useRef([]);
    const ExistProductname = useRef([]);
    const ExistPageTitle = useRef([]);
    const ExistMetaKeyword = useRef([]);
    const ExistMetaDescription = useRef([]);

    const handleQuickUpdateProduct = (itemdata) => {
        if (ExistProductCode?.current?.value === undefined || ExistProductCode?.current?.value === null || ExistProductCode?.current?.value?.trim() === "") {
            ExistProductCode.current.value = null;
            PopupV3({
                content: resources?.["ProductIndex.productcodevalidation"],
                type: "Warning",
                title: "Warning",
                actions: [
                    {
                        dismiss: true,
                        text: "OK"
                    }
                ]
            });
            return;
        }
        if (ExistProductname?.current?.value === undefined || ExistProductname?.current?.value === null || ExistProductname?.current?.value?.trim() === "") {
            ExistProductname.current.value = null;
            PopupV3({
                content: resources?.["ProductIndex.productheadingvalidation"],
                type: "Warning",
                title: "Warning",
                actions: [
                    {
                        dismiss: true,
                        text: "OK"
                    }
                ]
            });
            return;
        }
        setIsLoading(true);
        const QuickUpdateObject = {
            productGuid: itemdata?.productGuid,
            productCode: ExistProductCode?.current?.value?.trim(),
            pageTitle: ExistPageTitle?.current?.value?.trim(),
            productName: ExistProductname?.current?.value?.trim(),
            metaKeyword: ExistMetaKeyword?.current?.value?.trim(),
            metaDescription: ExistMetaDescription?.current?.value?.trim(),
            collectionGuids: updateCollection,
            isProductMirroring: isProductMirroringchecked
        };
        QuickUpdate({
            variables: {
                entity: QuickUpdateObject
            }
        })
            .then((res) => {
                if (res?.data?.quickUpdateProductByFilter?.statuscode === 200) {
                    PopupV3({
                        content: res?.data?.quickUpdateProductByFilter?.message,
                        type: "Success",
                        title: "Success",
                        classes: "Quick-Update-Product",
                        actions: [
                            {
                                text: "Ok",
                                classes: "ok",
                                dismiss: true,
                                do: () => {
                                    EnableDataAll();
                                    setOpenRow(null);
                                }
                            }
                        ]
                    });
                } else {
                    PopupV3({
                        content: res?.data?.quickUpdateProductByFilter?.message,
                        type: "Warning",
                        title: "Warning",
                        classes: "Quick-Update-Product",
                        actions: [
                            {
                                text: "Ok",
                                classes: "ok",
                                dismiss: true
                            }
                        ]
                    });
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    document.querySelector(".Clone-Product .close, .Quick-Update-Product .close, .Delete-Product .close")?.addEventListener("click", () => {
        EnableDataAll();
        setIsDropdownVisible(false);
        QuickEdit();
    });

    // useEffect(() => {
    //     if (selectedStatus === "All") {
    //         setActivestatus(""); // or null, based on your preference
    //     } else if (selectedStatus === "Active") {
    //         setActivestatus("true");
    //     } else {
    //         setActivestatus("false");
    //     }
    // }, [selectedStatus]);
    useEffect(() => {
        setPageNumber(2);
        setOpenRow(null);
        setCloneRow(null);
    }, [serachkey, selectedStatus, sortConfig]);

    const fetchMoreData = () => {
        setTimeout(async () => {
            const { key, direction } = sortConfig;
            // Advance Search Logic Start
            const filter = { websiteGuid: { eq: WEBSITE_GUID }, isactive: { eq: activestatus } };
            if (serachkey !== undefined && serachkey !== null && serachkey !== "") {
                filter.searchText = { contain: serachkey };
            }
            if (isAdvanceSearch === true && selectedColl !== undefined && selectedColl !== null && selectedColl?.length > 0) {
                filter.collectionGuids = { eq: collectionarray?.join(",") };
            }
            if (isAdvanceSearch === true && selectedMasterColors !== undefined && selectedMasterColors !== null && selectedMasterColors?.length > 0) {
                filter.colors = { eq: colorsarray?.join(",") };
            }
            if (isAdvanceSearch === true && minPriceText !== undefined && minPriceText !== null && minPriceText !== "") {
                filter.minPrice = { gte: parseInt(minPriceText, 10) };
            }
            if (isAdvanceSearch === true && maxPriceText !== undefined && maxPriceText !== null && maxPriceText !== "") {
                filter.maxPrice = { lte: parseInt(maxPriceText, 10) };
            }
            // End
            if (sortConfig?.key === "" && sortConfig?.direction === "") {
                const updatedDetails = await refetch({
                    take: setdatacount,
                    skip: pageNumber,
                    filter,
                    sort: { modifiedDateUtc: "DESC" }
                });
                setPageNumber(pageNumber + 1);
                if (updatedDetails?.data?.allProducts?.items?.length > 0) {
                    if (updatedDetails?.data?.allProducts?.items?.length > 0) {
                        setSortedData(sortedData?.concat(updatedDetails?.data?.allProducts?.items));
                        setupdatecount(sortedData?.concat(updatedDetails?.data?.allProducts?.items));
                    }
                }
            } else {
                const sort = { [key]: direction };
                const updatedDetails = await refetch({
                    take: setdatacount,
                    skip: pageNumber,
                    filter,
                    sort
                });
                setPageNumber(pageNumber + 1);
                if (updatedDetails?.data?.allProducts?.items?.length > 0) {
                    if (updatedDetails?.data?.allProducts?.items?.length > 0) {
                        setSortedData(sortedData?.concat(updatedDetails?.data?.allProducts?.items));
                        setupdatecount(sortedData?.concat(updatedDetails?.data?.allProducts?.items));
                    }
                }
            }
        }, 50);
    };
    const resetfunction = () => {
        setOpenRow(null);
        setCloneRow(null);
        setFilters({});
        setSelectedCheckboxes([]);
    };
    useImperativeHandle(ref, () => ({
        resetfunction
    }));

    const listView = () => (
        <div className="grid-view-header">
            {selectedCheckbox.length > 0 && <p className="my-2 h6 text-right px-4">Selected {selectedCheckbox?.length} out of 10 Products</p>}
            {isPSLoading && (
                <div className="fullloader">
                    <Loader />
                </div>
            )}
            <GridContextProvider onChange={onChange}>
                <InfiniteScroll dataLength={sortedData?.length} next={fetchMoreData} hasMore={true} loader={sortedData?.length < resltcount ? <Loader /> : null}>
                    {
                        <GridDropZone {...bind} id="items" boxesPerRow={6} rowHeight={360} className="gridzone" style={{ position: "initial" }}>
                            {sortedData && sortedData.length > 0 ? (
                                sortedData.map((item, index) => {
                                    const prdImageUrl = item?.productSKUs !== undefined && item?.productSKUs?.[0]?.imageName !== null && item?.productSKUs?.[0]?.imageName !== undefined ? `${ProductImg}${item?.productSKUs?.[0]?.imageName}` : defaultProductImg;
                                    return (
                                        <GridItem key={item?.productGuid} className={`if-grid ${openRow === index || CloneRow === index ? "table-row-active" : ""}`}>
                                            <div className="product-Div">
                                                <div className="product">
                                                    {showAction && (
                                                        <div className="checkbox">
                                                            <CheckboxComponents slectedCheckBoxFromLocal={slectedCheckBoxFromLocal} selectedCheckbox={selectedCheckbox} key={item?.productGuid} type={item?.productGuid} selectdata={item} index={index} checked={filters[item?.productGuid] || false} filterChangeHandler={filterChangeHandler} />{" "}
                                                        </div>
                                                    )}
                                                    <td className="status">
                                                        {" "}
                                                        <ToggleNew EnableDataAll={EnableDataAll} item={item} index={index} />
                                                    </td>
                                                    <div className="product-image-container clsProductListing_ProductImage">{resources?.["Sage Products Pics Informations"] === "True" && item?.productMediaList?.pics?.[0]?.url ? <LazyImage width={380} height={380} src={item?.productMediaList?.pics?.[0]?.url} className="card-image clsProduct-image lazyload img-fluid" placeholder={item?.productMediaList?.pics?.[0]?.url} /> : <LazyImage width={380} height={380} src={prdImageUrl} className="card-image clsProduct-image lazyload img-fluid" placeholder={defaultProductImg} />}</div>
                                                    <div className="product-overlay clsProductListing_ProductGridNameCode">
                                                        <div className="cls_productcode">{item?.productCode}</div>
                                                        <div className="cls_productname">{item?.productName}</div>
                                                    </div>
                                                </div>
                                                <div className="productard-details">
                                                    <div className="acticons">
                                                        <span title="Clone" onClick={() => CloneProduct(index)} className="icon icon-clarity_clone-line clsProductListing_CloneProduct" />
                                                        <span title="Virtual Sample" onClick={() => VsProduct(item)} className="icon icon-CubeFocus clsProductListing_VS" />
                                                        <span className="icon icon-tag d-none" />
                                                        <span title="Quick Edit" onClick={() => QuickEdit(index, item?.productGuid)} className="icon icon-edit1 clsProductListing_QuickEdit" />
                                                        <span title="Edit" onClick={() => editProduct(item?.productGuid)} className="icon icon-edit clsProductListing_Edit" />
                                                        <span title="Delete" onClick={() => checkDeleteProduct(item)} className="icon icon-delete clsProductListing_Delete" />
                                                        <span title="Sync with PromoStandard" onClick={() => PSsync(item)} className="icon icon-replay d-none clsProductListing_PsSync" />
                                                    </div>
                                                </div>
                                            </div>

                                            {openRow === index && (
                                                <div key={`quickedit-${item?.productGuid}`} className="editmode" colSpan="9">
                                                    <button className="closeicon" onClick={() => QuickEdit(index, item?.productGuid)} type="button">
                                                        <span className="icon-close_small" />
                                                    </button>
                                                    <div colSpan="9" className="editmodechild">
                                                        <table className="collum-spacing" style={{ width: "100%" }}>
                                                            <tbody>
                                                                <tr>
                                                                    {isLoading && (
                                                                        <div className="loaderquickedit">
                                                                            <Loader />
                                                                        </div>
                                                                    )}
                                                                    <td>
                                                                        <div className="floating-label-input">
                                                                            <input aria-labelledby="productCode" className="input" type="text" defaultValue={item?.productCode} ref={ExistProductCode} id="ExistProductCode" placeholder={resources?.["ProductIndex.ProductCode"]} />
                                                                            <label className="label" htmlFor="ExistProductCode">
                                                                                {resources?.["ProductIndex.ProductCode"]}
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="floating-label-input">
                                                                            <input aria-labelledby="productName" className="input" type="text" defaultValue={item?.productName} ref={ExistProductname} id="ExistProductname" placeholder={resources?.["ProductIndex.ProductHeading"]} />
                                                                            <label className="label" htmlFor="ExistProductname">
                                                                                {resources?.["ProductIndex.ProductHeading"]}
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="floating-label-input">
                                                                            <input aria-labelledby="metaDescription" className="input" type="text" id="ExistMetaDescription" defaultValue={item?.metaDescription} ref={ExistMetaDescription} placeholder={resources?.["ProductIndex.MetaDescription"]} />
                                                                            <label className="label" htmlFor="ExistMetaDescription">
                                                                                {resources?.["ProductIndex.MetaDescription"]}
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div ref={Collectionref} className="floating-label-input multi-select-dropdown collection-dropdown listview" onClick={toggleDropdownVisibility}>
                                                                            <input
                                                                                className="input"
                                                                                type="text"
                                                                                aria-labelledby="metaDescription"
                                                                                readOnly
                                                                                placeholder="Select Collections"
                                                                                value={
                                                                                    selectedCollections
                                                                                        ?.filter((f) => f?.productGuid === item?.productGuid)
                                                                                        ?.map((collectionGuid) => {
                                                                                            const collection = collectionsdata?.find((col) => col?.collectionGuid === collectionGuid?.selectedCollections);
                                                                                            return collection ? collection?.collectionName : "";
                                                                                        })
                                                                                        ?.filter(Boolean) // This will remove any empty strings
                                                                                        ?.join(", ") // Join collection names with a comma separator
                                                                                }
                                                                            />
                                                                            <label className="label" htmlFor="ExistMetaDescription">
                                                                                {resources?.["ProductIndex.selectcollectionquickedit"]}
                                                                            </label>
                                                                        </div>
                                                                        <div ref={Collectionref} className="multi-select-dropdown collection-dropdown listview">
                                                                            <div className="dropdown">
                                                                                <div className="dropdown-content" style={{ display: isDropdownVisible ? "block" : "none" }}>
                                                                                    <input aria-labelledby="Collection" style={{ width: "100%" }} type="text" placeholder="Search Collection Name" value={searchTerm} onChange={handleSearchChange} className="search-input" />
                                                                                    {collectionTypes?.map((type) => {
                                                                                        const filteredCollections = (searchTerm ? SearchFilterData : collectionsdata)?.filter((collection) => collection?.collectionType === type);
                                                                                        if (!filteredCollections?.length) {
                                                                                            return null;
                                                                                        }
                                                                                        return (
                                                                                            <div key={type} className="typename">
                                                                                                <strong>{type}</strong>
                                                                                                {(searchTerm ? SearchFilterData : collectionsdata)
                                                                                                    ?.filter((collection) => collection?.collectionType === type)
                                                                                                    ?.map((colitem) => (
                                                                                                        <label htmlFor={colitem?.collectionGuid} key={colitem?.collectionGuid} className="dropdown-item">
                                                                                                            {/* <input type="checkbox" value={colitem?.collectionGuid} checked={selectedCollections?.selectedCollections?.includes(colitem?.collectionGuid)} onChange={(e) => getSelectedColletion(e, item?.productGuid)} /> */}
                                                                                                            <input aria-labelledby="addCollection" type="checkbox" id={colitem?.collectionGuid} value={colitem?.collectionGuid} checked={selectedCollections?.filter((f) => f.productGuid === item?.productGuid && f?.selectedCollections === colitem?.collectionGuid)?.length > 0} onChange={(e) => getSelectedColletion(e, item?.productGuid)} />
                                                                                                            {colitem?.collectionName}
                                                                                                        </label>
                                                                                                    ))}
                                                                                            </div>
                                                                                        );
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="floating-label-input">
                                                                            <input aria-labelledby="ExistPageTitle" className="input" type="text" id="ExistPageTitle" defaultValue={item?.pageTitle} ref={ExistPageTitle} placeholder={resources?.["ProductIndex.PageTitle"]} />
                                                                            <label className="label" htmlFor="ExistPageTitle">
                                                                                {resources?.["ProductIndex.PageTitle"]}
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="floating-label-input">
                                                                            <input aria-labelledby="ExistMetaKeyword" className="input" type="text" id="ExistMetaKeyword" defaultValue={item?.metaKeyword} ref={ExistMetaKeyword} placeholder={resources?.["ProductIndex.MetaKeywords"]} />
                                                                            <label className="label" htmlFor="ExistMetaKeyword">
                                                                                {resources?.["ProductIndex.MetaKeywords"]}
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                </tr>

                                                                {resources?.["Product Mirroring"] === "True" && (
                                                                    <tr>
                                                                        <td>
                                                                            <div className="floating-label-input isProductMirroring">
                                                                                <label htmlFor="isProductMirroring">
                                                                                    <input aria-labelledby="isProductMirroring" id="isProductMirroring" type="checkbox" defaultChecked={item?.isProductMirroring} onClick={(e) => setisProductMirroringchecked(e?.target?.checked)} /> Product Mirroring
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )}

                                                                {/* This row will be conditionally hidden based on isHidden */}

                                                                <tr>
                                                                    <td colSpan="1" style={{ textAlign: "left" }}>
                                                                        <div className="floating-label-input">
                                                                            <button className="btn-submit" type="submit" onClick={() => handleQuickUpdateProduct(item)}>
                                                                                {resources?.["ProductIndex.QuickUpdate"]}
                                                                            </button>
                                                                            <button className="btn-submit" type="submit" onClick={() => QuickEdit(index)}>
                                                                                {resources?.["ProductIndex.QuickCancel"]}
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )}
                                            {CloneRow === index && (
                                                <div key={`clone-${item?.productGuid}`} className="clonemodegrid" colSpan="9">
                                                    <button className="closeicon" onClick={() => CloneProduct(index)} type="button">
                                                        <span className="icon-close_small" />
                                                    </button>
                                                    <div colSpan="9">
                                                        <table key="CloneView" style={{ width: "100%" }}>
                                                            <tbody>
                                                                <tr>
                                                                    {isLoading && (
                                                                        <div className="loaderquickedit">
                                                                            <Loader />
                                                                        </div>
                                                                    )}
                                                                    <td>
                                                                        <div className="floating-label-input">
                                                                            <input aria-labelledby="productCodeRef" readOnly className="input" type="text" defaultValue={item?.productCode} id="oldproductCode" placeholder={resources?.["ProductIndex.olproductcode"]} />
                                                                            <label className="label" htmlFor="productCodeRef">
                                                                                {resources?.["ProductIndex.olproductcode"]}
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="floating-label-input">
                                                                            <input aria-labelledby="productCodeRef" className="input" type="text" ref={productCodeRef} id="productCodeRef" placeholder={resources?.["ProductIndex.newroductcode"]} />
                                                                            <label className="label" htmlFor="productCodeRef">
                                                                                {resources?.["ProductIndex.newroductcode"]}
                                                                            </label>
                                                                        </div>
                                                                    </td>{" "}
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="1" style={{ textAlign: "left" }}>
                                                                        <div className="floating-label-input mt-3">
                                                                            <button className="btn-submit" type="submit" onClick={() => handleCloneProduct(item)}>
                                                                                {resources?.["ProductIndex.clone"]}
                                                                            </button>
                                                                            <button className="btn-submit" type="submit" onClick={() => CloneProduct(index)}>
                                                                                {resources?.["ProductIndex.clonecancel"]}
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )}
                                        </GridItem>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td>{resources?.["ProductIndex.noproductfound"]}</td>
                                </tr>
                            )}
                        </GridDropZone>
                    }
                </InfiniteScroll>
            </GridContextProvider>
        </div>
    );

    const tableView = () => (
        <div className="List-View-header">
            {slectedCheckBoxFromLocal?.length > 0 && <p className="my-2 h6 text-right px-4">Selected {slectedCheckBoxFromLocal?.length} out of 10 Products</p>}
            {isPSLoading && (
                <div className="fullloader">
                    <Loader />
                </div>
            )}
            <div id="zero_config_wrapper" className="dataTables_wrapper">
                <div className="table-responsive">
                    <InfiniteScroll dataLength={sortedData?.length} next={fetchMoreData} hasMore={true} loader={sortedData?.length < resltcount ? <Loader /> : null}>
                        <table id="zero_config" className="table table-striped table-bordered dataTable">
                            <thead>
                                <tr>
                                    <th className="tblTitle text-left">
                                        <span className="d-none">head</span>
                                    </th>
                                    <th>
                                        <span className="d-none">head</span>
                                    </th>
                                    <th className={`tblTitle productName text-left clsProductListing_ProductNameCode ${sortOrder === "ASC" || reversorting === "ASC" ? "ascnew" : "descnew"}`} onClick={() => handleSort("productName")}>
                                        {resources?.["ProductIndex.ProductCol"]}
                                        <span className={(sortName === "productName" && (sortOrder === "ASC" || reversorting === "ASC" ? "Desc" : "Asc")) || "inactive"} />
                                    </th>
                                    <th className="tblTitle category text-left clsProductListing_CategoryCol">{resources?.["ProductIndex.CategoryCol"]}</th>
                                    <th className={`tblTitle price text-left clsProductListing_PriceCol ${sortOrder === "ASC" || reversorting === "ASC" ? "ascnew" : "descnew"}`} onClick={() => handleSort("price")}>
                                        {resources?.["ProductIndex.PriceCol"]}
                                        <span className={(sortName === "price" && (sortOrder === "ASC" || reversorting === "ASC" ? "Desc" : "Asc")) || "inactive"} />
                                    </th>
                                    <th className="tblTitle inventory text-left clsProductListing_InventoryCol"> {resources?.["ProductIndex.InventoryCol"]}</th>
                                    <th className={`tblTitle price text-left clsProductListing_ModifiedCol ${sortOrder === "ASC" || reversorting === "ASC" ? "ascnew" : "descnew"}`} onClick={() => handleSort("modifiedDateUtc")}>
                                        {resources?.["ProductIndex.LastModifiedCol"]}
                                        <span className={(sortName === "modifiedDateUtc" && (sortOrder === "ASC" || reversorting === "ASC" ? "Desc" : "Asc")) || "inactive"} />
                                    </th>
                                    <th className="tblTitle status text-left clsProductListing_StatusCol">{resources?.["ProductIndex.StatusCol"]}</th>
                                    <th className="tblTitle action text-left">{resources?.["ProductIndex.ActionsCol"]}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedData && sortedData?.length > 0 ? (
                                    sortedData
                                        ?.filter((item) => item !== null)
                                        ?.map((item, index) => {
                                            const prdImageUrl = item?.productSKUs !== undefined && item?.productSKUs?.[0]?.imageName !== null && item?.productSKUs?.[0]?.imageName !== undefined ? `${ProductImg}${item?.productSKUs?.[0]?.imageName}` : defaultProductImg;
                                            return (
                                                <React.Fragment key={item?.productGuid}>
                                                    <tr key={item?.productGuid} className={openRow === index || CloneRow === index ? "table-row-active" : ""}>
                                                        <td className="productCheckbox clsProduct_chkSelectProduct" key={item?.productGuid}>
                                                            {showAction && <CheckboxComponents slectedCheckBoxFromLocal={slectedCheckBoxFromLocal} selectedCheckbox={selectedCheckbox} key={item?.productGuid} type={item?.productGuid} selectdata={item} index={index} checked={filters[item?.productGuid] || false} filterChangeHandler={filterChangeHandler} />}
                                                        </td>
                                                        <td className="productImg clsProductListing_ProductImage">{resources?.["Sage Products Pics Informations"] === "True" && item?.productMediaList?.pics?.[0]?.url ? <LazyImage width={70} height={70} src={item?.productMediaList?.pics?.[0]?.url} className="product-image clsProduct-image lazyload img-fluid" placeholder={item?.productMediaList?.pics?.[0]?.url} /> : <LazyImage width={70} height={70} src={prdImageUrl} className="product-image clsProduct-image lazyload img-fluid" placeholder={defaultProductImg} />}</td>
                                                        <td className="productname">
                                                            <span className="spn_productname">{item?.productCode}</span>
                                                            <span className="spn_productcode">{item?.productName}</span>
                                                        </td>
                                                        <td className="categoryname">
                                                            <span className="spn_categoryname">
                                                                {item?.collectionGuids?.length > 0 ? (
                                                                    <>
                                                                        {item?.collectionGuids?.[0]?.collectionName}{" "}
                                                                        {item.collectionGuids.length - 1 > 0 && (
                                                                            <span>
                                                                                , <span className="extracount">+{item.collectionGuids.length - 1}</span>
                                                                            </span>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </span>
                                                            {(item?.collectionGuids?.length ?? 0) - 1 > 0 && (
                                                                <div className="hovertooltip">
                                                                    <div className="childtool">
                                                                        {item?.collectionGuids?.slice(1)?.map((col, ind) => (
                                                                            <span>
                                                                                {col?.collectionName} {ind < item.collectionGuids.slice(1).length - 1 && <span>, </span>}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="pricevalue">
                                                            <span className="spn_price">${item?.minPrice !== null ? item?.minPrice?.toFixed(2) : "0.00"}</span>
                                                        </td>
                                                        <td className="inventoryvalue">{(item?.productSKUs?.[0]?.inventory != null && item?.productSKUs?.[0]?.inventory) > 0 ? <span className="spn_inventory cls_instock"> {resources?.["ProductIndex.instock"]}</span> : <span className="spn_inventory cls_outstock"> {resources?.["ProductIndex.outofstock"]}</span>}</td>
                                                        <td className="modifieddate">
                                                            <span className="spn_modifieddate">{moment(item?.modifiedDateUtc)?.format(resources?.["ProductIndex.DateFormat"])}</span>
                                                        </td>
                                                        <td className="status clsProductListing_ActiveInActiveCol">
                                                            {" "}
                                                            <div onMouseEnter={() => showTooltip(index)} onMouseLeave={hideTooltip} className="" style={{ position: "relative", cursor: "pointer" }}>
                                                                <ToggleNew EnableDataAll={EnableDataAll} style={{ position: "relative", cursor: "pointer" }} item={item} index={index} />
                                                                {visibleIndex === index && <span className="custooltip">{item.isActive ? "Active" : "InActive"}</span>}
                                                            </div>
                                                        </td>
                                                        <td className="actionBtn text-left">
                                                            <div className="acticons">
                                                                <span title="Clone" onClick={() => CloneProduct(index)} className="icon icon-clarity_clone-line clsProductListing_CloneProduct" />
                                                                <span title="Virtual Sample" onClick={() => VsProduct(item)} className="icon icon-CubeFocus clsProductListing_VS" />
                                                                <span className="icon icon-tag d-none" />
                                                                <span title="Quick Edit" onClick={() => QuickEdit(index, item?.productGuid)} className="icon icon-edit1 clsProductListing_QuickEdit" />
                                                                <span title="Edit" onClick={() => editProduct(item?.productGuid)} className="icon icon-edit clsProductListing_Edit" />
                                                                <span title="Delete" onClick={() => checkDeleteProduct(item)} className="icon icon-delete clsProductListing_Delete" />
                                                                <span title="Sync with PromoStandard" onClick={() => PSsync(item)} className="icon icon-replay d-none clsProductListing_PsSync" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    {openRow === index && (
                                                        <tr key={`quickedit-${item?.productGuid}`} colSpan="9">
                                                            <td colSpan="9" style={{ position: "relative" }}>
                                                                <table className="collum-spacing" style={{ width: "100%" }}>
                                                                    <tbody>
                                                                        <tr>
                                                                            {isLoading && (
                                                                                <div className="loaderquickedit">
                                                                                    <Loader />
                                                                                </div>
                                                                            )}
                                                                            <td>
                                                                                <div className="floating-label-input">
                                                                                    <input aria-labelledby="productCode" className="input" type="text" defaultValue={item?.productCode} ref={ExistProductCode} id="ExistProductCode" placeholder={resources?.["ProductIndex.ProductCode"]} />
                                                                                    <label className="label" htmlFor="ExistProductCode">
                                                                                        {resources?.["ProductIndex.ProductCode"]}
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="floating-label-input">
                                                                                    <input aria-labelledby="productName" className="input" type="text" defaultValue={item?.productName} ref={ExistProductname} id="ExistProductname" placeholder={resources?.["ProductIndex.ProductHeading"]} />
                                                                                    <label className="label" htmlFor="ExistProductname">
                                                                                        {resources?.["ProductIndex.ProductHeading"]}
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="floating-label-input">
                                                                                    <input aria-labelledby="metaDescription" className="input" type="text" id="ExistMetaDescription" defaultValue={item?.metaDescription} ref={ExistMetaDescription} placeholder={resources?.["ProductIndex.MetaDescription"]} />
                                                                                    <label className="label" htmlFor="ExistMetaDescription">
                                                                                        {resources?.["ProductIndex.MetaDescription"]}
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div ref={Collectionref} className="floating-label-input multi-select-dropdown collection-dropdown listview" onClick={toggleDropdownVisibility}>
                                                                                    <input
                                                                                        className="input"
                                                                                        type="text"
                                                                                        readOnly
                                                                                        aria-labelledby="SelectCollections"
                                                                                        placeholder="Select Collections"
                                                                                        value={selectedCollections
                                                                                            ?.filter((f) => f?.productGuid === item?.productGuid)
                                                                                            ?.map((collectionGuid) => {
                                                                                                const collection = collectionsdata?.find((col) => col?.collectionGuid === collectionGuid?.selectedCollections);
                                                                                                return collection ? collection?.collectionName : "";
                                                                                            })
                                                                                            ?.filter(Boolean)
                                                                                            ?.join(", ")}
                                                                                    />
                                                                                    <label className="label" htmlFor="ExistMetaDescription">
                                                                                        {resources?.["ProductIndex.selectcollectionquickedit"]}
                                                                                    </label>
                                                                                </div>
                                                                                <div ref={Collectionref} className="multi-select-dropdown collection-dropdown listview">
                                                                                    <div className="dropdown">
                                                                                        <div className="dropdown-content" style={{ display: isDropdownVisible ? "block" : "none" }}>
                                                                                            <input aria-labelledby="searchCollections" style={{ width: "100%" }} type="text" placeholder="Search Collection Name" value={searchTerm} onChange={handleSearchChange} className="search-input" />
                                                                                            {collectionTypes?.map((type) => {
                                                                                                const filteredCollections = (searchTerm ? SearchFilterData : collectionsdata)?.filter((collection) => collection?.collectionType === type);
                                                                                                if (!filteredCollections?.length) {
                                                                                                    return null;
                                                                                                }
                                                                                                return (
                                                                                                    <div key={type} className="typename">
                                                                                                        <strong>{type}</strong>
                                                                                                        {(searchTerm ? SearchFilterData : collectionsdata)
                                                                                                            ?.filter((collection) => collection?.collectionType === type)
                                                                                                            ?.map((colitem) => (
                                                                                                                <label htmlFor={colitem?.collectionGuid} key={colitem?.collectionGuid} className="dropdown-item">
                                                                                                                    <input aria-labelledby="collectionGuid" type="checkbox" id={colitem?.collectionGuid} value={colitem?.collectionGuid} checked={selectedCollections?.filter((f) => f?.productGuid === item?.productGuid && f?.selectedCollections === colitem?.collectionGuid)?.length > 0} onChange={(e) => getSelectedColletion(e, item?.productGuid)} />
                                                                                                                    {colitem?.collectionName}
                                                                                                                </label>
                                                                                                            ))}
                                                                                                    </div>
                                                                                                );
                                                                                            })}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="floating-label-input">
                                                                                    <input aria-labelledby="ExistPageTitle" className="input" type="text" id="ExistPageTitle" defaultValue={item?.pageTitle} ref={ExistPageTitle} placeholder={resources?.["ProductIndex.PageTitle"]} />
                                                                                    <label className="label" htmlFor="ExistPageTitle">
                                                                                        {resources?.["ProductIndex.PageTitle"]}
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="floating-label-input">
                                                                                    <input aria-labelledby="ExistMetaKeyword" className="input" type="text" id="ExistMetaKeyword" defaultValue={item?.metaKeyword} ref={ExistMetaKeyword} placeholder={resources?.["ProductIndex.MetaKeywords"]} />
                                                                                    <label className="label" htmlFor="ExistMetaKeyword">
                                                                                        {resources?.["ProductIndex.MetaKeywords"]}
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        {resources?.["Product Mirroring"] === "True" && (
                                                                            <tr>
                                                                                <td>
                                                                                    <div className="floating-label-input isProductMirroring">
                                                                                        <label htmlFor="isProductMirroring">
                                                                                            <input aria-labelledby="isProductMirroring" id="isProductMirroring" type="checkbox" defaultChecked={item?.isProductMirroring} onClick={(e) => setisProductMirroringchecked(e.target.checked)} /> Product Mirroring
                                                                                        </label>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        )}

                                                                        <tr>
                                                                            <td colSpan="1" style={{ textAlign: "left" }}>
                                                                                <div className="floating-label-input">
                                                                                    <button className="btn-submit" type="submit" onClick={() => handleQuickUpdateProduct(item)}>
                                                                                        {resources?.["ProductIndex.QuickUpdate"]}
                                                                                    </button>
                                                                                    <button className="btn-submit" type="submit" onClick={() => QuickEdit(index)}>
                                                                                        {resources?.["ProductIndex.QuickCancel"]}
                                                                                    </button>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    )}
                                                    {CloneRow === index && (
                                                        <tr key={`clone-${item?.productGuid}`} colSpan="9">
                                                            <td colSpan="9" style={{ position: "relative" }}>
                                                                <table style={{ width: "100%" }}>
                                                                    <tbody>
                                                                        <tr>
                                                                            {isLoading && (
                                                                                <div className="loaderquickedit">
                                                                                    <Loader />
                                                                                </div>
                                                                            )}
                                                                            <td>
                                                                                <div className="floating-label-input">
                                                                                    <input aria-labelledby="productCode" readOnly className="input" type="text" defaultValue={item?.productCode} id="oldproductCode" placeholder={resources?.["ProductIndex.olproductcode"]} />
                                                                                    <label className="label" htmlFor="productCodeRef">
                                                                                        {resources?.["ProductIndex.olproductcode"]}
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="floating-label-input">
                                                                                    <input aria-labelledby="productCodeRef" className="input" type="text" ref={productCodeRef} id="productCodeRef" placeholder={resources?.["ProductIndex.newroductcode"]} />
                                                                                    <label className="label" htmlFor="productCodeRef">
                                                                                        {resources?.["ProductIndex.newroductcode"]}
                                                                                    </label>
                                                                                </div>
                                                                            </td>{" "}
                                                                        </tr>
                                                                        <tr>
                                                                            <td colSpan="1" style={{ textAlign: "left" }}>
                                                                                <button className="btn-submit" type="submit" onClick={() => handleCloneProduct(item)}>
                                                                                    {resources?.["ProductIndex.clone"]}
                                                                                </button>
                                                                                <button className="btn-submit" type="submit" onClick={() => CloneProduct(index)}>
                                                                                    {resources?.["ProductIndex.clonecancel"]}
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            );
                                        })
                                ) : (
                                    <tr>
                                        <td> {resources?.["ProductIndex.noproductfound"]}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
    return <div className="ProductListing">{view === "grid" ? listView() : tableView()}</div>;
});
export default Product;
