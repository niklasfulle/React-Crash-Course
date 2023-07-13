import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import DataContext from "./context/DataContext";

function EditPost() {
    const { posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody } =
        useContext(DataContext);
    const { id } = useParams();
    const post = posts.find((post) => post.id.toString() === id);

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
