import { Form, Formik, useField } from "formik";
import { useNavigate } from "react-router";

const useInputProps = (name, type, className) => {
  const [field, meta] = useField(name);

  const validationClassName = () => {
    return meta.touched && meta.error ? "is-invalid" : "";
  };

  return {
    id: name,
    name: name,
    type: type,
    className: className + " form-control " + validationClassName(name),
    onChange: field.onChange,
    onBlur: field.onBlur,
    value: field.value,
  };
};

const Input = (props) => {
  const [, meta] = useField(props.name);
  return (
    <div className="row mb-2">
      <label
        htmlFor={props.name}
        className="form-label col-12 col-md-3 col-xl-2 col-form-label pe-0"
      >
        {props.label}
      </label>
      <div className="col-12 col-md-9 col-xl-10">
        <input
          {...useInputProps(props.name, props.type, props.className)}
          {...props.htmlAttr}
        />
        <div className="invalid-feedback">{meta.error}</div>
      </div>
    </div>
  );
};

const Textarea = (props) => {
  const [, meta] = useField(props.name);
  return (
    <div className="row mb-2">
      <div className="col">
        <label htmlFor={props.name} className="form-label">
          {props.label}
        </label>
        <textarea {...useInputProps(props.name)} {...props.htmlAttr} />
        <div className="invalid-feedback">{meta.error}</div>
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

const JobForm = (props) => {
  const initialValues = props.initialValues || {
    jobName: "",
    category: "",
    address: "",
    minSalary: "",
    detail: "",
    requirement: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values) => {
        alert(JSON.stringify(values));
      }}
    >
      <Form noValidate>
        <Input name="jobName" label="Tên công việc" type="text" />
        <Input name="category" label="Lĩnh vực" type="text" />
        <Input name="address" label="Địa điểm" type="text" />
        <Input
          name="minSalary"
          label="Lương khởi điểm"
          type="number"
          htmlAttr={{ min: 0 }}
        />
        <Textarea name="detail" label="Mô tả" htmlAttr={{ rows: 4 }} />
        <Textarea name="requirement" label="Yêu cầu" htmlAttr={{ rows: 4 }} />
        <div className="d-flex justify-content-end mt-3">
          <CancelButton />
          <button type="submit" className="btn btn-primary">
            {props.initialValues ? "Lưu" : "Đăng"}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default JobForm;
