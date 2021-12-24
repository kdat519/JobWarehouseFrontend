import { Form, Formik, useField, useFormikContext } from "formik";
import React from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import TextareaTinyMCE from "./TextareaTinyMCE";

const useInputProps = (name, type, className) => {
  const [field, meta] = useField(name);

  const validationClassName = () =>
    meta.touched && meta.error ? "is-invalid" : "";

  return {
    id: name,
    name: name,
    type: type,
    className: (className || "") + " form-control " + validationClassName(name),
    ...field,
  };
};

const Input = ({ name, label, type, className, htmlAttr, inputGroupText }) => {
  const [, meta] = useField(name);
  const inputProps = useInputProps(name, type, className);
  return (
    <div className="row mb-2">
      <label
        htmlFor={name}
        className="form-label col-12 col-md-3 col-xl-2 col-form-label pe-0"
      >
        {label}
      </label>
      <div className="col-12 col-md-9 col-xl-10">
        {inputGroupText ? (
          <div className="input-group has-validation">
            <input {...inputProps} {...htmlAttr} />
            <span className="input-group-text">{inputGroupText}</span>
            <div className="invalid-feedback">{meta.error}</div>
          </div>
        ) : (
          <>
            <input {...inputProps} {...htmlAttr} />
            <div className="invalid-feedback">{meta.error}</div>
          </>
        )}
      </div>
    </div>
  );
};

const validate = (values) => {
  const error = {};
  for (let field in values) {
    if (!values[field]) {
      error[field] = "Không được để trống";
    }
  }
  if (!values.minSalary || values.minSalary < 0) {
    error.minSalary = "Lương phải là số dương và không được để trống.";
  }
  return error;
};

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    cancelButton: "btn btn-secondary mx-1",
    confirmButton: "btn btn-danger mx-1",
  },
  buttonsStyling: false,
});

const CancelButton = () => {
  const { initialValues, values } = useFormikContext();
  const navigate = useNavigate();
  const handleConfirm = () => navigate("/for-employers/jobs");

  const handleClick = (event) => {
    event.preventDefault();
    if (JSON.stringify(initialValues) === JSON.stringify(values))
      handleConfirm();
    else
      swalWithBootstrapButtons.fire({
        title: "<h3>Hủy bỏ thay đổi<h3>",
        icon: "warning",
        html: "<p>Bạn có thực sự muốn hủy bỏ thay&nbsp;đổi?<p>",
        showConfirmButton: true,
        confirmButtonText: "Hủy",
        showCancelButton: true,
        cancelButtonText: "Không hủy",
        preConfirm: handleConfirm,
      });
  };

  return (
    <button
      type="button"
      className="btn btn-outline-secondary mx-2"
      onClick={handleClick}
    >
      Hủy
    </button>
  );
};

const SubmitButton = () => {
  const { initialValues, values, dirty } = useFormikContext();

  const btnColor = !dirty ? "btn-secondary" : "btn-primary";
  return (
    <button type="submit" className={"btn " + btnColor} disabled={!dirty}>
      {initialValues ? "Lưu" : "Đăng"}
    </button>
  );
};

const JobForm = ({ initialValues, handleSubmit }) => (
  <Formik
    initialValues={
      initialValues || {
        jobName: "",
        category: "",
        address: "",
        minSalary: "",
        detail: "",
        requirement: "",
      }
    }
    validate={validate}
    onSubmit={handleSubmit}
  >
    <Form noValidate>
      <Input name="jobName" label="Tên công việc" type="text" />
      <Input name="category" label="Lĩnh vực" type="text" />
      <Input name="address" label="Địa điểm" type="text" />
      <Input
        name="minSalary"
        label="Lương khởi điểm"
        type="number"
        inputGroupText="VND"
      />
      <TextareaTinyMCE name="detail" label="Mô tả" />
      <TextareaTinyMCE name="requirement" label="Yêu cầu" />
      <div className="d-flex justify-content-end mt-3">
        <CancelButton />
        <SubmitButton />
      </div>
    </Form>
  </Formik>
);

export default JobForm;
