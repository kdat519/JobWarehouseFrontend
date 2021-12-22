import React from "react";
import styles from "./cardRecruitment.module.scss";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";

CardRecruit.propTypes = {
  recruit: PropTypes.object,
  onClick: PropTypes.func,
};

CardRecruit.defaultProps = {
  recruit: [],
  onClick: null,
};

const getParagraph = (html) => /(?<=<p>).*?(?=<\/p>)/.exec(html)?.at(0);

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
      <div
        className={`shadow-sm w-100 px-3 py-2 mb-4 border card ${styles["hover"]}`}
        onClick={onclick}
      >
        <div className="card-body">
          <h5 className={`card-title ${styles["font-weight-bold"]}`}>
            {recruitment.job_name}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {recruitment.category}
          </h6>
          <p className={`card-subtitle mb-2 `}>{recruitment.address}</p>
          <i
            className={`bi bi-hourglass-top ${styles["icon-purple"]} ${styles["inline"]}`}
          ></i>
          <p
            className={`card-text ${styles["size-085"]} ${styles["inline-block"]} ${styles["ml-03"]}`}
          >
            Be an early applicant
          </p>
          {(() => {
            const content = getParagraph(
              DOMPurify.sanitize(recruitment.detail)
            );
            console.log(content);
            return (
              content && (
                <li
                  className={`card-text ${styles["size-08"]} text-muted ${styles["list-circle"]}`}
                >
                  {content}
                </li>
              )
            );
          })()}
          <li
            className={`card-text ${styles["size-08"]} ${styles["list-circle"]} text-primary`}
          >
            Lương: {recruitment.min_salary} VND
          </li>
        </div>
      </div>
    </>
  );
}

export default CardRecruit;
