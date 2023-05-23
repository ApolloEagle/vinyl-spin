import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import VinylSpinner from "./vinyl-spinner";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <VinylSpinner />
  </React.StrictMode>
);
