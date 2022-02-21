import './SearchForm.css';

function SearchForm({ onSearchClick }) {
    return (
        <form className="search__form" name='search-form' onSubmit={onSearchClick}>
            <input className="search__input" type="text" id="search-input" name="searchInput" placeholder="Enter topic" required />
            <button className="search__button" type="submit">Search</button>
        </form>

    );
}

export default SearchForm;