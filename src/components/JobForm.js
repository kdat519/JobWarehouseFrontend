import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const useInputProps = (name, formik, type, className) => {
  const [changed, setChanged] = useState(false);
  const handleChange = (event) => {
    setChanged(true);
    console.log(event.target.value);
    formik.handleChange(event);
  };

  const validationClassName = (name) => {
    if (!changed) return "";
    return formik.touched[name] && formik.errors[name]
      ? "is-invalid"
      : "is-valid";
  };

  return {
    id: name,
    name: name,
    type: type,
    className: className + " form-control " + validationClassName(name),
    onChange: handleChange,
    onBlur: formik.handleBlur,
    value: formik.values[name],
  };
};

const Input = (props) => (
  <div className="row mb-2">
    <label htmlFor={props.name} className="form-label col-2 col-form-label">
      {props.label}
    </label>
    <div className="col-10">
      <input
        {...useInputProps(
          props.name,
          props.formik,
          props.type,
          props.className
        )}
        {...props.htmlAttr}
      />
    </div>
  </div>
);

const Textarea = (props) => (
  <div>
    <label htmlFor="detail" className="form-label">
      {props.label}
    </label>
    <textarea
      {...useInputProps(props.name, props.formik)}
      {...props.htmlAttr}
    />
  </div>
);

const validate = (values) => {
  const error = {};
  for (let field in values) {
    if (!values[field]) {
      error[field] = "Không được để trống";
    }
  }
  return error;
};

const CancelButton = () => {
  const navigate = useNavigate();
  const handleConfirm = () => {
    navigate(-1);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary mx-2"
        data-bs-toggle="modal"
        data-bs-target="#cancel-prompt"
      >
        Hủy
      </button>
      <div className="modal fade" id="cancel-prompt" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Hủy bỏ thay đổi?</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              Bạn có thực sự muốn hủy bỏ thay đổi?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Không hủy
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirm}
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const JobForm = () => {
  const formik = useFormik({
    initialValues: {
      jobName: "",
      category: "",
      address: "",
      minSalary: "",
      detail: "",
      requirement: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Input name="jobName" label="Tên công việc" type="text" formik={formik} />
      <Input name="category" label="Lĩnh vực" type="text" formik={formik} />
      <Input name="address" label="Địa điểm" type="text" formik={formik} />
      <Input
        name="minSalary"
        label="Lương khởi điểm"
        type="number"
        formik={formik}
        htmlAttr={{ min: "0" }}
      />
      <Textarea
        name="detail"
        label="Mô tả"
        formik={formik}
        htmlAttr={{ row: "3" }}
      />
      <Textarea
        name="requirement"
        label="Yêu cầu"
        formik={formik}
        htmlAttr={{ row: "3" }}
      />
      <div className="d-flex justify-content-end mt-3">
        <CancelButton />
        <button type="submit" className="btn btn-primary">
          Đăng
        </button>
      </div>
    </form>
  );
};

export default JobForm;
