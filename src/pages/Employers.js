import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { readEmployers } from "../api/employerApi";
import doodle from "../assets/empty-doodle.svg";
import NavBar from "../components/navbar/NavBar";
import { fireErrorMessage } from "../components/swal-error-message";
import TableHeaders, {
  makeHeader,
  Row,
} from "../components/table-headers/TableHeaders";

const SmallInfo = ({ category, numOfEmployees }) => (
  <div className="row d-lg-none align-items-center">
    <div className="col">
      <div className="text-secondary fw-bold">Lĩnh vực</div>
      <div>{category}</div>
    </div>
    <div className="col">
      <div className="text-secondary fw-bold">Quy mô</div>
      <div>{numOfEmployees}</div>
    </div>
  </div>
);

const Employer = ({
  imgSrc,
  userId,
  name,
  category,
  numOfEmployees,
  about,
}) => (
  <Row>
    <div className="col-3 col-lg-1">
      <img src={imgSrc} height="75px" className="img-thumbnail" alt="" />
    </div>
    <div className="col-9 col-lg-2">
      <Link
        to={"/profile/" + userId}
        className="text-decoration-none text-dark fw-bold"
      >
        {name}
      </Link>
      <SmallInfo category={category} numOfEmployees={numOfEmployees} />
    </div>
    <div className="col-1 d-none d-lg-block">{category}</div>
    <div className="col-1 d-none d-lg-block">{numOfEmployees}</div>
    <div className="col-12 col-lg-7 mt-3 mt-lg-0">
      <p className="my-0 line-clamp">{about}</p>
    </div>
  </Row>
);

const SearchBox = ({ handleSearch }) => (
  <Formik
    initialValues={{ search: "" }}
    onSubmit={(values) => {
      handleSearch(values.search);
    }}
  >
    <Form className="input-group mb-5">
      <Field
        type="text"
        name="search"
        className="form-control"
        placeholder="Tên nhà tuyển dụng, Lĩnh vực"
      />
      <button className="btn btn-outline-secondary" type="submit">
        Tìm kiếm
      </button>
    </Form>
  </Formik>
);

const Pagination = ({ current, last, handleChange }) => (
  <nav>
    <ul className="pagination justify-content-center">
      {Array.from(Array(last), (_, i) => {
        const page = i + 1;
        let result = (
          <li
            key={page}
            className={"page-item " + (current === page ? "active" : "")}
          >
            <button className="page-link" onClick={handleChange(page)}>
              {page}
            </button>
          </li>
        );
        if (page > 1 && page < last) {
          if (page === current + 2 || page === current - 2)
            result = (
              <li key={page} className="page-item disabled">
                <button className="page-link">...</button>
              </li>
            );
          if (page < current - 2 || page > current + 2) result = null;
        }
        return result;
      })}
    </ul>
  </nav>
);

const Table = () => {
  const [state, setState] = useState({
    search: "",
    employers: [],
    currentPage: 1,
    lastPage: 1,
  });

  const handleSearch = (search = "", page = 1) => {
    readEmployers(search, page)
      .then((value) => {
        setState({
          search: search,
          employers: value.employers,
          currentPage: value.currentPage,
          lastPage: value.lastPage,
        });
      })
      .catch(fireErrorMessage);
  };

  useEffect(handleSearch, []);

  return (
    <>
      <SearchBox handleSearch={handleSearch} />
      {state.employers.length ? (
        <TableHeaders
          headers={[
            makeHeader(1, ""),
            makeHeader(2, "Nhà tuyển dụng"),
            makeHeader(1, "Lĩnh vực"),
            makeHeader(1, "Quy mô"),
            makeHeader(7, "Giới thiệu"),
          ]}
        >
          {state.employers.map((employer) => (
            <Employer key={employer.userId} {...employer} />
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
      {state.lastPage > 1 && (
        <Pagination
          current={state.currentPage}
          last={state.lastPage}
          handleChange={(page) => (event) => {
            event.preventDefault();
            handleSearch(state.search, page);
          }}
        />
      )}
    </>
  );
};

const Employers = () => (
  <>
    <header className="mb-5">
      <NavBar />
    </header>
    <main className="container">
      <h6 className="display-6">Tìm những nhà tuyển dụng tốt nhất</h6>
      <Table />
    </main>
  </>
);

export default Employers;
