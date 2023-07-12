import React from "react";

function DisplayColor({ colorString }) {
    return (
        console.log(colorString),
        (
            <div className="displayColor" style={{ backgroundColor: `${colorString}` }}>
                <p>{colorString ? `${colorString}` : "Empty value"}</p>
            </div>
        )
    );
}

export default DisplayColor;
