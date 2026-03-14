import { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useQueryGetAllImprintMethods, DeleteImprintMethodsAPI, UpdateImprintMethodsAPI } from "common/components/graphQL/queries/imprintmethod/imprint-methods";
import { WEBSITE_GUID } from "common/utils/vars";
import Loader from "~/components/shared/Loader";
import { useQueryGetGloblesetting } from "common/components/graphQL/queries/Sales/useQueryGetGloblesetting";
import ShowingResults from "../../components/shared/DataTable/ShowingResults";
import Datatable from "../../components/shared/DataTable/Datatable";
import Pagination from "../../components/shared/DataTable/Pagination";
import { PopupV3 } from "../../helpers/PopupV3";
import PageContainer from "../../hoc/PageContainer";
import "../../styles/pages/eventThemes/eventThemes.scss";
import EditImprintMethod from "./editImprintMethod";
import AddImprintMethod from "./addImprintMethod";

const useDebouncedValue = (inputValue, delay) => {
    const [debouncedValue, setDebouncedValue] = useState({ value: inputValue });
    const latestValue = useRef(inputValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            latestValue.current = inputValue;
            setDebouncedValue({ value: inputValue });
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, delay]);

    return debouncedValue;
};

const ImprintMethodListing = () => {
    // sortby dropdown variables
    const [DeleteEventThemeData] = useMutation(DeleteImprintMethodsAPI);
    const [EnableDisableEventThemeData] = useMutation(UpdateImprintMethodsAPI);
    const dropdownRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [sortDirection, setSortDirection] = useState("ASC");
    const [sortConfig, setSortConfig] = useState({ key: "Name", direction: sortDirection }); // this is table heading sorting
    // Pagination variables
    const [PagePerRecord] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecord, setTotalRecords] = useState(10); // setTotalRecords
    // const [totalPages,setTotalPages] = Math.ceil(totalRecord / PagePerRecord);
    const [totalPages, setTotalPages] = useState(10);
    const [showEdit, setShowEdit] = useState(false);
    // const [loading, setLaoding] = useState(false);
    const [editThemeData, setEditThemeData] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    const [eventThemesData, setEventThemesData] = useState([]);
    const [eventThemesDataFromAPI, setEventThemesDataFromAPI] = useState([]);
    const [queryEventSearch, setQueryEventSearch] = useState(null);
    const [queryEventOrder, setQueryEventOrder] = useState(null);
    const [selectedSortLabel, setSelectedSortLabel] = useState("Name A-Z");
    const [columns, setColumns] = useState([]);
    const [columnAlignments, setColumnAlignments] = useState({});
    // const [isASIImprintMethodType, setIsASIImprintMethodType] = useState(null);
    const {
        data: eventData,
        refetch,
        loading
    } = useQuery(useQueryGetAllImprintMethods, {
        variables: {
            pageno: currentPage,
            pagesize: PagePerRecord,
            where: queryEventSearch,
            order: queryEventOrder
        }
    });
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchTerm = useDebouncedValue(searchValue, 1000);
    const { data: globalSettings } = useQuery(useQueryGetGloblesetting, {
        variables: {
            pageName: "ImprintMethods"
        }
    });

    useEffect(() => {
        if (globalSettings !== undefined) {
            // const asiFeatures = globalSettings.getResourcesGlobalSetting.data.resources;
            // const isASIFeatures = asiFeatures.find((asi) => asi.key === "ASIFeatures").value;
            // setIsASIImprintMethodType(isASIFeatures === "True");
            setColumns(["Name", "Status", "Action"]);
            setColumnAlignments({
                Name: "clsImprintMethod_Name text-left noTooltip",
                Status: "clsImprintMethod_Status text-left",
                Action: "clsImprintMethod_Action text-no-ellipsis noTooltip"
            });
            // if (isASIFeatures === "True") {
            //     setColumns(["Name", "ASI Imprint Method Type", "Status", "Action"]);
            //     setColumnAlignments({
            //         Name: "clsImprintMethod_Name text-left noTooltip",
            //         "ASI Imprint Method Type": "clsImprintMethod_ASIImprintMethodType text-left noTooltip",
            //         Status: "clsImprintMethod_Status text-left",
            //         Action: "clsImprintMethod_Action text-no-ellipsis noTooltip"
            //     });
            // } else {
            //     setColumns(["Name", "Status", "Action"]);
            //     setColumnAlignments({
            //         Name: "clsImprintMethod_Name text-left noTooltip",
            //         Status: "clsImprintMethod_Status text-left",
            //         Action: "clsImprintMethod_Action text-no-ellipsis noTooltip"
            //     });
            // }
        }
    }, [globalSettings]);

    const handleDropdownSort = (columnName) => {
        const sortdirection = sortConfig.direction === "ASC" ? "DESC" : "ASC";
        if (columnName.columnName === "Name A-Z") {
            setQueryEventOrder({ imprintMethodName: "ASC" });
        } else if (columnName.columnName === "Name Z-A") {
            setQueryEventOrder({ imprintMethodName: "DESC" });
        }
        if (columnName.dbColname === "Active") {
            setQueryEventOrder({ isactive: "DESC" });
        } else if (columnName.dbColname === "Inactive") {
            setQueryEventOrder({ isactive: "ASC" });
        }
        setCurrentPage(1);
        setSortDirection(sortdirection);
        setSortConfig({ key: columnName.columnName, direction: sortdirection });
        setSelectedSortLabel(columnName.columnName); // Set the selected sort label
        setIsDropdownOpen(false); // Hide the dropdown when an option is selected
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (eventData !== undefined) {
            setEventThemesData([]);
            setEventThemesDataFromAPI([]);
            eventData?.imprintMethods?.items?.forEach((element) => {
                const objectArray = [
                    { rowValue: element.imprintMethodName, isLink: true, linkValue: "/v2/EventThemes=ABC" },
                    element.isActive === null || !element.isActive ? "Inactive" : "Active",
                    [
                        { label: "Edit", icon: "icon icon-edit", id: element.imprintMethodGuid },
                        { label: "Delete", icon: "icon icon-trash-2", id: element.imprintMethodGuid }
                    ]
                ];
                setEventThemesData((prevItems) => [...prevItems, objectArray]);
                // if (isASIImprintMethodType) {
                //     const objectArray = [
                //         { rowValue: element.imprintMethodName, isLink: true, linkValue: "/v2/EventThemes=ABC" },
                //         { rowValue: element.asiImprintMethodType, isLink: true, linkValue: "/v2/EventThemes=ABC" },
                //         element.isActive === null || !element.isActive ? "Inactive" : "Active",
                //         [
                //             { label: "Edit", icon: "icon icon-edit", id: element.imprintMethodGuid },
                //             { label: "Delete", icon: "icon icon-trash-2", id: element.imprintMethodGuid }
                //         ]
                //     ];
                //     setEventThemesData((prevItems) => [...prevItems, objectArray]);
                // } else {
                //     const objectArray = [
                //         { rowValue: element.imprintMethodName, isLink: true, linkValue: "/v2/EventThemes=ABC" },
                //         element.isActive === null || !element.isActive ? "Inactive" : "Active",
                //         [
                //             { label: "Edit", icon: "icon icon-edit", id: element.imprintMethodGuid },
                //             { label: "Delete", icon: "icon icon-trash-2", id: element.imprintMethodGuid }
                //         ]
                //     ];
                //     setEventThemesData((prevItems) => [...prevItems, objectArray]);
                // }
            });
            const tPages = Math.ceil(eventData.imprintMethods.totalCount / PagePerRecord);
            setTotalPages(tPages);
            setTotalRecords(eventData.imprintMethods.totalCount);
            setEventThemesDataFromAPI(eventData?.imprintMethods?.items);
        }
    }, [eventData]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        refetch();
    }, [currentPage]);

    // to add new theme
    const AddTheme = () => {
        setShowAdd(true);
    };
    const RemoveTheme = (Id) => {
        DeleteEventThemeData({
            variables: {
                imprintMethodguid: Id
            }
        }).then((data) => {
            if (data.data.deleteImprintMethods.statuscode === 200) {
                setQueryEventSearch(null);
                setEventThemesData([]);
                setSearchValue("");
                setCurrentPage(1);
                refetch();
                PopupV3({
                    content: "<p class=text-center>Imprint method has been deleted successfully.</p>",
                    type: "Success",
                    classes: "EventThemePopup GAUpdateTrack_Add",
                    actions: [
                        {
                            classes: "btn-info GAUpdateTrack_Add",
                            dismiss: true,
                            text: "Ok",
                            do: () => {}
                        }
                    ]
                });
            } else {
                PopupV3({
                    content: `<p class=text-center>${data.data.deleteImprintMethods.message === "" ? "You can't delete as this imprint method as this is already assigned to the products. please un-assign and try again." : data.data.deleteImprintMethods.message}</p>`,
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
    // code for action events of table action button
    const actions = {
        EditRec: (id) => {
            // Set the data for the edit popup based on the ID
            const themeData = eventThemesData.find((item) => item[2].some((action) => action.id === id)); // Find the theme data
            setEditThemeData(themeData);
            setShowEdit(true);
        },
        DeleteRec: (id) => {
            PopupV3({
                content: "<p class=text-center>Are you sure you want to continue?</p>",
                type: "Confirm", // Assuming you have different types like 'warning', 'info', etc.
                title: "Confirm",
                classes: "EventThemePopup GAUpdateTrack_Delete",
                actions: [
                    {
                        classes: "btn-info GAUpdateTrack_Delete",
                        dismiss: true,
                        text: "Yes",
                        do: () => {
                            RemoveTheme(id);
                        }
                    },
                    {
                        classes: "btn-cancel",
                        text: "No",
                        dismiss: true
                    }
                ]
            });
        }
    };

    const closePopup = () => {
        setCurrentPage(1);
        if (showEdit) {
            refetch();
        }
        if (showAdd) {
            refetch();
        }
        setShowEdit(false);
        setShowAdd(false);
    };

    const searchOnChange = (search) => {
        if (search !== " ") {
            setSearchValue(search.target.value.replace(/^\s+/, ""));
        }
    };

    useEffect(() => {
        if (searchValue === "") {
            setQueryEventSearch(null);
        } else {
            setQueryEventSearch({ imprintMethodName: { contain: searchValue } });
            setCurrentPage(1);
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        refetch();
    }, [queryEventSearch || queryEventOrder]);

    const onSearchClose = () => {
        setQueryEventSearch(null);
        setSearchValue("");
    };

    // const onHeaderClick = (event) => {
    //     const sortdirection = sortConfig.direction === "ASC" ? "DESC" : "ASC";
    //     setSortDirection(sortdirection);
    //     setSortConfig({ key: event, direction: sortdirection });
    //     const sortedData = [...eventThemesData].sort((a, b) => {
    //         const rowValueA = a[0].rowValue.toLowerCase();
    //         const rowValueB = b[0].rowValue.toLowerCase();
    //         if (sortdirection === "ASC") {
    //             return rowValueA.localeCompare(rowValueB);
    //         }
    //         return rowValueB.localeCompare(rowValueA);
    //     });
    //     setEventThemesData(sortedData);
    // };

    const onActiveToggleChange = (activeChange) => {
        const eventRowIndex = eventThemesData.findIndex((evtD) => evtD[0].rowValue === activeChange.imprintMethodName);
        const updateEventTheme = [...eventThemesData];
        updateEventTheme[eventRowIndex][1] = updateEventTheme[eventRowIndex][1] === "Active" ? "Inactive" : "Active";
        EnableDisableEventThemeData({
            variables: {
                imprintMethodName: activeChange.imprintMethodName,
                languageGuid: activeChange.languageGuid,
                websiteGuid: WEBSITE_GUID,
                imprintMethodGuid: activeChange.imprintMethodGuid,
                isactive: updateEventTheme[eventRowIndex][1] === "Active"
            }
        }).then((data) => {
            if (data.data.addUpdateImprintMethod.statuscode === 200) {
                PopupV3({
                    content: `<p class=text-center>Imprint method has been ${updateEventTheme[eventRowIndex][1] === "Active" ? "activated" : "inactivated"} successfully.</p>`,
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
                setEventThemesData(updateEventTheme);
            } else {
                PopupV3({
                    content: `<p class=text-center>${data.data.addUpdateImprintMethod.message === "" ? "You can't update as this imprint method as this is already assigned to the products. Please un-assign and try again." : data.data.addUpdateImprintMethod.message}</p>`,
                    type: "Warning",
                    title: "Alert",
                    classes: "EventThemePopup",
                    actions: [
                        {
                            classes: "btn-info",
                            dismiss: true,
                            text: "Ok",
                            do: () => {
                                updateEventTheme[eventRowIndex][1] = updateEventTheme[eventRowIndex][1] === "Active" ? "Inactive" : "Active";
                                setEventThemesData(updateEventTheme);
                            }
                        }
                    ]
                });
            }
        });
    };

    // const resetEventTheme = () => {
    //     setQueryEventSearch(null);
    //     setSearchValue("");
    //     setCurrentPage(1);
    //     setQueryEventOrder(null);
    //     setSelectedSortLabel("All");
    // };

    return (
        <section className="body-container midContent">
            <PageContainer fluid classes="page-container eventthemes">
                <section className="search-bar mb-4">
                    <div className="search-bar-controls">
                        <div className="ShowResultDiv ml-3 mr-3 ml-lg-4 mr-lg-4">{eventData !== undefined && <ShowingResults pageRecords={PagePerRecord < totalRecord ? PagePerRecord : totalRecord} totalRecords={totalRecord} currentPage={currentPage} pageName="Imprint Method" />}</div>
                        <div className="searchActionDropdown-wrap ml-3 mr-3 ml-lg-4 mr-lg-4">
                            {/* <div className="resetIcon" onClick={resetEventTheme}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#405660" height="18px" width="18px" version="1.1" viewBox="0 0 383.748 383.748" xmlSpace="preserve"><g><path d="M62.772,95.042C90.904,54.899,137.496,30,187.343,30c83.743,0,151.874,68.13,151.874,151.874h30 C369.217,81.588,287.629,0,187.343,0c-35.038,0-69.061,9.989-98.391,28.888C70.368,40.862,54.245,56.032,41.221,73.593 L2.081,34.641v113.365h113.91L62.772,95.042z" /><path d="M381.667,235.742h-113.91l53.219,52.965c-28.132,40.142-74.724,65.042-124.571,65.042 c-83.744,0-151.874-68.13-151.874-151.874h-30c0,100.286,81.588,181.874,181.874,181.874c35.038,0,69.062-9.989,98.391-28.888 c18.584-11.975,34.707-27.145,47.731-44.706l39.139,38.952V235.742z" /></g></svg>
                    </div> */}
                            <div className="input-wrapper searchField mr-2">
                                <svg className="search" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.587 15.9628L12.585 12.0518C13.7449 10.6907 14.3234 8.9448 14.1999 7.17741C14.0764 5.41002 13.2606 3.75719 11.9222 2.56275C10.5838 1.36831 8.82572 0.724224 7.0138 0.764474C5.20189 0.804724 3.4756 1.52621 2.19405 2.77886C0.912501 4.0315 0.174362 5.71885 0.133183 7.48989C0.0920041 9.26093 0.750957 10.9793 1.97296 12.2876C3.19497 13.5958 4.88594 14.3932 6.69411 14.5139C8.50229 14.6346 10.2884 14.0692 11.681 12.9354L15.6822 16.8472C15.7416 16.9052 15.8122 16.9513 15.8898 16.9827C15.9674 17.0141 16.0506 17.0303 16.1346 17.0303C16.2186 17.0303 16.3018 17.0141 16.3794 16.9827C16.4571 16.9513 16.5276 16.9052 16.587 16.8472C16.6464 16.7891 16.6935 16.7201 16.7257 16.6443C16.7578 16.5684 16.7744 16.4871 16.7744 16.405C16.7744 16.3228 16.7578 16.2415 16.7257 16.1657C16.6935 16.0898 16.6464 16.0208 16.587 15.9628ZM1.42788 7.65496C1.42788 6.54244 1.76539 5.45491 2.39774 4.52988C3.03008 3.60485 3.92886 2.88388 4.98041 2.45814C6.03197 2.0324 7.18907 1.921 8.30539 2.13805C9.42171 2.35509 10.4471 2.89082 11.2519 3.67749C12.0568 4.46416 12.6049 5.46644 12.8269 6.55758C13.049 7.64872 12.935 8.77972 12.4994 9.80756C12.0639 10.8354 11.3263 11.7139 10.3799 12.332C9.43351 12.9501 8.32088 13.28 7.18268 13.28C5.65693 13.2783 4.19416 12.6851 3.11529 11.6306C2.03642 10.5761 1.42957 9.1463 1.42788 7.65496Z"
                                        fill="#334F5B"
                                    />
                                </svg>
                                <input type="search" aria-label="Search" onChange={searchOnChange} className="form-control clsImprintMethod_Search" placeholder="Search..." value={searchValue} />

                                <button className="clear-button clsImprintMethod_Reset" type="button" onClick={onSearchClose}>
                                    &times;
                                </button>
                            </div>
                            <div className="dropdown mr-2" ref={dropdownRef}>
                                <button className="btn sortby-dropdown-toggle" type="button" id="dropdownMenuSortby" onClick={toggleDropdown} data-toggle="dropdown" aria-haspopup="true" aria-expanded={isDropdownOpen}>
                                    <i className="icon icon-bx_sort-up" /> {`Sort by : ${selectedSortLabel}`}
                                </button>
                                <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`} aria-labelledby="dropdownMenuSortby">
                                    <span className="dropdown-item" onClick={() => handleDropdownSort({ dbColname: "Name", columnName: "Name A-Z" })}>
                                        Name A-Z
                                    </span>
                                    <span className="dropdown-item" onClick={() => handleDropdownSort({ dbColname: "Name", columnName: "Name Z-A" })}>
                                        Name Z-A
                                    </span>
                                    <span className="dropdown-item" href="#" onClick={() => handleDropdownSort({ dbColname: "Active", columnName: "Active" })}>
                                        Active
                                    </span>
                                    <span className="dropdown-item" href="#" onClick={() => handleDropdownSort({ dbColname: "Inactive", columnName: "Inactive" })}>
                                        Inactive
                                    </span>
                                </div>
                            </div>
                            <button className="btn btn_import mr-2 d-none" type="button">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.25 6.65625H0.75V5.15625H5.25V0.65625H6.75V5.15625H11.25V6.65625H6.75V11.1562H5.25V6.65625Z" fill="white" />
                                </svg>
                                &nbsp; Export
                            </button>
                            <button className="btn btn_export mr-2 d-none" type="button">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.25 6.65625H0.75V5.15625H5.25V0.65625H6.75V5.15625H11.25V6.65625H6.75V11.1562H5.25V6.65625Z" fill="white" />
                                </svg>
                                &nbsp; Export
                            </button>
                            <button className="btn btn_create clsImprintMethod_Create" type="button" onClick={() => AddTheme()}>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.25 6.65625H0.75V5.15625H5.25V0.65625H6.75V5.15625H11.25V6.65625H6.75V11.1562H5.25V6.65625Z" fill="white" />
                                </svg>
                                &nbsp; Create Imprint Method
                            </button>
                        </div>
                    </div>
                </section>
                <section className="listing-table mb-4 ml-3 mr-3 ml-lg-4 mr-lg-4">
                    <Datatable
                        tableId="EventThemes"
                        data={eventThemesData}
                        actions={actions}
                        sortConfig={sortConfig}
                        columnAlignments={columnAlignments}
                        columns={columns}
                        loading={loading}
                        eventThemesDataFromAPI={eventThemesDataFromAPI}
                        // onHeaderClick={onHeaderClick}
                        onActiveToggleChange={onActiveToggleChange}
                        norecordsmsg="No records available"
                        tourClass="clsImprintMethod"
                        actionButtonStyle="inline" // You can change to "dropdown" for dropdown action buttons
                    />
                    {loading && <Loader />}
                </section>
                {eventData !== undefined && (
                    <section className="mb-4 ml-3 mr-3 ml-lg-4 mr-lg-4">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} tourClass="clsImprintMethod" />
                    </section>
                )}
                {showEdit && <EditImprintMethod showPopup={showEdit} closePopup={closePopup} Data={editThemeData} />}
                {showAdd && <AddImprintMethod showPopup={showAdd} closePopup={closePopup} />}
            </PageContainer>
        </section>
    );
};

export default ImprintMethodListing;
