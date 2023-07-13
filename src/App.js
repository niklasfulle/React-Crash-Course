import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import About from "./About";
import Missing from "./Missing";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import api from "./api/post";
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";

function App() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const navigate = useNavigate();
    const { width } = useWindowSize();

    const { data, loading, error } = useAxiosFetch("http://localhost:3500/posts");

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
        <Routes>
            <Route
                path="/"
                element={<Layout search={search} setSearch={setSearch} width={width} />}
            >
                <Route
                    index
                    element={<Home posts={searchResults} error={error} loading={loading} />}
                />
            </Route>
            <Route path="post" element={<Layout search={search} setSearch={setSearch} />}>
                <Route
                    index
                    element={
                        <NewPost
                            handleSubmit={handleSubmit}
                            postTitle={postTitle}
                            setPostTitle={setPostTitle}
                            postBody={postBody}
                            setPostBody={setPostBody}
                        />
                    }
                />
            </Route>
            <Route path="post/:id" element={<Layout search={search} setSearch={setSearch} />}>
                <Route index element={<PostPage posts={posts} handleDelete={handleDelete} />} />
            </Route>
            <Route path="post/:id/edit" element={<Layout search={search} setSearch={setSearch} />}>
                <Route
                    index
                    element={
                        <EditPost
                            posts={posts}
                            handleEdit={handleEdit}
                            editTitle={editTitle}
                            setEditTitle={setEditTitle}
                            editBody={editBody}
                            setEditBody={setEditBody}
                        />
                    }
                />
            </Route>

            <Route path="about" element={<Layout search={search} setSearch={setSearch} />}>
                <Route index element={<About />} />
            </Route>
            <Route path="*" element={<Layout search={search} setSearch={setSearch} />}>
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;
