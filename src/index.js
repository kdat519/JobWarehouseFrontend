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
import Employers from "./pages/Employers";
import HomePage from "./pages/homepage/HomePage";
import Login from "./pages/login/Login";
import Logout from "./pages/login/Logout";
import Register from "./pages/register/Register";
import Admin from "./pages/admin/Admin";
import ProfileEmployer from "./pages/admin/ProfileEmployer";
import UserDetail from "./pages/admin/UserDetail";
import EditJob from "./pages/post-job/EditJob";
import PostJob from "./pages/post-job/PostJob";
import PostJobLayout from "./pages/post-job/PostJobLayout";
import "./styles.scss";
import ProfileJobSeeker from "./pages/admin/ProfileJobSeeker";
import Profile from "./pages/admin/Profile";
import RecruitmentPage from "./pages/recruitpages/RecruitPage";

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

const RequireEmployer = ({ element }) => (
  <RequireAuth requireRole={Role.Employer}>{element}</RequireAuth>
);

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/recruitments" element={<RecruitmentPage />} />
      <Route
        path="/employers/profile"
        element={
          <RequireAuth requireRole={Role.Employer}>
            <ProfileEmployer />
          </RequireAuth>
        }
      />
      <Route
        path="/jobseekers/profile"
        element={
          <RequireAuth requireRole={Role.JobSeeker}>
            <ProfileJobSeeker />
          </RequireAuth>
        }
      />
      <Route
        path="/admin"
        element={
          <RequireAuth requireRole={Role.Admin}>
            <Admin />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/user/:userId"
        element={
          <RequireAuth requireRole={Role.Admin}>
            <UserDetail />
          </RequireAuth>
        }
      />
      <Route path="/employers" element={<Employers />} />
      <Route path="/for-employers" element={<EmployerHomePage />} />
      <Route
        path="/for-employers/post-job"
        element={<RequireEmployer element={<PostJobLayout />} />}
      >
        <Route index element={<PostJob />} />
        <Route path=":id" element={<EditJob />} />
      </Route>
      <Route
        path="/for-employers/jobs"
        element={<RequireEmployer element={<EmployerJobs />} />}
      />
      <Route
        path="/for-employers/jobs/:id"
        element={<RequireEmployer element={<CandidatesForJob />} />}
      />
      <Route path="*" element={<EmptyPage />} />
    </Routes>
  </AuthProvider>
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.querySelector("#root")
);
