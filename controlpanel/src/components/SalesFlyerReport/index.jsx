/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
// import React, { useEffect, useState } from "react",
import { Link } from "react-router-dom";
import "../../styles/pages/salescard.scss";
import "../../styles/layout/CardsContainer.css";
import "../../styles/global.css";
import { useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef, useMemo } from "react";
import moment from "moment";
import { CDN_URL, LANGUAGE_GUID, REACT_APP_API_ENDPOINT, WEBSITE_GUID } from "common/utils/vars";
import { useQuerygetSalesflyers } from "common/components/graphQL/queries/Sales/useQuerygetSalesflyers";
import { PopupV3 } from "common/utils";
import Table from "../common/Table";
import "../../styles/layout/mainlayout.scss";
import "../common/Table/dataTable.scss";
import ShowingResults from "../ShowingResult";
import Pagination from "../Pagination/Paginationindex";
// import ReportLogo from "../../../../../images/reportLogo.svg";

const SalesflyerReport = () => {
    const [fromDate, setFromDate] = useState("");
    const { reset } = useForm("");
    const [toDate, setToDate] = useState("");
    const [search, setSearch] = useState("");
    const [PagePerRecord] = useState(10);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortDirection, setSortDirection] = useState("");
    const [sortConfigFlyerName, setsortConfigFlyerName] = useState({ key: "Flyer Name", direction: sortDirection }); // this is table heading sorting
    const [sortConfig, setSortConfig] = useState({ key: "Sent Date", direction: sortDirection }); // this is table heading sorting
    // const [setSelectedSortLabel] = useState("Sent Date");
    const [totalRecord, setTotalRecords] = useState(0);
    const [Data, setData] = useState(null);
    const basicLink = `${REACT_APP_API_ENDPOINT}api/fileupload/ExportSalesFlyerReport/${WEBSITE_GUID}/${LANGUAGE_GUID}`;
    // eslint-disable-next-line no-unused-vars
    const [exportLink, setExportLink] = useState(basicLink);
    // eslint-disable-next-line no-unused-vars
    const [view, setView] = useState("grid");
    // const searchparams = ["senderEmail", "salesFlyerName"];
    const dropdownRef = useRef(null);
    const salesFlyerReportLogo = `${CDN_URL}/images/salesflyer/salesFlyerReportLogo.png`;
    const [selectedSortOption, setSelectedSortOption] = useState("Sort By");
    const [classnew, setclassnew] = useState("descsentactive");
    const [classnewflyer, setclassnewflyer] = useState("");
    const [filters, setFilters] = useState({
        skip: 0,
        take: PagePerRecord,
        where: {
            websiteGuid: {
                eq: WEBSITE_GUID
            }
        },
        order: { createdDateUtc: "DESC" }
    });

    const { data, refetch, loading } = useQuery(useQuerygetSalesflyers, {
        variables: {
            filters
        }
    });

    const constructWhereClause = () => {
        const filter = {};
        let link = `${basicLink}?export=y`;
        if (search) {
            // filter.or = searchparams.map((param) => ({
            //     [param]: { contains: search }
            // }));
            filter.or = { senderEmail: { contain: search }, salesFlyerName: { contain: search } };
            link = `${link}&searchtext=${search}`;
            setExportLink(link);
        }
        filter.websiteGuid = {
            eq: WEBSITE_GUID
        };
        setFilters((prevFilters) => ({
            ...prevFilters,
            where: filter
        }));

        return filter;
    };
    const addOneDay = (dateString) => {
        const datetimenew = new Date(dateString);
        datetimenew?.setDate(datetimenew.getDate() + 1);
        const year = datetimenew.getFullYear();
        const month = (datetimenew.getMonth() + 1).toString().padStart(2, "0");
        const day = datetimenew.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    };
    const constructWhereClauseNew = () => {
        const filter = {};
        let link = `${basicLink}?export=y`;
        if (search) {
            // filter.or = searchparams.map((param) => ({
            //     [param]: { contains: search }
            // }));
            filter.or = { senderEmail: { contain: search }, salesFlyerName: { contain: search } };
            link = `${link}&searchtext=${search}`;
        }
        if (fromDate) {
            // if (fromDate === toDate) {
            const todate = addOneDay(toDate);
            filter.createdDateUtc = { gte: fromDate, lte: todate };
            //     link = `${link}&FilterFromDateValue=${fromDate}&FilterToDateValue=${toDate}`;
            // } else {
            //     filter.createdDateUtc = { gte: fromDate, lte: toDate };
            link = `${link}&FilterFromDateValue=${fromDate}&FilterToDateValue=${toDate}`;
            // }
        }
        setExportLink(link);
        filter.websiteGuid = {
            eq: WEBSITE_GUID
        };
        setFilters((prevFilters) => ({
            ...prevFilters,
            where: filter
        }));

        return filter;
    };

    const getFlyerReportImageUrl = (imageName, Guid) => {
        const defaultImageUrl = `${CDN_URL}/8FF00A25-B6ED-4799-9D2F-412DBA1F7C66/Marcomm/SalesFlyer/Default/default.jpg`;
        if (imageName !== null && imageName !== "") {
            return imageName ? `${CDN_URL}/${WEBSITE_GUID}/Marcomm/SalesFlyerEmail/Default/${imageName}` : defaultImageUrl;
        }
        return Guid ? `${CDN_URL}/${WEBSITE_GUID}/Marcomm/SalesFlyerEmail/Default/${Guid}.png` : defaultImageUrl;
    };

    useMemo(() => {
        const allData = [];
        if (data && data.salesFlyerReport && data.salesFlyerReport?.items) {
            const dataForEstimate = data?.salesFlyerReport?.items;
            dataForEstimate?.forEach((item) => {
                const fullname = `${item?.senderFirstName} ${item?.senderLastName}`;
                const recipent = item?.mailTo;
                const recipent1 = recipent?.split(",");
                const editdata = ["Edit", item];
                const estimateVal = [<img src={getFlyerReportImageUrl(item?.imageName, item?.salesFlyerEmailGuid)} alt={item?.salesFlyerName} />, item?.salesFlyerName?.toLowerCase(), fullname, item?.senderEmail, recipent1, item?.subject, moment(item?.createdDateUtc).format("MMM DD, YYYY hh:mm a"), editdata];
                allData.push(estimateVal);
            });
        }
        setTotalRecords(data?.salesFlyerReport?.totalCount);
        setData(allData);
        return allData;
    }, [data?.salesFlyerReport?.items]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        setFilters((prevFilters) => ({
            ...prevFilters,
            skip: newPage
        }));
    };
    useEffect(() => {
        if (filters) {
            refetch(filters);
        }
    }, [filters, exportLink]);

    const totalPages = Math.ceil(totalRecord / PagePerRecord);

    const handleDropdownSort = (columnName) => {
        if (columnName.columnName === "Sent Date") {
            const { direction } = columnName;
            if (direction === "ASC") {
                setclassnew("ascsentactive");
            } else {
                setclassnew("descsentactive");
            }
            setclassnewflyer("");

            setSortConfig({ key: columnName.columnName, direction: columnName.direction });
        } else if (columnName.columnName === "Flyer Name") {
            const { direction } = columnName;
            if (direction === "ASC") {
                setclassnewflyer("descflyeractive");
            } else {
                setclassnewflyer("ascflyeractive");
            }
            setclassnew("");
            setsortConfigFlyerName({ key: columnName.columnName, direction: columnName.direction });
        } else {
            setclassnewflyer("");
            setclassnew("");
        }
        setSortDirection(columnName.direction);
        setSelectedSortOption(columnName.displayoption);
        setFilters((prevFilters) => ({
            ...prevFilters,
            order: { [columnName.dbColname]: columnName.direction }
        }));
        setIsDropdownOpen(false);
    };
    const handleDropdownSortNew = (columnName) => {
        let direction = "";
        if (columnName.columnName === "Sent Date") {
            direction = sortConfig.direction === "ASC" ? "DESC" : "ASC";
            setclassnewflyer("");
            if (direction === "ASC") {
                setclassnew("ascsentactive");
            } else {
                setclassnew("descsentactive");
            }
            setSortConfig({ key: columnName.columnName, direction });
            setSortDirection(direction);
        } else if (columnName.columnName === "Flyer Name") {
            direction = sortConfigFlyerName.direction === "ASC" ? "DESC" : "ASC";
            if (direction === "ASC") {
                setclassnewflyer("descflyeractive");
            } else {
                setclassnewflyer("ascflyeractive");
            }
            setclassnew("");
            setsortConfigFlyerName({ key: columnName.columnName, direction });
            setSortDirection(direction);
        }

        setFilters((prevFilters) => ({
            ...prevFilters,
            order: { [columnName.dbColname]: direction }
        }));
        setIsDropdownOpen(false);
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

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setTimeout(() => {
            setFilters((prevFilters) => ({
                ...prevFilters,
                skip: 0,
                take: 10,
                where: constructWhereClause()
            }));
            // refetch({
            //     skip: 0,
            //     take: 10,
            //     // order: {},
            //     where: constructWhereClause()
            // });
        }, 2000);
    };

    const handleExportClick = () => {
        window.open(exportLink, "_blank");
    };

    const handleReset = () => {
        reset();
        setSearch("");
        setFromDate("");
        setToDate("");
        setFilters({
            skip: 0,
            take: PagePerRecord,
            where: {
                websiteGuid: {
                    eq: WEBSITE_GUID
                }
            },
            order: { createdDateUtc: "DESC" }
        });
        setSelectedSortOption("Sort By");
        setCurrentPage(1);
        setclassnew("descsentactive");
        setclassnewflyer("");
    };

    const [showPopup, setShowPopup] = useState(false);
    const [editData, setEditdata] = useState([]);

    const handlePreviewClick = (editdata) => {
        const test = editdata[7][1];
        setEditdata(test);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };
    const isWithinThreeMonths = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        // Calculate the difference in months
        const monthsDifference = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        // Ensure the end date is not before the start date and the difference is within three months
        return monthsDifference >= 3;
    };
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
                content: "End date should be greater than start Date.",
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
        if (fromDate) {
            if (fromDate && !validateDate(fromDate, selectedDate)) {
                PopupV3({
                    content: "End date should be greater than start Date.",
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
            } else if (isWithinThreeMonths(fromDate, selectedDate)) {
                PopupV3({
                    content: "Please select only three months.",
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

    const onSearch = () => {
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
                content: "End date should be greater than start date.",
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
            setCurrentPage(1);
            setFilters((prevFilters) => ({
                ...prevFilters,
                skip: 0,
                take: 10,
                order: { createdDateUtc: "DESC" },
                where: constructWhereClauseNew()
            }));
            // refetch({
            //     skip: 0,
            //     take: 10,
            //     order: null,
            //     where: constructWhereClauseNew()
            // });
        }
    };

    const columnAlignments = {
        // eslint-disable-next-line quote-props
        Flyer: "flyerIamge width-15 text-no-ellipsis",
        "Flyer Name": "nameList width-20 text-no-ellipsis",
        "User Name": "userList width-20 text-left",
        "Sent By": "sent_by width-15 text-left",
        "Recipient(s)": "recipent text-no-ellipsis width-15",
        // eslint-disable-next-line quote-props
        Subject: "subjectCol width-20 text-left",
        "Sent Date": "date width-20 text-no-ellipsis",
        // eslint-disable-next-line quote-props
        Action: "actionbtn text-no-ellipsis"
    };

    const columns = ["Flyer", "Flyer Name", "User Name", "Sent By", "Recipient(s)", "Subject", "Sent Date", "Action"];

    return (
        <section className="body-container midContent">
            <div className="usermanagement-container reportSalesFlyer">
                <div className="midCotWrap salesCard">
                    <div className="search-bar reportsec">
                        <div className="search-bar-controls">
                            <div className="select-wrapper select_wrpperlist d-none">
                                <select>
                                    <option>All({totalRecord})</option>
                                </select>
                            </div>
                            <div className="select-wrapper mb-2">
                                <div className="dropdown clsSalesReport_SortingNew" ref={dropdownRef}>
                                    <button className="btn sortby-dropdown-toggle" type="button" id="dropdownMenuSortby" onClick={toggleDropdown} data-toggle="dropdown" aria-haspopup="true" aria-expanded={isDropdownOpen}>
                                        <i className="icon icon-bx_sort-up" /> {selectedSortOption || "Sort By"} &nbsp;
                                        <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.99996 4.75033L0.416626 0.166992H9.58329L4.99996 4.75033Z" fill="#667B84" />
                                        </svg>
                                    </button>
                                    <div className={`dropdown-menu reportSortBy ${isDropdownOpen ? "show" : ""} `} aria-labelledby="dropdownMenuSortby">
                                        <Link className="dropdown-item" onClick={() => handleDropdownSort({ dbColname: "salesFlyerName", columnName: "Flyer Name", direction: "ASC", displayoption: "Flyer Name: A-Z" })}>
                                            Flyer Name: A-Z
                                        </Link>
                                        <Link className="dropdown-item" onClick={() => handleDropdownSort({ dbColname: "salesFlyerName", columnName: "Flyer Name", direction: "DESC", displayoption: " Flyer Name: Z-A" })}>
                                            Flyer Name: Z-A
                                        </Link>
                                        <Link className="dropdown-item" href="#" onClick={() => handleDropdownSort({ dbColname: "senderEmail", columnName: "Email Id", direction: "ASC", displayoption: "Email Address: A-Z" })}>
                                            Email Address: A-Z
                                        </Link>
                                        <Link className="dropdown-item" href="#" onClick={() => handleDropdownSort({ dbColname: "senderEmail", columnName: "Email Id", direction: "DESC", displayoption: "Email Address: Z-A" })}>
                                            Email Address: Z-A
                                        </Link>
                                        <Link className="dropdown-item" href="#" onClick={() => handleDropdownSort({ dbColname: "createdDateUtc", columnName: "Sent Date", direction: "DESC", displayoption: "Sent Date: Newest to Oldest" })}>
                                            Sent Date: Newest to Oldest
                                        </Link>
                                        <Link className="dropdown-item" href="#" onClick={() => handleDropdownSort({ dbColname: "createdDateUtc", columnName: "Sent Date", direction: "ASC", displayoption: "Sent Date: Oldest to Newest" })}>
                                            Sent Date: Oldest to Newest
                                        </Link>
                                        {/* <Link className="dropdown-item" href="#" onClick={() => handleDropdownSort({ dbColname: "createdBy", columnName: "Created By" })}>
                                                Created By
                                            </Link> */}
                                    </div>
                                </div>
                            </div>
                            <div className="header-second">
                                <div className="input-wrapper mb-2 clsSalesReport_SearchNew">
                                    <svg className="search" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M16.587 15.9628L12.585 12.0518C13.7449 10.6907 14.3234 8.9448 14.1999 7.17741C14.0764 5.41002 13.2606 3.75719 11.9222 2.56275C10.5838 1.36831 8.82572 0.724224 7.0138 0.764474C5.20189 0.804724 3.4756 1.52621 2.19405 2.77886C0.912501 4.0315 0.174362 5.71885 0.133183 7.48989C0.0920041 9.26093 0.750957 10.9793 1.97296 12.2876C3.19497 13.5958 4.88594 14.3932 6.69411 14.5139C8.50229 14.6346 10.2884 14.0692 11.681 12.9354L15.6822 16.8472C15.7416 16.9052 15.8122 16.9513 15.8898 16.9827C15.9674 17.0141 16.0506 17.0303 16.1346 17.0303C16.2186 17.0303 16.3018 17.0141 16.3794 16.9827C16.4571 16.9513 16.5276 16.9052 16.587 16.8472C16.6464 16.7891 16.6935 16.7201 16.7257 16.6443C16.7578 16.5684 16.7744 16.4871 16.7744 16.405C16.7744 16.3228 16.7578 16.2415 16.7257 16.1657C16.6935 16.0898 16.6464 16.0208 16.587 15.9628ZM1.42788 7.65496C1.42788 6.54244 1.76539 5.45491 2.39774 4.52988C3.03008 3.60485 3.92886 2.88388 4.98041 2.45814C6.03197 2.0324 7.18907 1.921 8.30539 2.13805C9.42171 2.35509 10.4471 2.89082 11.2519 3.67749C12.0568 4.46416 12.6049 5.46644 12.8269 6.55758C13.049 7.64872 12.935 8.77972 12.4994 9.80756C12.0639 10.8354 11.3263 11.7139 10.3799 12.332C9.43351 12.9501 8.32088 13.28 7.18268 13.28C5.65693 13.2783 4.19416 12.6851 3.11529 11.6306C2.03642 10.5761 1.42957 9.1463 1.42788 7.65496Z"
                                            fill="#334F5B"
                                        />
                                    </svg>
                                    <input type="search" id="txtsalesFlyer reportSearchInput" aria-label="Search" onChange={handleSearch} value={search} placeholder="Search..." />
                                </div>
                                <div className="or-text">OR</div>
                                <div className="mb-2">
                                    <div className="date-input-wrapper clsSalesReport_DateNew">
                                        <input id="FromDateSearch" className="textbox-n" type={startDateInputType} onFocus={handleFocusStartDate} onBlur={handleBlur} aria-label="fromdate" value={fromDate} onChange={(e) => handlefromdate(e)} placeholder="Start Date" />
                                        <input id="ToDateSearch" className="textbox-n" type={endDateInputType} onFocus={handleFocusEndDate} onBlur={handleBlur} aria-label="expiredate" value={toDate} onChange={(e) => handletodate(e)} placeholder="End Date" />
                                    </div>
                                </div>
                                <div className="search-bar-buttons ml-2">
                                    <button type="button" className="btn btn_search clsSalesReport_SearchButtonNew" onClick={() => onSearch()}>
                                        Search
                                    </button>
                                    <button type="button" onClick={handleReset} className="reset btn btn_reset clsSalesReport_ResetButtonNew">
                                        Reset
                                    </button>
                                    <button type="button" id="cpContent_btnExport" className="btn btn-export export-icon clsSalesReport_Export" value="Export" onClick={handleExportClick}>
                                        Export
                                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15.75 11.0312V15.5312C15.75 15.6804 15.6907 15.8235 15.5852 15.929C15.4798 16.0345 15.3367 16.0938 15.1875 16.0938H2.8125C2.66332 16.0938 2.52024 16.0345 2.41475 15.929C2.30926 15.8235 2.25 15.6804 2.25 15.5312V11.0312C2.25 10.8821 2.30926 10.739 2.41475 10.6335C2.52024 10.528 2.66332 10.4688 2.8125 10.4688C2.96168 10.4688 3.10476 10.528 3.21025 10.6335C3.31574 10.739 3.375 10.8821 3.375 11.0312V14.9688H14.625V11.0312C14.625 10.8821 14.6843 10.739 14.7898 10.6335C14.8952 10.528 15.0383 10.4688 15.1875 10.4688C15.3367 10.4688 15.4798 10.528 15.5852 10.6335C15.6907 10.739 15.75 10.8821 15.75 11.0312ZM8.60203 11.4292C8.65427 11.4815 8.71631 11.523 8.7846 11.5513C8.85288 11.5796 8.92608 11.5942 9 11.5942C9.07392 11.5942 9.14712 11.5796 9.2154 11.5513C9.28369 11.523 9.34573 11.4815 9.39797 11.4292L12.2105 8.61672C12.2627 8.56446 12.3042 8.50241 12.3325 8.43413C12.3608 8.36585 12.3753 8.29266 12.3753 8.21875C12.3753 8.14484 12.3608 8.07165 12.3325 8.00337C12.3042 7.93509 12.2627 7.87304 12.2105 7.82078C12.1582 7.76852 12.0962 7.72706 12.0279 7.69878C11.9596 7.67049 11.8864 7.65594 11.8125 7.65594C11.7386 7.65594 11.6654 7.67049 11.5971 7.69878C11.5288 7.72706 11.4668 7.76852 11.4145 7.82078L9.5625 9.67352V3.15625C9.5625 3.00707 9.50324 2.86399 9.39775 2.7585C9.29226 2.65301 9.14918 2.59375 9 2.59375C8.85082 2.59375 8.70774 2.65301 8.60225 2.7585C8.49676 2.86399 8.4375 3.00707 8.4375 3.15625V9.67352L6.58547 7.82078C6.47992 7.71523 6.33677 7.65594 6.1875 7.65594C6.03823 7.65594 5.89508 7.71523 5.78953 7.82078C5.68398 7.92633 5.62469 8.06948 5.62469 8.21875C5.62469 8.36802 5.68398 8.51117 5.78953 8.61672L8.60203 11.4292Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {showPopup && (
                        <div>
                            <div className="popup">
                                <div className="popup-content reportViewPopup">
                                    <span className="close" onClick={handleClosePopup}>
                                        &times;
                                    </span>
                                    <div className="title-info popup-image1">
                                        <div className="repoerLogo">
                                            <img src={salesFlyerReportLogo} alt="Logo" />
                                        </div>
                                        <p className="text-cap">{editData?.salesFlyerName?.toLowerCase()}</p>
                                    </div>
                                    <div className="popupImage">
                                        <img className="popup-image" src={getFlyerReportImageUrl(editData.imageName, editData?.salesFlyerEmailGuid)} alt={editData.salesFlyerName} />
                                    </div>
                                    <div className="bottom-info">
                                        <ul>
                                            <li>
                                                <h4 className="title">Sender Details</h4>
                                                <div className="name-info">
                                                    <span className="sort-name">
                                                        {editData !== null && editData?.senderFirstName[0]}
                                                        {editData !== null && editData?.senderLastName[0]}
                                                    </span>
                                                    <h5 className="user-name">
                                                        {editData.senderFirstName}
                                                        {editData.senderLastName}
                                                    </h5>
                                                </div>
                                                <div className="details-customer">
                                                    <p>{editData.companyPhoneNo}</p>
                                                    <p className="emailReport">{editData.senderEmail}</p>
                                                </div>
                                            </li>
                                            <li>
                                                <h4 className="title">Address</h4>
                                                <p>
                                                    {" "}
                                                    {editData.address}, {editData.city}, {editData.state} {editData.zipCode}, {editData.country}{" "}
                                                </p>

                                                <h4 className="title website">Website</h4>
                                                <p>
                                                    {/* <a href={editData.senderWebsite} target="_blank" rel="noopener noreferrer"> */}
                                                    {editData.senderWebsite}
                                                    {/* </a> */}
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="popup-overlay" onClick={handleClosePopup} />
                            </div>
                        </div>
                    )}
                    <div id="usrtable1 reportPage">
                        <section className="all_user">
                            {!loading && <ShowingResults pageRecords={PagePerRecord < totalRecord ? PagePerRecord : totalRecord} totalRecords={totalRecord} currentPage={currentPage} />}
                            <Table data={Data} columns={columns} sortConfig={sortConfig} columnAlignments={columnAlignments} handlePreviewClick={handlePreviewClick} sortConfigFlyerName={sortConfigFlyerName} handleDropdownSortNew={handleDropdownSortNew} loading={loading} classnew={classnew} classnewflyer={classnewflyer} type={"salesflyer"} />
                        </section>
                    </div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            </div>
        </section>
    );
};

export default SalesflyerReport;
