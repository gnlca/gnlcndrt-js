import React from "react";

export default function SearchBar({ inputValue, handleChange }) {
    return (
        <div className="searchBar">
            <input type="text" value={inputValue} onChange={handleChange} />
        </div>
    )
}