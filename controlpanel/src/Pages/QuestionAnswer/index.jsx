import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllQuestions, useGetAllQaCategoryData, useDeleteQuestionAnswer } from "common/hooks/react/api";
import { PopupV3 } from "common/utils";
import AutoSuggestSearchInput from "./AutoSuggestSearch/index";
import ShowingResults from "../../components/common/DataTable/ShowingResults";
import Datatable from "../../components/common/DataTable/Datatable";
import Pagination from "../../components/common/DataTable/Pagination";
import PageContainer from "../../hoc/PageContainer";
import CategoryDropdownMenu from "./CategoryBaseProductSearch/categoryDropdown";
import qaStyle from "./index.module.scss";

const QuestionAnswerManagement = () => {
    const navigate = useNavigate();
    // Pagination variables
    const [PagePerRecord] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecord, setTotalRecords] = useState(10); // setTotalRecords
    const [totalPages, setTotalPages] = useState(10);
    // Serach and autosuggestSearch variables
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [resetState, setResetState] = useState(false);
    // on cation get , set data
    const { data: GetAllQuestions, isLoading } = useGetAllQuestions(currentPage, search, selectedValue);
    const { data: GetCategories } = useGetAllQaCategoryData();
    const [QuestionAnswerData, setQuestionAnswerData] = useState([]);
    const { mutateAsync: removeQAItem } = useDeleteQuestionAnswer();

    const handleSearch = (event) => {
        const searchValue = event.target.value;
        setSearch(searchValue);
    };

    const clearSearch = () => {
        setSearch("");
    };

    const handleReset = () => {
        setSearch(""); // Reset search input value
        setSelectedCategory(""); // Reset selected category
        setSelectedValue(""); // Reset selected product
        setResetState((prev) => !prev); // Toggle resetState to trigger reset in child components
    };

    const columns = [
        "Question Title",
        "Unique Code",
        "Question Title Show",
        "Apply to all products",
        "Visibility",
        "Display Order",
        "Input Type",
        "Action",
    ];

    const columnAlignments = {
        "Question Title": "text-left noTooltip clsQuestionAnswerList_QuestionTitle",
        "Unique Code": "text-center noTooltip clsQuestionAnswerList_UniqueCode",
        "Question Title Show": "text-center noTooltip clsQuestionAnswerList_QuestionAnswerTitleShow",
        "Apply to all products": "text-center noTooltip clsQuestionAnswerList_ApplytoAll",
        Visibility: "text-center noTooltip clsQuestionAnswerList_Visibility",
        "Display Order": "text-center noTooltip clsQuestionAnswerList_DisplayOrder",
        "Input Type": "text-center noTooltip clsQuestionAnswerList_InputType",
        Action: "text-no-ellipsis clsQuestionAnswerList_Action",
    };

    useEffect(() => {
        if (GetAllQuestions !== undefined) {
            setQuestionAnswerData([]);
            GetAllQuestions?.data?.forEach((item) => {
                const objectArray = [
                    item?.questionTitle,
                    item?.randomId,
                    item?.questionTitleShow === true ? (
                        <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.500977" width="24" height="14" rx="7" fill="#1CBF70" />
                            <rect x="10.7856" y="1.00098" width="12.7143" height="13" rx="6.35714" fill="white" stroke="#1CBF70" />
                        </svg>
                    ) : (
                        <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(180deg)" }}>
                            <rect y="0.500977" width="24" height="14" rx="7" fill="#b8b8b8" />
                            <rect x="10.7856" y="1.00098" width="12.7143" height="13" rx="6.35714" fill="white" stroke="#b8b8b8" />
                        </svg>
                    ),
                    item?.applyForAllProducts === true ? (
                        <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.500977" width="24" height="14" rx="7" fill="#1CBF70" />
                            <rect x="10.7856" y="1.00098" width="12.7143" height="13" rx="6.35714" fill="white" stroke="#1CBF70" />
                        </svg>
                    ) : (
                        <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(180deg)" }}>
                            <rect y="0.500977" width="24" height="14" rx="7" fill="#b8b8b8" />
                            <rect x="10.7856" y="1.00098" width="12.7143" height="13" rx="6.35714" fill="white" stroke="#b8b8b8" />
                        </svg>
                    ),
                    item?.visibility === true ? (
                        <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.500977" width="24" height="14" rx="7" fill="#1CBF70" />
                            <rect x="10.7856" y="1.00098" width="12.7143" height="13" rx="6.35714" fill="white" stroke="#1CBF70" />
                        </svg>
                    ) : (
                        <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(180deg)" }}>
                            <rect y="0.500977" width="24" height="14" rx="7" fill="#b8b8b8" />
                            <rect x="10.7856" y="1.00098" width="12.7143" height="13" rx="6.35714" fill="white" stroke="#b8b8b8" />
                        </svg>
                    ),
                    item?.displayOrder?.toString().padStart(2, "0"),
                    item?.inputTypeForAdmin,
                    [
                        { label: "Edit", icon: "icon icon-edit-1 clsQuestionAnswerList_QuickEdit", id: item?.questionAnswerGuid },
                        { label: "Delete", icon: "icon icon-trash-2 clsQuestionAnswerList_Delete", id: item?.questionAnswerGuid },
                    ]
                ];
                setQuestionAnswerData((prevItems) => [...prevItems, objectArray]);
            });
            setTotalPages(Math.ceil((GetAllQuestions?.datacount || 0) / PagePerRecord));
            setTotalRecords(GetAllQuestions?.datacount);
        }
    }, [GetAllQuestions]);

    useEffect(() => {
        const results = QuestionAnswerData.filter((item) =>
            item[0].toLowerCase().includes(search.toLowerCase()) ||
            item[1].toString().toLowerCase().includes(search.toLowerCase()) ||
            item[6].toString().toLowerCase().includes(search.toLowerCase()));
        setFilteredData(results); // Update the filtered data
    }, [search, QuestionAnswerData]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const RemoveQA = async (Id) => {
        try {
            const response = await removeQAItem(Id);
            // Assuming response has statuscode similar to the other example
            if (response.statuscode === 200) {
                PopupV3({
                    content: "<p class='text-center'>Question successfully removed!</p>",
                    classes: "QaPopup",
                    type: "Success", // Popup type for success
                    size: "md",
                    onDismiss: () => {
                        window.location.href = `${window.location.origin}/v2/QuestionAnswer/Index`; // Redirect on dismiss
                    }
                });
            } else {
                PopupV3({
                    content: "<p class='text-center'>Failed to remove Question.</p>",
                    classes: "QaPopup",
                    type: "error", // Popup type for error
                    size: "md",
                    onDismiss: () => {
                        window.location.href = `${window.location.origin}/v2/QuestionAnswer/Index`; // Redirect on dismiss
                    }
                });
            }
        } catch (error) {
            // Handle any unexpected errors
            PopupV3({
                content: "<p class='text-center'>An unexpected error occurred. Please try again later.</p>",
                classes: "QaPopup",
                type: "error", // Popup type for general error
                size: "md",
                onDismiss: () => {
                    window.location.href = `${window.location.origin}/v2/QuestionAnswer/Index`; // Redirect on dismiss
                }
            });
        }
    };

    const editQAData = (Id) => {
        navigate(`/v2/QuestionAnswer/Edit/${Id}?PageNo=${currentPage}`);
    };

    // code for action events of table action button
    const actions = {
        EditRec: (id) => {
            editQAData(id);
        },
        DeleteRec: (id) => {
            PopupV3({
                content: "<p class='text-center'>Are you sure you want to continue?</p>",
                type: "Confirm",
                title: "Delete the Question?",
                classes: "QaPopup",
                actions: [
                    {
                        classes: "btn-info",
                        dismiss: true,
                        text: "Yes",
                        do: () => {
                            RemoveQA(id);
                        },
                    },
                    {
                        classes: "btn-cancel",
                        text: "No",
                        dismiss: true,
                    },
                ],
            });
        },
    };
    // Handle category selection from the CategoryDropdownMenu
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        // console.log("Selected category:", category);
    };

    const handleSuggestionSelect = (value) => {
        setSelectedValue(value.productGuid);
        console.log("Selected value from child:", value, selectedValue);
    };
    const handleAddQuestions = () => {
        navigate("/v2/QuestionAnswer/Create");
    };

    return (
        <section className="body-container midContent">
            <PageContainer fluid classes={`page-container ${qaStyle.QaManagement}`}>
                <section className="search-bar mb-2">
                    <div className="searchActionDropdown-wrap ml-3 mr-3 ml-lg-2 mr-lg-2 mb-4">
                        <div className="input-wrapper searchField clsQuestionAnswerList_Search mr-2">
                            <i className={search ? "d-none" : "icon icon-MagnifyingGlass"} />
                            <input
                                type="search"
                                aria-label="Search"
                                className="form-control"
                                placeholder="Search..."
                                onChange={handleSearch}
                                value={search}
                            />
                            {search && (<button className="clear-button" type="button" onClick={clearSearch}>&times;</button>)}
                        </div>
                        <CategoryDropdownMenu GetCategories={GetCategories} onCategorySelect={handleCategorySelect} resetState={resetState} />
                        <AutoSuggestSearchInput selectedcategoryGuid={selectedCategory} onSuggestionSelect={handleSuggestionSelect} resetState={resetState} placeholder="Search by product..." />
                        <button className="btn btn_reset clsQuestionAnswerList_Reset mr-2 ml-2" type="button" onClick={handleReset}>
                            Reset
                        </button>
                        <button className="btn btn_create clsQuestionAnswerList_Create" type="button" onClick={() => handleAddQuestions()}>
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.25 6.65625H0.75V5.15625H5.25V0.65625H6.75V5.15625H11.25V6.65625H6.75V11.1562H5.25V6.65625Z"
                                    fill="white"
                                />
                            </svg>&nbsp; Add New Question
                        </button>
                    </div>
                    {GetAllQuestions?.data?.length > 0 && (
                        <div className="ShowResultDiv ml-3 mr-3 ml-lg-2 mr-lg-2">
                            <ShowingResults
                                pageRecords={PagePerRecord < totalRecord ? PagePerRecord : totalRecord}
                                totalRecords={totalRecord}
                                currentPage={currentPage}
                                pageName="Question Answer"
                            />
                        </div>
                    )}
                </section>
                <section className="listing-table mb-4 ml-3 mr-3 ml-lg-2 mr-lg-2">
                    <Datatable
                        tableId="QuestionAnswer"
                        data={search ? filteredData : QuestionAnswerData} // Using QuestionAnswerData
                        actions={actions}
                        columnAlignments={columnAlignments}
                        columns={columns}
                        loading={isLoading}
                        norecordsmsg="No records available"
                        actionButtonStyle="inline"
                    />
                </section>
                {GetAllQuestions?.data?.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </PageContainer>
        </section>
    );
};

export default QuestionAnswerManagement;
