import { Link } from "react-router-dom";

const Nav = ({ search, setSearch }) => {
    return (
        <nav>
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Posts</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
                <Link to="/">
                    <li>Home</li>
                </Link>

                <Link to="post">
                    <li>New Post</li>
                </Link>

                <Link to="about">
                    <li>About</li>
                </Link>
            </ul>
        </nav>
    );
};

export default Nav;
