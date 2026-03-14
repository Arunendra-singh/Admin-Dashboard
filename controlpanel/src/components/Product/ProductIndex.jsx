import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useGetAllMasterColors } from "common/components/graphQL/queries/Product/useGetAllMasterColors";
import { PopupV3 } from "common/utils";
import { useGetAllProduct } from "common/components/graphQL/queries/Product/useGetAllProduct";
import { useGetAllCollection } from "common/components/graphQL/queries/Collection/useGetAllCollection";
import { useMutationdeleteProductsOnSage } from "common/components/graphQL/mutations/Product/useMutationdeleteProductsOnSage";
import { useMutationsaveProductsOnSage } from "common/components/graphQL/mutations/Product/useMutationsaveProductsOnSage";
import { WEBSITE_GUID } from "common/utils/vars";
import { Dropdown } from "react-bootstrap";
import "../../styles/layout/CardsContainer.css";
import "../../styles/global.css";
import "../../styles/pages/salescard.scss";
import { Link } from "react-router-dom";
import { useproductDataForGoogleFeed } from "common/components/graphQL/queries/Product/useproductDataForGoogleFeed";
import Store from "~/Store";
import Product from "./Product";
import Loader from "../shared/Loader";
import "./ProductIndex.scss";

const ProductIndex = () => {
    const [view, setView] = useState("list");
    const [prdData, setPrdData] = useState([]);
    const [search, setSearch] = useState("");
    const [totalRecordNew, setTotalRecordsNew] = useState(0);
    const [active, setActive] = useState("");
    const [inactive, setInActive] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [columnNameVal, setColumnName] = useState("");
    const [alljson, setalljson] = useState([]);
    const [, setSortDirection] = useState("DSC");
    // const [sorting] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
    const [reversorting] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [resltcount, setResultCount] = useState(0);
    const [, setreorder] = useState(false);
    const [setdatacount] = useState(10);
    const [foundproduct] = useState("No Products Found");
    const productRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdvanceSearch, setIsAdvanceSearch] = useState(false);
    const [minPriceText, setMinPriceFilter] = useState("");
    const [maxPriceText, setMaxPriceFilter] = useState("");
    const [resources] = Store.useStore((store) => store?.resources);
    const [selectedAction, setSelectedAction] = useState("Action");
    const [DeleteProductOnSage] = useMutation(useMutationdeleteProductsOnSage);
    const [saveProductsOnSage] = useMutation(useMutationsaveProductsOnSage);
    const [isSearchDropdownVisible, setIsSearchDropdownVisible] = useState(false);
    const [isMasterColorsDropdownVisible, setIsMasterColorsDropdownVisible] = useState(false);
    const [updateCollection, setupdateSearchCollection] = useState([]);
    const [updateMasterColors, setupdateMasterColors] = useState([]);
    const [collectionarray, setCollectionArray] = useState([]);
    const [colorsarray, setcolorsarray] = useState([]);
    const [isAdvanceSearchHtml, setIsAdvanceSearchHtml] = useState(false);
    const [selectedSearchMasterColors, setSelectedMasterColors] = useState([]);
    const [selectedSearchCollections, setSelectedSearchCollections] = useState([]);
    const [showAction, setshowAction] = useState(false);
    const [commonloading, setcommonloading] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState("Sort By");
    const [isSortingChange, setisSortingChange] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [masterColorText, setMasterColorsText] = useState("");

    const handleMinPriceChange = (evt) => {
        const price = evt?.target?.validity?.valid ? evt?.target?.value : "";
        setMinPriceFilter(price);
    };
    const handleMaxPriceChange = (evt) => {
        const price = evt?.target?.validity?.valid ? evt?.target?.value : "";
        setMaxPriceFilter(price);
    };
    const updatecount = (data) => {
        setPrdData(data);
    };
    useEffect(() => {
        if ((resources?.Sage === "True" && resources?.["Disabled SAGE from Product Management"] === "False") || resources?.["GillLine Sage"] === "True") {
            setshowAction(true);
        }
    }, [resources]);
    const [filters] = useState({
        skip: setCurrentPage,
        take: setdatacount,
        filter: {
            websiteGuid: {
                eq: WEBSITE_GUID
            },
            productCode: {
                contain: ""
            }
        },
        sort: { modifiedDateUtc: "DESC" }
    });
    const { data, refetch, loading } = useQuery(useGetAllProduct, { variables: filters });
    useEffect(() => {
        if (filters) {
            setreorder(true);
            setColumnName("Sequence");
            refetch(filters);
        }
    }, [filters]);
    useEffect(() => {
        if (selectedStatus === "Active") {
            const Active = data?.allProducts?.activeCount;
            setActive(Active);
            setResultCount(Active);
        } else if (selectedStatus === "Inactive") {
            const inActive = data?.allProducts?.inactiveCount;
            setInActive(inActive);
            setResultCount(inActive);
        } else {
            setPrdData(data?.allProducts?.items);
            setTotalRecordsNew(data?.allProducts?.totalCount);
            setInActive(data?.allProducts?.inactiveCount);
            setActive(data?.allProducts?.activeCount);
            setResultCount(data?.allProducts?.totalCount);
        }
        // if (!sorting) {
        //     const dataall = data?.allProducts?.items || [];
        //     if (dataall) {
        //         setPrdData(dataall);
        //     }
        // }
    }, [data, selectedStatus]);
    const Collectionref = useRef(null);
    const colorref = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest(".clsCollections")) {
                setIsSearchDropdownVisible(false);
            }
            if (!event.target.closest(".clsColors")) {
                setIsMasterColorsDropdownVisible(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const handleCheckboxChange = useCallback((event) => {
        if (event?.target !== undefined) {
            const { value, checked } = event.target;
            setSelectedCheckboxes((prevSelected) => {
                if (checked) {
                    return [...prevSelected, value];
                }
                return prevSelected.filter((checkboxValue) => checkboxValue !== value);
            });
        }
    }, []);
    const TotalData = (filteredItems) => {
        if (filteredItems?.length > 0) {
            const InActive = filteredItems?.filter((x) => x.isActive === false).length;
            const Active = filteredItems?.filter((x) => x.isActive === true).length;
            setInActive(InActive);
            setActive(Active);
        }
    };
    const [activestatus, setActivestatus] = useState("");
    useEffect(() => {
        if (selectedStatus === "All") {
            setActivestatus("");
        } else if (selectedStatus === "Active") {
            setActivestatus("true");
        } else {
            setActivestatus("false");
        }
    }, [selectedStatus]);
    const handleKeyDown = (event) => {
        setIsLoading(true);
        if (event?.key === " " && search.length === 0) {
            setIsLoading(false);
            event?.preventDefault();
        } else if (event?.key) {
            setIsLoading(false);
        }
    };
    const handleDropdownSort = async (columnName) => {
        if (columnName?.displayoption !== selectedSortOption) {
            setisSortingChange(true);
            setPrdData([]);
        }
        setColumnName(columnName);
        setSortDirection(columnName?.direction);
        setSortConfig({ key: columnName?.dbColname, direction: columnName?.direction });
        setSelectedSortOption(columnName?.displayoption);
    };
    const handleSearch = async (event) => {
        setcommonloading(true);
        const searchValue = event?.searchtext;
        setSearch(event?.searchtext || "");
        // handleDropdownSort(columnNameVal);
        const { key, direction } = sortConfig;
        try {
            const filter = { websiteGuid: { eq: WEBSITE_GUID }, isactive: { eq: activestatus } };
            if (searchValue !== undefined && searchValue !== null && searchValue !== "") {
                filter.searchText = { contain: searchValue };
            }
            if (isAdvanceSearch === true && updateCollection !== undefined && updateCollection !== null && updateCollection.length > 0) {
                filter.collectionGuids = { eq: collectionarray.join(",") };
            }
            if (isAdvanceSearch === true && updateMasterColors !== undefined && updateMasterColors !== null && updateMasterColors.length > 0) {
                filter.colors = { eq: colorsarray.join(",") };
            }
            if (isAdvanceSearch === true && minPriceText !== undefined && minPriceText !== null && minPriceText !== "") {
                filter.minPrice = { gte: parseInt(minPriceText, 10) };
            }
            if (isAdvanceSearch === true && maxPriceText !== undefined && maxPriceText !== null && maxPriceText !== "") {
                filter.maxPrice = { lte: parseInt(maxPriceText, 10) };
            }
            if (sortConfig?.key === "" && sortConfig?.direction === "") {
                const resp = await refetch({
                    skip: currentPage,
                    take: setdatacount,
                    filter,
                    sort: { modifiedDateUtc: "DESC" }
                });
                const dataall = resp?.data?.allProducts?.items || [];
                const validdata = dataall?.filter((item) => item !== null);
                setalljson(validdata);
                setPrdData(validdata);
                setActive(resp?.data?.allProducts?.activeCount);
                setInActive(resp?.data?.allProducts?.inactiveCount);
                setTotalRecordsNew(resp?.data?.allProducts?.totalCount);
                setcommonloading(false);
            } else {
                const sort = { [key]: direction };
                const resp = await refetch({
                    skip: currentPage,
                    take: setdatacount,
                    filter,
                    sort
                });
                const dataall = resp?.data?.allProducts?.items || [];
                const validdata = dataall?.filter((item) => item !== null);
                setalljson(validdata);
                setPrdData(validdata);
                setActive(resp?.data?.allProducts?.activeCount);
                setInActive(resp?.data?.allProducts?.inactiveCount);
                setTotalRecordsNew(resp?.data?.allProducts?.totalCount);
                setcommonloading(false);
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
            setcommonloading(false);
        }
    };
    const useThrottle = (callback, delay) => {
        const [timeoutId, setTimeoutId] = useState(null);
        return function (...args) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            const newTimeoutId = setTimeout(() => {
                callback(...args);
                setTimeoutId(null);
            }, delay);
            setTimeoutId(newTimeoutId);
        };
    };
    const throttledSearch = useThrottle(handleSearch, 500);
    const handleInputChange = (event) => {
        throttledSearch(event);
    };

    const onsearchchangehandler = async (event) => {
        const searchtext = event?.target?.value;
        setSearch(searchtext);
        handleInputChange({ searchtext, event });
    };

    const [deletedata, setDeletedata] = useState([]);
    const setdeletedata = (deletedd) => {
        setDeletedata(deletedd);
    };

    const handleAdvanceSearchReset = () => {
        setIsAdvanceSearchHtml(false);
        setMinPriceFilter("");
        setMaxPriceFilter("");
        setSelectedMasterColors([]);
        setSelectedSearchCollections([]);
        setIsAdvanceSearch(false);
    };
    const handleReset = async (iscloseicon) => {
        setcommonloading(true);
        setSearch("");
        if (!iscloseicon || iscloseicon?.currentTarget?.innerHTML === "Reset") {
            setSelectedStatus("All");
            setSelectedSortOption("Sort By");
            setreorder(false);
            setDeletedata([]);
            handleAdvanceSearchReset();
            setSelectedAction("Action");
            if (productRef?.current) {
                productRef?.current?.resetfunction();
            }
            localStorage.removeItem("selectedCheckboxes");
            setSearchText("");
            setMasterColorsText("");
        }
        let sort = null;
        if (!iscloseicon || iscloseicon?.currentTarget?.innerHTML === "Reset") {
            sort = { modifiedDateUtc: "DESC" };
            setSortConfig({ key: "", direction: "" });
        } else {
            const { key, direction } = sortConfig;
            if (sortConfig.key && sortConfig.direction) {
                sort = { [key]: direction };
            }
        }
        refetch({
            skip: currentPage,
            take: setdatacount,
            filter: {
                websiteGuid: {
                    eq: WEBSITE_GUID
                },
                isactive: { eq: activestatus }
            },
            sort
        }).then((resetdata) => {
            setcommonloading(false);
            if (resetdata?.data?.allProducts?.items !== null && resetdata?.data?.allProducts?.items !== undefined) {
                const sorteddata = [...resetdata.data.allProducts.items];
                setPrdData(sorteddata);
                setTotalRecordsNew(resetdata?.data?.allProducts?.totalCount);
                TotalData(sorteddata);
                // setResultCount(resetdata?.data?.allProducts?.totalCount);
                if (selectedStatus === "Active") {
                    const Active = resetdata?.data?.allProducts?.activeCount;
                    setResultCount(Active);
                } else if (selectedStatus === "Inactive") {
                    const inActive = resetdata?.data?.allProducts?.inactiveCount;
                    setResultCount(inActive);
                } else {
                    setResultCount(resetdata?.data?.allProducts?.totalCount);
                }
                setInActive(resetdata?.data?.allProducts?.inactiveCount);
                setActive(resetdata?.data?.allProducts?.activeCount);
            } else {
                const sorteddata = [...alljson].sort((a, b) => a.minPrice - b.minPrice);
                setPrdData(sorteddata);
                setTotalRecordsNew(sorteddata?.length);
                TotalData(sorteddata);
                setResultCount(resetdata?.allProducts?.totalCount);
                setInActive(resetdata?.data?.allProducts?.inactiveCount);
                setActive(resetdata?.data?.allProducts?.activeCount);
            }
        });
    };
    const searchCloseHandle = () => {
        handleReset(true);
    };
    const [previousdata, setPreviousData] = useState(null);
    const removeProductOnSage = () => {
        setcommonloading(true);
        DeleteProductOnSage({
            variables: {
                productGuids: deletedata
            }
        }).then((res) => {
            setcommonloading(false);
            if (res?.data?.deleteProductsOnSage?.statuscode === 200) {
                PopupV3({
                    content: res?.data?.deleteProductsOnSage?.message,
                    type: "Success",
                    title: "Success",
                    classes: "sagedelete-Product",
                    actions: [
                        {
                            text: "Ok",
                            classes: "ok",
                            dismiss: true,
                            do: () => {
                                setPreviousData(true);
                            }
                        }
                    ]
                });
            } else {
                PopupV3({
                    content: res?.data?.deleteProductsOnSage?.message,
                    type: "Warning",
                    title: "Warning",
                    classes: "sagedelete-Product",
                    actions: [
                        {
                            text: "Ok",
                            classes: "ok",
                            dismiss: true,
                            do: () => {
                                setPreviousData(true);
                            }
                        }
                    ]
                });
            }
        });
    };
    const saveProductOnSage = () => {
        setcommonloading(true);
        saveProductsOnSage({
            variables: {
                productGuids: deletedata
            }
        }).then((res) => {
            setcommonloading(false);
            if (res?.data?.ProductSaveInput?.statuscode === 200) {
                PopupV3({
                    content: res?.data?.uploadAllProductsOnSage?.message,
                    type: "Success",
                    title: "Success",
                    classes: "sagesave-Product",
                    actions: [
                        {
                            text: "Ok",
                            classes: "ok",
                            dismiss: true,
                            do: () => {
                                setPreviousData(true);
                            }
                        }
                    ]
                });
            } else {
                PopupV3({
                    content: res?.data?.uploadAllProductsOnSage?.message,
                    type: "Warning",
                    title: "Warning",
                    classes: "sagesave-Product",
                    actions: [
                        {
                            text: "Ok",
                            classes: "ok",
                            dismiss: true,
                            do: () => {
                                setPreviousData(true);
                            }
                        }
                    ]
                });
            }
        });
    };
    const handleChangeAction = async (event) => {
        if (event !== "Action") {
            if (deletedata?.length > 0) {
                if (event === "Delete on Sage") {
                    PopupV3({
                        content: resources?.["ProductIndex.deleteconfirmation"],
                        type: "Confirm",
                        title: "Success",
                        classes: "Delete_Popup",
                        actions: [
                            {
                                dismiss: true,
                                text: "Yes",
                                classes: "deleteconfirmbtn",
                                do: () => {
                                    removeProductOnSage();
                                }
                            },
                            {
                                text: "No",
                                dismiss: true
                            }
                        ]
                    });
                } else if (event === "Save on Sage") {
                    PopupV3({
                        content: resources?.["ProductIndex.saveconfirmation"],
                        type: "Confirm",
                        title: "Success",
                        classes: "Delete_Popup",
                        actions: [
                            {
                                dismiss: true,
                                text: "Yes",
                                classes: "deleteconfirmbtn",
                                do: () => {
                                    saveProductOnSage();
                                }
                            },
                            {
                                text: "No",
                                dismiss: true
                            }
                        ]
                    });
                }
            } else {
                PopupV3({
                    content: resources?.["ProductIndex.ValidationSaveonSage"],
                    type: "Warning",
                    title: resources?.["ProductIndex.ValidationSaveonSage"],
                    actions: [
                        {
                            text: "OK",
                            classes: "ok",
                            dismiss: true
                        }
                    ],
                    onDismiss: () => {}
                });
            }
        } else {
            setSelectedAction(event);
        }
    };
    const handleChangeStatus = async (event) => {
        const Allvalue = event;
        setSelectedStatus(event);
        setPrdData([]);
        setisSortingChange(true);
        const { key, direction } = sortConfig;
        if (Allvalue === "Active") {
            const filter = { websiteGuid: { eq: WEBSITE_GUID }, isactive: { eq: "true" }, searchText: { contain: search } };
            if (isAdvanceSearch === true && updateCollection !== undefined && updateCollection !== null && updateCollection?.length > 0) {
                filter.collectionGuids = { eq: collectionarray?.join(",") };
            }
            if (isAdvanceSearch === true && updateMasterColors !== undefined && updateMasterColors !== null && updateMasterColors?.length > 0) {
                filter.colors = { eq: colorsarray?.join(",") };
            }
            if (isAdvanceSearch === true && minPriceText !== undefined && minPriceText !== null && minPriceText !== "") {
                filter.minPrice = { gte: parseInt(minPriceText, 10) };
            }
            if (isAdvanceSearch === true && maxPriceText !== undefined && maxPriceText !== null && maxPriceText !== "") {
                filter.maxPrice = { lte: parseInt(maxPriceText, 10) };
            }
            if (sortConfig?.key === "" && sortConfig?.direction === "") {
                const activedata = await refetch({
                    take: setdatacount,
                    skip: currentPage,
                    filter,
                    sort: { modifiedDateUtc: "DESC" }
                });
                setPrdData(activedata?.data?.allProducts?.items);
                setActive(activedata?.data?.allProducts?.activeCount);
                setInActive(activedata?.data?.allProducts?.inactiveCount);
                setTotalRecordsNew(activedata?.data?.allProducts?.totalCount);
                setreorder(false);
            } else {
                const sort = { [key]: direction };
                const activedata = await refetch({
                    skip: currentPage,
                    take: setdatacount,
                    filter,
                    sort
                });
                setPrdData(activedata?.data?.allProducts?.items);
                setActive(activedata?.data?.allProducts?.activeCount);
                setInActive(activedata?.data?.allProducts?.inactiveCount);
                setTotalRecordsNew(activedata?.data?.allProducts?.totalCount);
                setreorder(false);
            }
        } else if (Allvalue === "Inactive") {
            const filter = { websiteGuid: { eq: WEBSITE_GUID }, isactive: { eq: "false" }, searchText: { contain: search } };
            if (isAdvanceSearch === true && updateCollection !== undefined && updateCollection !== null && updateCollection.length > 0) {
                filter.collectionGuids = { eq: collectionarray?.join(",") };
            }
            if (isAdvanceSearch === true && updateMasterColors !== undefined && updateMasterColors !== null && updateMasterColors.length > 0) {
                filter.colors = { eq: colorsarray?.join(",") };
            }
            if (isAdvanceSearch === true && minPriceText !== undefined && minPriceText !== null && minPriceText !== "") {
                filter.minPrice = { gte: parseInt(minPriceText, 10) };
            }
            if (isAdvanceSearch === true && maxPriceText !== undefined && maxPriceText !== null && maxPriceText !== "") {
                filter.maxPrice = { lte: parseInt(maxPriceText, 10) };
            }
            if (sortConfig?.key === "" && sortConfig?.direction === "") {
                const inactivedata = await refetch({
                    take: setdatacount,
                    skip: 1,
                    filter,
                    sort: { modifiedDateUtc: "DESC" }
                });
                setPrdData(inactivedata?.data?.allProducts?.items);
                setInActive(inactivedata?.data?.allProducts?.inactiveCount);
                setActive(inactivedata?.data?.allProducts?.activeCount);
                setTotalRecordsNew(inactivedata?.data?.allProducts?.totalCount);
                setreorder(false);
            } else {
                const sort = { [key]: direction };
                const inactivedata = await refetch({
                    skip: 1,
                    take: setdatacount,
                    filter,
                    sort
                });
                setPrdData(inactivedata?.data?.allProducts?.items);
                setInActive(inactivedata?.data?.allProducts?.inactiveCount);
                setActive(inactivedata?.data?.allProducts?.activeCount);
                setTotalRecordsNew(inactivedata?.data?.allProducts?.totalCount);
                setreorder(false);
            }
        } else {
            const filter = { websiteGuid: { eq: WEBSITE_GUID }, isactive: { eq: "" }, searchText: { contain: search } };
            if (isAdvanceSearch === true && updateCollection !== undefined && updateCollection !== null && updateCollection.length > 0) {
                filter.collectionGuids = { eq: collectionarray?.join(",") };
            }
            if (isAdvanceSearch === true && updateMasterColors !== undefined && updateMasterColors !== null && updateMasterColors.length > 0) {
                filter.colors = { eq: colorsarray?.join(",") };
            }
            if (isAdvanceSearch === true && minPriceText !== undefined && minPriceText !== null && minPriceText !== "") {
                filter.minPrice = { gte: parseInt(minPriceText, 10) };
            }
            if (isAdvanceSearch === true && maxPriceText !== undefined && maxPriceText !== null && maxPriceText !== "") {
                filter.maxPrice = { lte: parseInt(maxPriceText, 10) };
            }
            if (sortConfig?.key === "" && sortConfig?.direction === "") {
                const completedata = await refetch({
                    take: setdatacount,
                    skip: 1,
                    filter,
                    sort: { modifiedDateUtc: "DESC" }
                });
                setPrdData(completedata?.data?.allProducts?.items);
                setreorder(true);
                setInActive(completedata?.data?.allProducts?.inactiveCount);
                setActive(completedata?.data?.allProducts?.activeCount);
                setTotalRecordsNew(completedata?.data?.allProducts?.totalCount);
                setResultCount(completedata?.data?.allProducts?.totalCount);
            } else {
                const sort = { [key]: direction };
                const completedata = await refetch({
                    skip: 1,
                    take: setdatacount,
                    filter,
                    sort
                });
                setPrdData(completedata?.data?.allProducts?.items);
                setreorder(true);
                setInActive(completedata?.data?.allProducts?.inactiveCount);
                setActive(completedata?.data?.allProducts?.activeCount);
                setTotalRecordsNew(completedata?.data?.allProducts?.totalCount);
                setResultCount(completedata?.data?.allProducts?.totalCount);
            }
        }
        setisSortingChange(false);
    };
    const [canceladvancesearch, setcanceladvancesearch] = useState(false);
    useEffect(() => {
        const fetchSortedData = async () => {
            try {
                const { key, direction } = sortConfig;
                const filter = { websiteGuid: { eq: WEBSITE_GUID }, isactive: { eq: activestatus }, searchText: { contain: search } };
                if (isAdvanceSearch === true && updateCollection !== undefined && updateCollection !== null && updateCollection.length > 0) {
                    filter.collectionGuids = { eq: collectionarray?.join(",") };
                }
                if (isAdvanceSearch === true && updateMasterColors !== undefined && updateMasterColors !== null && updateMasterColors.length > 0) {
                    filter.colors = { eq: colorsarray?.join(",") };
                }
                if (isAdvanceSearch === true && minPriceText !== undefined && minPriceText !== null && minPriceText !== "") {
                    filter.minPrice = { gte: parseInt(minPriceText, 10) };
                }
                if (isAdvanceSearch === true && maxPriceText !== undefined && maxPriceText !== null && maxPriceText !== "") {
                    filter.maxPrice = { lte: parseInt(maxPriceText, 10) };
                }
                if (sortConfig.key && sortConfig.direction) {
                    const sort = { [key]: direction };
                    const sortedData = await refetch({
                        skip: currentPage,
                        take: setdatacount,
                        filter,
                        sort
                    });
                    setPrdData(sortedData?.data?.allProducts?.items);
                    setActive(sortedData?.data?.allProducts?.activeCount);
                    setInActive(sortedData?.data?.allProducts?.inactiveCount);
                    setTotalRecordsNew(sortedData?.data?.allProducts?.totalCount);
                    if (selectedStatus === "Active") {
                        setResultCount(sortedData?.data?.allProducts?.activeCount);
                    } else if (selectedStatus === "Inactive") {
                        setResultCount(sortedData?.data?.allProducts?.inactiveCount);
                    } else {
                        setResultCount(sortedData?.data?.allProducts?.totalCount);
                    }
                }
                setisSortingChange(false);
            } catch (error) {
                console.error("Error fetching sorted data:", error);
                setisSortingChange(false);
            }
        };
        fetchSortedData();
    }, [selectedSortOption, canceladvancesearch, previousdata]);

    const [collectiondata, setColData] = useState(null);
    const [collectionfilters] = useState({
        skip: 1,
        take: 500,
        where: {
            websiteGuid: {
                eq: WEBSITE_GUID
            }
        },
        order: null
    });
    const { data: collectionqueryData, refetch: colrefetch } = useQuery(useGetAllCollection, { variables: collectionfilters });

    const getAllCollections = (coldata) => {
        // Flattening the collection and subcategories
        const collections = [];

        // Function to recursively add collections and subcategories
        const addCollections = (collection) => {
            // Add the main collection
            collections?.push({
                collectionGuid: collection?.collectionGuid,
                collectionName: collection?.collectionName,
                collectionType: collection?.collectionType,
                parentCollectionGuid: collection?.parentCollectionGuid
            });

            // Add subcategories if they exist
            if (collection?.subCategories && collection?.subCategories?.length > 0) {
                collection?.subCategories?.forEach((sub) => {
                    addCollections(sub);
                });
            }
        };

        // Call the function for each collection in the data
        coldata?.forEach((collection) => {
            addCollections(collection);
        });

        setColData(collections);
    };
    useEffect(() => {
        if (collectionqueryData && collectionqueryData?.allCollection?.items) {
            // setColData(collectionqueryData?.allCollection.items);
            getAllCollections(collectionqueryData?.allCollection?.items);
        }
    }, [collectionqueryData]);
    useEffect(() => {
        colrefetch(collectionfilters);
    }, [colrefetch]);

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    const AddNewProduct = () => {
        setDropdownVisible(!dropdownVisible);
    };
    const ExportProduct = () => {
        window.location.href = "/Product/ImportExport";
    };
    const SingleProduct = () => {
        window.location.href = "/Product/Create";
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef?.current && !dropdownRef?.current?.contains(event.target)) {
                setDropdownVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const [mastercolors, setMasterColorData] = useState(null);
    const [mastercolorfilters] = useState({
        skip: 0,
        take: 0,
        where: {
            websiteGuid: {
                eq: WEBSITE_GUID
            }
        },
        order: null
    });
    const { data: mastercolorqueryData, refetch: colorsrefetch } = useQuery(useGetAllMasterColors, { variables: mastercolorfilters });

    useEffect(() => {
        if (mastercolorqueryData && mastercolorqueryData?.allMasterColors?.items) {
            setMasterColorData(mastercolorqueryData?.allMasterColors?.items);
        }
    }, [mastercolorqueryData]);

    useEffect(() => {
        colorsrefetch(mastercolorfilters);
    }, [colorsrefetch]);

    const toggleMasterColorsDropdownVisibility = () => {
        setIsMasterColorsDropdownVisible(!isMasterColorsDropdownVisible);
    };

    const getSelectedMasterColors = (e) => {
        const selectedcolors = e.target.value;
        setSelectedMasterColors((prevSelected) => (prevSelected?.includes(selectedcolors) ? prevSelected?.filter((item) => item !== selectedcolors) : [...prevSelected, selectedcolors]));
    };

    useEffect(() => {
        const allSelMasterColors = mastercolors?.filter((item) => selectedSearchMasterColors?.some((selected) => selected === item.masterColorGuid));
        const mastercolorsguidArray = [];
        allSelMasterColors?.forEach((itema) => {
            mastercolorsguidArray?.push({
                masterColorGuid: itema?.masterColorGuid,
                colorName: itema?.colorName
            });
        });
        setupdateMasterColors(mastercolorsguidArray);
    }, [selectedSearchMasterColors, mastercolors]);

    const [colorsFilter, setColorsFilter] = useState("");
    const handleMasterColorsChangeEvt = (e) => {
        setMasterColorsText(e.target.value.toLowerCase());
    };

    useEffect(() => {
        const filteredColors = mastercolors?.filter((type) => type?.colorName?.toLowerCase()?.includes(masterColorText));
        setColorsFilter(filteredColors);
    }, [masterColorText]);

    const searchCollectionTypes = [...new Set(collectiondata?.map((collection) => collection.collectionType))];
    const toggleSearchDropdownVisibility = () => {
        setIsSearchDropdownVisible(!isSearchDropdownVisible);
    };

    const getSelectedSearchColletion = (e) => {
        const selectedcollection = e.target.value;
        setSelectedSearchCollections((prevSelected) => (prevSelected?.includes(selectedcollection) ? prevSelected?.filter((item) => item !== selectedcollection) : [...prevSelected, selectedcollection]));
    };

    useEffect(() => {
        const allSelCallection = collectiondata?.filter((item) => selectedSearchCollections?.some((selected) => selected === item.collectionGuid));
        const collectionguidArray = [];
        allSelCallection?.forEach((itema) => {
            collectionguidArray?.push({
                collectionGuid: itema?.collectionGuid,
                collectionType: itema?.collectionType
            });
        });
        setupdateSearchCollection(collectionguidArray);
    }, [selectedSearchCollections, collectiondata]);

    const [searchFilter, setSearchFilter] = useState("");
    const handleSearchChangeEvt = (e) => {
        setSearchText(e.target.value.toLowerCase());
    };

    useEffect(() => {
        const filteredCollectionTypes = collectiondata?.filter((type) => type?.collectionName?.toLowerCase()?.includes(searchText));
        setSearchFilter(filteredCollectionTypes);
    }, [searchText]);

    const toggleAdvanceSearchHtmlVisibility = () => {
        setIsAdvanceSearchHtml(!isAdvanceSearchHtml);
        setIsAdvanceSearch(!isAdvanceSearchHtml);
        setcanceladvancesearch(false);
    };

    const advanceSearchCancel = () => {
        setIsAdvanceSearchHtml(false);
        setIsAdvanceSearch(false);
        handleAdvanceSearchReset();
        setcanceladvancesearch(true);
        setSearchText("");
        setMasterColorsText("");
    };

    useEffect(() => {
        if (updateCollection) {
            const newArray = updateCollection?.map((item) => item?.collectionGuid);
            setCollectionArray(newArray);
        }
    }, [updateCollection]);

    useEffect(() => {
        if (updateMasterColors) {
            const newArray = updateMasterColors?.map((item) => item?.masterColorGuid);
            setcolorsarray(newArray);
        }
    }, [updateMasterColors]);

    const advanceSearchSubmit = async () => {
        if (parseInt(minPriceText === "" ? 0 : minPriceText, 10) > parseInt(maxPriceText === "" ? 0 : maxPriceText, 10)) {
            PopupV3({
                content: "Minimum price value cannot be greater than maximum price value.",
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
        setcommonloading(true);
        const { key, direction } = sortConfig;
        const filter = { websiteGuid: { eq: WEBSITE_GUID }, isactive: { eq: activestatus } };
        if (search !== undefined && search !== null && search !== "") {
            filter.searchText = { contain: search };
        }
        if (isAdvanceSearch === true && updateCollection !== undefined && updateCollection !== null && updateCollection.length > 0) {
            filter.collectionGuids = { eq: collectionarray?.join(",") };
        }
        if (isAdvanceSearch === true && updateMasterColors !== undefined && updateMasterColors !== null && updateMasterColors.length > 0) {
            filter.colors = { eq: colorsarray?.join(",") };
        }
        if (isAdvanceSearch === true && minPriceText !== undefined && minPriceText !== null && minPriceText !== "") {
            filter.minPrice = { gte: parseInt(minPriceText, 10) };
        }
        if (isAdvanceSearch === true && maxPriceText !== undefined && maxPriceText !== null && maxPriceText !== "") {
            filter.maxPrice = { lte: parseInt(maxPriceText, 10) };
        }
        if (sortConfig?.key && sortConfig?.direction) {
            const sort = { [key]: direction };
            const activedata = await refetch({
                take: setdatacount,
                skip: 1,
                filter,
                sort
            });
            setInActive(activedata?.data?.allProducts?.inactiveCount);
            setActive(activedata?.data?.allProducts?.activeCount);
            setTotalRecordsNew(activedata?.data?.allProducts?.totalCount);
            setPrdData(activedata?.data?.allProducts?.items);
        } else {
            const activedata = await refetch({
                take: setdatacount,
                skip: 1,
                filter,
                sort: { modifiedDateUtc: "DESC" }
            });
            setInActive(activedata?.data?.allProducts?.inactiveCount);
            setActive(activedata?.data?.allProducts?.activeCount);
            setTotalRecordsNew(activedata?.data?.allProducts?.totalCount);
            setPrdData(activedata?.data?.allProducts?.items);
        }
        setcommonloading(false);
    };

    const { refetch: grefetch } = useQuery(useproductDataForGoogleFeed, {
        variables: { isOptimizeCode: true }
    });
    const toggleGooglefeed = () => {
        setcommonloading(true);
        setTimeout(async () => {
            const googleresp = await grefetch({
                variables: { isOptimizeCode: true }
            });
            setcommonloading(googleresp.loading);
            if (googleresp?.data?.productDataForGoogleFeed?.statuscode === 200) {
                PopupV3({
                    content: googleresp?.data?.productDataForGoogleFeed?.message,
                    type: "Success",
                    title: "Success",
                    classes: "googleFeed-Product",
                    actions: [
                        {
                            text: "Ok",
                            classes: "ok",
                            dismiss: true
                        }
                    ]
                });
            } else {
                PopupV3({
                    content: googleresp?.data?.productDataForGoogleFeed?.message,
                    type: "Error",
                    title: "Error",
                    classes: "googleFeed-Product",
                    actions: [
                        {
                            text: "Ok",
                            classes: "ok",
                            dismiss: true
                        }
                    ]
                });
            }
        }, 500);
    };
    const slectedCheckBoxFromLocal = JSON.parse(localStorage.getItem("selectedCheckboxes"));
    useEffect(() => {
        localStorage.removeItem("selectedCheckboxes");
    }, []);

    return (
        <section className="midContent">
            <div className="content-container ProductIndex" id="jumbo-header">
                <div className="search-bar">
                    <div className="search-bar-controls">
                        <div className={`select-wrapper ${showAction ? "width-30" : ""}`} id={sortConfig}>
                            {showAction && (
                                <Dropdown className="clsProductListing_Action">
                                    <Dropdown.Toggle variant="Default" id="action-dropdown-basic" className="sortby-dropdown-toggle mr-3">
                                        {selectedAction}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => handleChangeAction("Delete on Sage")}>{resources?.["ProductIndex.DeleteonSage"]}</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleChangeAction("Save on Sage")}>{resources?.["ProductIndex.SaveonSage"]}</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}

                            <Dropdown className="clsProductListing_AllStatus">
                                <Dropdown.Toggle variant="Default" id="status-dropdown-basic" className="sortby-dropdown-toggle mr-3">
                                    {selectedStatus || "Status"}{" "}
                                    {(() => {
                                        if (selectedStatus === "All") return totalRecordNew;
                                        if (selectedStatus === "Active") return active;
                                        if (selectedStatus === "Inactive") return inactive;
                                        return "";
                                    })()}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleChangeStatus("All")}>
                                        {resources?.["ProductIndex.All"]} ({totalRecordNew})
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleChangeStatus("Active")}>
                                        {resources?.["ProductIndex.Active"]} ({active})
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleChangeStatus("Inactive")}>
                                        {resources?.["ProductIndex.InActive"]} ({inactive})
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown className="clsProductListing_AllSorting">
                                <Dropdown.Toggle variant="Default" id="dropdown-basic" className="sortby-dropdown-toggle listingSotyBy">
                                    {selectedSortOption || "Sort By"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "productName", columnName: "Products", direction: "ASC", displayoption: "Name: A-Z" })}>{resources?.["ProductIndex.ProductNameAsc"]}</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "productName", columnName: "Products", direction: "DESC", displayoption: "Name: Z-A" })}>{resources?.["ProductIndex.ProductNameDesc"]}</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "modifiedDateUtc", columnName: "Last Modified", direction: "DESC", displayoption: "Date: Newest to Oldest" })}>{resources?.["ProductIndex.DateDesc"]}</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "modifiedDateUtc", columnName: "Last Modified", direction: "ASC", displayoption: "Date: Oldest to Newest" })}>{resources?.["ProductIndex.DateAsc"]}</Dropdown.Item>

                                    <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "price", columnName: "Price", direction: "DESC", displayoption: "Price: Hight to Low" })}>{resources?.["ProductIndex.PriceDesc"]}</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "price", columnName: "Price", direction: "ASC", displayoption: "Price: Low to High" })}>{resources?.["ProductIndex.PriceAsc"]}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="header-second">
                            <div className="input-wrapper clsProduct_SearchNew">
                                <svg className="search" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.587 15.9628L12.585 12.0518C13.7449 10.6907 14.3234 8.9448 14.1999 7.17741C14.0764 5.41002 13.2606 3.75719 11.9222 2.56275C10.5838 1.36831 8.82572 0.724224 7.0138 0.764474C5.20189 0.804724 3.4756 1.52621 2.19405 2.77886C0.912501 4.0315 0.174362 5.71885 0.133183 7.48989C0.0920041 9.26093 0.750957 10.9793 1.97296 12.2876C3.19497 13.5958 4.88594 14.3932 6.69411 14.5139C8.50229 14.6346 10.2884 14.0692 11.681 12.9354L15.6822 16.8472C15.7416 16.9052 15.8122 16.9513 15.8898 16.9827C15.9674 17.0141 16.0506 17.0303 16.1346 17.0303C16.2186 17.0303 16.3018 17.0141 16.3794 16.9827C16.4571 16.9513 16.5276 16.9052 16.587 16.8472C16.6464 16.7891 16.6935 16.7201 16.7257 16.6443C16.7578 16.5684 16.7744 16.4871 16.7744 16.405C16.7744 16.3228 16.7578 16.2415 16.7257 16.1657C16.6935 16.0898 16.6464 16.0208 16.587 15.9628ZM1.42788 7.65496C1.42788 6.54244 1.76539 5.45491 2.39774 4.52988C3.03008 3.60485 3.92886 2.88388 4.98041 2.45814C6.03197 2.0324 7.18907 1.921 8.30539 2.13805C9.42171 2.35509 10.4471 2.89082 11.2519 3.67749C12.0568 4.46416 12.6049 5.46644 12.8269 6.55758C13.049 7.64872 12.935 8.77972 12.4994 9.80756C12.0639 10.8354 11.3263 11.7139 10.3799 12.332C9.43351 12.9501 8.32088 13.28 7.18268 13.28C5.65693 13.2783 4.19416 12.6851 3.11529 11.6306C2.03642 10.5761 1.42957 9.1463 1.42788 7.65496Z"
                                        fill="#334F5B"
                                    />
                                </svg>
                                <input className="clsProductListing_SearchProduct" type="search" aria-label="Search" onKeyDown={handleKeyDown} onChange={onsearchchangehandler} value={search} placeholder={resources?.["ProductIndex.SearchProduct"]} />
                                {search && <span onClick={searchCloseHandle} className="icon-close_small searchcloseicon" />}
                                {isLoading && <span className="loadercircle setloader" />}
                            </div>
                            <div className="search-bar-buttons ">
                                <button type="button" className="btn btn_search clsProduct_SearchButtonNew clsProductListing_AdvanceSearch" onClick={toggleAdvanceSearchHtmlVisibility}>
                                    {resources?.["ProductIndex.AdvanceSearch"]}
                                </button>
                                <button type="button" onClick={handleReset} className="btn btn_reset clsProduct_ResetButtonNew clsProductListing_Reset">
                                    {resources?.["ProductIndex.Reset"]}
                                </button>
                                <button type="button" className="btn buttonwithbutton btn_search clsProductListing_Export" onClick={ExportProduct}>
                                    <span className="icon-upload" /> {resources?.["ProductIndex.Export"]}
                                </button>
                                <div className="btn-group addproductbutton clsProductListing_AddProduct" ref={dropdownRef}>
                                    <button onClick={AddNewProduct} type="button" className="btn btn_create clsProduct_CreateNew dropdown-toggle">
                                        {resources?.["ProductIndex.AddProduct"]}
                                    </button>
                                    {dropdownVisible && (
                                        <div className="dropdown-menu">
                                            <Link className="menulink" onClick={SingleProduct} to="/">
                                                {resources?.["ProductIndex.AddSingleProduct"]}
                                            </Link>
                                            <Link to="/" className="menulink" onClick={ExportProduct}>
                                                {resources?.["ProductIndex.AddBulkProduct"]}
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clsAdvanceSearch" style={{ display: isAdvanceSearchHtml ? "flex" : "none" }}>
                        <div className="datainputs">
                            <div ref={Collectionref} className="multi-select-dropdown collection-dropdown gridview clsCollections">
                                <div className="dropdown">
                                    <button onClick={toggleSearchDropdownVisibility} type="button" className="dropdown-btn">
                                        {resources?.["ProductIndex.SelectCollectionsfilter"]}
                                    </button>
                                    <div className="dropdown-content" style={{ display: isSearchDropdownVisible ? "block" : "none" }}>
                                        <input aria-labelledby="Collection" style={{ width: "100%" }} type="text" placeholder="Search Collection Name" value={searchText} onChange={handleSearchChangeEvt} className="search-input" />
                                        {searchCollectionTypes?.map((type) => {
                                            const filteredCollections = (searchText ? searchFilter : collectiondata)?.filter((collection) => collection?.collectionType === type);
                                            if (!filteredCollections?.length) {
                                                return null;
                                            }
                                            return (
                                                <div key={type} className="typename">
                                                    <strong>{type}</strong>
                                                    {(searchText ? searchFilter : collectiondata)
                                                        ?.filter((collection) => collection?.collectionType === type)
                                                        ?.map((colitem) => (
                                                            <label title={colitem?.collectionName} htmlFor={`advance_${colitem?.collectionGuid}`} key={colitem?.collectionGuid} className="dropdown-item">
                                                                <input aria-labelledby="selectCollection" type="checkbox" id={`advance_${colitem?.collectionGuid}`} value={colitem?.collectionGuid} checked={selectedSearchCollections?.includes(colitem?.collectionGuid)} onChange={getSelectedSearchColletion} />
                                                                {colitem?.collectionName}
                                                            </label>
                                                        ))}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {(colorsFilter?.length > 0 ? colorsFilter : mastercolors) && (
                                <div ref={colorref} className="multi-select-dropdown collection-dropdown gridview clsColors">
                                    <div className="dropdown">
                                        <button onClick={toggleMasterColorsDropdownVisibility} type="button" className="dropdown-btn">
                                            {resources?.["ProductIndex.SelectColorfilter"]}
                                        </button>
                                        <div className="dropdown-content" style={{ display: isMasterColorsDropdownVisible ? "block" : "none" }}>
                                            <input aria-labelledby="colorname" style={{ width: "100%" }} type="text" placeholder="Search Color Name" value={masterColorText} onChange={handleMasterColorsChangeEvt} className="search-input" />

                                            <div className="typename">
                                                {(masterColorText ? colorsFilter : mastercolors)?.map((colitem) => (
                                                    <label title={colitem?.colorName} htmlFor={colitem?.masterColorGuid} key={colitem?.masterColorGuid} className="dropdown-item">
                                                        <input aria-labelledby="masterColorGuid" type="checkbox" id={colitem?.masterColorGuid} value={colitem?.masterColorGuid} checked={selectedSearchMasterColors?.includes(colitem?.masterColorGuid)} onChange={getSelectedMasterColors} />
                                                        {colitem?.colorName}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="pricingdatamode">
                                <div className="clsMinPricing">
                                    <div className="floating-label-input">
                                        <input aria-labelledby="minPrice" type="text" className="minPrice input" maxLength={8} pattern="[0-9]*" onInput={handleMinPriceChange.bind(this)} value={minPriceText} id="minprice" placeholder="$0" />
                                        <label className="label" htmlFor="minprice">
                                            {resources?.["ProductIndex.Pricingfilter"]}
                                        </label>
                                    </div>
                                </div>
                                <div className="clsDashPricing"> - </div>
                                <div className="clsMaxPricing">
                                    <div className="floating-label-input">
                                        <input aria-labelledby="maxPrice" type="text" className="maxPrice input" maxLength={8} pattern="[0-9]*" onInput={handleMaxPriceChange.bind(this)} value={maxPriceText} id="maxprice" placeholder="$1000" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="clsAdvanceSearchButtons">
                            <button onClick={advanceSearchSubmit} type="button" className="btn btn_create clsProduct_CreateNew">
                                {resources?.["ProductIndex.AdvanceSubmit"]}
                            </button>
                            &nbsp;
                            <button onClick={advanceSearchCancel} type="button" className="btn btn_search clsProduct_SearchButtonNew">
                                {resources?.["ProductIndex.AdvanceCancel"]}
                            </button>
                        </div>
                        <div className="updateddatavalues dropdown-content">
                            {selectedSearchCollections.length > 0 && (
                                <div className="colsel">
                                    <span>
                                        <strong>{resources?.["ProductIndex.advanceselectedcollection"]}</strong>
                                    </span>
                                    <div className="selected-labels">
                                        {selectedSearchCollections?.map((collectionGuid) => {
                                            const collection = collectiondata?.find((col) => col?.collectionGuid === collectionGuid);
                                            return (
                                                <span key={collectionGuid} className="label">
                                                    {collection?.collectionName}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            {selectedSearchMasterColors?.length > 0 && (
                                <div className="colorsel">
                                    <span>
                                        <strong>{resources?.["ProductIndex.advanceselectedcolor"]} </strong>
                                    </span>
                                    <div className="selected-labels">
                                        {selectedSearchMasterColors?.map((masterColorGuid) => {
                                            const mastercolor = mastercolors?.find((col) => col?.masterColorGuid === masterColorGuid);
                                            return (
                                                <span key={masterColorGuid} className="label">
                                                    {mastercolor?.colorName}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="cards-container mb-4 ml-3 mr-3 ml-lg-4 mr-lg-4">
                        <div className="flyer-info d-flex justify-content-between align-items-center">
                            <h5 className={resltcount ? "" : "d-none"}>
                                Showing 1- {prdData?.length} of {resltcount} Product(s)
                            </h5>

                            <div className={resltcount ? "view-toggle clsProduct_GridViewNew " : "d-none"}>
                                {resources?.["Google Merchant Centre"] === "True" && (
                                    <button onClick={toggleGooglefeed} className="btn btn-submit px-3 btn_googlefeed clsProduct_GoogleFeed clsProductListing_GoogleFeed" type="button">
                                        {resources?.["ProductIndex.GoogleFeed"]}
                                    </button>
                                )}
                                <button type="button" onClick={() => setView("grid")} className={view === "grid" ? "active" : ""}>
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="clsProductListing_GridView">
                                        <path d="M4 4.71289H8V8.71289H4V4.71289ZM10 4.71289H14V8.71289H10V4.71289ZM16 4.71289H20V8.71289H16V4.71289ZM4 10.7129H8V14.7129H4V10.7129ZM10 10.7129H14V14.7129H10V10.7129ZM16 10.7129H20V14.7129H16V10.7129ZM4 16.7129H8V20.7129H4V16.7129ZM10 16.7129H14V20.7129H10V16.7129ZM16 16.7129H20V20.7129H16V16.7129Z" fill="#667B84" />
                                    </svg>
                                </button>
                                <button type="button" onClick={() => setView("list")} className={view === "list" ? "active" : ""}>
                                    <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="clsProductListing_ListView">
                                        <path d="M5 1.71289H16M5 7.71289H16M5 13.7129H16M1 1.71289V1.72289M1 7.71289V7.72289M1 13.7129V13.7229" stroke="#667B84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {(loading || commonloading || isSortingChange) && <Loader />}
                    {!loading && !commonloading && prdData && prdData?.length > 0 && (
                        <div id="constrained-container">
                            <div className={view === "grid" ? "grid-view" : "list-view table-structure"}>
                                <Product slectedCheckBoxFromLocal={slectedCheckBoxFromLocal} resltcount={resltcount} showAction={showAction} view={view} handleReset={handleReset} data={prdData} selectedCheckboxes={selectedCheckboxes} handleCheckboxChange={handleCheckboxChange} columnName={columnNameVal} reversorting={reversorting} collectionsdata={collectiondata} setupdatecount={updatecount} selectedStatus={selectedStatus} setTotalRecordsNew={setTotalRecordsNew} setActive={setActive} setInActive={setInActive} serachkey={search} ref={productRef} isAdvanceSearch={isAdvanceSearch} minPriceText={minPriceText} maxPriceText={maxPriceText} selectedMasterColors={updateMasterColors} selectedColl={updateCollection} sortConfig={sortConfig} setSortConfig={setSortConfig} setdeletedata={setdeletedata} activestatus={activestatus} />
                            </div>
                        </div>
                    )}
                    {/* {isSortingChange && <Loader />} */}
                    {!isSortingChange && !loading && !commonloading && (!prdData || prdData?.length === 0) && <h5 className="nodata">{foundproduct}</h5>}
                </div>
            </div>
        </section>
    );
};
export default ProductIndex;
