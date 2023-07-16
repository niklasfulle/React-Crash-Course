import React from "react";
import Feed from "./Feed";
import { useStoreState } from "easy-peasy";

function Home({ isLoading, fetchError }) {
    const searchResults = useStoreState((state) => state.searchResults);

    return (
        <main className="Home">
            {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
            {fetchError && (
                <p style={{ textAlign: "center", color: "red" }}>
                    Something went wrong: {fetchError.message}
                </p>
            )}
            {!isLoading &&
                !fetchError &&
                (searchResults.length ? (
                    <Feed posts={searchResults} />
                ) : (
                    <p style={{ marginTop: "2rem" }}>No posts to display.</p>
                ))}
        </main>
    );
}

export default Home;
