/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useEffect, useState } from "react";
import { useState, useEffect, useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";
// import { Link, useNavigate, useRef } from "react-router";
import { useNavigate } from "react-router-dom";
import { useQueryGetSalesFlyer } from "common/components/graphQL/queries/Sales/useQueryGetSalesFlyer";
import { useMutaionBulkDelete } from "common/components/graphQL/mutations/SalesFlayer/useMutaionBulkDelete";
import { PopupV3 } from "common/utils/PopupV3";
import { WEBSITE_GUID } from "common/utils/vars";
import { Dropdown } from "react-bootstrap";
import moment from "moment";
import Card from "./Card";
import Store from "../../Store/index";
import "../../styles/layout/CardsContainer.css";
import "../../styles/global.css";
import "../../styles/pages/salescard.scss";
import Loader from "../shared/Loader";

const SalesCard = () => {
    const navigate = useNavigate();
    const [inactive, setInActive] = useState("");
    const [active, setActive] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [search, setSearch] = useState("");
    const [columnNameVal, setColumnName] = useState("");
    const [sorting, setsorting] = useState(false);
    const [Data, setData] = useState([]);
    const [alljson, setalljson] = useState([]);
    const [view, setView] = useState("grid");
    const [sortDirection, setSortDirection] = useState("DSC");
    // eslint-disable-next-line no-unused-vars
    const [sortConfig, setSortConfig] = useState({ key: "Created on", direction: sortDirection }); // this is table heading sorting
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [Order] = useState([{ sequence: "ASC" }]);
    const [expcount, setExpCount] = useState(0);
    // const [formdateformat, setformdateformat] = useState("");
    // const [todateformat, settodateformat] = useState("");
    const [SearchData, setSearchData] = useState([]);
    const [reorder, setreorder] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState("Sort By");
    const [resources] = Store.useStore((store) => store?.resources);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRecordNew, setTotalRecordsNew] = useState(0);
    const [reversorting, setReversorting] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [filters, setFilters] = useState({
        skip: currentPage,
        take: 500,
        filter: {
            websiteGuid: {
                eq: WEBSITE_GUID
            }
        },
        order: Order
    });
    const { data, refetch, loading } = useQuery(useQueryGetSalesFlyer, { variables: filters });
    // const { data, refetch } = useQuery(useQueryGetSalesFlyer, {{ variables:filters }
    //     skip: 0,
    //     take: 50,
    //     variables: {
    //         order: Order,
    //         filter: {
    //             websiteGuid: {
    //                 eq: WEBSITE_GUID
    //             }
    //         }
    //     }
    // });
    useEffect(() => {
        if (filters) {
            setreorder(true);
            setColumnName("Sequence");
            refetch(filters);
        }
    }, [filters]);

    useEffect(() => {
        if (data?.salesFlyers?.items) {
            const dataall = data?.salesFlyers?.items || [];
            setalljson(dataall);
            setSearchData(dataall);
            setTotalRecordsNew(data?.salesFlyers?.totalCount);
        }
    }, [data?.salesFlyers?.items]);

    // const totalCount = data?.salesFlyers?.totalCount || 0;
    const validateDate = (startDate, endDate) => {
        const from = new Date(startDate);
        const to = new Date(endDate);

        // Extract year, month, and date
        const fromDateValue = from.getFullYear() * 10000 + (from.getMonth() + 1) * 100 + from.getDate();
        const toDateValue = to.getFullYear() * 10000 + (to.getMonth() + 1) * 100 + to.getDate();

        return fromDateValue <= toDateValue;
    };
    const handlefromdate = (e) => {
        const selectedDate = e.target.value;
        setFromDate(selectedDate);

        if (toDate && !validateDate(selectedDate, toDate)) {
            PopupV3({
                content: "End Date should be greater than Start Date",
                type: "Warning",
                title: "Warning",
                actions: [
                    {
                        dismiss: true,
                        text: "OK"
                    }
                ]
            });
            setFromDate("");
        }
    };

    const handletodate = (e) => {
        const selectedDate = e.target.value;
        setToDate(selectedDate);

        if (fromDate && !validateDate(fromDate, selectedDate)) {
            PopupV3({
                content: "End Date should be greater than Start Date",
                type: "Warning",
                title: "Warning",
                actions: [
                    {
                        dismiss: true,
                        text: "OK"
                    }
                ]
            });
            setToDate("");
        }
    };

    useEffect(() => {
        if (data?.salesFlyers?.items[0]) {
            const InActive = data?.salesFlyers?.items.filter((x) => x.isActive === false).length;
            const Active = data?.salesFlyers?.items.filter((x) => x.isActive === true).length;
            setInActive(InActive);
            setActive(Active);
            let countexp = 0; // Initialize counter

            data.salesFlyers.items.forEach((i) => {
                const date1 = moment(i.expirationDateUTS);
                const date2 = moment();
                if (date1.isBefore(date2, "day")) {
                    countexp += 1;
                }
            });
            setExpCount(countexp);
        }
    }, [data]);

    const handleScroll = (e) => {
        if (Math.round(e.target.scrollTop) === e.target.scrollHeight - e.target.offsetHeight || Math.ceil(e.target.scrollTop) === e.target.scrollHeight - e.target.offsetHeight) {
            setCurrentPage(currentPage + 1);

            setFilters((prevFilters) => ({
                ...prevFilters,
                skip: currentPage
            }));
            refetch({ filters }).then(() => {
                if (data?.salesFlyers?.items) {
                    const dataall = data?.salesFlyers?.items || [];
                    setalljson(dataall);
                    setSearchData(dataall);
                }
            });

            // const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        }
    };

    // const DateChecker = ({ date1, date2 }) => {
    //     // Convert the date strings to Date objects
    //     const [day1, month1, year1] = date1.split("/");
    //     const expirationDate = new Date(year1, month1 - 1, day1);
    //     const [day2, month2, year2] = date2.split("/");
    //     const checkDate = new Date(year2, month2 - 1, day2);

    //     // Check if the date has expired
    //     const isExpired = checkDate > expirationDate;
    //     return isExpired;
    // };
    // const handleenble = (dataall) => {
    //     if (dataall.data?.salesFlyers?.items[0]) {
    //         const InActive = dataall.data?.salesFlyers?.items.filter((x) => x.isActive === false).length;
    //         const Active = dataall.data?.salesFlyers?.items.filter((x) => x.isActive === true).length;
    //         setInActive(InActive);
    //         setActive(Active);
    //         let countexp = 0; // Initialize counter

    //         data.salesFlyers.items.forEach((i) => {
    //             const date1 = new Date(i.expirationDateUTS);
    //             const date2 = new Date();
    //             if (date1 < date2) {
    //                 countexp += 1; // Increment counter
    //             }
    //         });
    //         setExpCount(countexp);
    //         const enbledata = dataall?.data?.salesFlyers?.items || [];
    //         setData(enbledata);
    //     }
    // };
    const TotalData = (filteredItems) => {
        if (filteredItems?.length > 0) {
            const InActive = filteredItems?.filter((x) => x.isActive === false).length;
            const Active = filteredItems?.filter((x) => x.isActive === true).length;
            setInActive(InActive);
            setActive(Active);
            let countexp = 0; // Initialize counter

            filteredItems?.forEach((i) => {
                const date1 = moment(i.expirationDateUTS);
                const date2 = moment();
                if (date1.isBefore(date2, "day")) {
                    countexp += 1;
                }
            });
            setExpCount(countexp);
        }
    };
    const handleSearch = (event) => {
        const searchValue = event.target.value;
        const vm = data?.salesFlyers;
        const filteredItems = vm?.items.filter((item) => item?.flyerName?.toLowerCase().includes(searchValue?.toLowerCase()));
        setData(filteredItems);
        setSearchData(filteredItems);
        setSearch(searchValue);
        TotalData(filteredItems);
        setreorder(false);
        setTotalRecordsNew(filteredItems.length);
    };

    const handleReset = async () => {
        setSearch("");
        setFromDate("");
        setToDate("");
        setSelectedStatus("All");
        setSelectedSortOption("Sort By");
        setreorder(true);
        setSortOrder("asc");
        refetch({
            skip: currentPage,
            take: 500,
            filter: {
                websiteGuid: {
                    eq: WEBSITE_GUID
                }
            },
            order: Order
        }).then((resetdata) => {
            if (resetdata?.data?.salesFlyers?.items !== null && resetdata?.data?.salesFlyers?.items !== undefined) {
                const sortedData = [...resetdata.data.salesFlyers.items].sort((a, b) => a.sequence - b.sequence);
                setData(sortedData);
                setTotalRecordsNew(sortedData?.length);
                TotalData(sortedData);
                setSearchData(sortedData);
            } else {
                const sortedData = [...alljson].sort((a, b) => a.sequence - b.sequence);
                setData(sortedData);
                setTotalRecordsNew(sortedData?.length);
                TotalData(sortedData);
                setSearchData(sortedData);
            }
        });
    };

    const handleAddFlyer = () => {
        navigate("/v2/SalesFlyer/Create");
    };

    const handleDropdownSort = (columnName) => {
        setColumnName(columnName);
        // const direction = sortConfig.direction === "ASC" ? "DESC" : "ASC";

        setSortDirection(columnName.direction);
        // eslint-disable-next-line object-shorthand
        setSortConfig({ key: columnName.columnName, direction: columnName.direction });
        // setFilters({ [columnName.dbColname]: columnName.direction });
        // const resp = await refetch({
        //     order: { [columnName.dbColname]: columnName.direction },
        //     skip: 0,
        //     take: 50,
        //     variables: {}
        // });
        setSelectedSortOption(columnName.displayoption);
        if (Data) {
            setsorting(true);
            // const sortedData = [...Data].sort((a, b) => {
            //     if (columnName.direction === "ASC") {
            //         return a[columnName.columnName] > b[columnName.columnName] ? 1 : -1;
            //     }
            //     if (columnName.direction === "DESC") {
            //         return a[columnName.columnName] < b[columnName.columnName] ? 1 : -1;
            //     }
            //     return 0;
            // });
            const sortedData = [...Data]?.sort((a, b) => {
                if (columnName.dbColname === "flyerName") {
                    if (columnName.direction === "ASC") {
                        return a.flyerName?.localeCompare(b.flyerName);
                    }
                    if (columnName.direction === "DESC") {
                        return b.flyerName?.localeCompare(a.flyerName);
                    }
                } else if (columnName.dbColname === "createdDateUtc") {
                    if (columnName.direction === "DESC") {
                        setReversorting("DESC");
                        setSortOrder(columnName?.direction?.toLowerCase());
                        return a.createdDateUtc?.localeCompare(b.createdDateUtc);
                    }
                    if (columnName.direction === "ASC") {
                        setReversorting("ASC");
                        setSortOrder(columnName?.direction?.toLowerCase());
                        return b.createdDateUtc?.localeCompare(a.createdDateUtc);
                    }
                } else if (columnName.dbColname === "sequence") {
                    setreorder(true);
                    if (columnName.direction === "ASC") {
                        return a.sequence - b.sequence;
                        // return a.sequence.localeCompare(b.sequence);
                    }
                    if (columnName.direction === "DESC") {
                        return b.sequence - a.sequence;
                    }
                }
                return 0;
            });

            setData(sortedData);
        }
    };

    // const toggleOptions = () => {
    //     setShowOptions(!showOptions);
    // };
    useEffect(() => {
        if (!sorting) {
            const dataall = data?.salesFlyers?.items || [];
            if (dataall) {
                setData(dataall);
            }
        }
    }, [data]);

    const handleChangeStatus = (event) => {
        const Allvalue = event.target.value;
        if (Allvalue === "Active") {
            const Active = SearchData.filter((x) => x.isActive === true);
            setData(Active);
            setreorder(false);
        } else if (Allvalue === "Inactive") {
            const InActive = SearchData.filter((x) => x.isActive === false);
            setData(InActive);
            setreorder(false);
        } else if (Allvalue === "Expired") {
            setreorder(false);
            const expdata = [];
            SearchData.forEach((i) => {
                const date1 = moment(i.expirationDateUTS);
                const date2 = moment();
                if (date1.isBefore(date2, "day")) {
                    expdata.push(i);
                }
            });
            setData(expdata);
        } else {
            setreorder(true);
            setData(SearchData);
        }
        setSelectedStatus(event.target.value);
    };

    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const handleCheckboxChange = useCallback((event) => {
        if (event.target !== undefined) {
            const { value, checked } = event.target;

            // Update state based on whether the checkbox is checked or unchecked
            setSelectedCheckboxes((prevSelected) => {
                if (checked) {
                    // If checked, add the value to the selectedCheckboxes array
                    return [...prevSelected, value];
                    // eslint-disable-next-line no-else-return
                } else {
                    return prevSelected.filter((checkboxValue) => checkboxValue !== value);
                }
            });
        }
    }, []);
    // const [showOptions, setShowOptions] = useState(false);
    const [deletedata, setDeletedata] = useState([]);

    const setdeletedata = (deletedd) => {
        setDeletedata(deletedd);
    };
    const [DeleteData] = useMutation(useMutaionBulkDelete);

    const RemoveFlyer = (removedata, option) => {
        // const [DeleteData] = useMutation(useMutationDelete);
        DeleteData({
            variables: {
                salesFlyerGuids: removedata,
                action: option
            }
        }).then((res) => {
            if (res?.data?.bulkAction?.statuscode === 200) {
                PopupV3({
                    content: res?.data?.bulkAction?.message,
                    type: "Success",
                    title: "Success",
                    actions: [
                        {
                            text: "Ok",
                            dismiss: true,
                            do: () => {
                                window.location.reload();
                            }
                        }
                    ]
                });
            }
        });
    };
    const handleOptionClick = (option) => {
        if (deletedata.length > 0) {
            if (option === "Delete") {
                PopupV3({
                    content: "Are you sure you want to delete the selected flyer(s)?",
                    type: "Confirm",
                    title: "Are you sure you want to delete the selected flyer(s)?",
                    actions: [
                        {
                            dismiss: true,
                            text: "Yes",
                            do: () => {
                                RemoveFlyer(deletedata, option);
                            }
                        },
                        {
                            text: "No",
                            dismiss: true
                        }
                    ]
                });
            } else if (option === "Active") {
                PopupV3({
                    content: "Are you sure you want to activate the selected flyer(s)?",
                    type: "Confirm",
                    title: "Are you sure you want to activate the selected flyer(s)?",
                    actions: [
                        {
                            dismiss: true,
                            text: "Yes",
                            do: () => {
                                RemoveFlyer(deletedata, option);
                            }
                        },
                        {
                            text: "No",
                            dismiss: true
                        }
                    ]
                });
            } else if (option === "Inactive") {
                PopupV3({
                    content: "Are you sure you want to inactivate the selected flyer(s)?",
                    type: "Confirm",
                    title: "Are you sure you want to inactivate the selected flyer(s)?",
                    actions: [
                        {
                            text: "Yes",
                            dismiss: true,
                            do: () => {
                                RemoveFlyer(deletedata, option);
                            }
                        },
                        {
                            text: "No",
                            classes: "cancel",
                            dismiss: true
                        }
                    ]
                });
            }
        } else {
            PopupV3({
                content: "Please select atleast one flyer",
                type: "Warning",
                title: "Please select atleast one flyer",
                actions: [
                    {
                        text: "Okay",
                        classes: "ok",
                        dismiss: true
                    }
                ],
                onDismiss: () => {}
            });
        }
    };

    const SearchOnclick = () => {
        if (search === "" && toDate === "" && fromDate === "") {
            PopupV3({
                content: "Please enter search values",
                type: "Warning",
                title: "Warning",
                actions: [
                    {
                        dismiss: true,
                        text: "OK"
                    }
                ]
            });
        } else if (!validateDate(fromDate, toDate)) {
            PopupV3({
                content: resources?.salesFlyerListingDateValidation,
                type: "Warning",
                title: "Warning",
                actions: [
                    {
                        dismiss: true,
                        text: "OK"
                    }
                ]
            });
        } else {
            setreorder(false);
            const enableData = data?.salesFlyers?.items || [];
            let dateWiseData;

            if (search !== null && search !== "") {
                dateWiseData = enableData.filter((item) => item?.flyerName?.toLowerCase()?.includes(search?.toLowerCase()));
            } else {
                dateWiseData = enableData.filter((item) => {
                    const itemDate = new Date(item?.createdDateUtc);
                    const startDate = new Date(fromDate);
                    const endDate = new Date(toDate);
                    // Set the endDate to the end of the day
                    endDate.setHours(23, 59, 59, 999);

                    return itemDate >= startDate && itemDate <= endDate;
                });
            }
            setSearchData(dateWiseData);
            setData(dateWiseData);
            TotalData(dateWiseData);
            setTotalRecordsNew(dateWiseData?.length);
        }
    };

    // Date Picker placeholder
    const [startDateInputType, setStartDateInputType] = useState("text");
    const [endDateInputType, setEndDateInputType] = useState("text");

    const handleFocusStartDate = () => {
        setStartDateInputType("date");
    };
    const handleFocusEndDate = () => {
        setEndDateInputType("date");
    };

    const handleBlur = (event) => {
        if (event.target.value === "") {
            setStartDateInputType("text");
            setEndDateInputType("text");
        }
    };

    return (
        <section className="midContent">
            <div className="content-container salesCard salesflyerDes" id="jumbo-header">
                <div className="search-bar">
                    <div className="search-bar-controls">
                        <div className="select-wrapper">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="sortby-dropdown-toggle clsSales_BulkActionNew">
                                    Action
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleOptionClick("Delete")}> Delete Selected</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleOptionClick("Active")}> Activate Selected</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleOptionClick("Inactive")}> Inactivate Selected</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <select onChange={handleChangeStatus} value={selectedStatus} className="sortby-dropdown-toggle mb-2" aria-label="Default select example">
                                <option value="All" selected>
                                    All ({totalRecordNew})
                                </option>
                                <option value="Active">Active ({active})</option>
                                <option value="Inactive">Inactive ({inactive})</option>
                                <option value="Expired">Expired ({expcount})</option>
                            </select>

                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="sortby-dropdown-toggle listingSotyBy">
                                    {selectedSortOption || "Sort By"}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "flyerName", columnName: " Flyer Name", direction: "ASC", displayoption: "Name: A-Z" })}>Name: A-Z</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "flyerName", columnName: " Flyer Name", direction: "DESC", displayoption: "Name: Z-A" })}>Name: Z-A</Dropdown.Item>

                                    <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "createdDateUtc", columnName: " Date", direction: "ASC", displayoption: "Date: Newest to Oldest" })}>Date: Newest to Oldest</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "createdDateUtc", columnName: " Date", direction: "DESC", displayoption: "Date: Oldest to Newest" })}>Date: Oldest to Newest</Dropdown.Item>

                                    <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "sequence", columnName: "Sequence", direction: "ASC", displayoption: "Sequence: Low to High" })}>Sequence: Low to High</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "sequence", columnName: "Sequence", direction: "DESC", displayoption: "Sequence: High to Low" })}>Sequence: High to Low</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="header-second">
                            <div className="input-wrapper mb-2 clsSales_SearchNew">
                                <svg className="search" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.587 15.9628L12.585 12.0518C13.7449 10.6907 14.3234 8.9448 14.1999 7.17741C14.0764 5.41002 13.2606 3.75719 11.9222 2.56275C10.5838 1.36831 8.82572 0.724224 7.0138 0.764474C5.20189 0.804724 3.4756 1.52621 2.19405 2.77886C0.912501 4.0315 0.174362 5.71885 0.133183 7.48989C0.0920041 9.26093 0.750957 10.9793 1.97296 12.2876C3.19497 13.5958 4.88594 14.3932 6.69411 14.5139C8.50229 14.6346 10.2884 14.0692 11.681 12.9354L15.6822 16.8472C15.7416 16.9052 15.8122 16.9513 15.8898 16.9827C15.9674 17.0141 16.0506 17.0303 16.1346 17.0303C16.2186 17.0303 16.3018 17.0141 16.3794 16.9827C16.4571 16.9513 16.5276 16.9052 16.587 16.8472C16.6464 16.7891 16.6935 16.7201 16.7257 16.6443C16.7578 16.5684 16.7744 16.4871 16.7744 16.405C16.7744 16.3228 16.7578 16.2415 16.7257 16.1657C16.6935 16.0898 16.6464 16.0208 16.587 15.9628ZM1.42788 7.65496C1.42788 6.54244 1.76539 5.45491 2.39774 4.52988C3.03008 3.60485 3.92886 2.88388 4.98041 2.45814C6.03197 2.0324 7.18907 1.921 8.30539 2.13805C9.42171 2.35509 10.4471 2.89082 11.2519 3.67749C12.0568 4.46416 12.6049 5.46644 12.8269 6.55758C13.049 7.64872 12.935 8.77972 12.4994 9.80756C12.0639 10.8354 11.3263 11.7139 10.3799 12.332C9.43351 12.9501 8.32088 13.28 7.18268 13.28C5.65693 13.2783 4.19416 12.6851 3.11529 11.6306C2.03642 10.5761 1.42957 9.1463 1.42788 7.65496Z"
                                        fill="#334F5B"
                                    />
                                </svg>
                                <input type="search" aria-label="Search" onChange={handleSearch} value={search} placeholder="Search..." />
                            </div>
                            <div className="or-text">OR</div>
                            <div className="date-input-wrapper mb-2 mr-2 clsSales_DateSearchNew">
                                <input placeholder="Start Date" className="textbox-n" value={fromDate} onChange={(e) => handlefromdate(e)} type={startDateInputType} onFocus={handleFocusStartDate} onBlur={handleBlur} />
                                <input placeholder="End Date" className="textbox-n" value={toDate} onChange={(e) => handletodate(e)} type={endDateInputType} onFocus={handleFocusEndDate} onBlur={handleBlur} />
                                {/* <input id="FromDateSearch" type="date" value={fromDate} onChange={(e) => handlefromdate(e)} placeholder="From Date" />
                                <input id="ToDateSearch" type="date" value={toDate} onChange={(e) => handletodate(e)} placeholder="To Date" /> */}
                            </div>
                            <div className="search-bar-buttons">
                                <button type="button" className="btn btn_search clsSales_SearchButtonNew" onClick={() => SearchOnclick()}>
                                    Search
                                </button>

                                <button type="button" onClick={handleReset} className="btn btn_reset clsSales_ResetButtonNew">
                                    Reset
                                </button>
                                <button className="btn btn_create clsSales_CreateNew" type="button" onClick={handleAddFlyer}>
                                    {/* <img src={add} alt="add-icon" height={15} width={15} /> */}
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.25 6.65625H0.75V5.15625H5.25V0.65625H6.75V5.15625H11.25V6.65625H6.75V11.1562H5.25V6.65625Z" fill="white" />
                                    </svg>
                                    &nbsp; Create Sales Flyer
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="cards-container mb-4 ml-3 mr-3 ml-lg-4 mr-lg-4">
                        <div className="flyer-info d-flex justify-content-between align-items-center">
                            <h5>
                                Showing {Data.length} of {Data.length} flyer(s)
                            </h5>
                            <div className="view-toggle clsSales_GridViewNew ">
                                <button type="button" onClick={() => setView("grid")} className={view === "grid" ? "active" : ""}>
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 4.71289H8V8.71289H4V4.71289ZM10 4.71289H14V8.71289H10V4.71289ZM16 4.71289H20V8.71289H16V4.71289ZM4 10.7129H8V14.7129H4V10.7129ZM10 10.7129H14V14.7129H10V10.7129ZM16 10.7129H20V14.7129H16V10.7129ZM4 16.7129H8V20.7129H4V16.7129ZM10 16.7129H14V20.7129H10V16.7129ZM16 16.7129H20V20.7129H16V16.7129Z" fill="#667B84" />
                                    </svg>
                                </button>
                                <button type="button" onClick={() => setView("list")} className={view === "list" ? "active" : ""}>
                                    <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 1.71289H16M5 7.71289H16M5 13.7129H16M1 1.71289V1.72289M1 7.71289V7.72289M1 13.7129V13.7229" stroke="#667B84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {loading ? (
                        <Loader />
                    ) : Data && Data.length > 0 ? (
                        <div id="constrained-container" onScroll={(e) => handleScroll(e)}>
                            <div className={view === "grid" ? "grid-view" : "list-view table-structure"}>
                                <Card view={view} Data={Data} handleReset={handleReset} selectedCheckboxes={selectedCheckboxes} handleCheckboxChange={handleCheckboxChange} setdeletedata={setdeletedata} columnName={columnNameVal} reorder={reorder} reversorting={reversorting} sortOrdernew={sortOrder} />
                            </div>
                        </div>
                    ) : (
                        <h5 className="nodata">No records found</h5>
                    )}
                </div>
            </div>
        </section>
    );
};
export default SalesCard;
