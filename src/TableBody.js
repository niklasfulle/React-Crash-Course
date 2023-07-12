import React from "react";
import TableBodyItem from "./TableBodyItem";

function TableBody({ page, items }) {
    return (
        <tbody>
            {items.map((item) => (
                <tr key={item.id}>
                    <TableBodyItem page={page} item={item} />
                </tr>
            ))}
        </tbody>
    );
}

export default TableBody;
