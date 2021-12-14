import { Field, Form, Formik } from "formik";
import React from "react";
import NavBar from "../../components/navbar/NavBar";
import doodle from "./homepage-doodle.svg";
import styles from "./styles.module.scss";

const InputGroup = ({ name, label, placeholder }) => (
  <div className="input-group">
    <span className={`input-group-text ${styles["same-width"]}`}>{label}</span>
    <Field
      type="text"
      name={name}
      className="form-control"
      placeholder={placeholder}
    />
  </div>
);

const SearchForm = () => (
  <Formik
    initialValues={{ searchPhrase: "", location: "" }}
    onSubmit={(values) => {
      alert(JSON.stringify(values));
    }}
  >
    <Form>
      <div className="row">
        <div className="col-12 col-lg-5">
          <InputGroup
            name="searchPhrase"
            label="Tìm kiếm"
            placeholder="Việc làm, công ty,..."
          />
        </div>
        <div className="col-12 col-lg-5">
          <InputGroup
            name="location"
            label="Địa điểm"
            placeholder="Tỉnh hoặc thành phố"
          />
        </div>
        <div className="col-12 col-lg-2 d-grid">
          <button type="submit" className="btn btn-primary text-nowrap fw-bold">
            Tìm kiếm
          </button>
        </div>
      </div>
    </Form>
  </Formik>
);

const HomePage = () => (
  <div className="d-flex flex-column vh-100">
    <header>
      <NavBar />
    </header>
    <main className="container h-100 d-flex flex-column justify-content-center">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6">
          <img src={doodle} alt="" />
        </div>
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-12 col-lg-8">
          <SearchForm />
        </div>
      </div>
    </main>
  </div>
);

export default HomePage;
