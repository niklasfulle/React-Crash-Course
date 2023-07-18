import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

function PostPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const getPostById = useStoreState((state) => state.getPostById);

    const deletePost = useStoreActions((actions) => actions.deletePost);

    const post = getPostById(id);

    const handleDelete = (id) => {
        deletePost(id);
        navigate("/");
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
