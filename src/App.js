import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import About from "./About";
import Missing from "./Missing";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
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
