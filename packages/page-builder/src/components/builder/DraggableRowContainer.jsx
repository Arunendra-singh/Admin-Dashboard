const DraggableRowContainer = ({ children, fluid = false, cols = 1, gridColumn = {}, elemId = "" }) => {
    console.log(`${elemId} element cols ${cols}`);

    const onDragStartHandler = (event) => {
        event.target.classList.add("dragging");
    };

    const onDragEndHandler = (event) => {
        event.preventDefault();
        event.target.classList.remove("dragging");
    };

    const onDelete = () => {
        window.postMessage(JSON.stringify({
            type: "remove-row",
            elemId
        }), "*");
    };

    const showRowSettings = () => {
        window.top.postMessage({
            type: "row-setting",
            settings: gridColumn,
            elemId
        }, "*");
    };

    return (
        <>
            {Object.keys(gridColumn).length > 0 && (
                <style>{`
                @media (max-width: 576px) {
                    #${elemId} { grid-template-columns : ${gridColumn.mobile}}
                }
                @media (min-width: 577px) and (max-width: 1024px) {
                    #${elemId} { grid-template-columns : ${gridColumn.tablet}}
                }
                @media (min-width: 1025px) {
                    #${elemId} { grid-template-columns : ${gridColumn.desktop}}
                }
            `}
                </style>
            )}
            <div className={fluid ? "pb-container-fluid" : "pb-container"} onDragStart={onDragStartHandler} onDragEnd={onDragEndHandler} draggable>
                {/* <div className="dragger">Drag</div> */}
                <div className="row-tools-wrapper tools-wrapper">
                    <span title="Remove Row from Page" className="icon icon-trash" onClick={onDelete} />
                    <span title="Edit Row" className="icon icon-edit" onClick={showRowSettings} />
                </div>
                <div className="pb-row" id={elemId}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default DraggableRowContainer;
