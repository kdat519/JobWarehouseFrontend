import React from "react";
import NavBar from "../../components/navbar/NavBar";

const data = [
  {
    url: "https://uet.vnu.edu.vn/",
    imgSrc: "https://uet.vnu.edu.vn/wp-content/uploads/2017/02/logo2_new.png",
    name: "Trường Đại học Công nghệ",
    about:
      "Trường ĐHCN đã khẳng định được vị thế là một cơ sở đào tạo đại học " +
      "có uy tín trong hệ thống giáo dục đại học của cả nước, là địa chỉ " +
      "tin cậy, tiềm năng về đào tạo và nghiên cứu đối với đối tác, doanh " +
      "nghiệp trong và ngoài nước.",
  },
  {
    url: "https://vnu.edu.vn/",
    imgSrc: "https://vnu.edu.vn/home/images/logo.png",
    name: "Đại học Quốc gia Hà Nội",
    about:
      "Đại học Quốc gia Hà Nội (ĐHQGHN - tên giao dịch bằng tiếng Anh: " +
      "Vietnam National University, Hanoi; viết tắt là VNU) là  trung tâm " +
      "đào tạo, nghiên cứu khoa học, chuyển giao tri thức và công nghệ đa " +
      "ngành, đa lĩnh vực, chất lượng cao; ngang tầm khu vực, dần đạt trình " +
      "độ quốc tế; đáp ứng yêu cầu phát triển của đất nước, phù hợp với xu " +
      "hướng phát triển giáo dục đại học tiên tiến.",
  },
  {
    url: "https://indeed.com/",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Indeed_logo.png",
    name: "Indeed",
    about:
      "Chúng tôi vô cùng ngưỡng mộ nền tảng đăng và tìm kiếm việc làm Job Warehouse.",
  },
];

const Employer = (props) => (
  <div>
    <div className="row gy-0 align-items-center">
      <div className="col-3 col-md-1">
        <img src={props.imgSrc} className="img-thumbnail" alt=""></img>
      </div>
      <div className="col-9 col-md-3">
        <a
          href={props.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none text-dark fw-bold"
        >
          {props.name}
        </a>
      </div>
      <div className="w-100 d-md-none my-1"></div>
      <div className="col-12 col-md-8">
        <p className="my-0">{props.about}</p>
      </div>
    </div>
    <hr className="my-3" />
  </div>
);

const EmployersTable = () => {
  const rows = data.map((employer) => (
    <Employer key={employer.name} {...employer} />
  ));

  return (
    <div>
      <div className="row gy-0 d-none d-md-flex border-bottom border-2 border-dark pb-2 mb-3">
        <div className="col-1"></div>
        <div className="col-3 fw-bold fs-5">Nhà tuyển dụng</div>
        <div className="col-8 fw-bold fs-5">Giới thiệu</div>
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
      <EmployersTable />
    </main>
  </>
);

export default Employers;
