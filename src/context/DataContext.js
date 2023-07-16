import { createContext, useEffect, useState } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState("");

    const { data, isLoading, fetchError } = useAxiosFetch("http://localhost:3500/posts");

    useEffect(() => {
        setPosts(data);
    }, [data]);

    useEffect(() => {
        const filteredResults = posts.filter(
            (post) =>
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.body.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

    return (
        <DataContext.Provider
            value={{
                search,
                setSearch,
                searchResults,
                setSearchResults,
                posts,
                setPosts,
                isLoading,
                fetchError,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;