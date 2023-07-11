import React from "react";

function Content() {
    const handleNameChange = () => {
        const names = ["John", "Jane", "Jack", "Jill"];
        const randomIndex = Math.floor(Math.random() * names.length);
        return names[randomIndex];
    };

    const handelClick = () => {
        console.log("Clicked!");
    };

    const handelClick2 = (name) => {
        console.log(`${name}  clicked!`);
    };

    const handelClick3 = (e) => {
        console.log(e.target.innerText);
    };

    return (
        <main>
            <p onDoubleClick={handelClick}>Hello {handleNameChange()}!</p>
            <button onClick={handelClick}>Click Me!</button>
            <button onClick={() => handelClick2("niklas")}>Click Me!</button>
            <button onClick={(e) => handelClick3(e)}>Click Me!</button>
        </main>
    );
}

export default Content;
