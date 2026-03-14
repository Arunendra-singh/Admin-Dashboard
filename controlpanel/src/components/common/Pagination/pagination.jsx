// import React from "react";
// import { Fragment, useEffect, useState } from "react";

// const Pagination = ({ count, setPageNo, pageNo, pageSize }) => {
//     const [totalPageCount, setTotalPageCount] = useState(Math.ceil(parseInt(count, 10) / pageSize));
//     const [showPaginationFrom, setShowPaginationFrom] = useState(0);
//     const displayPaginationSize = 5;
//     useEffect(() => {
//         setTotalPageCount(Math.ceil(parseInt(count, 10) / pageSize));
//     }, [pageSize]);
//     if (totalPageCount === 1) return <> </>;
//     return (
//         <ul className="pagination d-flex">
//             {pageNo >= 2 && (
//                 <>
//                     <li
//                         role="presentation"
//                         className="page-link page-first"
//                         onClick={() => {
//                             setPageNo(1);
//                             setShowPaginationFrom(0);
//                         }}
//                     >
//                         First
//                     </li>
//                     <li role="presentation" className="page-link page-prev" onClick={() => setPageNo(pageNo - 1)}>
//                         Previous
//                     </li>
//                 </>
//             )}
//             {showPaginationFrom > 0 && <li role="presentation" className="icon-arrow-left page-link" onClick={() => setShowPaginationFrom(showPaginationFrom - 5)} />}
//             {new Array(totalPageCount).fill("").map((_count, i) => {
//                 const _pageNo = i + 1;
//                 const showPagnationTill = showPaginationFrom + displayPaginationSize;
//                 if (_pageNo > showPaginationFrom && _pageNo <= showPagnationTill) {
//                     return (
//                         <li key={_pageNo} role="presentation" className={`page-link ${pageNo === _pageNo ? "active" : ""}`} onClick={() => setPageNo(_pageNo)}>
//                             {_pageNo}
//                         </li>
//                     );
//                 }
//                 return "";
//             })}
//             {showPaginationFrom + displayPaginationSize < totalPageCount && <li role="presentation" className="icon-arrow-right page-link" onClick={() => setShowPaginationFrom(showPaginationFrom + displayPaginationSize)} />}
//             {pageNo < totalPageCount && (
//                 <>
//                     <li role="presentation" className="page-link page-next" onClick={() => setPageNo(pageNo + 1)}>
//                         Next
//                     </li>
//                     {totalPageCount < 5 ? (
//                         <li
//                             role="presentation"
//                             className="page-link page-last"
//                             onClick={() => {
//                                 setPageNo(totalPageCount);
//                                 setShowPaginationFrom(displayPaginationSize * Math.floor(totalPageCount / displayPaginationSize));
//                             }}
//                         >
//                             Last
//                         </li>
//                     ) : (
//                         <li
//                             role="presentation"
//                             className="page-link page-last"
//                             onClick={() => {
//                                 setPageNo(totalPageCount);
//                                 setShowPaginationFrom(totalPageCount - 5);
//                             }}
//                         >
//                             Last
//                         </li>
//                     )}
//                 </>
//             )}
//         </ul>
//     );
// };

// export default Pagination;

import React, { useEffect, useState } from "react";

const Pagination = ({ count, setPageNo, pageNo, pageSize }) => {
    const [totalPageCount, setTotalPageCount] = useState(Math.ceil(parseInt(count, 10) / pageSize));
    const [showPaginationFrom, setShowPaginationFrom] = useState(0);
    const displayPaginationSize = 5;

    useEffect(() => {
        setTotalPageCount(Math.ceil(parseInt(count, 10) / pageSize));
    }, [count, pageSize]);

    const handleFirstPage = () => {
        setPageNo(1);
        setShowPaginationFrom(0);
    };

    const handlePreviousPage = () => {
        setPageNo(pageNo - 1);
    };

    const handleNextPage = () => {
        setPageNo(pageNo + 1);
    };

    const handleLastPage = () => {
        setPageNo(totalPageCount);
        setShowPaginationFrom(displayPaginationSize * Math.floor(totalPageCount / displayPaginationSize));
    };

    const handlePageClick = (_pageNo) => {
        setPageNo(_pageNo);
    };

    if (totalPageCount === 1) return <></>;

    return (
        <ul className="pagination d-flex">
            {pageNo >= 2 && (
                <>
                    <li role="presentation" className="page-link page-first" onClick={handleFirstPage}>
                        First
                    </li>
                    <li role="presentation" className="page-link page-prev" onClick={handlePreviousPage}>
                        Previous
                    </li>
                </>
            )}
            {showPaginationFrom > 0 && <li role="presentation" className="icon-arrow-left page-link" onClick={() => setShowPaginationFrom(showPaginationFrom - displayPaginationSize)} />}
            {new Array(totalPageCount).fill("").map((_count, i) => {
                const _pageNo = i + 1;
                const showPaginationTill = showPaginationFrom + displayPaginationSize;
                if (_pageNo > showPaginationFrom && _pageNo <= showPaginationTill) {
                    return (
                        <li key={_pageNo} role="presentation" className={`page-link ${pageNo === _pageNo ? "active" : ""}`} onClick={() => handlePageClick(_pageNo)}>
                            {_pageNo}
                        </li>
                    );
                }
                return null;
            })}
            {showPaginationFrom + displayPaginationSize < totalPageCount && <li role="presentation" className="icon-arrow-right page-link" onClick={() => setShowPaginationFrom(showPaginationFrom + displayPaginationSize)} />}
            {pageNo < totalPageCount && (
                <>
                    <li role="presentation" className="page-link page-next" onClick={handleNextPage}>
                        Next
                    </li>
                    <li role="presentation" className="page-link page-last" onClick={handleLastPage}>
                        Last
                    </li>
                </>
            )}
        </ul>
    );
};

export default Pagination;
