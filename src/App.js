import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";

function App() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), "MMMM dd, yyyy hh:mm:ss a");
        const newPost = {
            id,
            title: postTitle,
            datetime,
            body: postBody,
        };

        setPosts([...posts, newPost]);
        setPostTitle("");
        setPostBody("");
        navigate("/");
    };

    const handleDelete = (id) => {
        const postList = posts.filter((post) => post.id !== id);
        setPosts(postList);
        navigate("/");
    };

    useEffect(() => {
        const filteredResults = posts.filter(
            (post) =>
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.body.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

    return (
        <Routes>
            <Route path="/" element={<Layout search={search} setSearch={setSearch} />}>
                <Route index element={<Home posts={searchResults} />} />
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
            *
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
