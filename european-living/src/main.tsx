import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import DestinationDetails from "./components/page/DestinationDetails";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* 👇 Important: basename must match your GitHub repo name */}
    <BrowserRouter basename="/European-Living">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
