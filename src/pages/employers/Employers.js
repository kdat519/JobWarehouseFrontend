import React from "react";
import NavBar from "../../components/navbar/NavBar";

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

const Employer = (props) => {
  const activeClass = props.followed ? "active" : "";
  const FollowText = () =>
    props.followed ? <>Đã&nbsp;theo&nbsp;dõi</> : <>Theo&nbsp;dõi</>;

  const SmallInfo = () => (
    <div className="row d-lg-none align-items-center">
      <div className="col">
        <div className="text-secondary fw-bold">Lĩnh vực</div>
        <div>Internet</div>
      </div>
      <div className="col">
        <div className="text-secondary fw-bold">Quy mô</div>
        <div>15000</div>
      </div>
      <div className="col">
        <button
          className={"btn btn-outline-primary px-2 " + activeClass}
          type="button"
        >
          <i class="bi bi-bookmark"></i>
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="row gy-0 align-items-center">
        <div className="col-3 col-lg-1">
          <img src={props.imgSrc} className="img-thumbnail" alt=""></img>
        </div>
        <div className="col-9 col-lg-2">
          <a
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none text-dark fw-bold"
          >
            {props.name}
          </a>
          <SmallInfo />
        </div>
        <div className="col-1 d-none d-lg-block">{props.category}</div>
        <div className="col-1 d-none d-lg-block">{props.numOfEmployees}</div>
        <div className="col-12 col-lg-6 mt-3 mt-lg-0">
          <p className="my-0">{props.about}</p>
        </div>
        <div className="col-1 d-none d-lg-block px-0">
          <button
            className={"btn btn-outline-primary px-1 " + activeClass}
            type="button"
            style={{ width: "6.1em" }}
          >
            <FollowText />
          </button>
        </div>
      </div>
      <hr className="my-3" />
    </div>
  );
};

const EmployerTable = () => {
  const rows = data.map((employer) => (
    <Employer key={employer.name} {...employer} />
  ));

  return (
    <div>
      <div className="row gy-0 d-none d-lg-flex border-bottom border-2 border-dark pb-2 mb-3">
        <div className="col-1"></div>
        <div className="col-2 fw-bold fs-5">Nhà tuyển dụng</div>
        <div className="col-1 fw-bold fs-5">Lĩnh vực</div>
        <div className="col-1 fw-bold fs-5">Quy mô</div>
        <div className="col-6 fw-bold fs-5">Giới thiệu</div>
        <div className="col-1"></div>
      </div>
      {rows}
    </div>
  );
};

const Employers = () => (
  <>
    <header className="mb-5">
      <NavBar />
    </header>
    <main className="container">
      <h1 className="fw-bold">Tìm những nhà tuyển dụng tốt nhất</h1>
      <form className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Tên nhà tuyển dụng"
        />
        <button className="btn btn-outline-secondary" type="submit">
          Tìm kiếm
        </button>
      </form>
      <EmployerTable />
    </main>
  </>
);

export default Employers;
