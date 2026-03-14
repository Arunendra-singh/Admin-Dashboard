/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import "./dataTable.scss";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const Table = ({ data, sortConfig = {}, columnAlignments = {}, sortConfigFlyerName = {}, columns, loading, handlePreviewClick, handleDropdownSortNew, classnew, classnewflyer, customButtons, type }) => {
    const [displayId, setDisplayId] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [zIndexVal, setZIndexVal] = useState("8");
    const tableData = useMemo(() => data, [data]);
    // const [isReadMore, setIsReadMore] = useState(false);
    const [tableRowIndex, setTableRowIndex] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const toggleReadMore = (index) => {
        setTableRowIndex(index === tableRowIndex ? null : index);
    };

    const mouseEnteredCalled = (id) => {
        setDisplayId(id);
        setZIndexVal("999");
    };
    const onMouseLeaveCalled = () => {
        setDisplayId("");
        setZIndexVal("8px");
    };

    const onButtonClickCalled = (actionButtonValue, id) => {
        if (actionButtonValue === "Enable" || actionButtonValue === "Disable") {
            const isActiveVal = actionButtonValue === "Enable";
            customerEnableDisableCalled(id, isActiveVal);
        } else if (actionButtonValue.includes("Edit Customer")) {
            editCustomer(id);
        } else if (actionButtonValue === "Edit") {
            editPaymentTerm(id);
        } else if (actionButtonValue === "Delete") {
            deletePaymentTerms(id);
        }
    };
    const [showPopup, setShowPopup] = useState(true);

    const closePopup = () => {
        setShowPopup(false);
    };

    const openPopup = () => {
        setShowPopup(true);
    };

    return (
        <div className="Listing_estimate mb-4 ml-3 mr-3 ml-lg-4 mr-lg-4">
            <div id="zero_config_wrapper" className="dataTables_wrapper">
                <div className="table-responsive">
                    <table id="zero_config" className="table table-striped table-bordered dataTable">
                        <thead>
                            {columns?.length > 0 && (
                                <tr>
                                    {columns?.map((cell, colIndex) => {
                                        if (cell === "Action") {
                                            return (
                                                <td key={`header-${colIndex}`} className="tblTitle text-none">
                                                    {cell}
                                                </td>
                                            );
                                        }

                                        if (cell === "Flyer Name") {
                                            return (
                                                <td key={`header-${colIndex}`} id="flyernameid" onClick={() => handleDropdownSortNew({ dbColname: "salesFlyerName", columnName: "Flyer Name" })} className={`tblTitle flyernametb text-capitalize ${columnAlignments[cell] || ""} ${sortConfigFlyerName.key === cell ? classnewflyer : ""}`}>
                                                    {/* onClick={() => handleHeaderClick(cell)} */}
                                                    {cell}
                                                </td>
                                            );
                                        }

                                        if (cell === "Sent Date") {
                                            return (
                                                <td key={`header-${colIndex}`} id="sentdateid" onClick={() => handleDropdownSortNew({ dbColname: "createdDateUtc", columnName: "Sent Date" })} className={`tblTitle sentdatetb ${columnAlignments[cell] || ""} ${sortConfig.key === cell ? classnew : ""}`}>
                                                    {/* onClick={() => handleHeaderClick(cell)} */}
                                                    {cell}
                                                </td>
                                            );
                                        }

                                        return (
                                            <td key={`header-${colIndex}`} className={`tblTitle ${columnAlignments[cell] || ""}`}>
                                                {/* onClick={() => handleHeaderClick(cell)} */}
                                                {cell}
                                            </td>
                                        );
                                    })}
                                </tr>
                            )}
                        </thead>
                        <tbody>
                            {!loading && (
                                <>
                                    {tableData?.length > 0 && tableData !== null ? (
                                        <>
                                            {tableData?.map((row, rowIndex) => (
                                                // eslint-disable-next-line react/no-array-index-key
                                                <tr key={`row-${rowIndex}`} className="tblRowData">
                                                    {row !== null &&
                                                        row.length > 0 &&
                                                        row?.map((cell, colIndex) => {
                                                            const alignmentClass = columnAlignments[columns[colIndex]] || "text-left";
                                                            if (columns[colIndex] === "Action" && type !== "salesflyer" && type !== "ordermockupreport") {
                                                                return (
                                                                    <td key={`row-${rowIndex}-col-${colIndex}`} className={`tblRowtd ${alignmentClass}`}>
                                                                        {customButtons && customButtons(row)}
                                                                        {cell}
                                                                    </td>
                                                                );
                                                            }

                                                            if (Array.isArray(cell)) {
                                                                const actionId = cell?.filter((x) => x.id)?.[0]?.id;
                                                                const edit = cell.find((x) => x);
                                                                return (
                                                                    // eslint-disable-next-line react/no-array-index-key
                                                                    <td className="tblRowtd" key={`row-${rowIndex}-col-${colIndex}`}>
                                                                        <div className="action PaymentAction" onMouseEnter={() => mouseEnteredCalled(actionId)} onMouseLeave={onMouseLeaveCalled} id={`${rowIndex}actionbutton`}>
                                                                            <a href="#" target="_blank" rel="noopener noreferrer" className="icon" style={{ zIndex: actionId !== displayId ? 8 : 999 }} id={actionId}>
                                                                                action
                                                                            </a>
                                                                            {edit !== "Edit" && (
                                                                                <div>
                                                                                    <div className={`action_hover ${tableRowIndex === rowIndex ? "show" : "hide"}`} style={{ display: actionId === displayId ? "block" : "" }} id={`${rowIndex}actionbutton`}>
                                                                                        {cell.map((buttonVal) => (
                                                                                            <>
                                                                                                <span data-title={buttonVal} onClick={() => onButtonClickCalled(buttonVal, actionId)}>
                                                                                                    {typeof buttonVal === "string" && <span to="">{buttonVal}</span>}
                                                                                                </span>
                                                                                                <br />
                                                                                            </>
                                                                                        ))}
                                                                                    </div>

                                                                                    {cell.length > 3 && (
                                                                                        <OverlayTrigger
                                                                                            trigger="click"
                                                                                            // eslint-disable-next-line react/no-array-index-key
                                                                                            key={rowIndex}
                                                                                            placement="bottom"
                                                                                            overlay={
                                                                                                // eslint-disable-next-line react/jsx-wrap-multilines
                                                                                                <>
                                                                                                    <div className="popover-arrow" />
                                                                                                    {showPopup && (
                                                                                                        <Popover id="popover-positioned-bottom">
                                                                                                            <span className="closeIcon" onClick={closePopup}>
                                                                                                                &times;
                                                                                                            </span>
                                                                                                            {/* <Popover.Header as="h3">Popover top</Popover.Header> */}
                                                                                                            <Popover.Body>
                                                                                                                {cell.slice(3).map((buttonVal) => (
                                                                                                                    <>
                                                                                                                        <span data-title={buttonVal} onClick={() => onButtonClickCalled(buttonVal, actionId)}>
                                                                                                                            {typeof buttonVal === "string" && <span to="">{buttonVal}</span>}
                                                                                                                        </span>
                                                                                                                        <br />
                                                                                                                    </>
                                                                                                                ))}
                                                                                                            </Popover.Body>
                                                                                                        </Popover>
                                                                                                    )}
                                                                                                </>
                                                                                            }
                                                                                        >
                                                                                            <Button variant="secondary" className="rounded-pill" onClick={openPopup}>
                                                                                                + {cell.length - 3}
                                                                                            </Button>
                                                                                        </OverlayTrigger>
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                            {edit === "Edit" && (
                                                                                <button type="button" className="tblbtn-icon icon-editNew" title={`${type !== "salesflyer" && type !== "ordermockupreport" ? "View Details" : "Preview"}`} data-title={`${type !== "salesflyer" && type !== "ordermockupreport" ? "View Details" : "Preview"}`}>
                                                                                    {" "}
                                                                                    {/* action */}
                                                                                    <svg className="clsSalesReport_Preview" onClick={() => handlePreviewClick(row)} width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path
                                                                                            d="M8.00162 9.18373C8.8515 9.18373 9.57331 8.88629 10.1671 8.29141C10.7608 7.69654 11.0577 6.97416 11.0577 6.12429C11.0577 5.27441 10.7602 4.5526 10.1654 3.95885C9.5705 3.3651 8.84812 3.06823 7.99825 3.06823C7.14837 3.06823 6.42656 3.36566 5.83281 3.96054C5.23906 4.55541 4.94218 5.27779 4.94218 6.12766C4.94218 6.97754 5.23962 7.69935 5.8345 8.2931C6.42937 8.88685 7.15175 9.18373 8.00162 9.18373ZM7.99993 8.15098C7.43743 8.15098 6.95931 7.9541 6.56556 7.56035C6.17181 7.1666 5.97493 6.68848 5.97493 6.12598C5.97493 5.56348 6.17181 5.08535 6.56556 4.6916C6.95931 4.29785 7.43743 4.10098 7.99993 4.10098C8.56243 4.10098 9.04056 4.29785 9.43431 4.6916C9.82806 5.08535 10.0249 5.56348 10.0249 6.12598C10.0249 6.68848 9.82806 7.1666 9.43431 7.56035C9.04056 7.9541 8.56243 8.15098 7.99993 8.15098ZM8.00087 11.376C6.27625 11.376 4.70481 10.9002 3.28656 9.94873C1.86831 8.99735 0.824059 7.7231 0.153809 6.12598C0.824059 4.52885 1.86793 3.2546 3.28543 2.30323C4.70306 1.35173 6.27425 0.875977 7.999 0.875977C9.72362 0.875977 11.2951 1.35173 12.7133 2.30323C14.1316 3.2546 15.1758 4.52885 15.8461 6.12598C15.1758 7.7231 14.1319 8.99735 12.7144 9.94873C11.2968 10.9002 9.72562 11.376 8.00087 11.376ZM7.99993 10.251C9.41243 10.251 10.7093 9.8791 11.8906 9.13535C13.0718 8.3916 13.9749 7.38848 14.5999 6.12598C13.9749 4.86348 13.0718 3.86035 11.8906 3.1166C10.7093 2.37285 9.41243 2.00098 7.99993 2.00098C6.58743 2.00098 5.29056 2.37285 4.10931 3.1166C2.92806 3.86035 2.02493 4.86348 1.39993 6.12598C2.02493 7.38848 2.92806 8.3916 4.10931 9.13535C5.29056 9.8791 6.58743 10.251 7.99993 10.251Z"
                                                                                            fill="currentcolor"
                                                                                        />
                                                                                    </svg>
                                                                                </button>
                                                                            )}
                                                                            {customButtons && type !== "salesflyer" && type !== "ordermockupreport" && customButtons(row)}
                                                                        </div>
                                                                    </td>
                                                                );
                                                            }

                                                            return (
                                                                // eslint-disable-next-line react/no-array-index-key
                                                                <td className={`tblRowtd ${alignmentClass}`} key={`row-${rowIndex}-col-${colIndex}`}>
                                                                    {cell?.isLink ? (
                                                                        <>
                                                                            <a className="ellipsis" href={cell.linkValue}>
                                                                                {" "}
                                                                                {cell.rowValue}{" "}
                                                                            </a>
                                                                            <small className="custtooltip">{cell.rowValue}</small>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <span className={`ellipsis ${columns[1] === "Flyer Name" ? " sentDate" : ""}`}>{cell}</span>
                                                                            <p className="custtooltip">
                                                                                <span className="hide-tool">{cell}</span>
                                                                            </p>
                                                                        </>
                                                                    )}
                                                                </td>
                                                            );
                                                        })}
                                                </tr>
                                            ))}
                                        </>
                                    ) : (
                                        <tr>
                                            <td colSpan={columns.length} rowSpan={10} className="textCenter">
                                                No records found
                                            </td>
                                        </tr>
                                    )}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Table;
