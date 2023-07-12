import React from "react";

function TableHead({ theadItems }) {
    return (
        <thead>
            <tr>
                {theadItems.map((theadItem) => (
                    <th key={theadItem}>{theadItem}</th>
                ))}
            </tr>
        </thead>
    );
}

export default TableHead;
