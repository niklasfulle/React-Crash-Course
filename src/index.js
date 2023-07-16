import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StoreProvider } from "easy-peasy";
import store from "./stores/store";

ReactDOM.render(
    <React.StrictMode>
        <StoreProvider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </BrowserRouter>
        </StoreProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
