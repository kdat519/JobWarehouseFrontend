import React from "react";
import { Link } from "react-router-dom";
import EmployerNavBar from "../../components/navbar/EmployerNavBar";
import styles from "./styles.module.scss";

const EmployerHomePage = () => (
  <div className="d-flex flex-column vh-100">
    <header>
      <EmployerNavBar />
    </header>
    <main className={`${styles["background-image"]} d-flex align-items-center`}>
      <div className="container">
        <h3 className="display-3 fw-bold text-light text-center">
          Giúp việc tuyển dụng lần tới trở nên tốt&nbsp;hơn.
        </h3>
        <p className="lead text-light text-center fs-4">
          Bạn biết bạn đang tìm kiếm ai. Chúng tôi sẽ giúp bạn tìm&nbsp;họ.
        </p>
        <div className={`mx-auto ${styles["fit-content"]}`}>
          <Link
            className="btn btn-light fw-bold text-dark btn-lg"
            to="/for-employers/post-job"
          >
            Đăng việc làm
          </Link>
        </div>
      </div>
    </main>
  </div>
);

export default EmployerHomePage;
