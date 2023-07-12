import React from "react";

function DisplayColor({ colorString, hexValue, isDarkText }) {
    return (
        console.log(colorString),
        (
            <div
                className="displayColor"
                style={{ backgroundColor: colorString, color: isDarkText ? "#000" : "#FFF" }}
            >
                <p>{colorString ? colorString : "Empty value"}</p>
                <p>{hexValue ? hexValue : null}</p>
            </div>
        )
    );
}

DisplayColor.defaultProps = {
    colorString: "Empty value",
};

export default DisplayColor;
