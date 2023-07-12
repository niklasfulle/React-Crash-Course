import React from "react";
import TableBodyItem from "./TableBodyItem";

function TableBody({ items }) {
    return (
        <tbody>
            {items.map((item) => (
                <tr key={item.id}>
                    <TableBodyItem item={item} />
                </tr>
            ))}
        </tbody>
    );
}

export default TableBody;
