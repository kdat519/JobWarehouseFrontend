import React from "react";
import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

SearchForm.propTypes = {
  onSearchFormChange: PropTypes.func,
};

SearchForm.defaultProps = {
  onSearchFormChange: null,
};

function SearchForm(props) {
  const { onSearchFormChange } = props;
  const InputGroup = (props) => (
    <div className="input-group">
      <span className={`input-group-text ${styles["same-width"]}`}>{props.label}</span>
      <Field
        type="text"
        name={props.name}
        className="form-control"
        placeholder={props.placeholder}
      ></Field>
    </div>
  );

  return (
    <Formik
      initialValues={{ category: "", address: "", min_salary: "", create_at: "", }}
      onSubmit={(values) => {
        if (onSearchFormChange) onSearchFormChange(values);
      }}
    >
      {props => {
        const {
          handleReset,
          handleSubmit } = props;

        return (
          <Form>
            <div className="row">
              <div className="col-12 col-lg-5">
                <InputGroup
                  name="category"
                  label="Tìm kiếm"
                  placeholder="Việc làm, công ty,..."
                />
              </div>
              <div className="col-12 col-lg-5">
                <InputGroup
                  name="address"
                  label="Địa điểm"
                  placeholder="Tỉnh hoặc thành phố"
                />
              </div>
              <div className="col-12 col-lg-2">
                <Link to="/recruitments">
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary text-nowrap fw-bold" onClick={handleSubmit}>
                      Tìm kiếm
                    </button>
                  </div>
                </Link>
              </div>
            </div>

            <div className="row mt-3 justify-content-center">
              <div className="col-12 col-lg-5 d-grid">
                <Field
                  name="min_salary"
                  component="select"
                  placeholder="Salary"
                  className="py-1 bg-light"
                >
                  <option value="">Lương</option>
                  <option value="5000000">5.000.000đ+/tháng</option>
                  <option value="7000000">7.000.000đ+/tháng</option>
                  <option value="10000000">10.000.000đ+/tháng</option>
                </Field>
              </div>
              <div className="col-12 col-lg-5 d-grid">
                <Field
                  name="create_at"
                  component="select"
                  placeholder="Day"
                  className="py-1 bg-light"
                >
                  <option value="">Ngày đăng</option>
                  <option value="3">Trên 3 ngày trước</option>
                  <option value="7">Trên 7 ngày trước</option>
                  <option value="30">Trên 30 ngày trước</option>
                </Field>
              </div>
              <div className="col-12 col-lg-2 d-grid">
                <button type="button" className="btn btn-danger text-nowrap fw-bold " onClick={handleReset}>
                  Reset
                </button>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  );
};

export default SearchForm;