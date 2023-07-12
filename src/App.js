import DisplayColor from "./DisplayColor";
import SetColor from "./SetColor";
import { useState } from "react";

function App() {
    const [colorString, setColorString] = useState("");
    return (
        <div className="App">
            <DisplayColor colorString={colorString} />
            <SetColor colorString={colorString} setColorString={setColorString} />
        </div>
    );
}

export default App;
