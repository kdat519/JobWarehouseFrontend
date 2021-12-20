import React from "react";
import NavBar from "../../components/navbar/NavBar";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="d-flex flex-column vh-100">
    <header>
      <NavBar />
    </header>
    <main className={`${styles["background-image"]} d-flex align-items-center`}>
      <div className="container">
        <h3 className="display-3 fw-bold text-light text-center">
          Tăng tốc – Bứt phá&nbsp; - Làm chủ tương lai
        </h3>
        <p className="lead text-light text-center">
          Bạn muốn tìm kiếm công việc phù hợp với bản thân mình. Chúng tôi sẽ giúp bạn!!!
        </p>
        <div className={`mx-auto ${styles["fit-content"]}`}>
          <Link
            className="btn btn-light fw-bold text-dark btn-lg"
            to="/recruitments"
          >
            Tìm việc làm
          </Link>
        </div>
      </div>
    </main>
  </div>
);

export default HomePage;
