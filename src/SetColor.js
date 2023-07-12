import React from "react";

function SetColor({ colorString, setColorString }) {
    return (
        <form className="addColorForm" onSubmit={(e) => e.preventDefault}>
            <label htmlFor="addColor">Add Color</label>
            <input
                autoFocus
                type="text"
                id="addColor"
                placeholder="Add color name"
                required
                value={colorString}
                onChange={(e) => setColorString(e.target.value)}
            />
        </form>
    );
}

export default SetColor;
