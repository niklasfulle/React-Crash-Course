import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import { useState, useEffect } from "react";

function App() {
    const API_URL = "http://localhost:3500/items";

    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [search, setSearch] = useState("");
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            (async () => await fetchItems())();
        }, 2000);
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch(API_URL);
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

    const handleCheck = (id) => {
        const listItems = items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setItems(listItems);
    };

    const handleDelete = (id) => {
        const listItems = items.filter((item) => item.id !== id);
        setItems(listItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newItem) return;
        addItem(newItem);
        setNewItem("");
    };

    const addItem = (item) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const newlistItem = { id, checked: false, item };
        const listItems = [...items, newlistItem];
        setItems(listItems);
    };

    return (
        <div className="App">
            <Header title="Grocery List" />
            <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
            <SearchItem search={search} setSearch={setSearch} />
            <main>
                {isLoading && <p>Loading...</p>}
                {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
                {!fetchError && !isLoading && (
                    <Content
                        items={items.filter((item) =>
                            item.item.toLowerCase().includes(search.toLowerCase())
                        )}
                        handleCheck={handleCheck}
                        handleDelete={handleDelete}
                    />
                )}
            </main>
            <Footer length={items.length} />
        </div>
    );
}

export default App;
