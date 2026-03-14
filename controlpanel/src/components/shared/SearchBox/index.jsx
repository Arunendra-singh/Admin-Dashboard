/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from "react";
import classes from "./SearchComponent.module.scss";

const SearchComponent = ({ placeholder, onSearch }) => {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        // Trigger the search function on input change
        if (onSearch) {
            onSearch(newQuery);
        }
    };

    const handleClear = () => {
        setQuery("");
        if (onSearch) {
            onSearch("");
        }
    };

    return (
        <div className={classes.search_component}>
            <i className="icon-MagnifyingGlass" />
            <input
                type="text"
                placeholder={placeholder || "Search..."}
                value={query}
                onChange={handleInputChange}
                className="form-control"
            />
            <i className="icon-close_small" style={{ opacity: `${query ? "1" : "0"}` }} onClick={handleClear} />
        </div>
    );
};

export default SearchComponent;
