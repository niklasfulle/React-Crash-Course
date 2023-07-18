import Layout from "./components/Layout";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import EditPost from "./components/EditPost";
import About from "./components/About";
import Missing from "./components/Missing";
import { Route, Routes } from "react-router-dom";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useEffect } from "react";
import { useStoreActions } from "easy-peasy";

function App() {
    const setPosts = useStoreActions((actions) => actions.setPosts);
    const { data, isLoading, fetchError } = useAxiosFetch("http://localhost:3500/posts");

    useEffect(() => {
        setPosts(data);
    }, [data, setPosts]);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home isLoading={isLoading} fetchError={fetchError} />} />
            </Route>
            <Route path="post" element={<Layout />}>
                <Route index element={<NewPost />} />
            </Route>
            <Route path="post/:id" element={<Layout />}>
                <Route index element={<PostPage />} />
            </Route>
            <Route path="post/:id/edit" element={<Layout />}>
                <Route index element={<EditPost />} />
            </Route>
            <Route path="about" element={<Layout />}>
                <Route index element={<About />} />
            </Route>
            <Route path="*" element={<Layout />}>
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;
