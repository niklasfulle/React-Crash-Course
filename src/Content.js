import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

function Content({ items }) {
    const theadItems = Object.keys(items[0]);

    return (
        <table>
            <TableHead theadItems={theadItems} />
            <TableBody items={items} />
        </table>
    );
}

export default Content;
