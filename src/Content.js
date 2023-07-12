import React from "react";
import ItemList from "./ItemList";

function Content({ items, handleCheck, handleDelete }) {
    return (
        <main>
            {items.length ? (
                <ItemList items={items} handleCheck={handleCheck} handleDelete={handleDelete} />
            ) : (
                <p style={{ marginTop: "2em" }}>No items in the list</p>
            )}
        </main>
    );
}

export default Content;
