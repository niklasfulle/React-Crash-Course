import React from "react";

function HeaderButton({ title, page, setPage, activePage }) {
    return (
        <button
            onClick={() => setPage(page)}
            style={{
                backgroundColor: page === activePage ? "#000" : null,
                color: page === activePage ? "#fff" : null,
            }}
        >
            {title}
        </button>
    );
}

export default HeaderButton;
