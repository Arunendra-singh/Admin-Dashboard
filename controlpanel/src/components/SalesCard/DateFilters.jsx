/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from "react";

const DateFilter = ({ onFilter }) => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const handleFilter = () => {
        if (onFilter) {
            onFilter(fromDate, toDate);
        }
    };
    return (
        <div className="date-filter">
            <div className="form-group">
                <label htmlFor="fromDate">From Date</label>
                <input type="date" id="fromDate" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="toDate">To Date</label>
                <input type="date" id="toDate" value={toDate} onChange={(e) => setToDate(e.target.value)} className="form-control" />
            </div>
            <button onClick={handleFilter} className="btn btn-primary">
                Apply Filter
            </button>
        </div>
    );
};
export default DateFilter;
