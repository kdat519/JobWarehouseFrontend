import { Form, Formik, useField, useFormikContext } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateJobStatus } from "../../api/jobApi";
import { fireErrorMessage } from "../../components/swal-error-message";
import { Row } from "../../components/table-headers/TableHeaders";
import { Status } from "./EmployerJobs";
import styles from "./styles.module.scss";

const FormikSelect = ({ name }) => {
  const [field] = useField(name);
  const { submitForm, setFieldValue } = useFormikContext();
  const handleChange = (event) => {
    const previousValue = field.value;
    field.onChange(event);
    submitForm().catch(() => setFieldValue(name, previousValue));
  };
  return (
    <select className="form-select" {...field} onChange={handleChange}>
      <option value={Status.Open}>Mở</option>
      <option value={Status.Close}>Đóng</option>
    </select>
  );
};

const SelectStatus = ({ id, status }) => (
  <div className="row align-items-center">
    <div className="col-4 col-sm-3 col-md-2 d-lg-none fw-bold">Trạng thái:</div>
    <div className="col-8 col-sm-9 col-md-10">
      <Formik
        initialValues={{ status: status }}
        onSubmit={(values) =>
          updateJobStatus(id, values.status).catch(async () => {
            await fireErrorMessage();
            return Promise.reject();
          })
        }
      >
        <Form>
          <FormikSelect name="status" />
        </Form>
      </Formik>
    </div>
  </div>
);

const EditButton = ({ id }) => (
  <Link
    className="text-decoration-none text-dark fw-bold"
    to={`/for-employers/post-job/${id}`}
  >
    <i className="bi bi-pencil-square" />
  </Link>
);

const CandidatesInfo = ({ id, candidates, hired }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`col-12 col-lg-5 ${styles["clickable"]}`}
      onClick={() => navigate(`${id}`)}
    >
      <div className="row my-1 my-lg-0">
        <div className="col-4 col-sm-3 col-md-2 d-lg-none fw-bold">
          Ứng viên:
        </div>
        <div className="col-auto">
          <strong>{candidates}</strong> Ứng tuyển
        </div>
        <div className="col-auto">
          <strong>{hired}</strong> Đã tuyển
        </div>
      </div>
    </div>
  );
};

const Job = ({ jobName, id, createdAt, status, candidates, hired }) => (
  <Row>
    <div className="col-12 col-lg-2">
      <div className="row my-1 my-lg-0">
        <div className="col-4 col-sm-3 col-md-2 d-lg-none fw-bold">
          Công việc:
        </div>
        <div className="col-7 col-sm-auto text-truncate">{jobName}</div>
        <div className="col-1 d-lg-none ms-auto p-0">
          <EditButton id={id} />
        </div>
      </div>
    </div>
    <div className="col-12 col-lg-2">
      <div className="row my-1 my-lg-0">
        <div className="col-4 col-sm-3 col-md-2 d-lg-none fw-bold">
          Ngày đăng:
        </div>
        <div className="col-auto">
          {new Intl.DateTimeFormat("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(createdAt)}
        </div>
      </div>
    </div>
    <CandidatesInfo id={id} candidates={candidates} hired={hired} />
    <div className="col-12 col-lg-2">
      <SelectStatus id={id} status={status} />
    </div>
    <div className="col-1 d-none d-lg-flex justify-content-center">
      <EditButton id={id} />
    </div>
  </Row>
);

export default Job;
