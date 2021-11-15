import "bootstrap";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import EmployerHomePage from "./pages/employer-homepage/EmployerHomePage";
import Employers from "./pages/employers/Employers";
import HomePage from "./pages/homepage/HomePage";
import "./styles.scss";

const EmptyPage = () => (
  <div className="d-flex flex-column vh-100">
    <header>
      <NavBar />
    </header>
    <main className="container h-100 d-flex flex-column justify-content-center">
      <h1 className="display-1 mx-auto">Wow. Such empty.</h1>
    </main>
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="for-employers" element={<EmployerHomePage />}></Route>
        <Route path="employers" element={<Employers />}></Route>
        <Route path="*" element={<EmptyPage />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.querySelector("#root")
);
