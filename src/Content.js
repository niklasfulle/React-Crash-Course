import React from "react";
import { useState } from "react";

function Content() {
    const [name, setName] = useState("John");
    const [count, setCount] = useState(0);

    const handleNameChange = () => {
        const names = ["John", "Jane", "Jack", "Jill"];
        const randomIndex = Math.floor(Math.random() * names.length);
        setName(names[randomIndex]);
    };

    const handelClick = () => {
        setCount(count + 1);
        setCount(count + 1);
        console.log(count);
    };

    const handelClick2 = () => {
        console.log(count);
    };

    return (
        <main>
            <p onDoubleClick={handelClick}>Hello {name}!</p>
            <button onClick={handleNameChange}>Change Name</button>
            <button onClick={handelClick}>Click Me!</button>
            <button onClick={handelClick2}>Click Me!</button>
        </main>
    );
}

export default Content;
