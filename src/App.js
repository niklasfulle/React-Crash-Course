import Content from "./Content";
import { useState, useEffect } from "react";
import Header from "./Header";

function App() {
    const API_URL = "https://jsonplaceholder.typicode.com/";

    const [items, setItems] = useState([]);
    const [page, setPage] = useState("users");
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => await fetchItems())();
    }, [page]);

    const fetchItems = async () => {
        try {
            const URL = `${API_URL}${page}`;
            const response = await fetch(URL);
            const items = await response.json();
            if (!response.ok) throw new Error("Fetch failed");
            setItems(items);
            setFetchError(null);
        } catch (error) {
            setFetchError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="App">
            <Header page={page} setPage={setPage} />
            <main>
                {isLoading && <p>Loading...</p>}
                {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
                {!fetchError && !isLoading && <Content items={items} page={page} />}
            </main>
        </div>
    );
}

export default App;
