import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/MapR";

import "./main.css";
import "normalize.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
