import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
const Table = ({ data, sortConfig = {}, columnAlignments = {}, columns, loading, norecordsmsg }) => {
    const [displayId, setDisplayId] = useState("");
    const [zIndexVal, setZIndexVal] = useState("8");
    const tableData = useMemo(() => {
        return data
    }, [data]);
    const mouseEnteredCalled = (id) => {
        setDisplayId(id);
        setZIndexVal("999");
    };
    const onMouseLeaveCalled = () => {
        setDisplayId("");
        setZIndexVal("8px");
    };
    return (
        <div className="Listing_estimate mb-4 ml-3 mr-3 ml-lg-4 mr-lg-4">
            <div id="zero_config_wrapper" className="dataTables_wrapper">
                <div className="table-responsive">
                    <table id="zero_config" className="table table-striped table-bordered dataTable">
                        <thead>
                            {columns?.length > 0 && (
                                <tr>
                                    {columns.map((cell, colIndex) => (
                                        <>
                                            {cell === "Action" ?
                                                <td key={`header-${colIndex}`} className={`tblTitle text-none`}>
                                                    {cell}
                                                </td>
                                                :
                                                <td key={`header-${colIndex}`} className={`tblTitle ${columnAlignments[cell] || 'text-left'} ${sortConfig.key === cell ? (sortConfig.direction === 'ASC' ? 'asc' : 'desc') : ''}`} >
                                                    {cell}
                                                </td>
                                            }
                                        </>
                                    ))}
                                </tr>
                            )}
                        </thead>
                        <tbody>
                            {!loading && (
                                <>
                                    {tableData?.length > 0 ?
                                        <>
                                            {tableData?.map((row, rowIndex) => (
                                                <tr key={`row-${rowIndex}`} className="tblRowData">
                                                    {row?.map((cell, colIndex) => {
                                                        const alignmentClass = columnAlignments[columns[colIndex]] || "text-left"; // columnAlignments[columns[colIndex]] do not change this code . this is for custom class         
                                                        if (Array.isArray(cell)) {
                                                            const actionId = cell.find(x => x.id)?.id;
                                                            const productcode = cell?.find((x)=>x.id)?.productid
                                                            return (
                                                                <td className={`tblRowtd`} key={`row-${rowIndex}-col-${colIndex}`}>
                                                                    <div className="action PaymentAction" onMouseEnter={() => mouseEnteredCalled(actionId)} onMouseLeave={onMouseLeaveCalled} id={`${rowIndex}actionbutton`} >
                                                                        
                                                                        <div className="action_hover" style={{ display: actionId === displayId ? "block" : "none" }} id={`${rowIndex}actionbutton`} >
                                                                            {cell.map((buttonVal, buttonIndex) => (
                                                                                <button type="button" data-title={buttonVal}>
                                                                                    {typeof buttonVal === "string" && <span to="" >{buttonVal}</span>}
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            );
                                                        } else {
                                                            return (
                                                                <td className={`tblRowtd ${alignmentClass}`} key={`row-${rowIndex}-col-${colIndex}`} >
                                                                    {cell?.isLink ? (
                                                                        <>
                                                                            <a className="ellipsis" href={cell.linkValue}> {cell.rowValue} </a>
                                                                            {cell?.rowValue !== "" && cell?.rowValue !== null && cell?.rowValue !== undefined && (<small className="custtooltip">{cell.rowValue}</small>)}
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <span className="ellipsis">{cell}</span>
                                                                            {cell !== "" && cell !== null && cell !== undefined && (<small className="custtooltip">{cell}</small>)}
                                                                        </>
                                                                    )}
                                                                </td>
                                                            );
                                                        }
                                                    })}
                                                </tr>
                                            ))
                                            }
                                        </>
                                        :
                                        <tr>
                                            <td colSpan={columns.length} rowSpan={10} className="text-center">
                                                {(norecordsmsg != null && norecordsmsg != undefined) ? norecordsmsg : "No records found"}
                                            </td>
                                        </tr>
                                    }
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