import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { PopupV3 } from "common/utils";
import { GetProductDataFromReOrder, GetOrderPopup, usePrintData, useUpdateOrderList, SaveTrackingDetails } from "common/hooks/react/api";
import { useQueryGetOrderReport } from "common/components/graphQL/queries/Reports/useQueryGetOrderReport";
import { MS_URL, CDN_URL } from "common/utils/vars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes, faMoneyBillAlt, faBox, faPrint, faCopy } from "@fortawesome/free-solid-svg-icons";
import Table from "../../../components/common/Table";
import { LANGUAGE_GUID, WEBSITE_GUID } from "../../../components/common/vars";
import ShowingResults from "../../../components/ShowingResult";
import Pagination from "../../../components/Pagination/Paginationindex";
import "../Report.scss";

const OrderReport = () => {
    const PagePerRecord = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [fromDate, setFromdate] = useState();
    const [toDate, setTodate] = useState();
    const basicLink = `${MS_URL.ORDER}api/order/ExportOrders/${WEBSITE_GUID}/${LANGUAGE_GUID}`;
    const [, setExportLink] = useState(basicLink);
    const [Data, setData] = useState(null);
    const [totalRecord, setTotalRecords] = useState(0);
    const totalPages = Math.ceil(totalRecord / PagePerRecord);
    const [search, setSearch] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchCompany, setSearchCompany] = useState("");
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

    const { data, refetch, loading } = useQuery(useQueryGetOrderReport, { variables: filters });
    const [showPopup, setShowPopup] = useState(false);
    const [editData, setEditdata] = useState([]);

    const [startDateInputType, setStartDateInputType] = useState("text");
    const [endDateInputType, setEndDateInputType] = useState("text");

    const { mutateAsync: orderpopup } = GetOrderPopup();
    const handlePreviewClick = async (editdata) => {
        const test = editdata[9][1];
        const testOrder = { orderguid: editdata[9][1]?.orderGuid };
        setEditdata(test);
        setShowPopup(true);
        await orderpopup({ orderguid: testOrder.orderguid });
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const formatDate = (dateString) => {
        const options = { month: "short", day: "2-digit", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

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

    const reportData = () => {
        const allData = [];

        if (data.orderReport !== undefined && data?.orderReport?.items?.length > 0) {
            const dataForReport = data?.orderReport?.items;
            dataForReport?.forEach((report) => {
                const editDataReport = ["Edit", report];

                const billingCompanyName = report?.billingInformation?.billingCompanyName?.trim();
                const capitalizedText = billingCompanyName
                    ? billingCompanyName
                        .split(" ")
                        .map((txt) => txt[0].toUpperCase() + txt.slice(1).toLowerCase())
                        .join(" ")
                    : "";

                const currencyCode = "USD";

                const reportVal = [report?.orderNumber, report?.createdDateUtc ? formatDate(report?.createdDateUtc) : "", capitalizedText, report?.emailId, `$${report?.totalOrderPrice}`, currencyCode, report?.status, report?.trackingDetais, report?.basketFreightCharges != null ? `$${report?.basketFreightCharges}` : "", editDataReport];

                allData.push(reportVal);
            });
        }
        setTotalRecords(data?.orderReport?.totalCount);
        setData(allData);
        return allData;
    };

    useEffect(() => {
        if (filters) {
            refetch(filters);
        }

        if (data) {
            setTotalRecords(data?.orderReport?.totalCount);
            reportData();
        }
    }, [filters, data?.orderReport?.items]);

    const columns = ["Order Number", "Order Date", "Company Name", "Email Id", "Amount", "Code", "Status", "Tracking Info", "Freight Charges", "Actions"];
    const columnAlignments = {
        "Order Number": "order-no text-no-ellipsis",
        "Order Date": "order-date text-no-ellipsis",
        "Company Name": "nameList text-no-ellipsis",
        "Email ID": "email_Id text-no-ellipsis",
        Amount: "amount text-no-ellipsis",
        Code: "country text-no-ellipsis",
        Status: "status text-no-ellipsis",
        "Tracking Info": "tracking text-no-ellipsis",
        "Freight Charges": "freight text-no-ellipsis",
        View: "actionbtn text-no-ellipsis"
    };

    const handlePageChange = async (newPage) => {
        setCurrentPage(newPage);
        setFilters((prevFilters) => ({
            ...prevFilters,
            skip: newPage
        }));
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

        if (search && search.trim()) {
            const trimmedSearch = search.replace(/\s+/g, " ").trim();
            filter.or = {
                companyName: { contain: trimmedSearch.toLowerCase() },
                emailAddress: { contain: trimmedSearch.toLowerCase() },
                orderNumber: { contain: trimmedSearch.toLowerCase() }
            };
            link = `${link}&searchtext=${trimmedSearch}`;
            setExportLink(link);
        }

        if (fromDate && toDate) {
            const todate = addOneDay(toDate);
            filter.createdDate = { gte: fromDate, lte: todate };
            link += `&fromDate=${fromDate}&toDate=${todate}`;
        }
        setFilters((prevFilters) => ({
            ...prevFilters,
            where: filter
        }));

        filter.websiteGuid = { eq: WEBSITE_GUID };

        setExportLink(link);
        return filter;
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setFilters((prevFilters) => ({
            ...prevFilters,
            skip: 1,
            take: 10,
            where: constructWhereClauseNew()
        }));
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

    const handleReset = () => {
        setFromdate("");
        setTodate("");
        setSearch("");
        setSearchCompany("");
        setSearchEmail("");
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

    const handlefromdate = (e) => {
        const selectedDate = e.target.value;
        setFromdate(selectedDate);
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
            setFromdate("");
        }
    };

    const handletodate = (e) => {
        const selectedDate = e.target.value;
        setTodate(selectedDate);
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
                setTodate("");
            } else if (isWithinThreeMonths(fromDate, selectedDate)) {
                PopupV3({
                    content: "Please select date range between three months",
                    type: "Warning",
                    title: "Warning",
                    actions: [
                        {
                            dismiss: true,
                            text: "OK"
                        }
                    ]
                });
                setTodate("");
            }
        }
    };

    const onSearch = () => {
        if (search === "" && searchEmail === "" && searchCompany === "" && toDate === "" && fromDate === "") {
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
        } else {
            setCurrentPage(1);
            const newFilters = {
                ...filters,
                skip: 1,
                take: 10,
                where: constructWhereClauseNew(),
                order: { createdDateUtc: "DESC" }
            };

            refetch({ filters: newFilters });
        }
    };

    const handleExportClick = () => {
        const objdata = {
            FromDate: fromDate,
            Todate: toDate,
            searchValue: search,
            WebsiteGuid: WEBSITE_GUID,
            LanguageGuid: LANGUAGE_GUID,
            defaultLanguageGuid: LANGUAGE_GUID,
            IsShippingEmail: false
        };
        window.open(`${MS_URL.ORDER}api/order/ExportOrders?filter=${encodeURIComponent(JSON.stringify(objdata))}`, "_blank");
    };

    const handleNSExportClick = () => {
        const objdataNS = {
            FromDate: fromDate,
            Todate: toDate,
            searchValue: search,
            WebsiteGuid: WEBSITE_GUID,
            LanguageGuid: LANGUAGE_GUID,
            defaultLanguageGuid: LANGUAGE_GUID,
            IsShippingEmail: false
        };
        window.open(`${MS_URL.ORDER}api/order/NSReport?filter=${encodeURIComponent(JSON.stringify(objdataNS))}`, "_blank");
    };

    const { mutateAsync: callPrintData } = usePrintData();

    const handlePrint = async (row) => {
        const printData = await callPrintData({
            orderguid: row[9][1]?.orderGuid,
            userguid: row[9][1]?.userGuid
        });

        if (printData && printData.trim() !== "") {
            const frame1 = document.createElement("iframe");
            frame1.name = "frame1";
            frame1.style.position = "absolute";
            frame1.style.top = "-1000000px";
            document.body.appendChild(frame1);

            let frameDoc;

            if (frame1.contentWindow) {
                frameDoc = frame1.contentWindow;
            } else if (frame1.contentDocument && frame1.contentDocument.document) {
                frameDoc = frame1.contentDocument.document;
            } else {
                frameDoc = frame1.contentDocument;
            }

            frameDoc.document.open();
            frameDoc.document.write(`
                <html>
                    <head>
                        <title>Order Details</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                margin: 20px;
                                padding: 10px;
                            }
                            .OrderDetailsRow {
                                border: 1px solid #ddd;
                                padding: 20px;
                                margin-top: 10px;
                            }
                            .header {
                                text-align: center;
                                font-size: 18px;
                                font-weight: bold;
                                margin-bottom: 20px;
                            }
                            .content {
                                margin-top: 10px;
                            }
                        </style>
                    </head>
                    <body class="OrderDetailsRow">
                        <div class="header">Order Details</div>
                        <div class="content">
                            ${printData}
                        </div>
                    </body>
                </html>
            `);
            frameDoc.document.close();

            setTimeout(() => {
                window.frame1.focus();
                const animsitionLoading = document.querySelector(".animsition-loading");
                if (animsitionLoading) {
                    animsitionLoading.style.display = "none";
                }
                window.frame1.print();
                document.body.removeChild(frame1);
            }, 2000);
            return false;
        }
        return null;
    };

    const { mutateAsync: duplicateOrder } = GetProductDataFromReOrder();
    const handleCopy = (row) => {
        PopupV3({
            content: "Are you sure, You want to create a duplicate order ?",
            type: "Alert",
            title: "Confirm Action",
            actions: [
                {
                    text: "Yes",
                    dismiss: true,
                    do: async () => {
                        try {
                            await duplicateOrder({
                                orderguid: row[9][1]?.orderGuid,
                                currencyguid: row[9][1]?.currencyGuid,
                                ordernumber: row[9][1]?.orderNumber
                            });
                            PopupV3({
                                content: "Items added to cart successfully",
                                type: "Success",
                                title: "Success",
                                actions: [
                                    {
                                        dismiss: true,
                                        text: "OK"
                                    }
                                ]
                            });
                        } catch (error) {
                            PopupV3({
                                content: "Failed to duplicate order",
                                type: "Error",
                                title: "Error",
                                actions: [
                                    {
                                        dismiss: true,
                                        text: "OK"
                                    }
                                ]
                            });
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

    const [statuses, setStatuses] = useState([]);
    const [trackingDetails, setTrackingDetails] = useState("");
    const [oderguid, setOderguid] = useState("");
    const { mutateAsync: callGetStatus } = useUpdateOrderList();
    const { mutateAsync: callTrackingapi } = SaveTrackingDetails();

    const [selectedRow, setSelectedRow] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (data && data.orderReport && data.orderReport.items) {
            setStatuses(data.orderReport.items.map((item) => item.status || ""));
        }

        if (data) {
            setTrackingDetails(data?.trackingDetais);
        }
    }, [data]);

    const handleStatusChange = async (event, rowIndex) => {
        const newStatuses = [...statuses];
        const newStatus = event.target.value;
        newStatuses[rowIndex] = newStatus;
        setStatuses(newStatuses);
        await callGetStatus({ orderguid: data?.orderReport?.items[rowIndex]?.orderGuid, status: newStatus });
    };

    const handleTrackingClick = (row) => {
        setSelectedRow(row);
        setShowModal(true);
        setOderguid(row[9][1].orderGuid);
        setTrackingDetails(row[9][1].trackingDetais);
    };

    const handleSubmit = async () => {
        await callTrackingapi({
            orderGuid: oderguid,
            trackingDetais: trackingDetails
        });

        setTrackingDetails(selectedRow[9][1].trackingDetais);
        setShowSuccess(true);
    };

    const handleSuccessClose = (row) => {
        setShowSuccess(false);
        setShowModal(false);
        setTrackingDetails(row[9][1].trackingDetais);
        handleSubmit();
    };

    const customButtons = (row) => (
        <>
            <button type="button" className="tblbtn-icon print_order" title="Print" onClick={() => handlePrint(row)} aria-label="Print">
                <FontAwesomeIcon icon={faPrint} />
            </button>
            <button type="button" className="tblbtn-icon duplicate_order" title="Duplicate Order" onClick={() => handleCopy(row)} aria-label="Duplicate">
                <FontAwesomeIcon icon={faCopy} />
            </button>
        </>
    );

    const getOrderReportImageUrl = (imageName) => {
        const defaultImageUrl = `${CDN_URL}/8FF00A25-B6ED-4799-9D2F-412DBA1F7C66/Products/Medium/default.jpg`;
        return imageName ? `${CDN_URL}/${WEBSITE_GUID}/Products/Medium/${imageName}` : defaultImageUrl;
    };
    const [, prdData] = useState([]);
    const [, setColumnName] = useState("");
    const [sortDirection, setSortDirection] = useState("DSC");
    const [sorting, setsorting] = useState(false);
    const [, setSortConfig] = useState({ key: "Orders", direction: sortDirection });
    const [selectedSortOption, setSelectedSortOption] = useState("Sort By");

    const handleDropdownSort = async (columnName) => {
        setColumnName(columnName);
        setSortDirection(columnName.direction);
        setSortConfig({ key: columnName.columnName, direction: columnName.direction });
        setSelectedSortOption(columnName.displayoption);

        setFilters((prevFilters) => ({
            ...prevFilters,
            order: { [columnName.dbColname]: columnName.direction }
        }));

        await refetch(filters);
    };

    useEffect(() => {
        if (sorting) {
            setsorting(true);
        }
    }, [sorting, prdData]);

    return (
        <section className="body-container midContent">
            <div className="usermanagement-container">
                <div className="midCotWrap salesCard orderReport">
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
                                            <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "createdDateUtc", columnName: "Order Date", direction: "ASC", displayoption: "Order Date Newest" })}>Order Date - Newest</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "createdDateUtc", columnName: "Order Date", direction: "DESC", displayoption: "Order Date Oldest" })}>Order Date - Oldest</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "orderNumber", columnName: "Order Number", direction: "ASC", displayoption: "Order Number Newest" })}>Order No - Newest</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "orderNumber", columnName: "Order Number", direction: "DESC", displayoption: "Order Number Oldest" })}>Order No - Oldest</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="mb-2 w-20">
                                    <div className="date-input-wrapper clsOrderReport_DateNew">
                                        <input id="FromDate" className="textbox-n" type={startDateInputType} aria-label="fromdate" onChange={handlefromdate} value={fromDate} placeholder="From Date" onFocus={handleFocusStartDate} onBlur={handleBlur} />
                                        <input id="ToDate" className="textbox-n" type={endDateInputType} aria-label="expiredate" onChange={handletodate} value={toDate} placeholder="To Date" onFocus={handleFocusEndDate} onBlur={handleBlur} />
                                    </div>
                                </div>

                                <div className="input-wrapper mb-2 w-50 clsSalesReport_SearchNew">
                                    <input type="search" id="searchItem" className="clsOrderReport_SearchNew" name="searchItem" aria-label="Search" onChange={handleSearch} value={search} placeholder="Company Name/Order Nnmber/Email" />
                                </div>

                                <div className="search-bar-buttons ml-2 w-33">
                                    <button type="button" className="btn btn_search clsOrderReport_SearchButtonNew " onClick={() => onSearch()}>
                                        Search
                                    </button>
                                    <button type="button" onClick={handleReset} className="reset btn btn_reset clsOrderReport_ResetButtonNew">
                                        Reset
                                    </button>
                                    <button type="button" id="cpContent_btnExport" className="btn btn-export export-icon clsSalesReport_Export clsOrderReport_Export" value="Export" onClick={handleExportClick}>
                                        Export
                                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15.75 11.0312V15.5312C15.75 15.6804 15.6907 15.8235 15.5852 15.929C15.4798 16.0345 15.3367 16.0938 15.1875 16.0938H2.8125C2.66332 16.0938 2.52024 16.0345 2.41475 15.929C2.30926 15.8235 2.25 15.6804 2.25 15.5312V11.0312C2.25 10.8821 2.30926 10.739 2.41475 10.6335C2.52024 10.528 2.66332 10.4688 2.8125 10.4688C2.96168 10.4688 3.10476 10.528 3.21025 10.6335C3.31574 10.739 3.375 10.8821 3.375 11.0312V14.9688H14.625V11.0312C14.625 10.8821 14.6843 10.739 14.7898 10.6335C14.8952 10.528 15.0383 10.4688 15.1875 10.4688C15.3367 10.4688 15.4798 10.528 15.5852 10.6335C15.6907 10.739 15.75 10.8821 15.75 11.0312ZM8.60203 11.4292C8.65427 11.4815 8.71631 11.523 8.7846 11.5513C8.85288 11.5796 8.92608 11.5942 9 11.5942C9.07392 11.5942 9.14712 11.5796 9.2154 11.5513C9.28369 11.523 9.34573 11.4815 9.39797 11.4292L12.2105 8.61672C12.2627 8.56446 12.3042 8.50241 12.3325 8.43413C12.3608 8.36585 12.3753 8.29266 12.3753 8.21875C12.3753 8.14484 12.3608 8.07165 12.3325 8.00337C12.3042 7.93509 12.2627 7.87304 12.2105 7.82078C12.1582 7.76852 12.0962 7.72706 12.0279 7.69878C11.9596 7.67049 11.8864 7.65594 11.8125 7.65594C11.7386 7.65594 11.6654 7.67049 11.5971 7.69878C11.5288 7.72706 11.4668 7.76852 11.4145 7.82078L9.5625 9.67352V3.15625C9.5625 3.00707 9.50324 2.86399 9.39775 2.7585C9.29226 2.65301 9.14918 2.59375 9 2.59375C8.85082 2.59375 8.70774 2.65301 8.60225 2.7585C8.49676 2.86399 8.4375 3.00707 8.4375 3.15625V9.67352L6.58547 7.82078C6.47992 7.71523 6.33677 7.65594 6.1875 7.65594C6.03823 7.65594 5.89508 7.71523 5.78953 7.82078C5.68398 7.92633 5.62469 8.06948 5.62469 8.21875C5.62469 8.36802 5.68398 8.51117 5.78953 8.61672L8.60203 11.4292Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </button>

                                    <button type="button" id="cpContent_btnNSExport" className="btn btn-export export-icon clsSalesReport_Export" value="Export" onClick={handleNSExportClick}>
                                        NS Report
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

                        <div className="card-wrapper">
                            <div className="card">
                                <div className="card-icon">
                                    <FontAwesomeIcon icon={faCubes} size="3x" />
                                </div>
                                <div className="title_val">
                                    <div className="card-title">Avg Orders</div>
                                    <div className="card-value">{Math.floor(Number.isNaN(parseFloat(data?.orderReport?.avgSizeOfOrder)) ? 0 : parseFloat(data?.orderReport?.avgSizeOfOrder))}</div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-icon">
                                    <FontAwesomeIcon icon={faMoneyBillAlt} size="3x" />
                                </div>
                                <div className="title_val">
                                    <div className="card-title">Avg Sales</div>
                                    <div className="card-value">${Number.isNaN(parseFloat(data?.orderReport?.avgSaleAmount)) ? "0.00" : parseFloat(data?.orderReport?.avgSaleAmount).toFixed(2)}</div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-icon">
                                    <FontAwesomeIcon icon={faMoneyBillAlt} size="3x" />
                                </div>
                                <div className="title_val">
                                    <div className="card-title">Avg Order Amount</div>
                                    <div className="card-value">${Number.isNaN(parseFloat(data?.orderReport?.avgOrderAmount)) ? "0.00" : parseFloat(data?.orderReport?.avgOrderAmount).toFixed(2)}</div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-icon">
                                    <FontAwesomeIcon icon={faBox} size="3x" />
                                </div>
                                <div className="title_val">
                                    <div className="card-title">Most Sellable Product</div>
                                    <Link
                                        to={`/product-page/${data?.orderReport?.mostSalesBy}`}
                                        className="card-value"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open(`${window.location.origin}/product/${data?.orderReport?.productName}/${data?.orderReport?.mostSalesBy}`, "_blank");
                                        }}
                                    >
                                        {data?.orderReport?.mostSalesBy ? data.orderReport.mostSalesBy : "0"}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {showPopup && editData !== null && (
                        <div>
                            <div className="popup">
                                <div className="popup-content reportViewPopup">
                                    <span className="close" onClick={handleClosePopup} aria-label="Close">
                                        &times;
                                    </span>
                                    <div className="title-info popup-image1">
                                        <p className="text-cap">Order Details</p>
                                    </div>
                                    <div className="tableBody">
                                        <p className="detail_order_no">Order No : {editData !== null ? editData?.orderNumber : "-"}</p>
                                        <div className="tbl_sections">
                                            <div className="tableData billing_Add">
                                                <h4>Billing Address</h4>
                                                <table className="order-details-table">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <b>Name </b>
                                                            </td>
                                                            <td>{editData !== null ? `${editData?.billingInformation?.billingFirstName} ${editData?.billingInformation?.billingLastName}` : "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>Email </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.billingInformation?.billingEmailId : "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>Company Name </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.billingInformation?.billingCompanyName : "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>Contact No </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.billingInformation?.billingPhone : "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>Address </b>
                                                            </td>
                                                            <td>{editData !== null ? `${editData?.billingInformation?.billingAddress1} ${editData?.billingInformation?.billingAddress2}` : "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>City </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.billingInformation?.billingCity : "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>State </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.billingInformation?.billingState : "-"}</td>
                                                        </tr>

                                                        <tr>
                                                            <td>
                                                                <b>Country </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.countryName : "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>Extension </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.billingInformation?.billingExtensionNo : "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>Zipcode </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.billingInformation?.billingZip : "-"}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="tableData">
                                                <h4>Shipping Address</h4>
                                                <table className="order-details-table">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <b>Name </b>
                                                            </td>
                                                            <td>{editData !== null ? `${editData?.shippingInformation?.shippingFirstName} ${editData?.shippingInformation?.shippingLastName}` : "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>Email </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.shippingInformation?.shippingEmailId : "-"}</td>
                                                        </tr>

                                                        <tr>
                                                            <td>
                                                                <b>Company Name </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.shippingInformation?.shippingCompanyName : "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>Contact No </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.shippingInformation?.shippingPhone : "-"}</td>
                                                        </tr>

                                                        <tr>
                                                            <td>
                                                                <b>Address </b>
                                                            </td>
                                                            <td>{editData !== null ? `${editData?.shippingInformation?.shippingAddress1} ${editData?.shippingInformation?.shippingAddress2}` : "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>City </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.shippingInformation?.shippingCity : "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>State </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.shippingInformation?.shippingState : "-"}</td>
                                                        </tr>

                                                        <tr>
                                                            <td>
                                                                <b>Country </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.countryName : "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>Extension </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.shippingInformation?.shippingExtensionNo : "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>Zipcode </b>
                                                            </td>
                                                            <td>{editData !== null ? editData?.shippingInformation?.shippingZip : "-"}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="productSect">
                                            <table id="zero_config" className="table table-striped table-bordered dataTable">
                                                <thead>
                                                    <tr>
                                                        <th className="tblTitle prod_Image text-left">Image</th>
                                                        <th className="tblTitle Product text-left">Product</th>
                                                        <th className="tblTitle prod_Quantity text-left">Quantity</th>
                                                        <th className="tblTitle prod_Price text-left">Price</th>
                                                        <th className="tblTitle total_unit_price text-left"> Total Unit price</th>
                                                    </tr>
                                                </thead>

                                                {editData?.itemsList && editData?.itemsList.length > 0 ? (
                                                    editData?.itemsList.map((item) => (
                                                        <tbody className="productImg">
                                                            <tr>
                                                                <td rowSpan={6}>{item !== null && <img src={getOrderReportImageUrl(item?.productDefaultImage)} className="viewTbl_img" alt="reportImg" />}</td>
                                                                {/* <td rowSpan={6}>{item !== null ? item.productName : "-"}</td> */}
                                                                <td>{item !== null ? `${item?.productCode} - ${item.productName}` : "-"}</td>
                                                                <td>{item !== null ? item?.quantity : "-"}</td>
                                                                <td>{item !== null ? item?.price : "-"}</td>
                                                                <td>{item !== null ? item?.totalPrice : "-"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={4}>Color: {item !== null ? item?.productColorLidColorImprintColor : "-"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={4}>Imprint Method: {item !== null ? item?.imprintMethodName : "-"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={4}>Imprint Location & Color: </td>
                                                            </tr>
                                                            <tr className="txtBold">
                                                                <td colSpan={3}>SubTotal </td>
                                                                <td>{item !== null ? `$${item?.totalPrice}` : "-"}</td>
                                                            </tr>
                                                        </tbody>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={6} className="text-center">
                                                            No data available
                                                        </td>
                                                    </tr>
                                                )}
                                            </table>
                                        </div>
                                        <div className="prod_bottom_details">
                                            <div className="rightalign">
                                                <p>SubTotal: ${editData?.itemsList.reduce((acc, item) => acc + (item?.totalPrice || 0), 0).toFixed(2)}</p>

                                                <p>Freight Charges (FEDEX GROUND): ${editData !== null ? editData?.basketFreightCharges : "-"}</p>
                                            </div>

                                            <p className="finalTotal">Final Total: ${editData !== null ? editData?.totalOrderPrice : "-"}</p>
                                            <p>Balance Amount: ${editData !== null ? editData?.balanceTotalOrderAmount.toFixed(2) : "-"}</p>
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
                            <Table data={Data} columns={columns} columnAlignments={columnAlignments} loading={loading} customButtons={customButtons} handlePreviewClick={handlePreviewClick} handleStatusChange={handleStatusChange} handleTrackingClick={handleTrackingClick} statuses={statuses} />

                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                                <Modal.Header closeButton>
                                    <p className="track_model_Title">Order Tracking Details</p>
                                </Modal.Header>
                                <Modal.Body>
                                    <p className="modalbodyHeading">
                                        <span className="txt_red cus_mb">*</span> NOTE: Tracking Links should be separated by Comma (,). <br />
                                        <span className="txt_red">*</span> Tracking Link:
                                    </p>
                                    <textarea className="track_textarea" rows={5} value={trackingDetails} onChange={(e) => setTrackingDetails(e.target.value)} aria-label="textarea" />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="success" onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            <Modal show={showSuccess} onHide={handleSuccessClose}>
                                <Modal.Header closeButton>
                                    <p className="track_model_Title">Success</p>
                                </Modal.Header>
                                <Modal.Body>
                                    <p className="modalbodyHeading">Tracking links are added successfully.</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="success" onClick={handleSuccessClose}>
                                        Ok
                                    </Button>
                                </Modal.Footer>
                            </Modal>
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

export default OrderReport;
