import { Field, Form, Formik, useField, useFormikContext } from "formik";
import React from "react";
import styles from "./styles.module.scss";

export const Order = {
  Asc: "asc",
  Desc: "desc",
};

export const makeOption = (value, title) => ({ value: value, title: title });

const Select = ({ name, title, options }) => {
  const [field] = useField(name);
  const { submitForm } = useFormikContext();
  const changeHandle = (event) => {
    field.onChange(event);
    submitForm();
  };

  return (
    <div className="input-group">
      <label
        className={`input-group-text ${styles["same-width"]}`}
        htmlFor={name}
      >
        {title}
      </label>
      <select
        id={name}
        name={name}
        className="form-select"
        {...field}
        onChange={changeHandle}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

const SearchBox = ({ placeholder }) => (
  <div className="input-group">
    <Field
      type="text"
      name="search"
      className="form-control"
      placeholder={placeholder}
    />
    <button className="btn btn-outline-secondary" type="submit">
      Tìm kiếm
    </button>
  </div>
);

const SearchAndSort = ({ searchPlaceholder, orderOptions, handleSubmit }) => (
  <Formik
    initialValues={{
      search: "",
      orderBy: orderOptions[0].value,
      order: Order.Asc,
    }}
    onSubmit={handleSubmit}
  >
    <Form>
      <div className="row mb-4">
        <div className="col-12 col-xl-4 me-auto mb-3 mb-xl-0">
          <SearchBox placeholder={searchPlaceholder} />
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <Select title="Sắp xếp theo" name="orderBy" options={orderOptions} />
        </div>
        <div className="col-12 col-md-6 col-xl-2">
          <Select
            title="Thứ tự"
            name="order"
            options={[
              makeOption(Order.Asc, "Tăng"),
              makeOption(Order.Desc, "Giảm"),
            ]}
          />
        </div>
      </div>
    </Form>
  </Formik>
);

export default SearchAndSort;
