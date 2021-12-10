import React from "react";
import JobForm from "../../components/JobForm";

const initialValues = {
  jobName: "Lập trình viên JavaScript",
  category: "Công nghệ thông tin",
  address: "Hà Nội",
  minSalary: "50000000",
  detail: "Làm giao diện web Job-warehouse.",
  requirement: "Thành thạo ReactJS",
};

const EditJob = () => {
  return <JobForm initialValues={initialValues} />;
};

export default EditJob;
