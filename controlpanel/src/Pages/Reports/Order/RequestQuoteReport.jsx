import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Dropdown } from "react-bootstrap";
import { PopupV3 } from "common/utils";
import { useQueryRequestQuoteReport } from "common/components/graphQL/queries/Reports/useQueryRequestQuoteReport";
import { useExportRequestQuote, useGetAllState, useGetAllCountry, useUpdateRequestQuoteStatus } from "common/hooks/react/api";
import { MS_URL, CDN_URL, USER_GUID, WEBSITE_GUID, COOKIE_DETAILS } from "common/utils/vars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes, faMoneyBillAlt, faBox } from "@fortawesome/free-solid-svg-icons";
import Store from "~/Store";
import Table from "../../../components/common/Table";
import { LANGUAGE_GUID, REACT_APP_API_ENDPOINT } from "../../../components/common/vars";
import ShowingResults from "../../../components/ShowingResult";
import Pagination from "../../../components/Pagination/Paginationindex";
import "../Report.scss";

const OrderRequestReport = () => {
    const PagePerRecord = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [fromDate, setFromdate] = useState("");
    const [toDate, setTodate] = useState("");
    const basicLink = `${REACT_APP_API_ENDPOINT}api/fileupload/ExportOrderReport/${WEBSITE_GUID}/${LANGUAGE_GUID}`;
    const [, setExportLink] = useState(basicLink);
    const [Data, setData] = useState(null);
    const [totalRecord, setTotalRecords] = useState(0);
    const totalPages = Math.ceil(totalRecord / PagePerRecord);
    const [search, setSearch] = useState("");
    const [searchProduct, setsearchProduct] = useState("");
    const [resources] = Store.useStore((store) => store?.resources);
    const [filters, setFilters] = useState({
        skip: 1,
        take: PagePerRecord,
        where: {
            websiteGuid: {
                eq: WEBSITE_GUID
            }
        },
        order: { createdDateUtc: "DESC" }
    });

    const { data, refetch, loading } = useQuery(useQueryRequestQuoteReport, { variables: filters });

    const [showPopup, setShowPopup] = useState(false);
    const [editData, setEditdata] = useState([]);

    const [statename, setStateName] = useState("");
    const [countryname, setCountryName] = useState("");
    const [billingStatename, setBillingState] = useState("");
    const [, setBillingCountryName] = useState("");
    const [shippingStatename, setShippingState] = useState("");
    const [, setShippingCountryName] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selStatus, setSelStatus] = useState("");
    const [, setStatuses] = useState([]);
    const [, setColumnName] = useState("");
    const [sortDirection, setSortDirection] = useState("DSC");
    const [, setSortConfig] = useState({ key: "Products", direction: sortDirection });
    const [selectedSortOption, setSelectedSortOption] = useState("Sort By");
    const { mutateAsync: allState } = useGetAllState();
    const { data: allCountries } = useGetAllCountry();
    const { mutateAsync: statusChange } = useUpdateRequestQuoteStatus();
    const { mutateAsync: requestQuote } = useExportRequestQuote();

    const getOptionValue = (option) => {
        if (option === "New") {
            return "Quote Submitted";
        }
        if (option === "Sent") {
            return "Quote Sent";
        }
        return option;
    };

    const statusOptions = ["New", "Quote Reviewed", "Sent", "Cancelled"];

    const handleStatusChange = async (event, editdata) => {
        const newStatus = event.target.value;

        if (editdata?.requestQuoteGuid) {
            setSelectedStatus(newStatus);
            setEditdata((prevEditData) => {
                if (prevEditData?.requestQuoteGuid === editdata.requestQuoteGuid) {
                    return {
                        ...prevEditData,
                        status: newStatus
                    };
                }
                return prevEditData;
            });

            await statusChange({ requestQuoteGuid: editdata.requestQuoteGuid, status: newStatus });
            await refetch();
        }
    };

    const handlePreviewClick = async (editdata) => {
        const test = resources?.IsRFQEnabled === true || resources?.IsRFQEnabled === "True" || resources?.IsRFQEnabled === "true" ? editdata[7][1] : editdata[4][1];

        const allstate = await allState(test?.countryGUID || "");
        if (allState) {
            const statedata = allstate?.filter((item) => item?.stateguid === test?.state);
            const stateName = statedata.length ? statedata[0]?.name : "";

            const billingstatedata = allstate.filter((item) => item?.stateguid === test?.billingInformation?.billingState);
            const billingstateName = billingstatedata.length ? billingstatedata[0]?.name : "";

            const shippingstatedata = allstate.filter((item) => item?.stateguid === test?.shippingInformation?.shippingState);
            const shippingstateName = shippingstatedata.length ? shippingstatedata[0]?.name : "";

            setStateName(stateName);
            setBillingState(billingstateName);
            setShippingState(shippingstateName);
        }
        const allcountry = await allCountries.data;

        if (allcountry) {
            const countrydata = allcountry.filter((item) => item?.countryguid === test?.countryGUID);
            const countryName = countrydata.length ? countrydata[0]?.countryname : "";

            const billingcountrydata = allcountry.filter((item) => item?.countryguid === test?.billingInformation?.billingCountryGUID);
            const billingcountryName = billingcountrydata.length ? billingcountrydata[0]?.countryname : "";

            const shippingcountrydata = allcountry.filter((item) => item?.countryguid === test?.shippingInformation?.shippingCountryGUID);
            const shippingcountryName = shippingcountrydata.length ? shippingcountrydata[0]?.countryname : "";

            setCountryName(countryName);
            setBillingCountryName(billingcountryName);
            setShippingCountryName(shippingcountryName);
        }

        setEditdata(test);
        setShowPopup(true);
    };

    const handleClosePopup = () => setShowPopup(false);

    const handleDropdownSort = async (columnName) => {
        setColumnName(columnName);
        setSortDirection(columnName.direction);
        setSortConfig({ key: columnName.columnName, direction: columnName.direction });
        setSelectedSortOption(columnName.displayoption);

        setFilters((prevFilters) => ({
            ...prevFilters,
            order: { [columnName.dbColname]: columnName.direction },
            skip: 1
        }));

        await refetch({
            variables: { filters }
        });
    };

    const handleSearch = (event) => setSearch(event.target.value);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { month: "short", day: "2-digit", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const formatDateTime = (date) => {
        if (!date) return "";
        const options = {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        };
        return new Date(date).toLocaleString("en-US", options);
    };

    const validateDate = (startDate, endDate) => {
        const from = new Date(startDate);
        const to = new Date(endDate);
        const fromDateValue = from.getFullYear() * 10000 + (from.getMonth() + 1) * 100 + from.getDate();
        const toDateValue = to.getFullYear() * 10000 + (to.getMonth() + 1) * 100 + to.getDate();

        return fromDateValue <= toDateValue;
    };

    const isWithinThreeMonths = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const monthsDifference = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

        return monthsDifference >= 3;
    };

    const handlefromdate = (e) => {
        const selectedDate = e.target.value;
        setFromdate(selectedDate);
    };

    const handletodate = (e) => {
        const selectedDate = e.target.value;
        setTodate(selectedDate);
    };

    const constructWhereClauseNew = () => {
        const filter = {};
        let link = `${basicLink}?export=y`;

        if (search && search.trim()) {
            const trimmedSearch = search.replace(/\s+/g, " ").trim();
            filter.productName = { contain: trimmedSearch.toLowerCase() };
            link = `${link}&searchtext=${trimmedSearch}`;
            setExportLink(link);
        }

        if (fromDate && toDate) {
            const todate = toDate;
            filter.createdDate = { gte: fromDate, lte: todate };
            link += `&fromDate=${fromDate}&toDate=${todate}`;
        }

        if (selectedStatus) {
            filter.status = { eq: selectedStatus };
            link += `&status=${selectedStatus}`;
        }

        setFilters((prevFilters) => ({
            ...prevFilters,
            skip: 1,
            take: 10,
            where: filter
        }));
        filter.websiteGuid = { eq: WEBSITE_GUID };

        setExportLink(link);
        return filter;
    };

    const onSearch = () => {
        if (!selectedStatus && search === "" && searchProduct === "" && toDate === "" && fromDate === "") {
            PopupV3({
                content: "Please provide search criteria.",
                type: "Warning",
                title: "Warning",
                actions: [
                    {
                        dismiss: true,
                        text: "OK"
                    }
                ]
            });
        } else if ((fromDate && !toDate) || (!fromDate && toDate)) {
            PopupV3({
                content: "Please select both dates.",
                type: "Warning",
                title: "Warning",
                actions: [
                    {
                        dismiss: true,
                        text: "OK"
                    }
                ]
            });
        } else if (fromDate && toDate && !validateDate(fromDate, toDate)) {
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
        } else if (isWithinThreeMonths(fromDate, toDate)) {
            PopupV3({
                content: "Date range should not be more than three months.",
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
            const newFilters = {
                ...filters,
                skip: 1,
                take: 10,
                where: constructWhereClauseNew(),
                order: { createdDateUtc: "DESC" }
            };

            setFilters(newFilters);
            refetch({ filters: newFilters });
        }

        const reqQuoteCardsElement = document.querySelector(".req_quote_Cards");
        if (reqQuoteCardsElement) {
            if (selectedStatus || search !== "" || searchProduct !== "" || toDate !== "" || fromDate !== "") {
                reqQuoteCardsElement.classList.add("active");
            } else {
                reqQuoteCardsElement.classList.remove("active");
            }
        }
    };

    const handlePageChange = async (newPage) => {
        setCurrentPage(newPage);
        setFilters((prevFilters) => {
            const updatedFilters = {
                ...prevFilters,
                skip: newPage,
                take: 10
            };
            refetch({ variables: updatedFilters });
            return updatedFilters;
        });
    };

    const handleCalendarClick = (e) => {
        e.target.max = new Date().toISOString().split("T")[0];
        e.target.showPicker();
    };

    const handleExportClick = async () => {
        let objData = null;
        if (resources?.IsRFQEnabled === true || resources?.IsRFQEnabled === "True" || resources?.IsRFQEnabled === "true") {
            objData = {
                UserGuid: USER_GUID || COOKIE_DETAILS.EmailAddress,
                WebsiteGuid: WEBSITE_GUID,
                LanguageGuid: LANGUAGE_GUID,
                DefaultLanguageGuid: LANGUAGE_GUID,
                RequestType: "AdminRequestQuote",
                SampleType: "",
                FilterProductName: "Search",
                FilterProductValue: search,
                FilterStatusName: "Search",
                FilterStatusNameOrder: "Search",
                FilterFromDateName: "Search",
                FilterFromDateValue: fromDate === undefined ? "" : fromDate,
                FilterToDateName: "Search",
                FilterToDateValue: toDate === undefined ? "" : toDate,
                FilterEmail: "Search",
                FilterEmailValue: "",
                FilterStatusValue: selectedStatus,
                FilterStatusValueOrder: "Order Sample Report",
                FilterFirstName: "Search",
                FilterFirstNameValue: "",
                FilterLastName: "Search",
                FilterLastNameValue: "",
                FilterPhoneNumber: "Search",
                FilterPhoneNumberValue: "",
                FilterProductCode: "Search",
                FilterProductCodeValue: "",
                IsCustomShow: false,
                IsRequestQuoteWithoutDetail: false
            };
        } else {
            objData = {
                UserGuid: USER_GUID || COOKIE_DETAILS.EmailAddress,
                WebsiteGuid: WEBSITE_GUID,
                LanguageGuid: LANGUAGE_GUID,
                DefaultLanguageGuid: LANGUAGE_GUID,
                RequestType: "AdminRequestQuote",
                SampleType: "",
                FilterProductName: "Search",
                FilterProductValue: search,

                FilterFromDateName: "Search",
                FilterFromDateValue: fromDate === undefined ? null : fromDate,
                FilterToDateName: "Search",
                FilterToDateValue: toDate === undefined ? null : toDate,
                FilterEmail: "Search",
                FilterEmailValue: "",

                IsCustomShow: false
            };
        }
        const res = await requestQuote(objData);
        objData.order = { createdDateUtc: "DESC" };

        if (res && res?.fileGuid && res?.fileName) {
            window.open(`${MS_URL.ORDER}api/order/DownloadOrderSampleReport/${res.fileGuid}/${res.fileName}`, "_blank");
        } else {
            PopupV3({
                content: "No records are found.",
                type: "Warning",
                title: "Warning",
                actions: [
                    {
                        dismiss: true,
                        text: "OK"
                    }
                ]
            });
        }
    };

    const selectStatus = (event) => {
        setSelStatus(event.target.value);
    };

    const handleReset = () => {
        setSortDirection("DESC");
        setSelectedSortOption("Sort By");
        setCurrentPage(1);
        setFromdate("");
        setTodate("");
        setSearch("");
        setsearchProduct("");
        setSelectedStatus("");
        setFilters({
            skip: 1,
            take: PagePerRecord,
            where: {
                websiteGuid: {
                    eq: WEBSITE_GUID
                }
            },
            order: { createdDateUtc: "DESC" }
        });
    };
    let columns = null;
    if (resources?.IsRFQEnabled === true || resources?.IsRFQEnabled === "True" || resources?.IsRFQEnabled === "true") {
        columns = ["Quote Number", "Product", "Created Date", "Quantity", "Company Name", "Status", "Quote Type", "Actions"];
    } else {
        columns = ["Product", "Created Date", "Quantity", "Company Name", "Actions"];
    }
    const columnAlignments = {
        "Quote Number": "rq_Number text-no-ellipsis",
        "Product Name": "productName text-no-ellipsis",
        "Created Date": "createdDate text-no-ellipsis",
        Quantity: "quantity text-no-ellipsis",
        "Company Name": "company_name text-no-ellipsis",
        Status: "status text-no-ellipsis",
        "Quote Type": "quoteType text-no-ellipsis",
        Action: "actionbtn text-no-ellipsis"
    };

    const reportData = () => {
        const allData = [];

        if (data?.requestQuoteReport && data?.requestQuoteReport?.items?.length > 0) {
            const dataForReport = data?.requestQuoteReport?.items;
            dataForReport?.forEach((report) => {
                const editDataReport = ["Edit", report];

                function capitalizeText(text) {
                    return text
                        .split(" ")
                        .map((txt) => (txt[0] ? txt[0].toUpperCase() : "") + txt.slice(1).toLowerCase())
                        .join(" ");
                }

                const companyName = report?.companyName?.trim() || report?.billingInformation?.billingCompanyName?.trim();
                const capitalizedText = companyName ? capitalizeText(companyName) : "";

                const quoteRaw = report?.rfqType?.trim();

                let rfqType = "";
                if (quoteRaw) {
                    const lowerCaseQuoteRaw = quoteRaw.toLowerCase();
                    if (lowerCaseQuoteRaw === "quoteandproof") {
                        rfqType = "Quote and Proof Request";
                    } else {
                        rfqType = `${capitalizeText(quoteRaw)} Request`;
                    }
                } else {
                    rfqType = "Quote Request";
                }

                const dateTimeValue = report?.createdDate ? <>{formatDate(report?.createdDateUtc)}</> : "";
                let reportVal = null;
                if (resources?.IsRFQEnabled === true || resources?.IsRFQEnabled === "True" || resources?.IsRFQEnabled === "true") {
                    reportVal = [
                        report?.requestQuoteNumber,
                        report?.requestQuoteItems?.map((item) => item?.productName).join(", ") || "",
                        dateTimeValue,
                        report?.requestQuoteItems?.reduce((total, item) => total + (item?.quantity || 0), 0),
                        capitalizedText,
                        <select onChange={(e) => handleStatusChange(e, report)}>
                            {statusOptions.map((option) => (
                                <option selected={report?.status === option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>,
                        rfqType,
                        editDataReport
                    ];
                } else {
                    reportVal = [report?.requestQuoteItems?.map((item) => item?.productName).join(", ") || "", dateTimeValue, report?.requestQuoteItems?.reduce((total, item) => total + (item?.quantity || 0), 0), capitalizedText, editDataReport];
                }

                allData.push(reportVal);
            });
        }
        setTotalRecords(data?.requestQuoteReport?.totalCount);
        setData(allData);
        return allData;
    };

    useEffect(() => {
        if (filters) {
            refetch(filters);
        }
        if (data) {
            setTotalRecords(data?.requestQuoteReport?.totalCount);
            reportData();
        }
        if (data?.requestQuoteReport?.items) {
            setStatuses(data.requestQuoteReport.items.map((item) => item?.statusOptions || item?.status));
        }
    }, [filters, data?.requestQuoteReport?.items, selectedStatus]);

    const getOrderReportImageUrl = (imageName) => {
        const defaultImageUrl = `${CDN_URL}/${WEBSITE_GUID}/Products/Medium/default.jpg`;
        return imageName ? `${CDN_URL}/${WEBSITE_GUID}/Products/Medium/${imageName}` : defaultImageUrl;
    };

    return (
        <section className="body-container midContent">
            <div className="usermanagement-container">
                <div className="midCotWrap salesCard orderRequestReport">
                    <div className="search-bar cardSection">
                        <div className="search-bar-controls">
                            <div className="select-wrapper mb-2" />
                            <div className="header-second">
                                <div className="sort_warp">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="Default" id="dropdown-basic" className="sortby-dropdown-toggle listingSotyBy clsOrderReport_SortingNew">
                                            {selectedSortOption || "Sort By"}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "createdDateUtc", columnName: "Created Date", direction: "DESC", displayoption: "Date - Newest to Oldest" })}>Date - Newest to Oldest</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "createdDateUtc", columnName: "Created Date", direction: "ASC", displayoption: "Date - Oldest to Newest" })}>Date - Oldest to Newest</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="date-input-wrapper clsOrderReport_DateNew mb-2 cus_wid">
                                    <input id="FromDate" className="textbox-n" type="date" aria-label="fromdate" onChange={handlefromdate} onClick={handleCalendarClick} value={fromDate} placeholder="From Date" />
                                    <input id="ToDate" className="textbox-n" type="date" aria-label="expiredate" onChange={handletodate} onClick={handleCalendarClick} value={toDate} placeholder="To Date" />
                                </div>

                                <div className="searchBox_Sect mb-2 d-flex cus_wid clsOrderReport_SearchNew">
                                    <div className="proLeftSect">
                                        <div className="input-wrapper">
                                            <input type="search" id="searchItem" name="searchItem" aria-label="Search" onChange={handleSearch} value={search} placeholder="Product Name" />
                                        </div>
                                    </div>

                                    {(resources?.IsRFQEnabled === true || resources?.IsRFQEnabled === "True" || resources?.IsRFQEnabled === "true") && (
                                        <div className="proRgtSect">
                                            <div className="input-wrapper selectStatus_Report">
                                                <select id="selectStatus" name="selectStatus" aria-label="Select Status" onChange={selectStatus} value={selStatus}>
                                                    <option value="">Select Status</option>
                                                    {statusOptions.map((option) => (
                                                        <option value={getOptionValue(option)}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="search-bar-buttons mb-2 cus_wid">
                                    <button type="button" className="btn btn_search clsOrderReport_SearchButtonNew" onClick={() => onSearch()}>
                                        Search
                                    </button>
                                    <button type="button" onClick={handleReset} className="reset btn btn_reset blue_bg clsOrderReport_ResetButtonNew">
                                        Reset
                                    </button>
                                    <button type="button" id="cpContent_btnExport" className="btn btn-export export-icon clsOrderReport_Export" value="Export" onClick={handleExportClick}>
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

                        <div className="card-wrapper req_quote_Cards">
                            <div className="card">
                                <div className="card-icon">
                                    <FontAwesomeIcon icon={faCubes} size="3x" />
                                </div>
                                <div className="title_val">
                                    <div className="card-title">Avg Orders</div>
                                    <div className="card-value">{Number.isNaN(parseFloat(data?.requestQuoteReport?.quoteAverage?.quoteAvgQuantity)) ? "0.00" : parseFloat(data?.requestQuoteReport?.quoteAverage?.quoteAvgQuantity).toFixed(2)}</div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-icon">
                                    <FontAwesomeIcon icon={faMoneyBillAlt} size="3x" />
                                </div>
                                <div className="title_val">
                                    <div className="card-title">Avg Sales</div>
                                    <div className="card-value">${Number.isNaN(parseFloat(data?.requestQuoteReport?.quoteAverage?.quoteAvgPrice)) ? "0.00" : parseFloat(data?.requestQuoteReport?.quoteAverage?.quoteAvgPrice).toFixed(2)}</div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-icon">
                                    <FontAwesomeIcon icon={faMoneyBillAlt} size="3x" />
                                </div>
                                <div className="title_val">
                                    <div className="card-title">Avg Request Quote Amount</div>
                                    <div className="card-value">${Number.isNaN(parseFloat(data?.requestQuoteReport?.quoteAverage?.totalQuotePrice)) ? "0.00" : parseFloat(data?.requestQuoteReport?.quoteAverage?.totalQuotePrice).toFixed(2)}</div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-icon">
                                    <FontAwesomeIcon icon={faBox} size="3x" />
                                </div>
                                <div className="title_val">
                                    <div className="card-title">Most Sellable Product</div>
                                    <Link
                                        to={`/product/${data?.requestQuoteReport?.quoteAverage?.productName}/${data?.requestQuoteReport?.quoteAverage?.productCode}`}
                                        className="card-value"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open(`${window.location.origin}/product/${data?.requestQuoteReport?.quoteAverage?.productName}/${data?.requestQuoteReport?.quoteAverage?.productCode}`, "_blank");
                                        }}
                                    >
                                        {data?.requestQuoteReport?.quoteAverage?.productName ? data.requestQuoteReport?.quoteAverage.productCode : "0"}
                                    </Link>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-icon">
                                    <FontAwesomeIcon icon={faMoneyBillAlt} size="3x" />
                                </div>
                                <div className="title_val">
                                    <div className="card-title">Grand Total Sales Amount</div>
                                    <div className="card-value">${Number.isNaN(parseFloat(data?.requestQuoteReport?.quoteAverage?.totalQuoteItemPrice)) ? "0.00" : parseFloat(data?.requestQuoteReport?.quoteAverage?.totalQuoteItemPrice).toFixed(2)}</div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-icon">
                                    <FontAwesomeIcon icon={faMoneyBillAlt} size="3x" />
                                </div>
                                <div className="title_val">
                                    <div className="card-title">Merchandise Sales Amount</div>
                                    <div className="card-value">${Number.isNaN(parseFloat(data?.requestQuoteReport?.quoteAverage?.totalQuoteItemChargePrice)) ? "0.00" : parseFloat(data?.requestQuoteReport?.quoteAverage?.totalQuoteItemChargePrice).toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {showPopup && (
                        <div>
                            <div className="popup">
                                <div className="popup-content reportViewPopup">
                                    <span className="close" onClick={handleClosePopup} aria-label="Close">
                                        &times;
                                    </span>
                                    <div className="title-info popup-image1">
                                        <p className="text-cap">Request Quote Details</p>
                                    </div>
                                    <div className="tableBody">
                                        <div className="tableData ">
                                            <table className="order-details-table">
                                                <tbody>
                                                    {editData?.requestQuoteNumber && (
                                                        <tr>
                                                            <td>
                                                                <b>Request Quote Number</b>
                                                            </td>
                                                            <td>{editData?.requestQuoteNumber ?? "NA"}</td>
                                                        </tr>
                                                    )}
                                                    {editData?.note && (
                                                        <tr>
                                                            <td>
                                                                <b>Note </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.note : "-"}</td>
                                                        </tr>
                                                    )}
                                                    {editData?.firstName && (
                                                        <tr>
                                                            <td>
                                                                <b>First Name </b>
                                                            </td>
                                                            <td>{editData !== null ? `${editData?.firstName}` : "-"}</td>
                                                        </tr>
                                                    )}
                                                    {editData?.lastName && (
                                                        <tr>
                                                            <td>
                                                                <b>Last Name </b>
                                                            </td>
                                                            <td>{editData !== null ? `${editData?.lastName}` : "-"}</td>
                                                        </tr>
                                                    )}
                                                    {editData?.emailAddress && (
                                                        <tr>
                                                            <td>
                                                                <b>Email Address</b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.emailAddress : "-"}</td>
                                                        </tr>
                                                    )}
                                                    {editData?.extensionNo && (
                                                        <tr>
                                                            <td>
                                                                <b>Extension </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.extensionNo : "-"}</td>
                                                        </tr>
                                                    )}
                                                    {editData?.phone && (
                                                        <tr>
                                                            <td>
                                                                <b>Contact No </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.phone : "-"}</td>
                                                        </tr>
                                                    )}
                                                    {(editData?.companyName || editData?.billingInformation?.billingCompanyName) && (
                                                        <tr>
                                                            <td>
                                                                <b>Company Name </b>
                                                            </td>
                                                            <td>{editData?.companyName || editData?.billingInformation?.billingCompanyName || ""}</td>
                                                        </tr>
                                                    )}
                                                    {editData?.address1 && (
                                                        <tr>
                                                            <td>
                                                                <b>Address Line1</b>
                                                            </td>
                                                            <td>{editData !== null ? `${editData?.address1}` : "-"}</td>
                                                        </tr>
                                                    )}
                                                    {editData?.address2 && (
                                                        <tr>
                                                            <td>
                                                                <b>Address Line2</b>
                                                            </td>
                                                            <td>{editData !== null ? `${editData?.address2}` : "-"}</td>
                                                        </tr>
                                                    )}
                                                    {editData?.city && (
                                                        <tr>
                                                            <td>
                                                                <b>City </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.city : "-"}</td>
                                                        </tr>
                                                    )}
                                                    {statename && (
                                                        <tr>
                                                            <td>
                                                                <b>State </b>
                                                            </td>
                                                            <td>{editData !== null && `${statename}`}</td>
                                                        </tr>
                                                    )}

                                                    {countryname && (
                                                        <tr>
                                                            <td>
                                                                <b>Country </b>
                                                            </td>
                                                            <td>{editData !== null && `${countryname}`}</td>
                                                        </tr>
                                                    )}
                                                    {editData?.zip && (
                                                        <tr>
                                                            <td>
                                                                <b>Zipcode </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.zip : "-"}</td>
                                                        </tr>
                                                    )}

                                                    {editData?.asi && (
                                                        <tr>
                                                            <td>
                                                                <b>ASI</b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.asi : ""}</td>
                                                        </tr>
                                                    )}

                                                    {editData?.ppai && (
                                                        <tr>
                                                            <td>
                                                                <b>PPAI</b>
                                                            </td>
                                                            <td>{editData?.ppai}</td>
                                                        </tr>
                                                    )}

                                                    {editData?.sage && (
                                                        <tr>
                                                            <td>
                                                                <b>SAGE</b>
                                                            </td>
                                                            <td>{editData?.sage}</td>
                                                        </tr>
                                                    )}

                                                    {editData?.upic && (
                                                        <tr>
                                                            <td>
                                                                <b>UPIC</b>
                                                            </td>
                                                            <td>{editData?.upic}</td>
                                                        </tr>
                                                    )}
                                                    {(resources?.IsRFQEnabled === true || resources?.IsRFQEnabled === "True" || resources?.IsRFQEnabled === "true") && (
                                                        <>
                                                            <tr>
                                                                <td className="font1rem">
                                                                    <b>Billing Address:</b>
                                                                </td>
                                                            </tr>
                                                            {editData?.billingInformation?.billingFirstName && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Billing First Name</b>
                                                                    </td>
                                                                    <td>{editData?.billingInformation?.billingFirstName ?? "NA"}</td>
                                                                </tr>
                                                            )}
                                                            {editData?.billingInformation?.billingLastName && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Billing Last Name</b>
                                                                    </td>
                                                                    <td>{editData?.billingInformation?.billingLastName ?? "NA"}</td>
                                                                </tr>
                                                            )}
                                                            {editData?.billingInformation?.billingEmailId && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Billing Email Id</b>
                                                                    </td>
                                                                    <td>{editData !== null ? editData?.billingInformation?.billingEmailId : "-"}</td>
                                                                </tr>
                                                            )}
                                                            {editData?.billingInformation?.billingCompanyName && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Billing Company Name</b>
                                                                    </td>
                                                                    <td>{editData !== null ? editData?.billingInformation?.billingCompanyName : "-"}</td>
                                                                </tr>
                                                            )}

                                                            {editData?.billingInformation?.billingAddress1 && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Billing Address1</b>
                                                                    </td>
                                                                    <td>{editData !== null ? editData?.billingInformation?.billingAddress1 : "-"}</td>
                                                                </tr>
                                                            )}
                                                            {editData?.billingInformation?.billingAddress2 && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Billing Address2</b>
                                                                    </td>
                                                                    <td>{editData !== null ? editData?.billingInformation?.billingAddress2 : "-"}</td>
                                                                </tr>
                                                            )}
                                                            {editData?.billingInformation?.billingCity && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Billing City</b>
                                                                    </td>
                                                                    <td>{editData !== null ? editData?.billingInformation?.billingCity : "-"}</td>
                                                                </tr>
                                                            )}
                                                            {billingStatename && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Billing State</b>
                                                                    </td>
                                                                    <td>{editData !== null && `${billingStatename}`}</td>
                                                                </tr>
                                                            )}
                                                            {editData?.billingInformation?.billingZip && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Billing Zipcode</b>
                                                                    </td>
                                                                    <td>{editData !== null ? editData?.billingInformation?.billingZip : "-"}</td>
                                                                </tr>
                                                            )}
                                                            {editData?.billingInformation?.billingExtensionNo && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Billing Extension</b>
                                                                    </td>
                                                                    <td>{editData !== null ? editData?.billingInformation?.billingExtensionNo : "-"}</td>
                                                                </tr>
                                                            )}
                                                            {editData?.billingInformation?.billingPhone && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Billing Contact No</b>
                                                                    </td>
                                                                    <td>{editData !== null ? editData?.billingInformation?.billingPhone : "-"}</td>
                                                                </tr>
                                                            )}
                                                            <tr>
                                                                <td className="font1rem">
                                                                    <b>Shipping Address:</b>
                                                                </td>
                                                            </tr>
                                                            {editData?.shippingInformation?.shippingFirstName && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Shipping First Name</b>
                                                                    </td>
                                                                    <td>{editData?.shippingInformation?.shippingFirstName ?? "NA"}</td>
                                                                </tr>
                                                            )}
                                                            {editData?.shippingInformation?.shippingLastName && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Shipping Last Name</b>
                                                                    </td>
                                                                    <td>{editData?.shippingInformation?.shippingLastName ?? "NA"}</td>
                                                                </tr>
                                                            )}
                                                            {editData?.shippingInformation?.shippingEmailId && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Shipping Email Id</b>
                                                                    </td>
                                                                    <td>{editData !== null ? editData?.shippingInformation?.shippingEmailId : "-"}</td>
                                                                </tr>
                                                            )}
                                                            {editData?.shippingInformation?.shippingCompanyName && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Shipping Company Name</b>
                                                                    </td>
                                                                    <td>{editData !== null ? editData?.shippingInformation?.shippingCompanyName : "-"}</td>
                                                                </tr>
                                                            )}

                                                            {editData?.shippingInformation?.shippingAddress1 && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Shipping Address1</b>
                                                                    </td>
                                                                    <td>{editData?.shippingInformation?.shippingAddress1 ?? "NA"}</td>
                                                                </tr>
                                                            )}
                                                            {editData?.shippingInformation?.shippingAddress2 && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Shipping Address2</b>
                                                                    </td>
                                                                    <td>{editData?.shippingInformation?.shippingAddress2 ?? "NA"}</td>
                                                                </tr>
                                                            )}
                                                            {editData?.shippingInformation?.shippingCity && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Shipping City</b>
                                                                    </td>
                                                                    <td>{editData !== null ? editData?.shippingInformation?.shippingCity : "-"}</td>
                                                                </tr>
                                                            )}
                                                            {shippingStatename && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Shipping State</b>
                                                                    </td>
                                                                    <td>{editData !== null && `${shippingStatename}`}</td>
                                                                </tr>
                                                            )}
                                                            {editData?.shippingInformation?.shippingZip && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Shipping Zipcode</b>
                                                                    </td>
                                                                    <td>{editData !== null ? editData?.shippingInformation?.shippingZip : "-"}</td>
                                                                </tr>
                                                            )}
                                                            {editData?.shippingInformation?.shippingExtensionNo && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Shipping Extension</b>
                                                                    </td>
                                                                    <td>{editData !== null ? editData?.shippingInformation?.shippingExtensionNo : "-"}</td>
                                                                </tr>
                                                            )}
                                                            {editData?.shippingInformation?.shippingPhone && (
                                                                <tr>
                                                                    <td>
                                                                        <b>Shipping Contact No</b>
                                                                    </td>
                                                                    <td>{editData !== null ? editData?.shippingInformation?.shippingPhone : "-"}</td>
                                                                </tr>
                                                            )}
                                                        </>
                                                    )}

                                                    {editData?.requestQuoteItems && editData?.requestQuoteItems.length > 0 ? (
                                                        editData?.requestQuoteItems.map((item, index) => (
                                                            <React.Fragment key={item?.productCode || index}>
                                                                <tr>
                                                                    <td className="font1rem">
                                                                        <b>Product Details:</b>
                                                                    </td>
                                                                </tr>
                                                                {editData?.null && (
                                                                    <tr>
                                                                        <td>
                                                                            <b>Line #{index + 1}</b>
                                                                        </td>
                                                                        <td>{editData !== null ? editData?.null : ""}</td>
                                                                    </tr>
                                                                )}
                                                                {item?.productCode && (
                                                                    <tr>
                                                                        <td>
                                                                            <b>{item?.productCode ? `${item.productCode} - ${item.productName}` : "-"}</b>
                                                                        </td>
                                                                        <td>
                                                                            <img
                                                                                src={getOrderReportImageUrl(item?.imageName)}
                                                                                className="viewTbl_img"
                                                                                alt="reportImg"
                                                                                onError={(e) => {
                                                                                    e.target.src = `${CDN_URL}/${WEBSITE_GUID}/Products/Medium/default.jpg`;
                                                                                }}
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                                {item?.quantity && (
                                                                    <tr>
                                                                        <td>
                                                                            <b>Quantity </b>
                                                                        </td>
                                                                        <td>{item?.quantity ?? ""}</td>
                                                                    </tr>
                                                                )}
                                                                {(resources?.IsRFQEnabled === true || resources?.IsRFQEnabled === "True" || resources?.IsRFQEnabled === "true") && item?.color && (
                                                                    <tr>
                                                                        <td>
                                                                            <b>Color </b>
                                                                        </td>
                                                                        <td>{item?.color ?? ""}</td>
                                                                    </tr>
                                                                )}
                                                                {item?.price && (
                                                                    <tr>
                                                                        <td>
                                                                            <b>Unit Cost </b>
                                                                        </td>
                                                                        <td>{item?.price ? `$ ${item.price.toFixed(2)}` : ""}</td>
                                                                    </tr>
                                                                )}

                                                                {item?.imprintMethodName && (
                                                                    <tr>
                                                                        <td>
                                                                            <b>Imprint Method </b>
                                                                        </td>
                                                                        <td>{item?.imprintMethodName || ""}</td>
                                                                    </tr>
                                                                )}
                                                                {item?.imprintLocations && (
                                                                    <tr>
                                                                        <td>
                                                                            <b>Imprint Location & Color </b>
                                                                        </td>
                                                                        <td>
                                                                            {item?.imprintLocations?.length > 0 ? (
                                                                                <>
                                                                                    {item.imprintLocations.map((location) => (
                                                                                        <div key={location?.imprintLocationName || location?.id}>
                                                                                            {location?.imprintLocationName || ""} -{" "}
                                                                                            {location?.imprintColors?.length > 0
                                                                                                ? location.imprintColors.map((color, i) => (
                                                                                                    <span key={color}>
                                                                                                        {color}
                                                                                                        {i < location.imprintColors.length - 1 ? ", " : ""}
                                                                                                    </span>
                                                                                                ))
                                                                                                : ""}
                                                                                        </div>
                                                                                    ))}
                                                                                </>
                                                                            ) : (
                                                                                ""
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </React.Fragment>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={6}>No items found</td>
                                                        </tr>
                                                    )}

                                                    {editData?.totalOrderPrice !== undefined && editData?.totalOrderPrice !== null && editData?.totalOrderPrice !== 0 && (
                                                        <tr>
                                                            <td>
                                                                <b>SubTotal </b>
                                                            </td>
                                                            <td>{editData?.totalOrderPrice !== undefined && editData?.totalOrderPrice !== null ? `$ ${editData.totalOrderPrice.toFixed(2)}` : ""}</td>
                                                        </tr>
                                                    )}
                                                    {(resources?.IsRFQEnabled === true || resources?.IsRFQEnabled === "True" || resources?.IsRFQEnabled === "true") && editData?.note && (
                                                        <tr>
                                                            <td>
                                                                <b>Comments </b>
                                                            </td>
                                                            <td>
                                                                {editData?.note ? (
                                                                    <>
                                                                        Customer: {editData.note} <br />
                                                                        <br />
                                                                        {editData?.createdDate ? formatDateTime(editData?.createdDateUtc) : ""}
                                                                    </>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )}
                                                    {editData?.status && (
                                                        <tr>
                                                            <td>
                                                                <b>Status </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.status : ""}</td>
                                                            {console.log("Current Status:", editData?.status)}
                                                        </tr>
                                                    )}

                                                    {(editData?.deliveryDate || editData?.needQuoteby) && (
                                                        <tr>
                                                            <td>
                                                                <b>Requested Delivery Date </b>
                                                            </td>
                                                            <td>{editData?.deliveryDate ? formatDate(editData.deliveryDate.split("T")[0]) : formatDate(editData?.needQuoteby ?? "")}</td>
                                                        </tr>
                                                    )}
                                                    {editData?.createdBy && (
                                                        <tr>
                                                            <td>
                                                                <b>Created By </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.createdBy : ""}</td>
                                                        </tr>
                                                    )}
                                                    {editData?.createdDateUtc && (
                                                        <tr>
                                                            <td>
                                                                <b>Created Date </b>
                                                            </td>
                                                            <td>{formatDate(editData?.createdDateUtc ?? "")}</td>
                                                        </tr>
                                                    )}
                                                    {editData?.basketFreightCharges && (
                                                        <tr>
                                                            <td>
                                                                <b>Freight Charges </b>
                                                            </td>
                                                            <td>{editData?.basketFreightCharges ? `$ ${editData?.basketFreightCharges}` : ""}</td>
                                                        </tr>
                                                    )}
                                                    {editData?.totalOrderPrice !== undefined && editData?.totalOrderPrice !== null && editData?.totalOrderPrice !== 0 && (
                                                        <tr>
                                                            <td>
                                                                <b>Total Order Price </b>
                                                            </td>
                                                            <td>{editData?.totalOrderPrice !== undefined && editData?.totalOrderPrice !== null ? `$ ${editData.totalOrderPrice.toFixed(2)}` : ""}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="popup-overlay" onClick={handleClosePopup} />
                            </div>
                        </div>
                    )}
                    <div id="usrtable1 reportPage">
                        <section className="all_user">
                            {!loading && <ShowingResults pageRecords={PagePerRecord < totalRecord ? PagePerRecord : totalRecord} totalRecords={totalRecord} currentPage={currentPage} labelName="Record" />}
                            <Table data={Data} columns={columns} columnAlignments={columnAlignments} loading={loading} handlePreviewClick={handlePreviewClick} basicLink={basicLink} />
                        </section>
                    </div>
                    <div className="mainPagination">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderRequestReport;
