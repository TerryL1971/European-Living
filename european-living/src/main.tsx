// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import DestinationDetails from "./components/page/DestinationDetails";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* No basename here since you're on a custom domain */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
