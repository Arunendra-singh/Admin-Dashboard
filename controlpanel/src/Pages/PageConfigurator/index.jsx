/* eslint-disable ewiz-custom/image-no-hardcoded-cdn-url */
/* eslint-disable import/no-unresolved */
import { CDN_URL, WEBSITE_GUID } from "common/utils/vars";
import { useQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useQueryGetPageConfigurator } from "common/components/graphQL/queries/PageConfigurator/useQueryGetPageConfigurator";
import { useMutationDeletePageConfigurator } from "common/components/graphQL/mutations/PageConfigurator/useMutationDeletePageConfigurator";
import { useMutationActivePageConfigurator } from "common/components/graphQL/mutations/PageConfigurator/useMutationActivePageConfigurator";
import SearchComponent from "~/components/shared/SearchBox";
import { PopupV3 } from "~/helpers/PopupV3";
import Pagination from "~/components/Pagination/Paginationindex";
import PageLayoutPopup from "./pageLayout/pageLayoutPopup";
import classes from "./styles/pageConfigurator.module.scss";

const PageConfigurator = () => {
    useEffect(() => {
        // Function to remove a specific CSS file by its href
        const removeCSSFile = (href) => {
            const linkElement = document.querySelector(`link[href="${href}"]`);
            if (linkElement) {
                linkElement.parentNode.removeChild(linkElement);
                console.log(`CSS file ${href} removed from head`);
            }
        };

        // List of CSS files to remove
        const cssFilesToRemove = [
            `${CDN_URL}/${WEBSITE_GUID}/css/admin.css`,
            `${CDN_URL}/${WEBSITE_GUID}/css/site.css`// Add more if needed
        ];

        // Wait until the DOM is fully loaded and remove each CSS file
        cssFilesToRemove.forEach(removeCSSFile);

        // Cleanup (optional) when component unmounts
        return () => {
        };
    }, []);
    const PagePerRecord = 9;
    const [totalRecord, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalRecord / PagePerRecord);
    const [selectedSortOption, setSelectedSortOption] = useState("All");
    const [counts, setCounts] = useState({ all: 0, active: 0, inactive: 0 });
    const navigate = useNavigate();
    const [addTemplateModalOpen, setAddTemplateModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        skip: 0,
        take: PagePerRecord,
        where: { isReact: { eq: true } }
    });
    const { data, refetch, loading } = useQuery(useQueryGetPageConfigurator, {
        variables: filters
    });

    const calculateCounts = (items) => {
        const allCount = items.filter((item) => item?.status === "All")[0]?.count || 0;
        const activeCount = items.filter((item) => item?.status === "Active")[0]?.count || 0;
        const inactiveCount = items.filter((item) => item?.status === "Inactive")[0]?.count || 0;
        return { all: allCount, active: activeCount, inactive: inactiveCount };
    };

    useEffect(() => {
        if (data) {
            const statuscounts = calculateCounts(data?.pageConfiguration?.statusCount);
            setCounts(statuscounts);
            setTotalRecords(data?.pageConfiguration?.totalCount);
            setFilters(filters);
        }
    }, [data]);

    const [DeleteData] = useMutation(useMutationDeletePageConfigurator);
    const handleDeletePage = (pageGuid) => {
        // const [DeleteData] = useMutation(useMutationDelete);
        DeleteData({
            variables: {
                pageguid: pageGuid
            }
        }).then((res) => {
            if (res?.data?.deletePageConfigurator?.statuscode === 200) {
                PopupV3({
                    content: res?.data?.deletePageConfigurator?.message,
                    type: "Success",
                    classes: "pageConfiqPopup",
                    title: "Success",
                    actions: [
                        {
                            text: "Ok",
                            classes: "btn-info",
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
    const DeletePopup = (pageGuid) => {
        PopupV3({
            content: "Are you sure you want to delete Page Configuration?",
            type: "Confirm",
            classes: "pageConfiqPopup",
            actions: [
                {
                    text: "Ok",
                    classes: "btn-info",
                    dismiss: true,
                    do: () => {
                        handleDeletePage(pageGuid);
                    }
                },
                {
                    text: "Cancel",
                    classes: "btn-cancel",
                    dismiss: true
                }
            ]
        });
    };
    const [activatePageConfigurator] = useMutation(useMutationActivePageConfigurator);
    const handleActivatePage = (pageGuid, isActive) => {
        // const [DeleteData] = useMutation(useMutationDelete);
        activatePageConfigurator({
            variables: {
                entity: {
                    pageGuid,
                    isActive
                }
            }
        }).then((res) => {
            if (res?.data?.activePageConfigurator?.statuscode === 200) {
                PopupV3({
                    content: res?.data?.activePageConfigurator?.message || "Page Configuration updated successfully.",
                    type: "Success",
                    title: "Success",
                    classes: "pageConfiqPopup",
                    actions: [
                        {
                            text: "Ok",
                            classes: "btn-info",
                            dismiss: true,
                            do: () => {
                                window.location.reload();
                            }
                        }
                    ]
                });
            } else {
                PopupV3({
                    content: res?.data?.activePageConfigurator?.message,
                    type: "Error",
                    title: "Error",
                    classes: "pageConfiqPopup",
                    actions: [
                        {
                            text: "Ok",
                            classes: "btn-info",
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
    const ActivatePopup = (pageGuid, isActive) => {
        handleActivatePage(pageGuid, !isActive);
    };

    const editPage = (_PageConfigurationGuid) => {
        const path = "/V2/PageConfigurator/create?pageguid=";
        navigate(path + _PageConfigurationGuid, { state: { PageConfigurationGuid: _PageConfigurationGuid } });
    };
    const handleAddPage = () => {
        // navigate("/v2/PageConfigurator/layout");
        setAddTemplateModalOpen(true);
    };

    const handleSearch = (query) => {
        // console.log(query);
        setCurrentPage(1);
        setFilters((prevFilters) => ({
            ...prevFilters,
            where: {
                ...prevFilters.where,
                pageKey: { contain: query }
            },
            skip: 0, // Reset skip to 0 for new search
        }));
    };

    const handletype = (type) => {
        setSelectedSortOption(type);
        if (type !== "All") {
            setFilters((prevFilters) => {
                let isActiveFilter = {};

                if (type === "Active") {
                    isActiveFilter = { eq: true };
                } else if (type === "Inactive") {
                    isActiveFilter = { eq: false };
                }
                return {
                    ...prevFilters,
                    where: {
                        ...prevFilters.where,
                        isActive: isActiveFilter
                    },
                    skip: 0 // Reset pagination when applying a new filter
                };
            });
        } else {
            setFilters((prevFilters) => ({
                ...prevFilters,
                where: { isReact: { eq: true } },
                skip: 0
            }));
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        setFilters((prevFilters) => ({
            ...prevFilters,
            skip: newPage
        }));
    };

    useEffect(() => {
        refetch(filters);
    }, [filters, refetch]);

    const handlePreview = (pageKey) => {
        const baseUrl = window.location.origin;
        const url = `${baseUrl}/info/${pageKey}`;
        window.open(url, "_blank");
    };

    const renderContent = () => {
        if (loading) {
            return <div className="pageConfiqloader"><div className="loader"><div className="loader-inner line-scale"><div /><div /><div /><div /><div /></div></div></div>;
        }

        if (data?.pageConfiguration?.items?.length > 0) {
            return (
                <>
                    <section className={`${classes.content_body_section} `}>
                        <div className="row">
                            {data?.pageConfiguration?.items?.length > 0 && (
                                [...data.pageConfiguration.items] // Create a shallow copy of the array
                                    .sort((a, b) => a?.pageKey?.localeCompare(b?.pageKey)) // Sort items alphabetically by pageKey
                                    .map((item) => (
                                        <div className="col-lg-4" key={item?.pageGuid}>
                                            <figure className="page_card">
                                                <div className="page_card_Image">
                                                    <img src={item?.pageThumbnail} alt="pageimage" width="100%" />
                                                    <div className="action_overlay_button">
                                                        <span className="icon_btn clsPageConfig_View" data-title="View" onClick={() => handlePreview(item?.pageKey)}>
                                                            <i className="icon-eye" /> <span>View</span>
                                                        </span>
                                                        <span className="icon_btn clsPageConfig_Edit" data-title="Edit" onClick={() => editPage(item?.pageGuid)}>
                                                            <i className="icon-PencilSimple-1" /> <span>Edit</span>
                                                        </span>
                                                        <span className="icon_btn clsPageConfig_Delete" data-title="Delete" onClick={() => DeletePopup(item?.pageGuid)}>
                                                            <i className="icon-delete" /> <span>Delete</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <figcaption className="page_card_desc">
                                                    <h4 className="page_card_title">{item?.pageKey}</h4>

                                                    {item?.isActive ? (
                                                        <svg className="clsPageConfig_Status" onClick={() => ActivatePopup(item?.pageGuid, item?.isActive)} width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect y="0.500977" width="24" height="14" rx="7" fill="#1CBF70" />
                                                            <rect x="10.7856" y="1.00098" width="12.7143" height="13" rx="6.35714" fill="white" stroke="#1CBF70" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="clsPageConfig_Status" onClick={() => ActivatePopup(item?.pageGuid, item?.isActive)} width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="28" height="16" rx="8" fill="#99A7AD" />
                                                            <rect width="16" height="16" rx="8" fill="white" />
                                                        </svg>
                                                    )}
                                                </figcaption>
                                            </figure>
                                        </div>
                                    ))
                            )}

                        </div>
                    </section>
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </>
            );
        }

        return <div className="no_records"><h5>No pages found</h5></div>;
    };

    return (
        <section className={classes.page_configurator}>
            <div className={`${classes.top_search_section} search-bar `}>
                <div className="select-wrapper clsPageConfig_StatusCount">
                    <Dropdown>
                        <Dropdown.Toggle variant="default" id="dropdown-pageconfiqbasic" className="sortby-dropdown-toggle">
                            {`${selectedSortOption} (${counts[selectedSortOption.toLowerCase()]})`}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handletype("All")}>All ({counts.all})</Dropdown.Item>
                            <Dropdown.Item onClick={() => handletype("Active")}>Active ({counts.active})</Dropdown.Item>
                            <Dropdown.Item onClick={() => handletype("Inactive")}>Inactive ({counts.inactive})</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="search-bar-buttons">
                    <div className="clsPageConfig_search"><SearchComponent placeholder="Search Static Page" onSearch={handleSearch} /></div>
                    <button className="btn btn_create clsPageConfig_Create" type="button" onClick={handleAddPage}>
                        <i className="icon-add" />
                        &nbsp; Create New Page
                    </button>
                </div>
            </div>
            {renderContent()}

            {addTemplateModalOpen && <PageLayoutPopup addTemplateModalOpen={addTemplateModalOpen} setAddTemplateModalOpen={setAddTemplateModalOpen} onBtnClick="Create New Page" />}
        </section>
    );
};

export default PageConfigurator;
