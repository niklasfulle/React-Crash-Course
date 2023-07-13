import React from "react";
import Feed from "./Feed";

function Home({ posts, error, loading }) {
    return (
        <main className="Home">
            {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
            {error && (
                <p style={{ textAlign: "center", color: "red" }}>
                    Something went wrong: {error.message}
                </p>
            )}
            {!loading &&
                !error &&
                (posts.length ? (
                    <Feed posts={posts} />
                ) : (
                    <p style={{ marginTop: "2rem" }}>No posts to display.</p>
                ))}
        </main>
    );
}

export default Home;
