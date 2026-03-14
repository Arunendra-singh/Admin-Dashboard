import React from "react";
import pgnationstyle from "./pagination.module.scss";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const ellipsis = <li key="ellipsis">...</li>;

        if (totalPages <= 10) {
            // Show all pages if total pages are less than or equal to 10
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <li key={i} onClick={() => onPageChange(i)} className={`page-item ${currentPage === i ? "active" : ""}`}>
                        {i}
                    </li>
                );
            }
        } else {
            // Always show the first page
            pageNumbers.push(
                <li key={1} onClick={() => onPageChange(1)} className={`page-item ${currentPage === 1 ? "active" : ""}`}>
                    1
                </li>
            );

            if (currentPage > 4) {
                pageNumbers.push(ellipsis);
            }

            // Show pages around the current page
            const startPage = Math.max(currentPage - 2, 2);
            const endPage = Math.min(currentPage + 2, totalPages - 1);

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(
                    <li key={i} onClick={() => onPageChange(i)} className={`page-item ${currentPage === i ? "active" : ""}`}>
                        {i}
                    </li>
                );
            }

            if (endPage < totalPages - 2) {
                pageNumbers.push(ellipsis);
            }

            // Always show the last page
            pageNumbers.push(
                <li key={totalPages} onClick={() => onPageChange(totalPages)} className={`page-item ${currentPage === totalPages ? "active" : ""}`}>
                    {totalPages}
                </li>
            );
        }

        return pageNumbers;
    };

    return (
        totalPages > 0 && (
            <ul className={`${pgnationstyle.dataTblePagination} dataTable-pagination mb-4 ml-3 mr-3 ml-lg-4 mr-lg-4`}>
                <li onClick={handlePrevious} className={`page-item ${currentPage === 1 ? "disabled" : ""}`} aria-label="Previous">
                    <span aria-hidden="true">&#60;</span>
                </li>
                {renderPageNumbers()}
                <li onClick={handleNext} className={`page-item ${currentPage === totalPages ? "disabled" : ""}`} aria-label="Next">
                    <span aria-hidden="true">&#62;</span>
                </li>
            </ul>
        )
    );
};

export default Pagination;
