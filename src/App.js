import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import { useState, useEffect } from "react";
import apiRequest from "./apiRequest";

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

    const handleCheck = async (id) => {
        const listItems = items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setItems(listItems);

        const item = listItems.filter((item) => item.id === id);

        const patchOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ checked: item[0].checked }),
        };

        const result = await apiRequest(`${API_URL}/${id}`, patchOptions);
        if (result) {
            setFetchError(result);
            setItems(
                items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
            );
        }
    };

    const handleDelete = async (id) => {
        const listItems = items.filter((item) => item.id !== id);
        setItems(listItems);

        const deleteOptions = {
            method: "DELETE",
        };

        const result = await apiRequest(`${API_URL}/${id}`, deleteOptions);
        if (result) {
            setFetchError(result);
            setItems(items.filter((item) => item.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newItem) return;
        addItem(newItem);
        setNewItem("");
    };

    const addItem = async (item) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const newlistItem = { id, checked: false, item };
        const listItems = [...items, newlistItem];
        setItems(listItems);

        const postOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newlistItem),
        };
        const result = await apiRequest(API_URL, postOptions);
        if (result) {
            setFetchError(result);
            setItems(items.filter((item) => item.id !== id));
        }
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
