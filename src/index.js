import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap";
import "./index.scss";
import RegisPage from './pages/regispages/RegistrationPage';
import RecruitmentPage from './pages/recruitpages/RecruitPage';
import HomePage from './pages/homepages/HomePage'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecruitmentPage />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.querySelector("#root")
);
