import React, { useState, useMemo, useCallback } from "react";
import tblestyle from "./Datatable.module.scss";

const TableHeader = ({ columns, columnAlignments, sortConfig }) => (
    <thead>
        {columns.length > 0 && (
            <tr>
                {columns.map((cell, colIndex) => (
                    // eslint-disable-next-line no-nested-ternary, react/no-array-index-key
                    <td key={`header-${colIndex}`} className={`theadTitle ${columnAlignments[cell] || "text-left"} ${sortConfig.key === cell ? (sortConfig.direction === "ASC" ? "asc" : "desc") : ""}`}>
                        {cell}
                    </td>
                ))}
            </tr>
        )}
    </thead>
);

const TableCell = ({ cell, alignmentClass, onMouseEnter, onMouseLeave, displayId, onButtonClickCalled, actionButtonStyle }) => {
    if (Array.isArray(cell)) {
        const actionId = cell.find((x) => x.id)?.id;
        const productcode = cell.find((x) => x.id)?.productid;
        return (
            <td className={`tblBodyRowtd ${alignmentClass}`}>
                {actionButtonStyle === "inline" ? (
                    <div className="action-inline">
                        {cell.map((buttonVal, buttonIndex) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <button key={`button-${buttonIndex}`} type="button" data-title={buttonVal.label} onClick={() => onButtonClickCalled(buttonVal.label, actionId, productcode)}>
                                <i className={buttonVal.icon} /> {buttonVal.label}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="action DropdownAction" onMouseEnter={() => onMouseEnter(actionId)} onMouseLeave={onMouseLeave} id={`${actionId}actionbutton`}>
                        <button className="dropdown-button" type="button">
                            Actions
                        </button>
                        <div className="action_hover" style={{ display: actionId === displayId ? "block" : "none" }}>
                            {cell.map((buttonVal, buttonIndex) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <button key={`button-${buttonIndex}`} type="button" data-title={buttonVal.label} onClick={() => onButtonClickCalled(buttonVal.label, actionId, productcode)}>
                                    <i className={buttonVal.icon} /> {buttonVal.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </td>
        );
        // eslint-disable-next-line no-else-return
    } else {
        return (
            <td className={`tblBodyRowtd ${alignmentClass}`}>
                {cell?.isLink ? (
                    <>
                        <a className="ellipsis" href={cell.linkValue}>
                            {cell.rowValue}
                        </a>
                        {cell.rowValue && <small className="custtooltip">{cell.rowValue}</small>}
                    </>
                ) : (
                    <>
                        <span className="ellipsis">{cell}</span>
                        {cell && <small className="custtooltip">{cell}</small>}
                    </>
                )}
            </td>
        );
    }
};

const TableRow = ({ row, columns, columnAlignments, displayId, onMouseEnter, onMouseLeave, onButtonClickCalled, actionButtonStyle }) => (
    <tr className="tblBodyRowData">
        {row.map((cell, colIndex) => {
            const alignmentClass = columnAlignments[columns[colIndex]] || "text-left";
            return (
                <TableCell
                    // eslint-disable-next-line react/no-array-index-key
                    key={`row-${colIndex}`}
                    cell={cell}
                    alignmentClass={alignmentClass}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    displayId={displayId}
                    onButtonClickCalled={onButtonClickCalled}
                    actionButtonStyle={actionButtonStyle}
                />
            );
        })}
    </tr>
);

const Datatable = ({ tableId, data, actions, sortConfig = {}, columnAlignments = {}, columns, loading, norecordsmsg, actionButtonStyle = "inline" }) => {
    const [displayId, setDisplayId] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [zIndexVal, setZIndexVal] = useState("8");

    const tableData = useMemo(() => data, [data]);

    const mouseEnteredCalled = useCallback((id) => {
        setDisplayId(id);
        setZIndexVal("999");
    }, []);

    const onMouseLeaveCalled = useCallback(() => {
        setDisplayId("");
        setZIndexVal("8px");
    }, []);

    const onButtonClickCalled = useCallback(
        (actionButtonValue, id, productcode) => {
            const actionMap = {
                // eslint-disable-next-line quote-props
                Enable: () => actions.customerEnableDisableCalled(id, true),
                // eslint-disable-next-line quote-props
                Disable: () => actions.customerEnableDisableCalled(id, false),
                "Edit Customer": () => actions.editCustomer(id),
                // eslint-disable-next-line quote-props
                Edit: () => actions.EditRec(id),
                // eslint-disable-next-line quote-props
                Delete: () => actions.DeleteRec(id),
                "Email Logo To Artist": () => actions.sendEmailLogoToArtistClicked(id, productcode)
                // "Resend Mail To Artist": () => actions.sendEmailLogoToArtistClicked(id, productcode),
                // "Push Order To Artwork": () => actions.sendToArtwork(id),
                // "Upload Proof": () => actions.uploadArtworkProofClicked(id),
                // "Re-Upload Proof": () => actions.uploadArtworkProofClicked(id),
                // "View Artwork": () => actions.viewArtworkClicked(id),
                // "Cancel Order": () => actions.cancelOrder(id),
                // "Place Hold / Release Hold": () => actions.PlaceOrder(id),
                // "Send Artwork to Customer": () => actions.SendArtWorkMail(id),
                // "Expected Shipout Date": () => actions.ExpectedShipClicked(id),
                // "Qc Completed": () => actions.QcCompletedClick(id),
                // "Ship & Update Tracking": () => actions.updateTrackingClicked(id),
                // "Revise Tracking No": () => actions.updateTrackingClicked(id),
                // "Push to Production": () => actions.pushToProductionClicked(id),
                // "Email Work Order": () => actions.sendEmailLogoToArtistClicked(id, productcode),
                // "Print Work Order": () => actions.printWorkClicked(id),
                // "Send Mail": () => actions.sendShippedMail(id)
            };

            if (actionMap[actionButtonValue]) {
                actionMap[actionButtonValue]();
            }
        },
        [actions]
    );

    return (
        <div id={tableId} className={`tble-dataTble ${tblestyle.dataTables_wrapperBox}`}>
            <div className="table-responsive">
                <table id={`${tableId}1`} className="table dataTable">
                    <TableHeader columns={columns} columnAlignments={columnAlignments} sortConfig={sortConfig} />
                    <tbody>
                        {!loading && (
                            // eslint-disable-next-line react/jsx-no-useless-fragment
                            <>
                                {tableData.length > 0 ? (
                                    tableData.map((row, rowIndex) => (
                                        <TableRow
                                            // eslint-disable-next-line react/no-array-index-key
                                            key={`row-${rowIndex}`}
                                            row={row}
                                            columns={columns}
                                            columnAlignments={columnAlignments}
                                            displayId={displayId}
                                            onMouseEnter={mouseEnteredCalled}
                                            onMouseLeave={onMouseLeaveCalled}
                                            onButtonClickCalled={onButtonClickCalled}
                                            actionButtonStyle={actionButtonStyle}
                                        />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={columns.length} rowSpan={10} className="text-center">
                                            {norecordsmsg || "No records found"}
                                        </td>
                                    </tr>
                                )}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Datatable;
