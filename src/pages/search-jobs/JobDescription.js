import DOMPurify from "dompurify";
import PropTypes from "prop-types";
import { React, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ISO8601ToDate } from "../../api/jobApi";
import reportAPI from "../../api/reportAPI";
import { useAuth } from "../../components/auth/AuthProvider";
import styles from "./styles.module.scss";

JobDescription.propTypes = {
  recruitment: PropTypes.object,
  employer: PropTypes.object,
  isFollowing: PropTypes.number,
  getApplyStatus: PropTypes.string,
};

JobDescription.defaultProps = {
  recruit: {},
  employer: {},
  isFollowing: 0,
  applicationStatus: null,
  isCard: false,
};

function getId(s) {
  if (!s) {
    return 0;
  } else if (s === "pending") {
    return 1;
  } else if (s === "reviewed") {
    return 2;
  } else if (s === "hired") {
    return 3;
  } else if (s === "rejected") {
    return 4;
  }
}

function getApplyStatus(id) {
  const Status = [
    "Đăng ký xin việc",
    "Đang chờ phản hồi",
    "Vòng phỏng vấn",
    "Được nhận",
    "Từ chối",
  ];

  return Status[id];
}

function getColor(id) {
  const Color = [
    "btn-primary",
    "btn-warning",
    "btn-info",
    "btn-success",
    "btn-danger",
  ];

  return Color[id];
}

function getFill(id) {
  if (id === 0) {
    return "bi-heart";
  }
  return "bi-heart-fill ";
}

function JobDescription(props) {
  const {
    recruitment,
    employer,
    isFollowing,
    handleFollowChange,
    applicationStatus,
    handleStatusChange,
    isCard,
  } = props;
  const [showReport, setShowReport] = useState(false);
  const [value, setValue] = useState("");
  console.log(applicationStatus);
  const authContext = useAuth();
  let navigate = useNavigate();

  function handleStatus() {
    handleStatusChange(recruitment.recruitment_id, applicationStatus);
  }
  function handleFollow() {
    handleFollowChange(recruitment.recruitment_id, isFollowing);
  }

  function handleOnClickReport() {
    if (authContext.user_id) {
      setShowReport(!showReport);
    } else {
      navigate(`/login`, { replace: true });
    }
  }

  function handleChangeText(e) {
    setValue(e.target.value);
  }

  async function createReport(detail) {
    const params = { detail: detail, receiver_id: employer.employer_id };
    if (detail !== "") {
      const response = await reportAPI.createReport(params);
      if (response.success) {
        console.log("Tao report thanh cong");
      }
    }
  }

  function submitReport() {
    console.log(value);
    createReport(value);
    handleOnClickReport();
  }

  function getEmployerName() {
    if (employer.user) {
      return employer.user.name;
    }
    return "";
  }

  const getCardClass = (cardClass, noneCardClass = "") =>
    isCard ? cardClass : noneCardClass;

  if (recruitment)
    return (
      <>
        <div className={getCardClass("", "bg-light-darker py-5")}>
          <div className={getCardClass("card-body", "container")}>
            <Link
              to={`/jobs/${recruitment.recruitment_id}`}
              className={`h3 d-block text-decoration-none text-dark ${getCardClass(
                "card-title"
              )} fw-bold mb-4`}
            >
              {recruitment.job_name}
            </Link>
            <h6
              className={
                getCardClass("card-subtitle " + styles["d-none-short-screen"]) +
                " mb-2 text-muted"
              }
            >
              {recruitment.category}
            </h6>
            <p
              className={`${getCardClass(
                "card-subtitle " + styles["d-none-short-screen"]
              )} mb-2`}
            >
              Lương: {Intl.NumberFormat("vi-VN").format(recruitment.min_salary)}{" "}
              VND
            </p>
            <p
              className={`${getCardClass(
                "card-subtitle " + styles["d-none-short-screen"]
              )} mb-2`}
            >
              {recruitment.address}
            </p>
            <p className={getCardClass(styles["d-none-short-screen"])}>
              <Link
                to={"/profile/" + employer.user.user_id}
                className="text-dark"
              >
                Nhà tuyển dụng: {getEmployerName()}
              </Link>
              <br />
              Đăng ngày:{" "}
              {new Intl.DateTimeFormat("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }).format(ISO8601ToDate(recruitment.created_at))}
            </p>
            <button
              type="button"
              className={`btn ${getColor(getId(applicationStatus))} px-5 ${
                styles["font-weight-bold"]
              } mt-1`}
              onClick={handleStatus}
            >
              {getApplyStatus(getId(applicationStatus))}
            </button>
            <button
              type="button"
              className={`btn btn-${
                isFollowing ? "danger" : "secondary"
              } mt-1 ${styles["ml-1"]}`}
              onClick={handleFollow}
            >
              <i className={`bi ${getFill(isFollowing)} px-1 mt-1`}></i>
            </button>
          </div>
        </div>
        <div className="overflow-auto">
          <div className={getCardClass("card-body", "container mt-5")}>
            <h5 className="fw-bold">Thông tin chi tiết</h5>
            <div
              className="bg-light p-3 rounded"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(recruitment.detail),
              }}
            />

            <h5 className="fw-bold mt-3">Yêu cầu</h5>
            <div
              className="bg-light p-3 rounded"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(recruitment.requirement),
              }}
            />

            <hr className="mt-5" />
            <p>
              <b>
                Để biết thêm thông tin chi tiết, vui lòng liên hệ với doanh
                nghiệp theo thông tin sau:
              </b>
            </p>
            <ul>
              <li>
                <b>Số điện thoại: </b>
                {employer.user.phonenumber}
              </li>
              <li>
                <b>Địa chỉ: </b>
                {employer.user.address}
              </li>
            </ul>
            <Button
              className="btn btn-secondary mt-2 px-4 d-none"
              onClick={handleOnClickReport}
            >
              <i className="bi bi-flag-fill mr-2"></i> Báo cáo
            </Button>
            <Modal show={showReport}>
              <Modal.Header className="modal-title">
                <h5>Báo Cáo Mới</h5>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="mb-3">
                    <label for="recipient-name" className="col-form-label">
                      <b>Báo cáo: {getEmployerName()}</b>
                    </label>
                  </div>
                  <div className="mb-3">
                    <label for="message-text" className="col-form-label">
                      Report:
                    </label>
                    <textarea
                      className="form-control"
                      onChange={handleChangeText}
                    ></textarea>
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleOnClickReport}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitReport}
                >
                  Send Report
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </>
    );
  else {
    return <></>;
  }
}

export default JobDescription;
