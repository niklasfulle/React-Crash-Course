import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

function Content({ page, items }) {
    const theadItems = Object.keys(items[0]);

    return (
        <table>
            <TableHead theadItems={theadItems} />
            <TableBody page={page} items={items} />
        </table>
    );
}

export default Content;
