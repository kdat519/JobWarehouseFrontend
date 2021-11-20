import { Field, Form, Formik } from "formik";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { Role, useAuth } from "../components/auth/AuthProvider";
import NavBar from "../components/navbar/NavBar";

const RoleRadio = () => (
  <>
    <div className="form-check">
      <Field
        className="form-check-input"
        type="radio"
        name="userRole"
        id="job-seeker-role"
        value={Role.JobSeeker}
      />
      <label className="form-check-label" htmlFor="job-seeker-role">
        Login as Job seeker
      </label>
    </div>
    <div className="form-check">
      <Field
        className="form-check-input"
        type="radio"
        name="userRole"
        id="employer-role"
        value={Role.Employer}
      />
      <label className="form-check-label" htmlFor="employer-role">
        Login as Employer
      </label>
    </div>
  </>
);

const Login = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state;
  const from = state ? state.from.pathname : "/";

  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <NavBar />
      </header>
      <main className="container h-100 d-flex flex-column justify-content-center">
        <Formik
          initialValues={{ username: "", userRole: Role.JobSeeker }}
          onSubmit={(values) => {
            alert(JSON.stringify(values));
            authContext.login(values.username, values.userRole, () =>
              navigate(from, { replace: true })
            );
          }}
        >
          <Form className="">
            <Field
              type="text"
              name="username"
              id="username"
              placeholder="username"
              className="form-control"
              required
            />
            <RoleRadio />
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </Form>
        </Formik>
      </main>
    </div>
  );
};

export default Login;
