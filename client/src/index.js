import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import { Navbar } from "./components/Navbar";
import { Form } from "./components/Form";
import { Main } from "./components/Main";
import { EditForm } from "./components/EditForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/facultyList" element={<Main />} />
            <Route path="/addFaculty" element={<Form />} />
            <Route path="/editFaculty/:id" element={<EditForm />} />
        </Routes>
    </BrowserRouter>
);
