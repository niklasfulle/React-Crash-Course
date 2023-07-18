import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { StoreProvider } from "easy-peasy";
import store from "./stores/store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <StoreProvider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </BrowserRouter>
        </StoreProvider>
    </React.StrictMode>
);
