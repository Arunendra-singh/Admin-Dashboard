import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useQueryGetPageConfigurator } from "common/components/graphQL/queries/PageConfigurator/useQueryGetPageConfigurator";
import rowDivider from "../../../helpers/json/rowDividerData";

const ColumnButtons = ({ settings, breakpoint }) => {
    const [selectedValue, setSelectedValue] = useState(settings !== "" ? JSON.stringify(settings.settings[`${breakpoint}`].replaceAll("fr", "").split(" ").map(Number)) : "");

    useEffect(() => {
        if (settings !== "") {
            setSelectedValue(JSON.stringify(settings.settings[`${breakpoint}`].replaceAll("fr", "").split(" ").map(Number)));
        }
    }, [breakpoint, settings.elemId]);

    const handleChange = (_selectedValue) => {
        console.log("_selectedValue : ", _selectedValue);
        // setSelectedValue(JSON.stringify(_selectedValue));
        // const _settings = settings;
        // if (_settings !== undefined && _settings !== "") {
        //     _settings.settings[`${breakpoint}`] = _selectedValue.join("fr ").concat("fr");
        //     const iframe = document.querySelector("iframe[src*='v2/PageViewer']");
        //     iframe.contentWindow.postMessage(JSON.stringify({
        //         type: "select-element",
        //         component: {
        //             props: {
        //                 gridColumn: _settings.settings
        //             }
        //         },
        //         elemId: _settings.elemId
        //     }), "*");
        // }
    };

    return (
        <div id="column-width" className="column-row" data-breakpoint={breakpoint}>
            {rowDivider.map((buttonData) => (
                <span id={`${breakpoint}_${buttonData.label}`} className={`btn ${JSON.stringify(buttonData.colSpan) === selectedValue ? "selected" : ""}`} key={buttonData.label} data-label={buttonData.label} onClick={() => handleChange(buttonData.colSpan)}> <img src={buttonData.iconImg} alt={buttonData.label} /></span>

                // <Button id={`${breakpoint}_${buttonData.label}`} buttonClassName={`btn ${JSON.stringify(buttonData.colSpan) === selectedValue ? "selected" : ""}`} ariaLabel={buttonData.label} key={buttonData.label} buttonType="button" label={buttonData.label} onClick={() => handleChange(buttonData.colSpan)} />
            ))}
        </div>
    );
};

const RowSetting = ({ rowSettingData, selectedScreen }) => {
    const [activeSection, setActiveSection] = useState("grid");
    const toggleBtn = useCallback((e) => {
        const section = e.target.id;
        console.log(section, "objval");
        setActiveSection(section);
    }, []);
    const PagePerRecord = 6;
    const [filters, setFilters] = useState({
        skip: 0,
        take: PagePerRecord,
        where: { isReact: { eq: true } }
    });
    const { data: templatedata } = useQuery(useQueryGetPageConfigurator, {
        variables: filters
    });

    useEffect(() => {
        // console.log("data:", templatedata);
        // const dataRecord = data?.pageConfiguration?.totalCount ? data?.pageConfiguration?.totalCount : 0 + 1;
        // setTotalRecords(dataRecord);
        setFilters(filters);
    }, [templatedata]);

    const getjsonconfig = (e) => {
        templatedata?.pageConfiguration?.items?.forEach((item) => {
            if (item.pageConfigurationGuid === e.target.id) {
                if (item.configJson !== null && item.configJson !== undefined) {
                    const _configJson = JSON.parse(item.configJson).children[0];
                    if (_configJson !== undefined && _configJson !== "") {
                        const iframe = document.querySelector("iframe[src*='v2/PageViewer']");
                        iframe.contentWindow.postMessage(JSON.stringify({
                            type: "append-template",
                            configjson: _configJson,
                            editpage: false
                        }), "*");
                    }
                }
            }
        });
    };

    return (
        <>
            <div className="column-layout configurations">
                <div className="column-breakpoint">
                    <strong id="grid" onClick={toggleBtn} className={`column-label toggleBtn ${activeSection === "grid" ? "show" : ""}`}><i className={`${activeSection === "grid" ? "icon-arrow_drop_down" : "icon-arrow_right"}`} /> Grid</strong>
                    {activeSection === "grid" && (<ColumnButtons settings={rowSettingData} breakpoint={selectedScreen} />)}
                </div>
            </div>

            <div className="template-layout configurations">
                <div className="column-breakpoint">
                    <strong id="template" onClick={toggleBtn} className={`column-label toggleBtn ${activeSection === "template" ? "show" : ""}`}><i className={`${activeSection === "template" ? "icon-arrow_drop_down" : "icon-arrow_right"}`} /> Choose Template</strong>
                    {activeSection === "template" && (
                        <div className="column-row">
                            {templatedata?.pageConfiguration?.items?.length > 0 ? (
                                templatedata?.pageConfiguration?.items?.map((item) => (
                                    <figure key={item.pageKey} className="template_card">
                                        <img src={item.pageThumbnail} id={item.pageConfigurationGuid} alt={item.pageKey} width="100%" onClick={(e) => getjsonconfig(e)} />
                                    </figure>
                                ))
                            ) : (
                                <p>No templates available.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default RowSetting;
