import "bootstrap";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import AuthProvider, { Role } from "./components/auth/AuthProvider";
import RequireAuth from "./components/auth/RequireAuth";
import NavBar from "./components/navbar/NavBar";
import Account from "./pages/account/Account";
import Profile from "./pages/account/Profile";
import Admin from "./pages/admin/Admin";
import Reports from "./pages/admin/Reports";
import User from "./pages/admin/User";
import Users from "./pages/admin/Users";
import Login from "./pages/authentication/Login";
import Logout from "./pages/authentication/Logout";
import Register from "./pages/authentication/Register";
import EmployerHomePage from "./pages/employer-homepage/EmployerHomePage";
import CandidatesForJob from "./pages/employer-jobs/CandidatesForJob";
import EmployerJobs from "./pages/employer-jobs/EmployerJobs";
import Employers from "./pages/Employers";
import ForEmployersLayout from "./pages/ForEmployersLayout";
import HomePage from "./pages/homepage/HomePage";
import NotificationPage from "./pages/notifications/Notification";
import EditJob from "./pages/post-job/EditJob";
import PostJob from "./pages/post-job/PostJob";
import PostJobLayout from "./pages/post-job/PostJobLayout";
import JobDescriptionPage from "./pages/recruitpages/JobDescripPage";
import RecruitmentPage from "./pages/recruitpages/RecruitPage";
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

const RequireEmployer = ({ element }) => (
  <RequireAuth requireRole={Role.Employer}>{element}</RequireAuth>
);

const RequireAdmin = ({ element }) => (
  <RequireAuth requireRole={Role.Admin}>{element}</RequireAuth>
);

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin" element={<RequireAdmin element={<Admin />} />}>
        <Route index element={<Users />} />
        <Route path="reports" element={<Reports />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:userId" element={<User />} />
      </Route>

      <Route path="profile/:userId" element={<Profile />} />
      <Route path="account" element={<Account />} />

      <Route path="/recruitments" element={<RecruitmentPage />} />
      <Route path="/jobdescrips/:userId" element={<JobDescriptionPage />} />
      <Route path="/notifications" element={<NotificationPage />} />

      <Route path="/employers" element={<Employers />} />

      <Route path="/for-employers" element={<ForEmployersLayout />}>
        <Route index element={<EmployerHomePage />} />
        <Route path="*" element={<RequireEmployer element={<Outlet />} />}>
          <Route path="post-job" element={<PostJobLayout />}>
            <Route index element={<PostJob />} />
            <Route path=":jobId" element={<EditJob />} />
          </Route>
          <Route path="jobs" element={<EmployerJobs />} />
          <Route path="jobs/:jobId" element={<CandidatesForJob />} />
        </Route>
      </Route>

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
