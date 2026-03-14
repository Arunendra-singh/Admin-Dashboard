import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { PopupV3 } from "common/utils";
import { useQueryGetNewsletterReport } from "common/components/graphQL/queries/Reports/useQueryGetNewsletterReport";
import { useExportNewsletterReports } from "common/hooks/react/api";
import { MS_URL } from "common/utils/vars";
import Table from "../../../components/common/Table";
import { LANGUAGE_GUID, REACT_APP_API_ENDPOINT, WEBSITE_GUID } from "../../../components/common/vars";
import ShowingResults from "../../../components/ShowingResult";
import Pagination from "../../../components/Pagination/Paginationindex";
import "../Report.scss";

const NewsLetterReport = () => {
    const PagePerRecord = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const basicLink = `${REACT_APP_API_ENDPOINT}api/fileupload/ExportOrderReport/${WEBSITE_GUID}/${LANGUAGE_GUID}`;
    const [, setExportLink] = useState(basicLink);
    const [Data, setData] = useState(null);
    const [totalRecord, setTotalRecords] = useState(0);
    const totalPages = Math.ceil(totalRecord / PagePerRecord);
    const [search, setSearch] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
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

    const { data, refetch, loading } = useQuery(useQueryGetNewsletterReport, { variables: filters });
    const [, setShowPopup] = useState(false);
    const [, setEditdata] = useState([]);
    const handlePreviewClick = (editdata) => {
        const test = editdata[5][1];
        setEditdata(test);
        setShowPopup(true);
    };

    const formatDate = (dateString) => {
        const options = { month: "short", day: "2-digit", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const reportData = () => {
        const allData = [];

        if (data && data.newsLetterReport && data.newsLetterReport.items?.length > 0) {
            const dataForReport = data.newsLetterReport.items;

            dataForReport?.forEach((report) => {
                const reportVal = [report?.emailAddress, report?.firstName, report?.lastName, report?.companyName, report?.createdDateUtc ? formatDate(report?.createdDateUtc) : "", report?.isRegistered ? "Yes" : "No"];

                allData.push(reportVal);
            });
        }
        setTotalRecords(data?.newsLetterReport?.totalCount);
        setData(allData);
        return allData;
    };

    useEffect(() => {
        if (filters) {
            refetch(filters);
        }

        if (data) {
            setTotalRecords(data?.newsLetterReport?.totalCount);
            reportData();
        }
    }, [filters, data?.newsLetterReport?.items]);

    const columns = ["Email Address", "First Name", "Last Name", "Company Name", "Created Date", "Is Registered"];

    const columnAlignments = {
        "Email Address": "email text-no-ellipsis",
        "First Name": "fName text-no-ellipsis",
        "Last Name": "lName text-no-ellipsis",
        "Company Name": "company_name text-no-ellipsis",
        "Created Date": "created_date text-no-ellipsis",
        "Is Registered": "is_regi text-no-ellipsis"
    };

    const constructWhereClauseNew = () => {
        const filter = {};
        let link = `${basicLink}?export=y`;

        if (search && search.trim()) {
            const trimmedSearch = search.replace(/\s+/g, " ").trim();
            filter.emailAddress = { contain: trimmedSearch.toLowerCase() };
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

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const onSearch = () => {
        if (search === "" && searchEmail === "") {
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

    const { mutateAsync: newsletter } = useExportNewsletterReports();
    const handleExportClick = async () => {
        const objData = {
            SearchText: search,
            pageNo: 1,
            SortName: ""
        };
        const res = await newsletter(objData);
        window.open(`${MS_URL.USER}api/NewsLetter/DownloadNewsletterReport/${res.fileGuid}/${res.fileName}`, "_blank");
    };

    const [, setColumnName] = useState("");
    const [sortDirection, setSortDirection] = useState("DESC");
    const [, setSortConfig] = useState({ key: "Products", direction: sortDirection });
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

        await refetch({
            variables: { filters }
        });
    };

    const handleReset = () => {
        setSortDirection("DESC");
        setSelectedSortOption("Sort By");
        setSearch("");
        setSearchEmail("");
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
                <div className="midCotWrap salesCard newsLetter">
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
                                            <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "createdDateUtc", columnName: "Created Date", direction: "ASC", displayoption: "Date - Newest to Oldest" })}>Date - Newest to Oldest</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDropdownSort({ dbColname: "createdDateUtc", columnName: "Created Date", direction: "DESC", displayoption: "Date - Oldest to Newest" })}>Date - Oldest to Newest</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="input-wrapper mb-2 clsOrderReport_SearchNew">
                                    <input type="search" id="searchItem" name="searchItem" aria-label="Search" onChange={handleSearch} value={search} placeholder="Enter email to search" />
                                </div>

                                <div className="search-bar-buttons mb-2">
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
                    </div>
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

export default NewsLetterReport;
