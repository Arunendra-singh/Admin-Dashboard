import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useGetQACategoryProductData } from "common/hooks/react/api";
import AutoSearchStyle from "./index.module.scss";

const AutoSuggestSearchInput = ({ selectedcategoryGuid, onSuggestionSelect, placeholder, resetState }) => {
    const [inputValue, setInputValue] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
    const [debouncedInputValue, setDebouncedInputValue] = useState(inputValue);
    const [hasSelectedSuggestion, setHasSelectedSuggestion] = useState(false); // New state to track selection

    // Fetch Products based on the categoryGuid and debounced keyword, only if not selected
    const { data: Products } = useGetQACategoryProductData(selectedcategoryGuid, hasSelectedSuggestion ? "" : debouncedInputValue);
    const productData = Products?.data;

    useEffect(() => {
        setInputValue(""); // Reset input value
        setShowSuggestions(false); // Reset suggestion visibility
        setSelectedSuggestion(-1); // Reset selected suggestion
        setHasSelectedSuggestion(false); // Reset selection status
    }, [resetState, selectedcategoryGuid]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedInputValue(inputValue);
        }, 300); // Debounce by 400ms

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue]);

    useEffect(() => {
        if (Products?.statuscode === 0) {
            // API response indicates no suggestions
            setFilteredSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        if (!productData) {
            setFilteredSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const filtered = productData.filter((item) =>
            item.productName.toLowerCase().includes(inputValue.toLowerCase()) ||
            item.productCode.toLowerCase().includes(inputValue.toLowerCase()));

        const suggestionsList = filtered.map((item) => ({
            productGuid: item?.productGuid,
            productName: item?.productName,
            productCode: item?.productCode,
            productSKUs: item?.productSKUs,
        }));

        setFilteredSuggestions(suggestionsList);
        setShowSuggestions(suggestionsList.length > 0);
    }, [productData, debouncedInputValue]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setHasSelectedSuggestion(false); // Reset when user types
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion.productName);
        setSelectedSuggestion(suggestion.productName);
        setShowSuggestions(false);
        onSuggestionSelect(suggestion);
        setHasSelectedSuggestion(true); // Mark suggestion as selected
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown" && selectedSuggestion < filteredSuggestions.length - 1) {
            setSelectedSuggestion(selectedSuggestion + 1);
        } else if (e.key === "ArrowUp" && selectedSuggestion > 0) {
            setSelectedSuggestion(selectedSuggestion - 1);
        } else if (e.key === "Enter" && selectedSuggestion >= 0) {
            handleSuggestionClick(filteredSuggestions[selectedSuggestion]);
            setSelectedSuggestion(-1);
        }
    };

    return (
        <div className={`${AutoSearchStyle.autoSearchSuggestion} suggestion-input clsQuestionAnswerList_ProductSearch`}>
            <div className="inputWithIcon">
                <input
                    type="text"
                    placeholder={placeholder}
                    className="form-control"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    aria-label="Search suggestions"
                />
            </div>

            {showSuggestions && inputValue && (
                <ul className="suggestions-list">
                    {filteredSuggestions.length > 0 ? (
                        filteredSuggestions.map((suggestion, index) => (
                            <li
                                key={uuidv4()}
                                className={`list-item ${index === selectedSuggestion ? "active" : ""}`}
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion?.productName}
                            </li>
                        ))
                    ) : (
                        <li className="list-item">No suggestions found</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default AutoSuggestSearchInput;
