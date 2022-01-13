import React from "react";


export default function SearchBar({ handleChange }) {

    return(
        <div className="searchBar">
            <input type="text" onChange={handleChange} />
        </div>
    )

}