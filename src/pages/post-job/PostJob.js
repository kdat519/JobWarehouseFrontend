import React from "react";
import JobForm from "../../components/job-form/JobForm";
import EmployerNavBar from "../../components/navbar/EmployerNavBar";

const PostJob = () => (
  <>
    <header className="mb-5">
      <EmployerNavBar />
    </header>
    <main className="container mb-5">
      <h1 className="fw-bold pb-3 mb-4">Đăng tin tuyển dụng</h1>
      <div className="row">
        <div className="col-12 col-lg-9">
          <JobForm />
        </div>
        <div className="d-none d-lg-block col-3">
          <div className="card border-success mb-3">
            <div className="card-body text-success">
              <h5 className="card-title">
                <i className="bi bi-lightbulb" /> Mẹo tuyển dụng hiệu quả
              </h5>
              <p className="card-text">
                Sử dụng chức danh công việc được biết đến rộng rãi. Cung cấp
                thông tin về văn hóa công ty, luôn nêu bật lợi ích của ứng viên.
                Có những thông tin cần thiết: địa điểm, mức lương, yêu cầu công
                việc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </>
);

export default PostJob;
