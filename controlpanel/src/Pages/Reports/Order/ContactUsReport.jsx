import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Dropdown } from "react-bootstrap";
import { PopupV3 } from "common/utils";
import { useQueryGetContactUsReport } from "common/components/graphQL/queries/Reports/useQueryGetContactUsReport";
import { useContactUsReport, useGetAllState, useGetAllCountry } from "common/hooks/react/api";
import { MS_URL } from "common/utils/vars";
import Table from "../../../components/common/Table";
import ShowingResults from "../../../components/ShowingResult";
import Pagination from "../../../components/Pagination/Paginationindex";
import { REACT_APP_API_ENDPOINT, LANGUAGE_GUID, WEBSITE_GUID } from "../../../components/common/vars";
import "../Report.scss";

const getExportLink = (fromDate = "", toDate = "") => {
    let link = `${REACT_APP_API_ENDPOINT}api/fileupload/ExportOrderReport/${WEBSITE_GUID}/${LANGUAGE_GUID}?export=y`;
    if (fromDate && toDate) {
        link += `&fromDate=${fromDate}&toDate=${toDate}`;
    }
    return link;
};
const basicLink = `${REACT_APP_API_ENDPOINT}api/fileupload/ExportOrderReport/${WEBSITE_GUID}/${LANGUAGE_GUID}`;

const Filters = ({ onSearch, onReset, refetch, filters, setFilters }) => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchCompany, setSearchCompany] = useState("");

    const handlefromdate = (e) => {
        const selectedDate = e.target.value;
        setFromDate(selectedDate);
    };

    const handletodate = (e) => {
        const selectedDate = e.target.value;
        setToDate(selectedDate);
    };

    const handleCalendarClick = (e) => {
        e.target.max = new Date().toISOString().split("T")[0];
        e.target.showPicker();
    };

    const { mutateAsync: contactusData } = useContactUsReport();
    const handleExportClick = async () => {
        const filterArr = [];
        const objData = {
            FilterFromDateName: "Search",
            FilterFromDateValue: fromDate,
            FilterToDateName: "Search",
            FilterToDateValue: toDate,
            FilterEmailName: "Search",
            FilterEmailValue: searchEmail,
            FilterContactOrderName: "Search",
            FilterContactOrderValue: searchName,
            FilterCompanyName: "Search",
            FilterCompanyValue: searchCompany,
            pageNo: "1",
            SortName: "",
            ViewName: "ContactUsReport"
        };
        filterArr.push(objData);
        const Filter = { Filters: filterArr };
        const res = await contactusData(Filter);
        window.open(`${MS_URL.GLOBAL_ELEMENTS}api/ContactUss/DownloadContactUsReport/${res.fileGuid}/${res.fileName}`, "_blank");
    };

    const [, setColumnName] = useState("");
    const [sortDirection, setSortDirection] = useState("DSC");
    const [, setSortConfig] = useState({ key: "Products", direction: sortDirection });
    const [selectedSortOption, setSelectedSortOption] = useState("Sort By");
    const handleDropdownSort = async (columnName) => {
        setColumnName(columnName);
        setSortDirection(columnName?.direction);
        setSortConfig({ key: columnName?.columnName, direction: columnName?.direction });
        setSelectedSortOption(columnName?.displayoption);

        setFilters((prevFilters) => ({
            ...prevFilters,
            order: { [columnName?.dbColname]: columnName?.direction }
        }));

        await refetch(filters);
    };

    const handleResetClick = () => {
        setSortDirection("DESC");
        setSelectedSortOption("Sort By");
        setFromDate("");
        setToDate("");
        setSearchName("");
        setSearchEmail("");
        setSearchCompany("");
        onReset();
    };

    return (
        <div className="search-bar cardSection contact_Report">
            <div className="search-bar-controls">
                <div className="select-wrapper mb-2" />
                <div className="header-second">
                    <div className="sort_warp">
                        <Dropdown>
                            <Dropdown.Toggle variant="Default" id="dropdown-basic" className="sortby-dropdown-toggle listingSotyBy clsContactUsReport_SortingNew">
                                {selectedSortOption || "Sort By"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "createdDateUtc", columnName: "Created Date", direction: "DESC", displayoption: "Date - Newest to Oldest" })}>Date - Newest to Oldest</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "createdDateUtc", columnName: "Created Date", direction: "ASC", displayoption: "Date - Oldest to Newest" })}>Date - Oldest to Newest</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="date-input-wrapper clsContactUsReport_DateNew mb-2 cus_wid">
                        <input id="FromDate" className="textbox-n" type="date" aria-label="fromdate" onChange={handlefromdate} onClick={handleCalendarClick} value={fromDate} placeholder="From Date" />
                        <input id="ToDate" className="textbox-n" type="date" aria-label="expiredate" onChange={handletodate} onClick={handleCalendarClick} value={toDate} placeholder="To Date" />
                    </div>

                    <div className="input-wrapper searchBox_Sect  mb-2 cus_wid clsContactUsReport_SearchNew">
                        <input type="search" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="Customer Name..." aria-label="input1" />
                        <input type="search" className="ml-2" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} placeholder="Email Address..." aria-label="input2" />
                        <input type="search" className="ml-2" value={searchCompany} onChange={(e) => setSearchCompany(e.target.value)} placeholder="Company Name..." aria-label="input3" />
                    </div>

                    <div className="search-bar-buttons mb-2 cus_wid">
                        <button type="button" onClick={() => onSearch(fromDate, toDate, searchName, searchEmail, searchCompany)} className="btn btn_search clsContactUsReport_SearchButtonNew">
                            Search
                        </button>
                        <button type="button" onClick={handleResetClick} className="btn btn_reset reset clsContactUsReport_ResetButtonNew">
                            Reset
                        </button>
                        <button type="button" id="cpContent_btnExport" className="btn btn-export export-icon clsContactUsReport_Export" value="Export" onClick={handleExportClick}>
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
    );
};

