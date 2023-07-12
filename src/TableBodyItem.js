import React from "react";

function TableBodyItem({ item }) {
    return (
        <>
            {Object.entries(item).map(([key, value]) => (
                <td key={key}>{JSON.stringify(value)}</td>
            ))}
        </>
    );
}

export default TableBodyItem;
