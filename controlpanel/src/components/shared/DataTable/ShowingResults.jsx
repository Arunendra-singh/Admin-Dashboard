const ShowingResults = ({ totalRecords, pageRecords, currentPage, pageName }) => (
    <span className="ShowingResCount">
        Showing {totalRecords < currentPage ? totalRecords : pageRecords * currentPage - (pageRecords - 1)} to {pageRecords * currentPage < totalRecords ? pageRecords * currentPage : totalRecords} of {totalRecords} {pageName}(s){" "}
    </span>
);

export default ShowingResults;
