import React from "react";

function TableBodyItem({ page, item }) {
    if (page === "users") {
        return (
            <>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{JSON.stringify(item.address)}</td>
                <td>{item.phone}</td>
                <td>{item.website}</td>
                <td>{JSON.stringify(item.company)}</td>
            </>
        );
    } else if (page === "posts") {
        return (
            <>
                <td>{item.userId}</td>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
            </>
        );
    } else if (page === "comments") {
        return (
            <>
                <td>{item.postId}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.body}</td>
            </>
        );
    }
}

export default TableBodyItem;
