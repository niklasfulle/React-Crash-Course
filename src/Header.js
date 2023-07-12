import React from "react";
import HeaderButton from "./HeaderButton";

function Header({ page, setPage }) {
    return (
        <header>
            <HeaderButton title="Users" page="users" activePage={page} setPage={setPage} />
            <HeaderButton title="Posts" page="posts" activePage={page} setPage={setPage} />
            <HeaderButton title="Comments" page="comments" activePage={page} setPage={setPage} />
        </header>
    );
}

export default Header;
