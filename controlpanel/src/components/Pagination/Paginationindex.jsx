import React from "react";

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

        if (totalPages <= 5) {
            // Show all pages if total pages are less than or equal to 5
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <li key={i} onClick={() => onPageChange(i)} className={`page-item ${currentPage === i ? "active" : ""}`}>
                        {i}
                    </li>
                );
            }
        } else {
            // Always show the first three pages
            for (let i = 1; i <= 3; i++) {
                pageNumbers.push(
                    <li key={i} onClick={() => onPageChange(i)} className={`page-item ${currentPage === i ? "active" : ""}`}>
                        {i}
                    </li>
                );
            }

            if (currentPage > 4) {
                pageNumbers.push(ellipsis);
            }

            // Show pages around the current page
            const startPage = Math.max(currentPage - 1, 4);
            const endPage = Math.min(currentPage + 1, totalPages - 3);
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(
                    <li key={i} onClick={() => onPageChange(i)} className={`page-item ${currentPage === i ? "active" : ""}`}>
                        {i}
                    </li>
                );
            }

            if (currentPage < totalPages - 3) {
                pageNumbers.push(ellipsis);
            }

            // Always show the last three pages
            for (let i = totalPages - 2; i <= totalPages; i++) {
                pageNumbers.push(
                    <li key={i} onClick={() => onPageChange(i)} className={`page-item ${currentPage === i ? "active" : ""}`}>
                        {i}
                    </li>
                );
            }
        }

        return pageNumbers;
    };

    return (
        <ul className="pagination">
            <li onClick={handlePrevious} className={`page-item ${currentPage === 1 ? "disabled" : ""}`} aria-label="Previous">
                <span aria-hidden="true">&#60;</span>
            </li>
            {renderPageNumbers()}
            <li onClick={handleNext} className={`page-item ${currentPage === totalPages ? "disabled" : ""}`} aria-label="Next">
                <span aria-hidden="true">&#62;</span>
            </li>
        </ul>
    );
};

export default Pagination;
