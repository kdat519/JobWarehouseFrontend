import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

JobDescription.propTypes = {
  recruitment: PropTypes.object,
  emloyer: PropTypes.object,
  isFollowing: PropTypes.number,
  getApplyStatus: PropTypes.string
};

JobDescription.defaultProps = {
  recruit: {},
  emloyer: {},
  isFollowing: 0,
  applicationStatus: null,
};

function getId(s) {
  if (!s) {
    return 0;
  } else if (s === 'pending') {
    return 1;
  } else if (s === 'reviewed') {
    return 2;
  } else if (s === 'hired') {
    return 3;
  } else if (s === 'rejected') {
    return 4;
  }
}

function getApplyStatus(id) {
  const Status = ['Đăng ký xin việc', 'Đang chờ phản hồi', 'Vòng phỏng vấn', 'Được nhận', 'Từ chối'];

  return Status[id];
}

function getColor(id) {
  const Color = ['btn-primary', 'btn-warning', 'btn-info', 'btn-success', 'btn-danger'];

  return Color[id];
}

function getFill(id) {
  if (id === 0) {
    return 'bi-heart';
  }

  return 'bi-heart-fill';
}

function JobDescription(props) {
  const { recruitment, emloyer, isFollowing, handleFollowChange, applicationStatus, handleStatusChange } = props;

  function handleStatus() {
    handleStatusChange(recruitment.recruitment_id, applicationStatus);
  }

  function handleFollow() {
    handleFollowChange(recruitment.recruitment_id, isFollowing);
  }
  if (recruitment)
    return (
      <div className={`col-12 col-lg-5 mt-5 ${styles["position-sticky"]}`}>
        <div
          className={`shadow border-bottom-0 border-secondary card px-2 pt-4 pb-2 bg-white ${styles["border-radius-top"]}`}
        >
          <div className="card-body">
            <h5 className={`card-title ${styles["font-weight-bold"]} mb-4`}>
              {recruitment.job_name}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {recruitment.category}
            </h6>
            <p className={`card-subtitle mb-2 `}>{recruitment.address}</p>
            <button
              type="button"
              className={`btn ${getColor(getId(applicationStatus))} px-5 ${styles["font-weight-bold"]} mt-1`}
              onClick={handleStatus}
            >
              {getApplyStatus(getId(applicationStatus))}
            </button>
            <button
              type="button"
              className={`btn btn-secondary mt-1 ${styles["ml-1"]}`}
              onClick={handleFollow}
            >
              <i
                className={`bi ${getFill(isFollowing)} ${styles["font-size-25"]} px-1 mt-1`}
              ></i>
            </button>
          </div>
        </div>
        <div
          className={`shadow border-top-0 border-secondary card bg-white px-2 pb-5 ${styles["border-radius-bot"]} overflow-auto ${styles["h-25"]}`}
        >
          <div className="card-body">
            <p>
              <b>
                Thông tin chi tiết
              </b>
            </p>
            <p>
              {recruitment.detail}
            </p>

            <p><b>Yêu Cầu</b></p>
            <p>{recruitment.requirement}</p>


            <p><b>
              Để biết thêm thông tin chi tiết, vui lòng liên hệ với doanh nghiệp theo thông tin sau:
            </b></p>
            <ul>
              <li>
                <p>
                  <b>About us: </b>
                  {emloyer.about_us}
                </p>
              </li>
              <li>
                <p>
                  <b>Xếp hạng: </b>
                  {emloyer.category}
                </p>
              </li>
            </ul>
            <p>
              <b>
                Để đăng ký phỏng vấn, vui lòng nhấn nút đăng ký ở phía trên
              </b>
            </p>
            <p>Nord Anglia Education</p>
            <p>Đăng ngày: {recruitment.created_at}</p>
          </div>
        </div>
      </div>
    );
  else {
    return (
      <></>
    )
  }
};

export default JobDescription;