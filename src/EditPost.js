import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import DataContext from "./context/DataContext";
import { useNavigate } from "react-router-dom";
import api from "./api/post";

function EditPost() {
    const { posts, setPosts } = useContext(DataContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const post = posts.find((post) => post.id.toString() === id);

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

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody]);

    return (
        <main className="EditPost">
            {editTitle && editBody && (
                <>
                    <h2>Edit Post</h2>
                    <form className="editPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="editTitle">Title</label>
                        <input
                            id="editTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="editBody">Body</label>
                        <textarea
                            id="editBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit" onClick={() => handleEdit(post.id)}>
                            Updaten
                        </button>
                    </form>
                </>
            )}
            {!editTitle && !editBody && (
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing</p>
                    <p>
                        <Link to="/">Visit Our Homepage</Link>
                    </p>
                </>
            )}
        </main>
    );
}

export default EditPost;
