import React from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { createJob } from "../../api/jobApi";
import JobForm from "../../components/JobForm";
import { fireErrorMessage } from "../../components/swal-error-message";

const handleSubmit = (navigate) => (values) =>
  createJob(values)
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

const PostJob = () => {
  const navigate = useNavigate();
  return <JobForm handleSubmit={handleSubmit(navigate)} />;
};

export default PostJob;
