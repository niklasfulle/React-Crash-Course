import React, { useContext } from "react";
import Feed from "./Feed";
import DataContext from "./context/DataContext";

function Home() {
    const { searchResults, fetchError, isLoading } = useContext(DataContext);

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
