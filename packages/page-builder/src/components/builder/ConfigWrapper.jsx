const ConfigWrapper = ({ type, elemId, elementConfig, children }) => {
    const onDelete = () => {
        window.postMessage(JSON.stringify({
            type: "remove-element",
            elemId
        }), "*");
    };

    const showConfigSetting = () => {
        console.log("config setting", elementConfig);
        window.top.postMessage({
            type: "element-setting",
            settings: elementConfig,
            elemId,
            elemType: type
        }, "*");
    };

    return (
        <div className={`wrapper-component ${type}-wrapper`}>
            <div className="tools-wrapper">
                <span className="icon icon-trash" onClick={onDelete} />
                {Object.keys(elementConfig).length > 0 && <span className="icon icon-edit" onClick={showConfigSetting} />}
            </div>
            <div className="component">
                {children}
            </div>
        </div>
    );
};

export default ConfigWrapper;
