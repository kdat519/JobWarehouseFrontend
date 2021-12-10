import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmployerNavBar from "../../components/navbar/EmployerNavBar";
import SearchAndSort, {
  makeOption,
  Order,
} from "../../components/table-headers/SearchAndSort";
import TableHeaders, {
  makeHeader,
  Row,
} from "../../components/table-headers/TableHeaders";
import styles from "./styles.module.scss";

const Status = {
  Open: "open",
  Close: "close",
};

const data = [
  {
    id: 1,
    status: Status.Open,
    jobName: "Lập trình viên",
    createdAt: "12/12/2021",
    hired: 3,
    candidates: 4,
  },
  {
    id: 2,
    status: Status.Close,
    jobName: "Kiểm thử viên",
    createdAt: "01/12/2021",
    hired: 9,
    candidates: 8,
  },
  {
    id: 3,
    status: Status.Open,
    jobName: "Quản lý dự án",
    createdAt: "05/12/2021",
    hired: 0,
    candidates: 6,
  },
];

//#region Post
const SelectStatus = ({ status }) => (
  <div className="row align-items-center">
    <div className="col-4 col-sm-3 col-md-2 d-lg-none fw-bold">Trạng thái:</div>
    <div className="col-8 col-sm-9 col-md-10">
      <select className="form-select" defaultValue={status}>
        <option value={Status.Open}>Mở</option>
        <option value={Status.Close}>Đóng</option>
      </select>
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

const Post = ({ jobName, id, createdAt, status, candidates, hired }) => (
  <Row>
    <div className="col-12 col-lg-2">
      <div className="row my-1 my-lg-0">
        <div className="col-4 col-sm-3 col-md-2 d-lg-none fw-bold">
          Công việc:
        </div>
        <div className="col-auto">{jobName}</div>
        <div className="col-1 d-lg-none ms-auto">
          <EditButton id={id} />
        </div>
      </div>
    </div>
    <div className="col-12 col-lg-2">
      <div className="row my-1 my-lg-0">
        <div className="col-4 col-sm-3 col-md-2 d-lg-none fw-bold">
          Ngày đăng:
        </div>
        <div className="col-auto">{createdAt.toString()}</div>
      </div>
    </div>
    <CandidatesInfo id={id} candidates={candidates} hired={hired} />
    <div className="col-12 col-lg-2">
      <SelectStatus status={status} />
    </div>
    <div className="col-1 d-none d-lg-flex justify-content-center">
      <EditButton id={id} />
    </div>
  </Row>
);
//#endregion

const EmployerJobs = () => {
  const [jobs, setJobs] = useState(
    data.sort((a, b) => (a.jobName > b.jobName ? 1 : -1))
  );

  const submitHandle = ({ search, orderBy, order }) => {
    console.log(search, orderBy, order);
    setJobs(
      data
        .filter((job) =>
          search
            ? job.jobName.toLowerCase().includes(search.toLowerCase())
            : true
        )
        .sort((a, b) => {
          const result = a[orderBy] > b[orderBy] ? 1 : -1;
          return order === Order.Asc ? result : -result;
        })
    );
  };

  return (
    <>
      <header className="mb-5">
        <EmployerNavBar />
      </header>
      <main className="container">
        <h1 className="fw-bold mb-4">Tin tuyển dụng của bạn</h1>
        <SearchAndSort
          searchPlaceholder="Tên công việc"
          orderOptions={[
            makeOption("jobName", "Tên công việc"),
            makeOption("createdAt", "Ngày đăng"),
            makeOption("status", "Trạng thái"),
            makeOption("candidates", "Ứng viên"),
          ]}
          submitHandle={submitHandle}
        />
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
            <Post key={candidate.id} {...candidate} />
          ))}
        </TableHeaders>
      </main>
    </>
  );
};

export default EmployerJobs;
