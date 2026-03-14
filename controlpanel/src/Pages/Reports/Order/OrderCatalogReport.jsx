import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { PopupV3 } from "common/utils";
import moment from "moment";
import { useGetAllState, useGetAllCountry } from "common/hooks/react/api";
import { useQueryGetOrderCatalogReport } from "common/components/graphQL/queries/Reports/useQueryGetOrderCatalogReport";
import { LANGUAGE_GUID, REACT_APP_API_ENDPOINT, WEBSITE_GUID } from "common/utils/vars";
import Table from "../../../components/common/Table";
import ShowingResults from "../../../components/ShowingResult";
import Pagination from "../../../components/Pagination/Paginationindex";
import "../Report.scss";

const OrderCatalogReport = () => {
    const PagePerRecord = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [fromDate, setFromdate] = useState(moment().add(-3, "month").format("YYYY-MM-DD"));
    const [toDate, setTodate] = useState(moment().format("YYYY-MM-DD"));
    const basicLink = `${REACT_APP_API_ENDPOINT}api/fileupload/ExportOrderCatalogReport/${WEBSITE_GUID}/${LANGUAGE_GUID}`;
    const [exportLink, setExportLink] = useState(`${basicLink}?fromDate=${moment().add(-3, "month").format("YYYY-MM-DD")}&toDate=${moment().format("YYYY-MM-DD")}`);
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
            },
            createdDate: { gte: moment().add(-3, "month").format("YYYY-MM-DD") }
        },
        order: { createdDateUtc: "DESC" }
    });

    const { data, refetch, loading } = useQuery(useQueryGetOrderCatalogReport, {
        variables: { filters }
    });
    const [showPopup, setShowPopup] = useState(false);
    const [editData, setEditdata] = useState([]);
    const [statename, setStateName] = useState("");
    const [countryname, setCountryName] = useState("");
    const { mutateAsync: allState } = useGetAllState();
    const { data: allCountries } = useGetAllCountry();
    const handlePreviewClick = async (editdata) => {
        const test = editdata[4][1];
        const allstate = await allState(test?.countryGUID || "");
        if (allState) {
            const statedata = allstate.filter((item) => item.stateguid === test?.state);
            const stateName = statedata.length ? statedata[0]?.name : "";
            setStateName(stateName);
        }
        const allcountry = await allCountries.data;
        if (allcountry) {
            const countrydata = allcountry.filter((item) => item.countryguid === test?.countryGUID);
            const countryName = countrydata.length ? countrydata[0]?.countryname : "";
            setCountryName(countryName);
        }
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

    const reportData = () => {
        const allData = [];

        if (data.orderCatalogReport !== undefined && data?.orderCatalogReport?.items?.length > 0) {
            const dataForReport = data?.orderCatalogReport?.items;
            dataForReport?.forEach((report) => {
                const editDataReport = ["Edit", report];
                const reportVal = [report?.createdDate !== null && formatDate(report?.createdDate), `${report?.firstName} ${report?.lastName}`, report?.emailAddress, report?.companyName, editDataReport];
                allData.push(reportVal);
            });
        }
        setTotalRecords(data?.orderCatalogReport?.totalCount);
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
            setTotalRecords(data?.orderCatalogReport?.totalCount);
            reportData();
        }
    }, [data?.orderCatalogReport?.items]);

    const columns = ["Created Date", "Customer Name", "Customer Email", "Company Name", "View"];

    const columnAlignments = {
        "Created Date": "date text-no-ellipsis",
        "Customer Name": "nameList text-no-ellipsis",
        "Customer Email": "nameList text-no-ellipsis",
        "Company Name": "nameList text-no-ellipsis",
        View: "actionbtn text-no-ellipsis"
    };

    const handlePageChange = async (newPage) => {
        setCurrentPage(newPage);
        setFilters((prevFilters) => ({
            ...prevFilters,
            skip: newPage
        }));
    };
    const onReset = () => {
        setFromdate(moment().add(-3, "month").format("YYYY-MM-DD"));
        setTodate(moment().format("YYYY-MM-DD"));
        setSearch("");
        setSearchCompany("");
        setSearchEmail("");
        setCurrentPage(1);
        setFilters({
            skip: 1,
            take: PagePerRecord,
            where: {
                websiteGuid: {
                    eq: WEBSITE_GUID
                },
                createdDate: { gte: moment().add(-3, "month").format("YYYY-MM-DD") }
            },
            order: { createdDateUtc: "DESC" }
        });
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
        if (search || searchCompany || searchEmail) {
            filter.customerName = { contain: search };
            filter.companyName = { contain: searchCompany };
            filter.customerEmail = { contain: searchEmail };
            link = `${link}&customerName=${search}&companyName=${searchCompany}&customerEmail=${searchEmail}`;
            setExportLink(link);
        }
        if (fromDate) {
            const todate = addOneDay(toDate);
            filter.createdDate = { gte: fromDate, lte: todate };
            link = `${link}&fromDate=${fromDate}&toDate=${todate}`;
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

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleSearchCompany = (event) => {
        setSearchCompany(event.target.value);
    };

    const handleSearchEmail = (event) => {
        setSearchEmail(event.target.value);
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

    // const isWithinNinetyDays = (startDate, endDate) => {
    //     const start = new Date(startDate);
    //     const end = new Date(endDate);

    //     // Calculate the difference in milliseconds
    //     const diffInMs = end - start;

    //     // Convert the difference to days
    //     const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    //     // Ensure the end date is not before the start date and the difference is within 90 days
    //     return diffInDays >= 0 && diffInDays <= 90;
    // };

    const handlefromdate = (e) => {
        const selectedDate = e.target.value;
        setFromdate(selectedDate);
        if (selectedDate !== undefined && toDate !== undefined && !validateDate(selectedDate, toDate)) {
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
        // } else if (!isWithinNinetyDays(selectedDate, toDate)) {
        //     PopupV3({
        //         content: "Please select only three months.",
        //         type: "Warning",
        //         title: "Warning",
        //         actions: [
        //             {
        //                 dismiss: true,
        //                 text: "OK"
        //             }
        //         ]
        //     });
        //     setTodate("");
        // }
    };

    const handletodate = (e) => {
        const selectedDate = e.target.value;
        setTodate(selectedDate);
        if (toDate) {
            if (selectedDate !== undefined && fromDate !== undefined && !validateDate(fromDate, selectedDate)) {
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
            }
            // } else if (!isWithinNinetyDays(fromDate, selectedDate)) {
            //     PopupV3({
            //         content: "Please select only three months.",
            //         type: "Warning",
            //         title: "Warning",
            //         actions: [
            //             {
            //                 dismiss: true,
            //                 text: "OK"
            //             }
            //         ]
            //     });
            //     setTodate("");
            // }
        }
    };

    const onSearch = () => {
        if (search === "" && searchEmail === "" && searchCompany === "" && toDate === "" && fromDate === "") {
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
            setFilters((prevFilters) => ({
                ...prevFilters,
                skip: 1,
                take: 10,
                order: { createdDateUtc: "DESC" },
                where: constructWhereClauseNew()
            }));
        }
    };

    const handleExportClick = () => {
        window.open(exportLink, "_blank");
    };
    return (
        <section className="body-container midContent">
            <div className="usermanagement-container orderCatlogReport">
                <div className="midCotWrap salesCard">
                    <div className="search-bar">
                        <div className="search-bar-controls">
                            <div className="select-wrapper mb-2" />
                            <div className="header-second">
                                <div className="input-wrapper mb-2 clsSalesReport_SearchNew">
                                    <input type="search" id="customerName" name="customerName" value={search} aria-label="Search" onChange={handleSearch} placeholder="Customer Name..." />
                                    <input type="search" className="ml-3" id="customerEmail" value={searchEmail} name="customerEmail" aria-label="Search" onChange={handleSearchEmail} placeholder="Email Address..." />
                                    <input type="search" className="ml-3 mr-3" id="companyName" value={searchCompany} name="companyName" aria-label="Search" onChange={handleSearchCompany} placeholder="Company Name..." />
                                </div>
                                <div className="mb-2">
                                    <div className="date-input-wrapper clsSalesReport_DateNew">
                                        <input id="FromDate" className="textbox-n" type="date" aria-label="fromdate" onChange={handlefromdate} onClick={handleCalendarClick} value={fromDate} placeholder="From Date" />
                                        <input id="ToDate" className="textbox-n" type="date" aria-label="expiredate" onChange={handletodate} onClick={handleCalendarClick} value={toDate} placeholder="To Date" />
                                    </div>
                                </div>
                                <div className="search-bar-buttons ml-2 mb-2">
                                    <button type="button" className="btn btn_search clsSalesReport_SearchButtonNew" onClick={() => onSearch()}>
                                        Search
                                    </button>
                                    <button type="button" onClick={onReset} className="reset btn btn_reset clsSalesReport_ResetButtonNew">
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
                                        <p className="text-cap">
                                            Order Catalog information - ({editData?.firstName} {editData?.lastName})
                                        </p>
                                    </div>
                                    <div className="bottom-info">
                                        <table>
                                            <tr>
                                                <th className="width-30">Customer Name :</th>
                                                <td>{editData !== null && `${editData?.firstName} ${editData?.lastName}`}</td>
                                            </tr>
                                            <tr>
                                                <th className="width-30">Customer Email :</th>
                                                <td>{editData !== null && `${editData?.emailAddress}`}</td>
                                            </tr>
                                            <tr>
                                                <th className="width-30">Company Name :</th>
                                                <td>{editData !== null && `${editData?.companyName}`}</td>
                                            </tr>
                                            <tr>
                                                <th className="width-30">Phone Number :</th>
                                                <td>{editData !== null && editData?.phone !== null && `${editData?.phone}`}</td>
                                            </tr>
                                            <tr>
                                                <th className="width-30">Fax :</th>
                                                <td>{editData !== null && editData?.fax !== null && `${editData?.fax}`}</td>
                                            </tr>
                                            <tr>
                                                <th className="width-30">Address :</th>
                                                <td>{editData !== null && editData?.address !== null && `${editData?.address}`}</td>
                                            </tr>
                                            <tr>
                                                <th className="width-30">City :</th>
                                                <td>{editData !== null && editData?.city !== null && `${editData?.city}`}</td>
                                            </tr>
                                            <tr>
                                                <th className="width-30">State :</th>
                                                <td>{editData !== null && `${statename}`}</td>
                                            </tr>
                                            <tr>
                                                <th className="width-30">Zipcode :</th>
                                                <td>{editData !== null && editData?.zip !== null && `${editData?.zip}`}</td>
                                            </tr>
                                            <tr>
                                                <th className="width-30">Country :</th>
                                                <td>{editData !== null && `${countryname}`}</td>
                                            </tr>
                                            <tr>
                                                <th className="width-30">Shipper No :</th>
                                                <td>{editData !== null && editData?.shipperNumber !== null && `${editData?.shipperNumber}`}</td>
                                            </tr>
                                            <tr>
                                                <th className="width-30">Freight Type :</th>
                                                <td>{editData !== null && editData?.freightTypeName !== null && `${editData?.freightTypeName}`}</td>
                                            </tr>
                                            <tr>
                                                <th className="width-30">ASI :</th>
                                                <td>{editData !== null && editData?.asi !== null && `${editData?.asi}`}</td>
                                            </tr>
                                            <tr>
                                                <th className="width-30">UPIC :</th>
                                                <td>{editData !== null && editData?.upic !== null && `${editData?.upic}`}</td>
                                            </tr>
                                            <tr>
                                                <th className="width-30">PPAI :</th>
                                                <td>{editData !== null && editData?.ppai !== null && `${editData?.ppai}`}</td>
                                            </tr>
                                            <tr>
                                                <th className="width-30">SAGE :</th>
                                                <td>{editData !== null && editData?.sage !== null && `${editData?.sage}`}</td>
                                            </tr>
                                            <tr>
                                                <th className="width-30">PPPC :</th>
                                                <td>{editData !== null && editData?.ppc !== null && editData?.ppc !== undefined && `${editData?.ppc}`}</td>
                                            </tr>
                                            <tr>
                                                <th className="width-30">Message :</th>
                                                <td>{editData !== null && editData?.message !== null && `${editData?.message}`}</td>
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
                            <Table data={Data} columns={columns} loading={loading} columnAlignments={columnAlignments} handlePreviewClick={handlePreviewClick} />
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

export default OrderCatalogReport;
