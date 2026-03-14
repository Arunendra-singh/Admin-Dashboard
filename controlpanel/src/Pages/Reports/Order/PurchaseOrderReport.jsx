import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { PopupV3 } from "common/utils";
import moment from "moment";
import { useQueryGetPurchaseOrderReport } from "common/components/graphQL/queries/Reports/useQueryGetPurchaseOrderReport";
import { useExportPurchaseOrder } from "common/hooks/react/api";
import { MS_URL } from "common/utils/vars";
import Table from "../../../components/common/Table";
import { LANGUAGE_GUID, REACT_APP_API_ENDPOINT, WEBSITE_GUID } from "../../../components/common/vars";
import ShowingResults from "../../../components/ShowingResult";
import Pagination from "../../../components/Pagination/Paginationindex";
import "./PurchaseOrderReport.scss";

const PurchaseOrderReport = () => {
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
    const { data, refetch, loading } = useQuery(useQueryGetPurchaseOrderReport, { variables: filters });
    const [showPopup, setShowPopup] = useState(false);
    const [editData, setEditdata] = useState([]);
    const handlePreviewClick = async (editdata) => {
        const test = editdata[5][1];
        setEditdata(test);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const formatDate = (dateString) => {
        const options = { month: "short", day: "2-digit", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const reportData = () => {
        const allData = [];

        if (data.purchaseOrderReport !== undefined && data?.purchaseOrderReport?.items?.length > 0) {
            const dataForReport = data?.purchaseOrderReport?.items;
            dataForReport?.forEach((report) => {
                const editDataReport = ["Edit", report];

                function capitalizeText(text) {
                    return text
                        .split(" ")
                        .map((txt) => txt[0].toUpperCase() + txt.slice(1).toLowerCase())
                        .join(" ");
                }
                const companyName = report?.billingInformation?.billingCompanyName?.trim();
                const capitalizedText = companyName ? capitalizeText(companyName) : "";

                const reportVal = [report?.billingInformation?.billingFirstName, report?.billingInformation?.billingEmailId, report?.createdDateUtc ? formatDate(report?.createdDateUtc) : "", report?.deliveryDate, capitalizedText, editDataReport];

                allData.push(reportVal);
            });
        }
        setTotalRecords(data?.purchaseOrderReport?.totalCount);
        setData(allData);
        return allData;
    };

    useEffect(() => {
        if (filters) {
            refetch(filters);
        }

        if (data) {
            setTotalRecords(data?.purchaseOrderReport?.totalCount);
            reportData();
        }
    }, [filters, data?.purchaseOrderReport?.items]);

    const columns = ["Customer Name", "Customer Email Id", "Create Date", "Delivery Date", "Company Name", "Actions"];

    const columnAlignments = {
        "Billing Contact Name": "order-no text-no-ellipsis",
        "Billing Email Id": "billing-email text-no-ellipsis",
        "Created Date": "order-date text-no-ellipsis",
        "Delivery Date": "Delivery-Date text-no-ellipsis",
        "Billing Company Name": "company-name text-no-ellipsis",
        View: "actionbtn text-no-ellipsis"
    };

    const constructWhereClauseNew = () => {
        const filter = {};
        let link = `${basicLink}?export=y`;

        if (fromDate && toDate) {
            const todate = toDate;
            filter.createdDate = { gte: fromDate, lte: todate };
            link += `&fromDate=${fromDate}&toDate=${todate}`;
        }
        if (search && search.trim()) {
            const trimmedSearch = search.replace(/\s+/g, " ").trim();
            filter.productName = { contain: trimmedSearch.toLowerCase() };
            link = `${link}&searchtext=${trimmedSearch}`;
            setExportLink(link);
        }
        setFilters((prevFilters) => ({
            ...prevFilters,
            where: filter
        }));
        filter.websiteGuid = { eq: WEBSITE_GUID };

        setExportLink(link);
        return filter;
    };

    const validateDate = (startDate, endDate) => {
        if (startDate !== undefined && endDate !== undefined) {
            const from = new Date(startDate);
            const to = new Date(endDate);

            // Extract year, month, and date
            const fromDateValue = from.getFullYear() * 10000 + (from.getMonth() + 1) * 100 + from.getDate();
            const toDateValue = to.getFullYear() * 10000 + (to.getMonth() + 1) * 100 + to.getDate();

            return fromDateValue <= toDateValue;
        }
        return true;
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

    const onSearch = () => {
        if (search === "" && searchProduct === "" && toDate === "" && fromDate === "") {
            PopupV3({
                content: "Please Provide Search Criteria.",
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
                content: "Please select both dates",
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
            // setTodate("");
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
            // setTodate("");
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
            refetch({ variables: newFilters });
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

    const { mutateAsync: purchaseorderdata } = useExportPurchaseOrder();
    const handleExportClick = async () => {
        const filterArr = [];
        const objData = {
            FilterFromDateName: "Search",
            FilterFromDateValue: fromDate,
            FilterToDateName: "Search",
            FilterToDateValue: toDate,
            FilterFromPoNoValue: "",
            SortName: "",
            ViewName: "PurchaseOrderReport",
            pageNo: "1"
        };
        filterArr.push(objData);
        const Filter = { Filters: filterArr };
        const res = await purchaseorderdata(Filter);
        // objData.order = { createdDateUtc: "DESC" };

        window.open(`${MS_URL.ORDER}api/order/DownloadpurchaseOrderReport/${res.fileGuid}/${res.fileName}`, "_blank");
    };

    const [, setColumnName] = useState("");
    const [sortDirection, setSortDirection] = useState("DSC");
    const [, setSortConfig] = useState({ key: "Products", direction: sortDirection });
    const [selectedSortOption, setSelectedSortOption] = useState("Sort By");
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

    const [selectedStatus, setSelectedStatus] = useState("");

    const statusOptions = ["Order Summary Created", "Order Summary Sent", "Order Summary Approved", "Order Summary Rejected"];

    const selectStatus = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleReset = () => {
        setSortDirection("DESC");
        setSelectedSortOption("Sort By");
        setFromdate("");
        setTodate("");
        setSearch("");
        setsearchProduct("");
        setCurrentPage(1);
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

    return (
        <section className="body-container midContent">
            <div className="usermanagement-container">
                <div className="midCotWrap salesCard purchaseOrderReport purchaseSampleReport">
                    <div className="search-bar cardSection">
                        <div className="search-bar-controls">
                            <div className="select-wrapper mb-2" />
                            <div className="header-second">
                                <div className="sort_warp">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="Default" id="dropdown-basic" className="sortby-dropdown-toggle listingSotyBy clsPurchaseOrderReport_SortingNew">
                                            {selectedSortOption || "Sort By"}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "createdDateUtc", columnName: "Created Date", direction: "DESC", displayoption: "Date - Newest to Oldest" })}>Date - Newest to Oldest</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "createdDateUtc", columnName: "Created Date", direction: "ASC", displayoption: "Date - Oldest to Newest" })}>Date - Oldest to Newest</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="date-input-wrapper clsPurchaseOrderReport_DateNew mb-2 cus_wid">
                                    <input id="FromDate" className="textbox-n" type="date" aria-label="fromdate" onChange={handlefromdate} onClick={handleCalendarClick} value={fromDate} placeholder="From Date" max={moment().format("YYYY-MM-DD")} />
                                    <input id="ToDate" className="textbox-n" type="date" aria-label="expiredate" onChange={handletodate} onClick={handleCalendarClick} value={toDate} placeholder="To Date" max={moment().format("YYYY-MM-DD")} />
                                </div>

                                <div className="searchBox_Sect mb-2 d-flex cus_wid">
                                    <div className="proRgtSect">
                                        <div className="input-wrapper selectStatus_Report">
                                            <select id="selectStatus" name="selectStatus" aria-label="Select Status" onChange={selectStatus} value={selectedStatus}>
                                                <option value="">Select Status</option>
                                                {statusOptions.map((option) => (
                                                    <option value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="search-bar-buttons mb-2 cus_wid">
                                    <button type="button" className="btn btn_search clsPurchaseOrderReport_SearchButtonNew" onClick={() => onSearch()}>
                                        Search
                                    </button>
                                    <button type="button" onClick={handleReset} className="reset btn btn_reset clsPurchaseOrderReport_ResetButtonNew">
                                        Reset
                                    </button>
                                    <button type="button" id="cpContent_btnExport" className="btn btn-export export-icon clsPurchaseOrderReport_Export" value="Export" onClick={handleExportClick}>
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
                                    <div className="title-info popup-image1">
                                        <p className="text-cap">Submit PO Report</p>
                                        <span className="close" onClick={handleClosePopup} aria-label="Close">
                                            &times;
                                        </span>
                                    </div>
                                    <div className="tableBody tblData">
                                        <table className="order-details-table">
                                            <tbody>
                                                <div className="firstSec">
                                                    {/* <h3 className="headingPurchase">Ordering Information</h3> */}
                                                    <tr>
                                                        <td>ASI/SAGE/DC/PPAI Number :</td>
                                                        <td>{editData !== null ? `${editData?.ppai}` : "-"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>PO Number :</td>
                                                        <td>{editData !== null ? `${editData?.poNumber}` : "-"}</td>
                                                    </tr>
                                                </div>
                                                <div className="secSec">
                                                    <h3 className="headingPurchase">Bill To :</h3>
                                                    <tr>
                                                        <td>Company Name:</td>
                                                        <td>{editData !== null ? editData?.billingInformation?.billingCompanyName : "-"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Contact Name:</td>
                                                        <td>{editData !== null ? editData?.billingInformation?.billingFirstName : "-"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Contact Number:</td>
                                                        <td>{editData !== null ? editData?.billingInformation?.billingPhone : "-"}</td>
                                                    </tr>
                                                    {editData?.billingInformation?.billingExtensionNo && (
                                                        <tr>
                                                            <td>Extension:</td>
                                                            <td>{editData !== null ? editData?.billingInformation?.billingExtensionNo : "-"}</td>
                                                        </tr>
                                                    )}

                                                    <tr>
                                                        <td>Contact Email:</td>
                                                        <td>{editData !== null ? editData?.billingInformation?.billingEmailId : "-"}</td>
                                                    </tr>
                                                </div>

                                                {editData && editData.submitPOlist && editData.submitPOlist.length > 0 ? (
                                                    <div className="thirdSec">
                                                        <h3 className="headingPurchase">PO/Artwork :</h3>
                                                        <table>
                                                            <tbody>
                                                                {editData.submitPOlist.map((item) => (
                                                                    <tr>
                                                                        <td>{item?.submitPOFileName || "-"}</td>
                                                                        <td>
                                                                            <div className="viewlink">
                                                                                {item?.submitPOFilePath ? (
                                                                                    <a className="a_viewlink" href={item.submitPOFilePath} target="_blank" rel="noreferrer">
                                                                                        View
                                                                                    </a>
                                                                                ) : (
                                                                                    <span>-</span>
                                                                                )}
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : null}

                                                <div className="Instructions">
                                                    <h3 className="headingPurchase">Comments/Instruction :</h3>
                                                    <tr>
                                                        <td>{editData !== null ? editData?.instructions : "-"}</td>
                                                        <td>&nbsp;</td>
                                                    </tr>
                                                </div>
                                            </tbody>
                                        </table>
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

export default PurchaseOrderReport;
