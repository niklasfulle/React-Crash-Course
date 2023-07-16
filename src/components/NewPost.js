import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function NewPost() {
    const navigate = useNavigate();

    const posts = useStoreState((state) => state.posts);
    const postTitle = useStoreState((state) => state.postTitle);
    const postBody = useStoreState((state) => state.postBody);

    const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
    const setPostBody = useStoreActions((actions) => actions.setPostBody);
    const savePost = useStoreActions((actions) => actions.savePost);

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

        savePost(newPost);
        navigate("/");
    };

    return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title</label>
                <input
                    id="postTitle"
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor="postBody">Body</label>
                <textarea
                    id="postBody"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    );
}

export default NewPost;
