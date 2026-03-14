/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from "react";
import { useGetAllQuestions } from "common/hooks/react/api";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import Pagination from "~/components/common/DataTable/Pagination";
import "./questnAnsPopup.scss";

const MapQuesPopup = ({ showPopup, closePopup, onSave, mapQuesData, popupFor }) => {
    const [PagePerRecord] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [search, setSearch] = useState("");
    const [tableData, setTableData] = useState([]);
    const { data: GetAllQuestions } = useGetAllQuestions(currentPage, search);
    const [selectedQuestions, setSelectedQuestions] = useState(""); // Track selected questions

    useEffect(() => {
        setSelectedQuestions(mapQuesData);
    }, [mapQuesData]);

    const selectedValues = typeof selectedQuestions === 'string' ? selectedQuestions.split(',') : selectedQuestions;
    const selectedCount = selectedValues.length;

    useEffect(() => {
        if (GetAllQuestions !== undefined) {
            setTableData(GetAllQuestions?.data);
            setTotalPages(Math.ceil((GetAllQuestions?.datacount || 0) / PagePerRecord));
        }
    }, [GetAllQuestions]);

    const handleSearch = (event) => {
        const searchValue = event.target.value;
        setSearch(searchValue);
    };

    const clearSearch = () => {
        setSearch("");
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const selectOption = (question) => {
        if (popupFor === "addExtra") {
            setSelectedQuestions((prevSelected) => {
                if (prevSelected.some((item) => item?.questionAnswerGuid === question?.questionAnswerGuid)) {
                    // Remove the question if it's already selected
                    return prevSelected.filter((item) => item?.questionAnswerGuid !== question?.questionAnswerGuid);
                }
                // Add the question if it's not selected
                return [...prevSelected, question];
            });
        } else {
            setSelectedQuestions((prevSelected) => {
                if (prevSelected?.length > 0) {
                    const currentSelections = prevSelected?.split(",")?.filter(Boolean); // Split into an array, remove empty values
                    if (currentSelections.includes(question.questionAnswerGuid)) {
                        // Deselecting
                        return currentSelections.filter((item) => item !== question.questionAnswerGuid).join(","); // Join back into a string
                    }
                    return [...currentSelections, question.questionAnswerGuid].join(","); // Add new value and join back
                }
                return question.questionAnswerGuid;
            });
        }
    };

    const saveSelectedQus = () => {
        // Check if popupFor is an object with tableIndex and optionIndex properties
        if (typeof popupFor === "object" && popupFor !== null) {
            const { tableIndex, optionIndex } = popupFor;
            onSave(selectedQuestions, tableIndex, optionIndex); // Pass selected questions and indices to the parent component
        } else {
            onSave(selectedQuestions); // Pass only selected questions if popupFor is not an object with tableIndex/optionIndex
        }
        closePopup(); // Close the popup after saving
    };

    return (
        <Modal className="MaptoQuesPop" size="lg" show={showPopup} onHide={() => closePopup()}>
            <ModalHeader closeButton={true}>
                <ModalTitle>Map Dependent Question</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <div className="popupContent-Wrap">
                    <div className="searchRow">
                        <div className="input-wrapper searchField">
                            <i className={search ? "d-none" : "icon icon-MagnifyingGlass"} />
                            <input type="search" aria-label="Search" className="form-control" placeholder="Search by question" onChange={handleSearch} value={search} />
                            {search && (
                                <button className="clear-button" type="button" onClick={clearSearch}>
                                    &times;
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table formTable" id="poptable2">
                            <thead>
                                <tr>
                                    <th>Selected Questions</th>
                                    <th className="text-center">Unique Code</th>
                                    <th className="text-center">Input Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((item) => (
                                    <tr key={`${popupFor}${item?.questionAnswerGuid}`}>
                                        <td>
                                            {(popupFor === "addExtra") ? (
                                                <input
                                                    type="checkbox"
                                                    name=""
                                                    className="sbm-checkbox"
                                                    checked={selectedQuestions.some((selected) => selected.questionAnswerGuid === item.questionAnswerGuid)}
                                                    onChange={() => selectOption(item)}
                                                />
                                            ) : (
                                                <input
                                                    type="checkbox"
                                                    name=""
                                                    className="sbm-checkbox"
                                                    checked={selectedQuestions?.includes(item.questionAnswerGuid)}
                                                    onChange={() => selectOption(item)}
                                                />
                                            )}
                                            {" "}{item?.questionTitle}
                                        </td>
                                        <td className="text-center">{item?.randomId}</td>
                                        <td className="text-center">{item?.inputTypeForAdmin}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {GetAllQuestions?.data?.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
                </div>
                <div className="table-action-btns mb-3">
                    <span className="selectedLable">
                        No of selected Quetions: <strong>{popupFor === "addExtra" ? selectedQuestions?.length : selectedCount}</strong>
                    </span>
                    <button type="submit" className="btn btn-submit" onClick={() => saveSelectedQus()}>
                        Save & Close
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default MapQuesPopup;
