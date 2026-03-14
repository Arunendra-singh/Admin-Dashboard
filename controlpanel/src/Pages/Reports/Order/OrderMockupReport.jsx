import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { PopupV3 } from "common/utils";
import { useExportMockUpOrderReport } from "common/hooks/react/api";
import { useQueryGetOrderMockupReport } from "common/components/graphQL/queries/Reports/useQueryGetOrderMockupReport";
import { MS_URL, LANGUAGE_GUID, WEBSITE_GUID } from "common/utils/vars";
import Table from "../../../components/common/Table";
import ShowingResults from "../../../components/ShowingResult";
import Pagination from "../../../components/Pagination/Paginationindex";
import "../Report.scss";
import "../OrderMockUp.scss";

export const CDN_URL = window.cdnURL;

const OrderMockupReport = () => {
    const PagePerRecord = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [fromDate, setFromdate] = useState("");
    const [toDate, setTodate] = useState("");
    const [Data, setData] = useState(null);
    const [totalRecord, setTotalRecords] = useState(0);
    const totalPages = Math.ceil(totalRecord / PagePerRecord);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        skip: 1,
        take: PagePerRecord,
        where: {
            websiteGuid: {
                eq: WEBSITE_GUID
            }
        },
        order: { createdDate: "DESC" }
    });

    const { data, refetch, loading } = useQuery(useQueryGetOrderMockupReport, {
        variables: { filters }
    });
    const [showPopup, setShowPopup] = useState(false);
    const [editData, setEditdata] = useState([]);
    const handlePreviewClick = async (editdata) => {
        const test = editdata[4][1];
        setEditdata(test);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleCalendarClick = (e) => {
        e.target.max = new Date().toISOString().split("T")[0];
        e.target.showPicker();
    };

    const formatDate = (dateString) => {
        const options = { month: "short", day: "2-digit", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
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
    const reportData = () => {
        const allData = [];

        if (data.orderMockupReport !== undefined && data?.orderMockupReport?.items?.length > 0) {
            const dataForReport = data?.orderMockupReport?.items;
            dataForReport?.forEach((report) => {
                const editDataReport = ["Edit", report];
                const reportVal = [report?.productName, report?.createdDate !== null && formatDate(report?.createdDate), report?.emailAddress, report?.organisation, editDataReport];
                allData.push(reportVal);
            });
        }
        setTotalRecords(data?.orderMockupReport?.totalCount);
        setData(allData);
        return allData;
    };

    useEffect(() => {
        if (filters) {
            refetch(filters);
        }
    }, [filters]);

    useEffect(() => {
        if (data) {
            setTotalRecords(data?.orderMockupReport?.totalCount);
            reportData();
        }
    }, [data?.orderMockupReport?.items]);

    const columns = ["Product Name", "Created Date", "Customer Email", "Organisation", "Action"];

    const columnAlignments = {
        "Product Name": "Namelist text-no-ellipsis",
        "Created Date": "createList text-no-ellipsis",
        "Customer Email": "emailList text-no-ellipsis",
        Organisation: "orgList text-no-ellipsis",
        Action: "actionbtn text-no-ellipsis"
    };

    const handlePageChange = async (newPage) => {
        setCurrentPage(newPage);
        setFilters((prevFilters) => ({
            ...prevFilters,
            skip: newPage
        }));
    };
    const onReset = () => {
        setSortDirection("DESC");
        setSelectedSortOption("Sort By");
        setFromdate("");
        setTodate("");
        setSearch("");
        setCurrentPage(1);
        setFilters({
            skip: 1,
            take: PagePerRecord,
            where: {
                websiteGuid: {
                    eq: WEBSITE_GUID
                }
            },
            order: { createdDate: "DESC" }
        });
    };

    const constructWhereClauseNew = () => {
        const filter = {};
        if (search && search.trim()) {
            const trimmedSearch = search.replace(/\s+/g, " ").trim();
            filter.customerEmail = { contain: trimmedSearch.toLowerCase() };
        }
        if (fromDate) {
            filter.createdDate = { gte: fromDate, lte: toDate };
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

    const handleSearch = (event) => {
        setSearch(event.target.value);
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
    const handlefromdate = (e) => {
        const selectedDate = e.target.value;
        setFromdate(selectedDate);
    };

    const handletodate = (e) => {
        const selectedDate = e.target.value;
        setTodate(selectedDate);
    };

    const onSearch = () => {
        if (search === "" && toDate === "" && fromDate === "") {
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
        } else if ((toDate !== "" && fromDate === "") || (toDate === "" && fromDate !== "")) {
            PopupV3({
                content: "Please enter both the dates.",
                type: "Warning",
                title: "Warning",
                actions: [
                    {
                        dismiss: true,
                        text: "OK"
                    }
                ]
            });
        } else if (toDate !== undefined && toDate !== "" && fromDate !== undefined && fromDate !== "" && !validateDate(fromDate, toDate)) {
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
        } else {
            setCurrentPage(1);
            setFilters((prevFilters) => ({
                ...prevFilters,
                skip: 1,
                take: 10,
                order: { createdDate: "DESC" },
                where: constructWhereClauseNew()
            }));
        }
    };

    const getMockupProductImageUrl = (imageName) => {
        const defaultImageUrl = `${CDN_URL}/${WEBSITE_GUID}/Products/Medium/default.jpg`;
        return imageName ? `${CDN_URL}/${WEBSITE_GUID}/Products/Medium/${imageName}` : defaultImageUrl;
    };

    const getMockupuploadedImageUrl = (imageName) => {
        const defaultImageUrl = `${CDN_URL}/${WEBSITE_GUID}/Products/Medium/default.jpg`;
        return imageName ? `${MS_URL.ORDER}api/order/DownloadFile/${WEBSITE_GUID}/${imageName}` : defaultImageUrl;
    };

    const { mutateAsync: orderMockupData } = useExportMockUpOrderReport();
    const handleExportClick = async () => {
        const objData = {
            WebsiteGuid: WEBSITE_GUID,
            LanguageGuid: LANGUAGE_GUID,
            defaultLanguageGuid: LANGUAGE_GUID,
            FilterEmailAddValue: search,
            FilterEmaillAddress: "Search",
            FilterFromDateName: "Search",
            FilterFromDateValue: fromDate,
            FilterToDateName: "Search",
            FilterToDateValue: toDate
        };
        const res = await orderMockupData(objData);
        window.open(`${MS_URL.ORDER}api/order/DownloadMockupOrderReport/${res.fileGuid}/${res.fileName}`, "_blank");
    };
    return (
        <section className="body-container midContent">
            <div className="usermanagement-container ordermockupreport">
                <div className="midCotWrap salesCard">
                    <div className="search-bar">
                        <div className="search-bar-controls">
                            <div className="select-wrapper mb-2" />
                            <div className="header-second">
                                <div className="sort_warp">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="Default" id="dropdown-basic" className="sortby-dropdown-toggle listingSotyBy clsOrderMockupReport_SortingNew">
                                            {selectedSortOption || "Sort By"}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "createdDate", columnName: "Created Date", direction: "ASC", displayoption: "Date: Oldest to Newest" })}>Date: Oldest to Newest</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "createdDate", columnName: "Created Date", direction: "DESC", displayoption: "Date: Newest to Oldest" })}>Date: Newest to Oldest</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="input-wrapper mb-2 clsOrderMockupReport_SearchNew">
                                    <input type="search" className="ml-12-search" id="customerEmail" value={search} name="customerEmail" aria-label="Search" onChange={handleSearch} placeholder="Email Address..." />
                                </div>
                                <div className="dateDiv">
                                    <div className="date-input-wrapper clsOrderMockupReport_DateNew">
                                        <input id="FromDate" className="textbox-n" type="date" aria-label="fromdate" onChange={handlefromdate} onClick={handleCalendarClick} value={fromDate} placeholder="From Date" />
                                        <input id="ToDate" className="textbox-n" type="date" aria-label="expiredate" onChange={handletodate} onClick={handleCalendarClick} value={toDate} placeholder="To Date" />
                                    </div>
                                </div>
                                <div className="search-bar-buttons ml-2 mb-2">
                                    <button type="button" className="btn btn_search clsOrderMockupReport_SearchButtonNew" onClick={() => onSearch()}>
                                        Search
                                    </button>
                                    <button type="button" onClick={onReset} className="reset btn btn_reset clsOrderMockupReport_ResetButtonNew">
                                        Reset
                                    </button>
                                    <button type="button" id="cpContent_btnExport" className="btn btn-export export-icon clsOrderMockupReport_Export" value="Export" onClick={handleExportClick}>
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
                                        <p className="text-cap">Mock-Up Details</p>
                                    </div>
                                    <div className="bottom-info">
                                        <table>
                                            <tr>
                                                <td className="width-30">Customer Name</td>
                                                <td>{editData !== null && `${editData?.userName}`}</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td className="width-30">Organisation</td>
                                                <td>{editData !== null && `${editData?.organisation}`}</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td className="width-30">Phone Number</td>
                                                <td>{editData !== null && `${editData?.phoneNumber}`}</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td className="width-30">Extension</td>
                                                <td>{editData !== null && editData?.extensionNo !== null && `${editData?.extensionNo}`}</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td className="width-30">Customer Email</td>
                                                <td>{editData !== null && editData?.emailAddress !== null && `${editData?.emailAddress}`}</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td className="width-30">Address</td>
                                                <td>{editData !== null && editData?.address !== null && `${editData?.address}`}</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td className="width-30">City Name</td>
                                                <td>{editData !== null && editData?.cityName !== null && `${editData?.cityName}`}</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td className="width-30">State Name</td>
                                                <td>{editData !== null && editData?.stateName !== null && `${editData?.stateName}`}</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td className="width-30">Zip Code</td>
                                                <td>{editData !== null && editData?.zipCode !== null && `${editData?.zipCode}`}</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td className="width-30">Created Date</td>
                                                <td>{editData !== null && editData?.createdDate !== null && `${formatDate(editData?.createdDate)}`}</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td className="width-30">How did you hear about us?</td>
                                                <td>{editData !== null && editData?.howYouHereAboutUs !== null && `${editData?.howYouHereAboutUs}`}</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td className="width-30 v-top">{editData !== null && editData?.productCode !== null && `${editData?.productCode}`}</td>
                                                <td className="v-top">
                                                    {editData !== null && editData?.productName !== null && `${editData?.productName}`}
                                                    <div>
                                                        {editData !== null && (
                                                            <img
                                                                width={400}
                                                                src={getMockupProductImageUrl(editData?.productImage)}
                                                                onError={(e) => {
                                                                    e.target.src = `${CDN_URL}/${WEBSITE_GUID}/Products/Medium/default.jpg`;
                                                                }}
                                                                className="viewTbl_img"
                                                                alt="ProductImage"
                                                            />
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="v-top rightImgBtn">
                                                    {editData !== null && editData?.imageName !== null && `${editData?.imageName}`}
                                                    <div>{editData !== null && (editData?.imageName?.endsWith(".png") || editData?.imageName?.endsWith(".jpg") || editData?.imageName?.endsWith(".jpeg") ? <img width={400} src={getMockupuploadedImageUrl(editData?.imageName)} className="viewTbl_img" alt="MockupImage" /> : null)}</div>

                                                    <br />
                                                    {editData !== null && editData?.imageName !== null && editData?.imageName !== "" && (
                                                        <a className="btn btn-primary btn-download" href={getMockupuploadedImageUrl(editData?.imageName)} download="HolidayItems.pdf" data-toggle="tooltip" data-placement="top" title="Download">
                                                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="m8 12 4 4 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M12 16V4M19 17v.6c0 1.33-1.07 2.4-2.4 2.4H7.4C6.07 20 5 18.93 5 17.6V17" stroke="#fff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                    <br />
                                                </td>
                                            </tr>
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
                            <Table data={Data} columns={columns} loading={loading} columnAlignments={columnAlignments} handlePreviewClick={handlePreviewClick} type="ordermockupreport" />
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

export default OrderMockupReport;
