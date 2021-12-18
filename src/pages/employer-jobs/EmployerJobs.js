import React, { useEffect, useState } from "react";
import { readJobs } from "../../api/jobApi";
import doodle from "../../assets/empty-doodle-white.svg";
import EmployerNavBar from "../../components/navbar/EmployerNavBar";
import { fireErrorMessage } from "../../components/swal-error-message";
import SearchAndSort, {
  makeOption,
  Order,
} from "../../components/table-headers/SearchAndSort";
import TableHeaders, {
  makeHeader,
} from "../../components/table-headers/TableHeaders";
import Job from "./Job";

export const Status = {
  Open: "opening",
  Close: "closed",
};

const processJobData = (data, search, orderBy, order) =>
  data
    .filter((job) =>
      search ? job.jobName.toLowerCase().includes(search.toLowerCase()) : true
    )
    .sort((a, b) => {
      const result = a[orderBy] > b[orderBy] ? 1 : -1;
      return order === Order.Asc ? result : -result;
    });

const Table = () => {
  const [jobs, setJobs] = useState([]);

  const handleSubmit = ({ search, orderBy, order }) => {
    readJobs()
      .then((data) => {
        setJobs(processJobData(data, search, orderBy, order));
      })
      .catch(fireErrorMessage);
  };

  useEffect(
    () => handleSubmit({ search: null, orderBy: "jobName", order: Order.Asc }),
    []
  );

  return (
    <>
      <SearchAndSort
        searchPlaceholder="Tên công việc"
        orderOptions={[
          makeOption("jobName", "Tên công việc"),
          makeOption("createdAt", "Ngày đăng"),
          makeOption("status", "Trạng thái"),
          makeOption("candidates", "Ứng viên"),
        ]}
        handleSubmit={handleSubmit}
      />
      {jobs.length ? (
        <TableHeaders
          headers={[
            makeHeader(2, "Tên công việc"),
            makeHeader(2, "Ngày đăng"),
            makeHeader(5, "Ứng viên"),
            makeHeader(2, "Trạng thái"),
            makeHeader(1, ""),
          ]}
        >
          {jobs.map((candidate) => (
            <Job key={candidate.id} {...candidate} />
          ))}
        </TableHeaders>
      ) : (
        <div className="row justify-content-center">
          <div className="col-12 col-md-5">
            <img src={doodle} alt="" />
            <h6 className="display-6 fs-2 text-center">
              Không có kết quả nào!
            </h6>
          </div>
        </div>
      )}
    </>
  );
};

const EmployerJobs = () => (
  <>
    <header className="mb-5">
      <EmployerNavBar />
    </header>
    <main className="container">
      <h1 className="fw-bold mb-4">Tin tuyển dụng của bạn</h1>
      <Table />
    </main>
  </>
);

export default EmployerJobs;
