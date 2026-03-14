const DraggableRowContainer = ({ children, fluid = false, cols = 1, gridColumn = {}, elemId = "" }) => {
    console.log(`${elemId} element cols ${cols} in child`);
    const onDragStartHandler = (event) => {
        event.target.classList.add("dragging");
    };

    const onDragEndHandler = (event) => {
        event.preventDefault();
        event.target.classList.remove("dragging");
    };

    const onDelete = () => {
        window.postMessage(
            JSON.stringify({
                type: "remove-row",
                elemId
            }),
            "*"
        );
    };

    const showRowSettings = () => {
        window.top.postMessage(
            {
                type: "row-setting",
                settings: gridColumn,
                elemId
            },
            "*"
        );
    };

    const cloneRowData = () => {
        window.postMessage(
            JSON.stringify({
                type: "clone-row-setting",
                elemId
            }),
            "*"
        );
    };

    const copyLayout = () => {
        window.postMessage(
            JSON.stringify({
                type: "copy-layout",
                elemId
            }),
            "*"
        );
    };

    return (
        <>
            {Object.keys(gridColumn).length > 0 && (
                <style type="text/css">
                    {`
                @media (max-width: 576px) {
                    #${elemId} { grid-template-columns : ${gridColumn.mobile}}
                }
                @media (max-width: 991px) and (min-width: 577px)  {
                    #${elemId} { grid-template-columns : ${gridColumn.tablet}}
                }
                @media (min-width: 992px) {
                    #${elemId} { grid-template-columns : ${gridColumn.desktop}}
                }
                @media (min-width: 992px) {
                    .hide-desktop { display: none !important; } /* Hide on desktop */
                }
        
                @media (max-width: 991px) and (min-width: 577px) {
                    .hide-tablet { display: none !important; } /* Hide on tablet */
                }
        
                @media (max-width: 576px) {
                    .hide-mobile { display: none !important; } /* Hide on mobile */
                }
            `}
                </style>
            )}
            <div className={fluid ? "pb-container-fluid" : "pb-container"} onDragStart={onDragStartHandler} onDragEnd={onDragEndHandler} draggable>
                {/* <div className="dragger">Drag</div> */}
                <div className="row-tools-top-wrapper skip_iframe">
                    <span title="View Layout" className="view icon-bxs_grid" onClick={showRowSettings} />
                    <span title="Clone Layout" className="clone icon-content_copy" onClick={cloneRowData} />
                    <span title="Remove Layout" className="remove icon-trash" onClick={onDelete} />
                </div>
                {/* <div className="row-tools-wrapper tools-wrapper skip_iframe">
                    <span title="Remove Row from Page" className="fa fa-trash skip_iframe"/>
                    <span title="Edit Row" className="fa fa-edit skip_iframe" onClick={showRowSettings} />
                </div> */}
                <div className="pb-row" id={elemId}>
                    {children}
                </div>
                <div className="layoutplusbtn skip_iframe">
                    <span title="Copy Layout" className="add-copy icon-add" onClick={copyLayout} />
                </div>
            </div>
        </>
    );
};

export default DraggableRowContainer;
