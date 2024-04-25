import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App.jsx";
import Nav from "./components/Nav.jsx";
import "./styles/index.css";
import CreatePrompt from "./pages/CreatePrompt.jsx";
import ViewPrompt from "./pages/ViewPrompt.jsx";
import EditPrompt from "./pages/EditPrompt.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route index={false} path="/" element={<App />} />
        <Route index={false} path="/create" element={<CreatePrompt />} />
        <Route index={false} path="/:id" element={<ViewPrompt />} />
        <Route index={false} path="/:id/edit" element={<EditPrompt />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
