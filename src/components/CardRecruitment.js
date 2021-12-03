import React from "react";
import styles from './cardRecruitment.module.scss';

const CardRecruit = () => {
  return (
    <>
      <div className={`card mt-3 pt-2 pb-2 ${styles["w-30"]}`}>
        <div className={`dropdown ${styles["dd"]}`}>
          <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          </button>
          <div className={`dropdown-menu ${styles["w-13"]}`} aria-labelledby="dropdownMenuButton">
            <div className={`${styles["ptb-05"]} ${styles["pl-06"]}`}>
              <i className={`bi bi-heart ${styles["ml-05"]}`} ></i>
              <a className={`dropdown-item ${styles["pl-05"]} ${styles["inline"]}`} href="#">Save job</a>
            </div>
            <div className={`${styles["ptb-05"]} ${styles["pl-06"]}`}>
              <i className={`bi bi-slash-circle ${styles["ml-05"]}`} ></i>
              <a className={`dropdown-item ${styles["pl-05"]} ${styles["inline"]}`} href="#">Not interested</a>
            </div>
            <div className={`${styles["ptb-05"]} ${styles["pl-06"]}`}>
              <i className={`bi bi-flag-fill ${styles["ml-05"]}`}></i>
              <a className={`dropdown-item ${styles["pl-05"]} ${styles["inline"]}`} href="#">Report job</a>
            </div>
          </div>
        </div>

        <div className="card-body">
          <h5 className={`card-title ${styles["font-weight-bold"]}`}>Primary Phase Leader</h5>
          <h6 className="card-subtitle mb-2 text-muted">Nord Anglia Education</h6>
          <h6 className="card-subtitle mb-2 text-muted">Hà Nội</h6>
          <i className={`bi bi-hourglass-top ${styles["icon-purple"]} ${styles["inline"]}`}></i>
          <p className={`card-text ${styles["size-085"]} ${styles["inline-block"]} ${styles["ml-03"]}`}>Be an early applicant</p>
          <li className={`card-text ${styles["size-08"]} text-muted ${styles["list-circle"]}`}>They build excellent relationships with staff and understand the importance of a high performing team.</li>
          <li className={`card-text ${styles["size-08"]} text-muted ${styles["list-circle"]}`}>Being an outstanding role model in the classroom means they can provide support and challenge to…</li>
        </div>
      </div>
    </>
  )
}

export default CardRecruit;