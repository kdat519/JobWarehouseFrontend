import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { readJobDetail, updateJob } from "../../api/jobApi";
import JobForm from "../../components/JobForm";
import { fireErrorMessage } from "../../components/swal-error-message";

const handleSubmit = (navigate, id) => (values) =>
  updateJob(id, values)
    .then(() =>
      Swal.fire({
        icon: "success",
        title: "<h3>Đăng tin tuyển dụng thành&nbsp;công!<h3>",
        showConfirmButton: false,
        timer: 1500,
        didDestroy: navigate("/for-employers/jobs"),
      })
    )
    .catch(fireErrorMessage);

const EditJob = () => {
  let { jobId } = useParams();
  const [initialValues, setInitialValues] = useState();
  const navigate = useNavigate();
  useEffect(
    () =>
      readJobDetail(parseInt(jobId))
        .then((jobDetail) => {
          setInitialValues(jobDetail);
        })
        .catch(() => {
          fireErrorMessage();
          navigate("/for-employers/jobs");
        }),
    [jobId, navigate]
  );

  return initialValues ? (
    <JobForm
      initialValues={initialValues}
      handleSubmit={handleSubmit(navigate, jobId)}
    />
  ) : (
    <p className="placeholder-glow">
      <span className="placeholder col-7 mx-1"></span>
      <span className="placeholder col-4 mx-1"></span>
      <span className="placeholder col-4 mx-1"></span>
      <span className="placeholder col-6 mx-1"></span>
      <span className="placeholder col-8 mx-1"></span>
    </p>
  );
};

export default EditJob;
