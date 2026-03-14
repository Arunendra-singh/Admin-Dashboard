import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useQueryGetPageConfigurator } from "common/components/graphQL/queries/PageConfigurator/useQueryGetPageConfigurator";
import classes from "../styles/pageConfigurator.module.scss";
import Pagination from "../../../components/Pagination/Paginationindex";
import SearchComponent from "../../../components/shared/SearchBox";

const PageLayoutPopup = ({ addTemplateModalOpen, setAddTemplateModalOpen, onBtnClick }) => {
    const PagePerRecord = 5;
    const [totalRecord, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        skip: 0,
        take: PagePerRecord,
        where: { isReact: { eq: true } }
    });
    const { data, loading } = useQuery(useQueryGetPageConfigurator, {
        variables: filters
    });
    const totalPages = Math.ceil(totalRecord / PagePerRecord);
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        setFilters((prevFilters) => ({
            ...prevFilters,
            skip: newPage
        }));
    };
    useEffect(() => {
        // console.log("data:", data);
        const dataRecord = data?.pageConfiguration?.totalCount ? data?.pageConfiguration?.totalCount : 0 + 1;
        setTotalRecords(dataRecord);
        setFilters(filters);
    }, [data]);

    const handleAddTemplateClick = () => {
        if (onBtnClick === "Create New Page") {
            navigate("/v2/PageConfigurator/layout");
        } else {
            setAddTemplateModalOpen(false);
        }
    };

    const handleModalClose = () => {
        setAddTemplateModalOpen(false);
    };

    const handleSearch = (query) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            where: {
                ...prevFilters.where,
                pageKey: { contain: query }
            },
            skip: 0, // Reset skip to 0 for new search
        }));
    };

    const editPage = (_PageConfigurationGuid) => {
        let path = "/V2/PageConfigurator/create?pageguid=";
        if (onBtnClick === "Create New Page") {
            path = "/V2/PageConfigurator/create?grid=1&templateid=";
        }
        navigate(path + _PageConfigurationGuid, { state: { PageConfigurationGuid: _PageConfigurationGuid } });
    };

    return (
        <Modal size="lg" show={addTemplateModalOpen} onHide={handleModalClose} animation={true} className="pageConfiqPopup modal-90w h-custom">
            <Modal.Header closeButton>
                <Modal.Title>
                    Choose a Template
                    <SearchComponent placeholder="Search Static Page" onSearch={handleSearch} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div className="pageConfiqloader"><div className="loader"><div className="loader-inner line-scale"><div /><div /><div /><div /><div /></div></div></div>
                ) : (
                    <section className={`${classes.content_body_section}`}>
                        <div className="row">
                            <div className="col-lg-4">
                                <figure className="page_card" onClick={handleAddTemplateClick}>
                                    <div className="page_card_Image">
                                        <div className="action_overlay_button">
                                            <span className="icon_btn" data-title="Add">
                                                <i className="icon-add" />
                                            </span>
                                        </div>
                                    </div>
                                    <figcaption className="page_card_desc">
                                        <h4 className="page_card_title">Blank</h4>
                                    </figcaption>
                                </figure>
                            </div>
                            {data?.pageConfiguration?.items?.length > 0 && (
                                [...data.pageConfiguration.items] // Create a shallow copy of the array
                                    .sort((a, b) => a?.pageKey?.localeCompare(b?.pageKey)) // Sort items alphabetically by pageKey
                                    .map((item) => (
                                        <div className="col-lg-4" key={item?.pageGuid}>
                                            <figure className="page_card">
                                                <div className="page_card_Image" onClick={() => editPage(item?.pageGuid)}>
                                                    <img src={item?.pageThumbnail} alt="pageimage" width="100%" />
                                                </div>
                                                <figcaption className="page_card_desc">
                                                    <h4 className="page_card_title">{item?.pageKey}</h4>
                                                </figcaption>
                                            </figure>
                                        </div>
                                    ))
                            )}
                        </div>
                    </section>
                )}
                {data?.pageConfiguration?.items?.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
            </Modal.Body>
        </Modal>
    );
};

export default PageLayoutPopup;
