import React from "react";
import styles from './cardRecruitment.module.scss';
import PropTypes from "prop-types";

CardRecruit.propTypes = {
  recruit: PropTypes.object,
  onClick: PropTypes.func
};

CardRecruit.defaultProps = {
  recruit: [],
  onClick: null,
};

function CardRecruit(props) {
  const { recruit, onClick } = props;
  const { recruitment } = recruit;
  function onclick() {
    if (onClick) {
      onClick(recruit);
    }
  }

  return (
    <>
      <div className={`shadow-sm px-3 py-2 mb-4 border card ${styles["w-30"]} ${styles["hover"]}`} onClick={onclick} >

        <div className="card-body">
          <h5 className={`card-title ${styles["font-weight-bold"]}`}>{recruitment.job_name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{recruitment.category}</h6>
          <p className={`card-subtitle mb-2 `}>{recruitment.address}</p>
          <i className={`bi bi-hourglass-top ${styles["icon-purple"]} ${styles["inline"]}`}></i>
          <p className={`card-text ${styles["size-085"]} ${styles["inline-block"]} ${styles["ml-03"]}`}>Be an early applicant</p>
          <li className={`card-text ${styles["size-08"]} text-muted ${styles["list-circle"]}`}>{recruitment.detail}</li>
          <li className={`card-text ${styles["size-08"]} ${styles["list-circle"]} text-primary`}>Lương: {recruitment.min_salary} VND</li>
        </div>
      </div>
    </>
  )
}

export default CardRecruit;