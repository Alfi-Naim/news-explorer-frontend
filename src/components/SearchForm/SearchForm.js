import './SearchForm.css';

import React, { useState } from "react";

function SearchForm({ onSearchClick, isPending }) {

    const [keyword, setKeyword] = useState("");

    function handleChange(event) {
        setKeyword(event.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSearchClick({ searchedKeyword: keyword });
    }

    return (
        <form className="search__form" name='search-form' onSubmit={handleSubmit}>
            <input className="search__input" type="text" id="search-input" 
            value={keyword} onChange={handleChange}
            name="searchInput" placeholder="Enter topic" required />
            <button className="search__button" type="submit">{isPending ? "Searching" : "Search"}</button>
        </form>

    );
}

export default SearchForm;