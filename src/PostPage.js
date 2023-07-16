import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import DataContext from "./context/DataContext";
import { useNavigate } from "react-router-dom";
import api from "./api/post";

function PostPage() {
    const { posts, setPosts } = useContext(DataContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const post = posts.find((post) => post.id.toString() === id);

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
        <main className="PostPage">
            <article className="post">
                {post && (
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <button className="deleteButton" onClick={() => handleDelete(post.id)}>
                            Delete
                        </button>

                        <Link to="edit">
                            <button className="editButton">Edit</button>
                        </Link>
                    </>
                )}
                {!post && (
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing</p>
                        <p>
                            <Link to="/">Visit Our Homepage</Link>
                        </p>
                    </>
                )}
            </article>
        </main>
    );
}

export default PostPage;
