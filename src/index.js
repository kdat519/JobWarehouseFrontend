import "bootstrap";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider, { Role } from "./components/auth/AuthProvider";
import RequireAuth from "./components/auth/RequireAuth";
import NavBar from "./components/navbar/NavBar";
import EmployerHomePage from "./pages/employer-homepage/EmployerHomePage";
import CandidatesForJob from "./pages/employer-jobs/CandidatesForJob";
import EmployerJobs from "./pages/employer-jobs/EmployerJobs";
import Employers from "./pages/employers/Employers";
import HomePage from "./pages/homepage/HomePage";
import Login from "./pages/Login";
import PostJob from "./pages/post-job/PostJob";
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
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="/employers" element={<Employers />} />
          <Route path="/for-employers" element={<EmployerHomePage />} />
          <Route
            path="/for-employers/post-job"
            element={
              <RequireAuth requireRole={Role.Employer}>
                <PostJob />
              </RequireAuth>
            }
          />
          <Route path="/for-employers/jobs" element={<EmployerJobs />} />
          <Route
            path="/for-employers/jobs/:id"
            element={<CandidatesForJob />}
          />
          <Route path="*" element={<EmptyPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.querySelector("#root")
);
