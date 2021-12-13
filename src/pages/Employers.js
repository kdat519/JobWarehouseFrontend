import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { readEmployers } from "../api/employerApi";
import NavBar from "../components/navbar/NavBar";
import { fireErrorMessage } from "../components/swalErrorMessage";
import TableHeaders, {
  makeHeader,
  Row,
} from "../components/table-headers/TableHeaders";

const data = [
  {
    url: "https://uet.vnu.edu.vn/",
    imgSrc: "https://uet.vnu.edu.vn/wp-content/uploads/2017/02/logo2_new.png",
    name: "Trường Đại học Công nghệ",
    category: "Giáo dục",
    numOfEmployees: 15000,
    about:
      "Trường ĐHCN đã khẳng định được vị thế là một cơ sở đào tạo đại học " +
      "có uy tín trong hệ thống giáo dục đại học của cả nước, là địa chỉ " +
      "tin cậy, tiềm năng về đào tạo và nghiên cứu đối với đối tác, doanh " +
      "nghiệp trong và ngoài nước.",
    followed: true,
  },
  {
    url: "https://vnu.edu.vn/",
    imgSrc: "https://vnu.edu.vn/home/images/logo.png",
    name: "Đại học Quốc gia Hà Nội",
    category: "Giáo dục",
    numOfEmployees: 50000,
    about:
      "Đại học Quốc gia Hà Nội (ĐHQGHN - tên giao dịch bằng tiếng Anh: " +
      "Vietnam National University, Hanoi; viết tắt là VNU) là  trung tâm " +
      "đào tạo, nghiên cứu khoa học, chuyển giao tri thức và công nghệ đa " +
      "ngành, đa lĩnh vực, chất lượng cao; ngang tầm khu vực, dần đạt trình " +
      "độ quốc tế; đáp ứng yêu cầu phát triển của đất nước, phù hợp với xu " +
      "hướng phát triển giáo dục đại học tiên tiến.",
    followed: false,
  },
  {
    url: "https://indeed.com/",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Indeed_logo.png",
    name: "Indeed",
    category: "Công nghệ",
    numOfEmployees: 1500,
    about:
      "Chúng tôi vô cùng ngưỡng mộ nền tảng đăng và tìm kiếm việc làm Job Warehouse.",
    followed: true,
  },
];

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

const Employer = ({ imgSrc, url, name, category, numOfEmployees, about }) => (
  <Row>
    <div className="col-3 col-lg-1">
      <img src={imgSrc} className="img-thumbnail" alt="" />
    </div>
    <div className="col-9 col-lg-2">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none text-dark fw-bold"
      >
        {name}
      </a>
      <SmallInfo category={category} numOfEmployees={numOfEmployees} />
    </div>
    <div className="col-1 d-none d-lg-block">{category}</div>
    <div className="col-1 d-none d-lg-block">{numOfEmployees}</div>
    <div className="col-12 col-lg-7 mt-3 mt-lg-0">
      <p className="my-0">{about}</p>
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

const Table = () => {
  const [employers, setEmployers] = useState([]);

  const handleSearch = (search = "") => {
    readEmployers(search)
      .then((value) => {
        setEmployers(value);
      })
      .catch(fireErrorMessage);
  };

  useEffect(handleSearch, []);

  return (
    <>
      <SearchBox handleSearch={handleSearch} />
      <TableHeaders
        headers={[
          makeHeader(1, ""),
          makeHeader(2, "Nhà tuyển dụng"),
          makeHeader(1, "Lĩnh vực"),
          makeHeader(1, "Quy mô"),
          makeHeader(7, "Giới thiệu"),
        ]}
      >
        {employers.map((employer) => (
          <Employer key={employer.name} {...employer} />
        ))}
      </TableHeaders>
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
