import React, { useCallback, useEffect, useState } from "react";
import PageContainer from "~/hoc/PageContainer";
import { categories } from "~/helpers/json/components.json";
import ConfigSetting from "../../components/builder/ConfigSetting";
import RowSetting from "../../components/builder/RowSetting";

import "../../styles/pages/index.scss";

const Categories = ({ onDragStartHandler }) => categories.map((category) => (
    <div className="element-category" key={category.name}>
        <strong className="title">{category.name} ({category.components.length})</strong>
        <ul className="element-list">
            {category.components.map((comp) => (
                <li key={comp.label} data-comp={JSON.stringify(comp)} onDragStart={onDragStartHandler} className="dropable" draggable>
                    <i className={comp.icon ?? ""} />
                    <span>{comp.label}</span>
                </li>
            ))}
        </ul>
    </div>
));

const PageBuilder = () => {
    const [size, setSize] = useState("desktop");
    const [elementData, setElementData] = useState(null);
    const [rowSettingData, setRowSettingData] = useState(null);
    const [minimizeSetting, setMinimizeSetting] = useState(false);
    const [minimizeComponent, setMinimizeComponent] = useState(false);

    const viewportHandler = useCallback((option) => {
        setSize(option);
    }, [size]);

    const onDragStartHandler = (event) => {
        const dataStr = event.currentTarget.dataset.comp;
        if (!dataStr) return;

        event.dataTransfer.setData("text/plain", dataStr);
    };

    const clearElementData = useCallback(() => {
        setElementData(null);
    }, [elementData]);

    const clearRowSettingData = useCallback(() => {
        setRowSettingData(null);
    }, [rowSettingData]);

    const onMessageHandler = (event) => {
        const { data } = event;

        if (data.type === "element-setting") {
            setElementData({ settings: data.settings, elemId: data.elemId, elemType: data.elemType, style: data.style });
            clearRowSettingData();
        }

        if (data.type === "row-setting") {
            setRowSettingData({ settings: data.settings, elemId: data.elemId });
            clearElementData();
        }
    };

    useEffect(() => {
        window.addEventListener("message", onMessageHandler, false);

        return () => {
            window.removeEventListener("message", onMessageHandler);
        };
    }, []);

    return (
        <PageContainer id="page-builder" fluid>
            <aside id="left" className={`${minimizeComponent ? "showIcons" : ""}`}>
                {minimizeComponent && <i className="ico-grid-2-plus min-max-icon showComponent" onClick={() => setMinimizeComponent(false)} />}
                <div className="heading">
                    <h2><i className="ico-grid-2-plus" />Elements</h2>
                    <i className="ico-grid-2-plus min-max-icon" onClick={() => setMinimizeComponent(true)} />
                </div>

                <Categories onDragStartHandler={onDragStartHandler} />
            </aside>

            <section id="viewer">
                <div id="toolbar">
                    <div id="sizes">
                        <div onClick={() => viewportHandler("desktop")} className={`size desktop ${size === "desktop" ? "active" : ""}`}><i className="ico-desktop" /></div>
                        <div onClick={() => viewportHandler("tablet")} className={`size tablet ${size === "tablet" ? "active" : ""}`}><i className="ico-tablet-button" /></div>
                        <div onClick={() => viewportHandler("mobile")} className={`size mobile ${size === "mobile" ? "active" : ""}`}><i className="ico-mobile" /></div>
                    </div>
                </div>

                <div id="iframe-wrapper" className={size}>
                    <iframe title="aa" src="/page-viewer" />
                </div>
            </section>

            <aside id="right" className={`${minimizeSetting ? "minimized" : ""}`}>
                {minimizeSetting ? (
                    <div className="maximized-section" onClick={() => setMinimizeSetting(false)}>
                        <span className="min-max-icon ico-grid-2-plus" />
                        <span>Settings</span>
                    </div>
                ) : (
                    <>
                        <div className="heading">
                            <h4>Settings</h4>
                            <div className="min-max-icon ico-grid-2-plus" onClick={() => setMinimizeSetting(true)} />
                        </div>
                        {elementData != null && <ConfigSetting elementData={elementData} clearElementData={clearElementData} />}

                        {rowSettingData != null && <RowSetting selectedScreen={size} rowSettingData={rowSettingData} clearRowSettingData={clearRowSettingData} />}
                    </>
                )}
            </aside>

        </PageContainer>
    );
};

export default PageBuilder;
