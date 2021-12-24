import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

SearchForm.propTypes = {
  onSearchFormChange: PropTypes.func,
};

SearchForm.defaultProps = {
  onSearchFormChange: null,
};

const getDateBefore = (daysBefore) => {
  const date = new Date();
  date.setDate(date.getDate() - daysBefore);
  return date.toISOString().split("T")[0];
};

function SearchForm(props) {
  const { onSearchFormChange } = props;
  const InputGroup = (props) => (
    <div className="input-group">
      <span className={`input-group-text ${styles["same-width"]}`}>
        {props.label}
      </span>
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
      initialValues={{
        category: "",
        address: "",
        min_salary: "",
        create_at: "",
      }}
      onSubmit={(values) => {
        if (onSearchFormChange) onSearchFormChange(values);
      }}
    >
      {(props) => {
        const { handleReset, handleSubmit } = props;

        return (
          <Form>
            <div className="row">
              <div className="col-12 col-lg-5">
                <InputGroup
                  name="category"
                  label="Tìm kiếm"
                  placeholder="Tên việc làm"
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
                    <button
                      type="submit"
                      className="btn btn-primary text-nowrap fw-bold"
                      onClick={handleSubmit}
                    >
                      Tìm kiếm
                    </button>
                  </div>
                </Link>
              </div>
            </div>

            <div className="row mt-3 justify-content-center">
              <div className="col-12 col-lg-5 d-grid">
                <div className="input-group">
                  <span className={`input-group-text ${styles["same-width"]}`}>
                    Lương
                  </span>
                  <Field
                    name="min_salary"
                    component="select"
                    placeholder="Salary"
                    className={`py-1 form-control ${styles["appearance-auto"]}`}
                  >
                    <option value="">Chọn mức lương</option>
                    <option value="5000000">5.000.000đ+/tháng</option>
                    <option value="7000000">7.000.000đ+/tháng</option>
                    <option value="10000000">10.000.000đ+/tháng</option>
                  </Field>
                </div>
              </div>
              <div className="col-12 col-lg-5 d-grid">
                <div className="input-group">
                  <span className={`input-group-text ${styles["same-width"]}`}>
                    Ngày đăng
                  </span>
                  <Field
                    name="create_at"
                    component="select"
                    placeholder="Day"
                    className={`py-1 form-control ${styles["appearance-auto"]}`}
                  >
                    <option value="">Chọn thời gian</option>
                    <option value={getDateBefore(7)}>Trong vòng 1 tuần</option>
                    <option value={getDateBefore(30)}>
                      Trong vòng 1 tháng
                    </option>
                    <option value={getDateBefore(60)}>
                      Trong vòng 2 tháng
                    </option>
                  </Field>
                </div>
              </div>
              <div className="col-12 col-lg-2 d-grid">
                <button
                  type="button"
                  className="btn btn-danger text-nowrap fw-bold "
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SearchForm;
