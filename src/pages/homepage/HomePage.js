import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import styles from "./styles.module.scss";

const HomePage = () => (
  <div className="d-flex flex-column vh-100">
    <header>
      <NavBar />
    </header>
    <main className={`${styles["background-image"]} d-flex align-items-center`}>
      <div className="container">
        <h3 className="display-3 fw-bold text-dark text-center">
          Tăng&nbsp;tốc&nbsp;- Bứt&nbsp;phá&nbsp;- Làm&nbsp;chủ tương&nbsp;lai
        </h3>
        <p className="lead text-dark text-center fs-4">
          Bạn muốn tìm kiếm công việc phù hợp với bản thân mình. Chúng tôi sẽ
          giúp bạn!
        </p>
        <div className={`mx-auto ${styles["fit-content"]}`}>
          <Link
            className="btn btn-primary fw-bold text-light btn-lg"
            to="/jobs"
          >
            Tìm việc làm
          </Link>
        </div>
      </div>
    </main>
  </div>
);

export default HomePage;
