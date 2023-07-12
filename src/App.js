import DisplayColor from "./DisplayColor";
import SetColor from "./SetColor";
import { useState } from "react";

function App() {
    const [colorString, setColorString] = useState("");
    const [hexValue, setHexValue] = useState("");
    const [isDarkText, setIsDarkText] = useState(true);

    return (
        <div className="App">
            <DisplayColor colorString={colorString} hexValue={hexValue} isDarkText={isDarkText} />
            <SetColor
                colorString={colorString}
                setColorString={setColorString}
                setHexValue={setHexValue}
                isDarkText={isDarkText}
                setIsDarkText={setIsDarkText}
            />
        </div>
    );
}

export default App;
