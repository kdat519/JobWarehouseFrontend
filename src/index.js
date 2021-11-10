import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap";
import "./index.scss";
import NavBar from "./components/NavBar";
import HomePage from "./pages/homepages/HomePage";

const EmptyPage = () => (
  <>
    <header>
      <NavBar />
    </header>
    <main className="container">
      <h1 className="display-1 position-absolute top-50 start-50 translate-middle">
        Wow. Such empty.
      </h1>
    </main>
  </>
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="*" element={<EmptyPage />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.querySelector("#root")
);
