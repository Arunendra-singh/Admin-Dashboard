import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CategoryDropdownMenu = ({ GetCategories, onCategorySelect, resetState }) => {
    const dropdownRef = useRef();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Segregate collections and sub-collections
    const collections = [];
    const subCollections = [];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDropdownSelect = (e, item) => {
        e.preventDefault();
        setSelectedCategory(item?.collectionName || "All");
        setIsDropdownOpen(false);
        onCategorySelect(item?.collectionGuid || "");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    GetCategories?.data?.forEach((item) => {
        if (item.parentCollectionGuid === "") {
            collections.push(item);
        } else {
            subCollections.push(item);
        }
    });

    useEffect(() => {
        // When resetState changes, reset the input value
        setSelectedCategory("All");
    }, [resetState]);

    return (
        <div className="dropdown drdSearchCategory clsQuestionAnswerList_QuestionCategory mr-2" ref={dropdownRef}>
            <button
                className="btn select-dropdown-toggle"
                type="button"
                id="dropdownMenuSortby"
                onClick={toggleDropdown}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
            >
                {selectedCategory}
            </button>
            <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`} aria-labelledby="dropdownMenuSortby">
                <li key="all" className="dropdown-item">
                    <span className="catName" id="" onClick={(e) => handleDropdownSelect(e, "All")}>
                        All
                    </span>
                </li>
                {collections.map((collection) => (
                    <li key={uuidv4()} className="dropdown-item">
                        <span className="catName" id={collection.collectionGuid} onClick={(e) => handleDropdownSelect(e, collection)}>
                            {collection?.collectionName}
                        </span>
                        {/* Render sub-collections for the current collection */}
                        <ul>
                            {subCollections
                                .filter((sub) => sub?.parentCollectionGuid === collection?.collectionGuid)
                                .map((sub) => (
                                    <li key={uuidv4()} className="dropdown-item">
                                        <span className="subcatName" id={sub?.collectionGuid} onClick={(e) => handleDropdownSelect(e, sub)}>
                                            {sub?.collectionName}
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryDropdownMenu;
