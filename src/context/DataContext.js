import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "../api/post";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const navigate = useNavigate();
    const { width } = useWindowSize();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), "MMMM dd, yyyy hh:mm:ss a");
        const newPost = {
            id,
            title: postTitle,
            datetime,
            body: postBody,
        };

        try {
            const response = await api.post("/posts", newPost);
            if (response && response.data) setPosts([...posts, response.data]);

            setPostTitle("");
            setPostBody("");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async (id) => {
        const datetime = format(new Date(), "MMMM dd, yyyy hh:mm:ss a");
        const updatePost = {
            id,
            title: editTitle,
            datetime,
            body: editBody,
        };

        try {
            const response = await api.put(`/posts/${id}`, updatePost);
            if (response && response.data) {
                const postList = posts.map((post) =>
                    post.id === id ? { ...response.data } : post
                );
                setPosts(postList);
                setEditTitle("");
                setEditBody("");
                navigate(`/`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`);
            const postList = posts.filter((post) => post.id !== id);
            setPosts(postList);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DataContext.Provider
            value={{
                width,
                search,
                setSearch,
                searchResults,
                setSearchResults,
                posts,
                isLoading,
                fetchError,
                handleSubmit,
                postTitle,
                setPostTitle,
                postBody,
                setPostBody,
                handleDelete,
                handleEdit,
                editTitle,
                setEditTitle,
                editBody,
                setEditBody,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
