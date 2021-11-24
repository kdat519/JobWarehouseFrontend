import React from "react";
import { Link, useNavigate } from "react-router-dom";
import EmployerNavBar from "../../components/navbar/EmployerNavBar";
import TableHeaders, { makeHeader, Row } from "../../components/TableHeaders";
import styles from "./styles.module.scss";

const data = [
  {
    id: 1,
    status: "open",
    jobName: "Lập trình viên",
    createdAt: "12/12/2021",
    hired: 3,
    awaitReview: 4,
  },
];

const Post = (props) => {
  const navigate = useNavigate();

  const SelectStatus = () => (
    <div className="row align-items-center">
      <div className="col-4 col-sm-3 col-md-2 d-lg-none fw-bold">
        Trạng thái:
      </div>
      <div className="col-8 col-sm-9 col-md-10">
        <select className="form-select" defaultValue={props.status}>
          <option value="open">Mở</option>
          <option value="close">Đóng</option>
        </select>
      </div>
    </div>
  );

  console.log(props.id, props.id.toString());
  const EditButton = () => (
    <Link
      className="text-decoration-none text-dark fw-bold"
      to={`${props.id}/edit`}
    >
      <i className="bi bi-pencil-square"></i>
    </Link>
  );

  return (
    <Row>
      <div className="col-12 col-lg-2">
        <div className="row my-1 my-lg-0">
          <div className="col-4 col-sm-3 col-md-2 d-lg-none fw-bold">
            Công việc:
          </div>
          <div className="col-auto">{props.jobName}</div>
          <div className="col-1 d-lg-none ms-auto">
            <EditButton />
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-2">
        <div className="row my-1 my-lg-0">
          <div className="col-4 col-sm-3 col-md-2 d-lg-none fw-bold">
            Ngày đăng:
          </div>
          <div className="col-auto">{props.createdAt}</div>
        </div>
      </div>
      <div
        className={`col-12 col-lg-5 ${styles["clickable"]}`}
        onClick={() => navigate(`${props.id}`)}
      >
        <div className="row my-1 my-lg-0">
          <div className="col-4 col-sm-3 col-md-2 d-lg-none fw-bold">
            Ứng viên:
          </div>
          <div className="col-auto">
            <strong>{props.awaitReview}</strong> Ứng tuyển
          </div>
          <div className="col-auto">
            <strong>{props.hired}</strong> Đã tuyển
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-2">
        <SelectStatus />
      </div>
      <div className="col-1 d-none d-lg-flex justify-content-center">
        <EditButton />
      </div>
    </Row>
  );
};

const SearchAndSort = () => (
  <div className="row mb-4">
    <div className="col-12 col-xl-4 me-auto mb-3 mb-xl-0">
      <form className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Tên công việc"
        />
        <button className="btn btn-outline-secondary" type="submit">
          Tìm kiếm
        </button>
      </form>
    </div>
    <div className="col-12 col-md-6 col-xl-3">
      <div className="input-group">
        <label
          className={`input-group-text ${styles["same-width"]}`}
          htmlFor="order-by"
        >
          Sắp xếp theo
        </label>
        <select className="form-select" id="order-by" defaultValue="jobName">
          <option value="jobName">Tên công việc</option>
          <option value="createdAt">Ngày đăng</option>
          <option value="status">Trạng thái</option>
          <option value="candidates">Ứng viên</option>
        </select>
      </div>
    </div>
    <div className="col-12 col-md-6 col-xl-2">
      <div className="input-group">
        <label
          className={`input-group-text ${styles["same-width"]}`}
          htmlFor="order"
        >
          Thứ tự
        </label>
        <select className="form-select" id="sort-by" defaultValue="asc">
          <option value="asc">Tăng</option>
          <option value="desc">Giảm</option>
        </select>
      </div>
    </div>
  </div>
);

const EmployerDashboard = () => (
  <>
    <header className="mb-5">
      <EmployerNavBar />
    </header>
    <main className="container">
      <h1 className="fw-bold mb-4">Tin tuyển dụng của bạn</h1>
      <SearchAndSort />
      <TableHeaders
        headers={[
          makeHeader(2, "Tên công việc"),
          makeHeader(2, "Ngày đăng"),
          makeHeader(5, "Ứng viên"),
          makeHeader(2, "Trạng thái"),
          makeHeader(1, ""),
        ]}
      >
        {data.map((candidate) => (
          <Post key={candidate.id} {...candidate} />
        ))}
      </TableHeaders>
    </main>
  </>
);

export default EmployerDashboard;
