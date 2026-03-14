const ShowingResults = ({ totalRecords, pageRecords, currentPage, labelName = "Flyer" }) => (
    <div className="cards-container mb-4 ml-3 mr-3 ml-lg-4 mr-lg-4">
        <div className="show-data">
            <div className="flyer-info d-flex justify-content-between align-items-center">
                <h5>
                    Showing {totalRecords < currentPage ? totalRecords : pageRecords * currentPage - (pageRecords - 1)} to {pageRecords * currentPage < totalRecords ? pageRecords * currentPage : totalRecords} of {totalRecords} {labelName}(s){" "}
                </h5>
            </div>
        </div>
    </div>
);

export default ShowingResults;
