import React from "react";
import colorNames from "colornames";

function SetColor({ colorString, setColorString, setHexValue, isDarkText, setIsDarkText }) {
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
                onChange={(e) => {
                    setColorString(e.target.value);
                    setHexValue(colorNames(e.target.value));
                }}
            />
            <button type="button" onClick={() => setIsDarkText(!isDarkText)}>
                Toggle Text Color
            </button>
        </form>
    );
}

export default SetColor;
