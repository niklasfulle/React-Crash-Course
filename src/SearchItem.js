import React from "react";

function SearchItem({ search, setSearch }) {
    return (
        <form className="searchForm" onSubmit={(e) => e.preventDefault}>
            <label htmlFor="search">Search</label>
            <input
                id="search"
                type="text"
                role="searchbox"
                placeholder="Search Items"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>
    );
}

export default SearchItem;
