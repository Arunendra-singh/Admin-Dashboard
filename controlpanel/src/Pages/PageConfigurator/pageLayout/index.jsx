// import React, { useState, useEffect, useRef, createElement, Fragment, useCallback } from "react";
import { CDN_URL, WEBSITE_GUID } from "common/utils/vars";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../../../hoc/PageContainer";
import PageLayoutPopup from "./pageLayoutPopup";
import classes from "../styles/pageConfigurator.module.scss";

const PageLayout = () => {
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

        const tourButton = document.querySelector(".taketour_btn");
        if (tourButton) {
            tourButton.style.display = "none";
        }
    }, []);
    const [addTemplateModalOpen, setAddTemplateModalOpen] = useState(false);
    const handleAddTemplateClick = (e) => {
        e.preventDefault();
        setAddTemplateModalOpen(true);
    };

    return (
        <PageContainer id="page-builder" fluid classes={classes.page_configurator}>
            <section className={`${classes.content_body_section} bg-white`}>
                <div className="layout_wrapper">
                    <h1 className="layout_title">Select layout</h1>
                    <div className="layout_option row">
                        <div className="col-lg-3 layout_card">
                            <figure className="layout_Outline">
                                <Link to="/V2/PageConfigurator/create?grid=1"><img src={`${CDN_URL}/images/Grids/layout1.png`} alt="layout" /></Link>
                            </figure>
                        </div>
                        <div className="col-lg-3 layout_card">
                            <figure className="layout_Outline">
                                <Link to="/V2/PageConfigurator/create?grid=2"><img src={`${CDN_URL}/images/Grids/layout2.png`} alt="layout" /></Link>
                            </figure>
                        </div>
                        <div className="col-lg-3 layout_card">
                            <figure className="layout_Outline">
                                <Link to="/V2/PageConfigurator/create?grid=3"><img src={`${CDN_URL}/images/Grids/layout3.png`} alt="layout" /></Link>
                            </figure>
                        </div>
                        <div className="col-lg-3 layout_card">
                            <figure className="layout_Outline">
                                <Link to="/V2/PageConfigurator/create?grid=4"><img src={`${CDN_URL}/images/Grids/layout4.png`} alt="layout" /></Link>
                            </figure>
                        </div>
                        <div className="col-lg-3 layout_card">
                            <figure className="layout_Outline">
                                <Link to="/V2/PageConfigurator/create?grid=5"><img src={`${CDN_URL}/images/Grids/layout8.png`} alt="layout" /></Link>
                            </figure>
                        </div>
                        <div className="col-lg-3 layout_card">
                            <figure className="layout_Outline">
                                <Link to="/V2/PageConfigurator/create?grid=6"><img src={`${CDN_URL}/images/Grids/layout7.png`} alt="layout" /></Link>
                            </figure>
                        </div>
                        <div className="col-lg-3 layout_card">
                            <figure className="layout_Outline">
                                <Link to="/V2/PageConfigurator/create?grid=7"><img src={`${CDN_URL}/images/Grids/layout5.png`} alt="layout" /></Link>
                            </figure>
                        </div>
                        <div className="col-lg-3 layout_card">
                            <figure className="layout_Outline">
                                <Link to="/V2/PageConfigurator/create?grid=8"><img src={`${CDN_URL}/images/Grids/layout6.png`} alt="layout" /></Link>
                            </figure>
                        </div>
                    </div>
                </div>
                <div className="template_wrapper">
                    <p className="OrText">Or</p>
                    <button type="button" className="btn  btn_addtemplate" onClick={(e) => handleAddTemplateClick(e)}>Add Template</button>
                </div>
            </section>
            {addTemplateModalOpen && <PageLayoutPopup addTemplateModalOpen={addTemplateModalOpen} setAddTemplateModalOpen={setAddTemplateModalOpen} onBtnClick="Add Template" />}
        </PageContainer>
    );
};

export default PageLayout;
