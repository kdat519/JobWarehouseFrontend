import React from "react";
import JobForm from "./JobForm";

const initValues = {
  jobName: "Lập trình viên JavaScript",
  category: "Công nghệ thông tin",
  address: "Hà Nội",
  minSalary: "50000000",
  detail: "Làm giao diện web Job-warehouse.",
  requirement: "Thành thạo ReactJS",
};

const JobFormEdit = () => {
  const initialValues = initValues;
  return <JobForm initialValues={initialValues} />;
};

export default JobFormEdit;