const ContactUsReport = () => {
    const PagePerRecord = 10;
    const initialFilters = {
        skip: 1,
        take: PagePerRecord,
        where: { websiteGuid: { eq: WEBSITE_GUID } },
        order: { createdDateUtc: "DESC" }
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState(initialFilters);
    const [exportLink, setExportLink] = useState(getExportLink());
    const [showPopup, setShowPopup] = useState(false);
    const [editData, setEditData] = useState(null);
    const [Data, setData] = useState(null);

    const { data, refetch, loading } = useQuery(useQueryGetContactUsReport, { variables: filters });
    const [totalRecord, setTotalRecords] = useState(0);
    const [, setContactUsData] = useState([]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        setFilters((prev) => ({ ...prev, skip: newPage }));
    };

    const formatDate = (dateString) => {
        const options = { month: "short", day: "2-digit", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const reportData = () => {
        const allData = [];

        if (data?.contactUsReport?.items?.length > 0) {
            const dataForReport = data?.contactUsReport?.items;
            dataForReport?.forEach((report) => {
                const editDataReport = ["Edit", report];

                const capitalizeText = (text) => text
                    .split(" ")
                    .filter((txt) => txt)
                    .map((txt) => txt[0].toUpperCase() + txt.slice(1).toLowerCase())
                    .join(" ");
                const companyName = report?.companyName?.trim();
                const capitalizedText = companyName ? capitalizeText(companyName) : "";

                const reportVal = [report?.createdDate ? formatDate(report?.createdDateUtc) : "", `${report?.firstName} ${report?.lastName}`, report?.emailAddress, capitalizedText, editDataReport];
                allData?.push(reportVal);
            });
        }
        setTotalRecords(data?.contactUsReport?.totalCount);
        setData(allData);
        return allData;
    };

    useEffect(() => {
        if (data) {
            setTotalRecords(data?.contactUsReport?.totalCount);
            setContactUsData(data?.contactUsReport?.items || []);
            reportData();
        }
    }, [data]);

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

    const handleSearch = (fromDate, toDate, searchName, searchEmail, searchCompany, setTodate) => {
        if (searchName === "" && searchEmail === "" && searchCompany === "" && toDate === "" && fromDate === "") {
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
            setTodate("");
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
            setTodate("");
        } else {
            const filter = { websiteGuid: { eq: WEBSITE_GUID } };
            const newExportLink = getExportLink(fromDate, toDate);
            setExportLink(newExportLink);

            if (fromDate && toDate) {
                filter.createdDate = { gte: fromDate, lte: toDate };
            }

            let link = `${basicLink}?export=y`;
            const trimmedSearchName = searchName.replace(/\s+/g, " ").trim();
            const trimmedSearchCompany = searchCompany.replace(/\s+/g, " ").trim();
            const trimmedSearchEmail = searchEmail.replace(/\s+/g, " ").trim();

            if (trimmedSearchName || trimmedSearchCompany || trimmedSearchEmail) {
                filter.customerName = { contain: trimmedSearchName };
                filter.companyName = { contain: trimmedSearchCompany };
                filter.customerEmail = { contain: trimmedSearchEmail };
                link = `${link}&customerName=${trimmedSearchName}&companyName=${trimmedSearchCompany}&customerEmail=${trimmedSearchEmail}`;
                setExportLink(link);
            }

            setFilters({ ...filters, skip: 1, take: 10, where: filter });
            refetch({ filters });
        }
    };

    const handleReset = () => {
        setFilters(initialFilters);
        setExportLink(getExportLink());
        refetch({ filters: initialFilters });
        setCurrentPage(1);
    };

    const [statename, setStateName] = useState("");
    const [countryname, setCountryName] = useState("");
    const { mutateAsync: allState } = useGetAllState();
    const { data: allCountries } = useGetAllCountry();
    const handlePreviewClick = async (row) => {
        const test = row[4][1];

        const allstate = await allState(test?.countryGUID || "");
        if (allState) {
            const statedata = allstate.filter((item) => item.stateguid === test?.state);
            const stateName = statedata?.length ? statedata[0]?.name : "";
            setStateName(stateName);
        }
        const allcountry = await allCountries.data;
        if (allcountry) {
            const countrydata = allcountry?.filter((item) => item.countryguid === test?.countryGUID);
            const countryName = countrydata?.length ? countrydata[0]?.countryname : "";
            setCountryName(countryName);
        }
        setEditData(row[4][1]);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setEditData(null);
    };

    const columns = ["Created Date", "Customer Name", "Customer Email", "Company Name", "Actions"];
    const columnAlignments = {
        "Created Date": "created_date text-no-ellipsis",
        "Customer Name": "customer_name text-no-ellipsis",
        "Customer Email": "customer_email text-no-ellipsis",
        "Company Name": "company_name text-no-ellipsis",
        View: "actionbtn text-no-ellipsis"
    };

    return (
        <section className="body-container midContent">
            <div className="usermanagement-container">
                <div className="midCotWrap salesCard contactUsReport">
                    <Filters onSearch={handleSearch} onReset={handleReset} refetch={refetch} filters={filters} setFilters={setFilters} validateDate={validateDate} />
                    <div id="usrtable1 reportPage">
                        <section className="all_user">
                            {!loading && <ShowingResults pageRecords={Math.min(PagePerRecord, totalRecord)} totalRecords={totalRecord} currentPage={currentPage} labelName="Record" />}
                            <Table data={Data} columns={columns} columnAlignments={columnAlignments} loading={loading} handlePreviewClick={handlePreviewClick} basicLink={exportLink} />
                        </section>
                    </div>
                    <div className="mainPagination">
                        <Pagination currentPage={currentPage} totalPages={Math.ceil(totalRecord / PagePerRecord)} onPageChange={handlePageChange} />
                    </div>
                </div>
            </div>

            {showPopup && editData !== null && (
                <div>
                    <div className="popup contactUsReport">
                        <div className="popup-content reportViewPopup">
                            <span className="close" onClick={handleClosePopup} aria-label="Close">
                                &times;
                            </span>
                            <div className="title-info popup-image1">
                                <p className="text-cap">Contact Details</p>
                            </div>
                            <div className="tableBody">
                                <div className="tableData">
                                    <table className="order-details-table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <b>Customer Name </b>
                                                </td>
                                                <td>{editData ? `${editData?.firstName} ${editData?.lastName}` : "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Customer Email </b>
                                                </td>
                                                <td>{editData ? editData?.emailAddress : "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Company Name </b>
                                                </td>
                                                <td>{editData ? editData?.companyName : "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Contact No </b>
                                                </td>
                                                <td>{editData ? editData?.phone : "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Extension </b>
                                                </td>
                                                <td>{editData ? editData?.extensionNo : "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Fax </b>
                                                </td>
                                                <td>{editData ? editData?.fax : "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Address </b>
                                                </td>
                                                <td>{editData ? editData?.address : "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>City </b>
                                                </td>
                                                <td>{editData ? editData?.city : "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>State </b>
                                                </td>
                                                <td>{editData !== null && `${statename}`}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Country </b>
                                                </td>
                                                <td>{editData !== null && `${countryname}`}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Zipcode </b>
                                                </td>
                                                <td>{editData ? editData?.zip : "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>ASI </b>
                                                </td>
                                                <td>{editData ? editData?.asi : "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>UPIC </b>
                                                </td>
                                                <td>{editData ? editData?.upic : "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>PPAI </b>
                                                </td>
                                                <td>{editData ? editData?.ppai : "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>SAGE </b>
                                                </td>
                                                <td>{editData ? editData?.sage : "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>PPPC </b>
                                                </td>
                                                <td>{editData ? editData?.pppc : "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>How Can We Help? </b>
                                                </td>
                                                <td>{editData ? editData?.message : "-"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="popup-overlay" onClick={handleClosePopup} />
                    </div>
                </div>
            )}
        </section>
    );
};

export default ContactUsReport;
