const ConfigWrapper = ({ type, elemId, elementConfig, children }) => {
    const onDelete = () => {
        window.postMessage(
            JSON.stringify({
                type: "remove-element",
                elemId
            }),
            "*"
        );
    };

    const showConfigSetting = () => {
        // console.log("config setting", elementConfig);
        window.top.postMessage(
            {
                type: "element-setting",
                settings: elementConfig,
                elemId,
                elemType: type
            },
            "*"
        );
    };
    const dragColumn = () => {

    };
    const onDeleteColumn = () => {
        window.postMessage(
            JSON.stringify({
                type: "remove-row-column",
                elemId
            }),
            "*"
        );
    };

    return (
        <section className="pb-container child" draggable>
            <div className="skip_iframe child-drag-actions">
                <span title="Drag Column" className="drag icon-ArrowsOutCardinal-1" onClick={dragColumn} />
                <span title="Remove Column" className="remove icon-trash" onClick={onDeleteColumn} />
            </div>
            <div className={`wrapper-component ${type}-wrapper`}>
                <div className="tools-wrapper skip_iframe">
                    <span className="trash icon-trash skip_iframe" onClick={onDelete} />
                    {Object.keys(elementConfig).length > 0 && <span className="edit icon-edit skip_iframe" onClick={showConfigSetting} />}
                </div>
                <div className="component">{children}</div>
            </div>
        </section>
    );
};

export default ConfigWrapper;
