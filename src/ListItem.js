import React from "react";

function ListItem({ item }) {
    return (
        <li className="item">
            <p>{JSON.stringify(item)}</p>
        </li>
    );
}

export default ListItem;
