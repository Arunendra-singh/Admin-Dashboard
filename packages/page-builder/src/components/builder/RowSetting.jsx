import Button from "~/components/shared/Button";
import { useCallback, useEffect, useState } from "react";
import rowDivider from "../../helpers/json/rowDividerData";

const ColumnButtons = ({ settings, breakpoint, animate }) => {
    const [selectedValue, setSelectedValue] = useState(JSON.stringify(settings.settings[`${breakpoint}`].replaceAll("fr", "").split(" ").map(Number)));

    useEffect(() => {
        setSelectedValue(JSON.stringify(settings.settings[`${breakpoint}`].replaceAll("fr", "").split(" ").map(Number)));
    }, [breakpoint, settings.elemId]);

    const handleChange = (_selectedValue) => {
        setSelectedValue(JSON.stringify(_selectedValue));

        const _settings = settings;
        _settings.settings[`${breakpoint}`] = _selectedValue.join("fr ").concat("fr");

        const iframe = document.querySelector("iframe[src*='page-viewer']");
        iframe.contentWindow.postMessage(JSON.stringify({
            type: "select-element",
            component: {
                props: {
                    gridColumn: _settings.settings
                }
            },
            elemId: _settings.elemId
        }), "*");
    };

    return (
        <div id="column-width" className={`animate ${animate ? "show" : ""}`} data-breakpoint={breakpoint}>
            {rowDivider.map((buttonData) => (
                <Button id={`${breakpoint}_${buttonData.label}`} buttonClassName={`btn ${JSON.stringify(buttonData.colSpan) === selectedValue ? "selected" : ""}`} ariaLabel={buttonData.label} key={buttonData.label} buttonType="button" label={buttonData.label} onClick={() => handleChange(buttonData.colSpan)} />
            ))}
        </div>
    );
};

const RowSetting = ({ rowSettingData, selectedScreen }) => {
    const [animate, setAnimation] = useState(true);

    const toggleBtn = useCallback(() => {
        setAnimation(!animate);
    }, [animate]);

    return (
        <div className="column-layout configurations">
            <div className="column-breakpoint">
                <strong onClick={toggleBtn} className={`column-label toggleBtn ${animate ? "show" : ""}`}>{selectedScreen}</strong>
                <ColumnButtons settings={rowSettingData} breakpoint={selectedScreen} />
            </div>
        </div>
    );
};

export default RowSetting;
