import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap";
import "./index.scss";
import ChatBox from "./pages/chatbox/chatPage";
import RegisPage from "./pages/RegistrationPage";
//import RegisPage from "./pages/RegistrationPage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatBox />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.querySelector("#root")
);
