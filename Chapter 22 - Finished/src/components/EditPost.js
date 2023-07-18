import React, { useEffect } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();

    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);
    const getPostById = useStoreState((state) => state.getPostById);

    const setEditBody = useStoreActions((actions) => actions.setEditBody);
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const editPost = useStoreActions((actions) => actions.editPost);

    const post = getPostById(id);

    const handleEdit = (id) => {
        const datetime = format(new Date(), "MMMM dd, yyyy hh:mm:ss a");
        const updatePost = {
            id,
            title: editTitle,
            datetime,
            body: editBody,
        };

        editPost(updatePost);
        navigate(`/post/${id}`);
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
                        <button type="button" onClick={() => handleEdit(post.id)}>
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
