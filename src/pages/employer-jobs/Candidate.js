import { motion } from "framer-motion";
import React from "react";
import { CandidateType } from "./CandidatesForJob";
import styles from "./styles.module.scss";

const ButtonGroup = ({ handleClick, type }) => (
  <div className="btn-group">
    <button
      type="button"
      className={`btn btn-success ${styles["accept"]}`}
      onClick={handleClick(CandidateType.Hired)}
    >
      <i className="bi bi-check" />
    </button>
    <button
      type="button"
      className={`btn btn-danger ${styles["reject"]}`}
      onClick={handleClick(CandidateType.Rejected)}
    >
      <i className="bi bi-x" />
    </button>
    {type === CandidateType.AwaitReview ? (
      <button
        type="button"
        className={`btn btn-secondary ${styles["mark-as-read"]}`}
        onClick={handleClick(CandidateType.Reviewed)}
      >
        <i className="bi bi-file-earmark-check" />
      </button>
    ) : null}
  </div>
);

const Candidate = React.forwardRef((props, ref) => (
  <div ref={ref} className={`p-1 ${styles["card-container"]}`}>
    <div className="card">
      <div
        className={`card-img-top bg-secondary ${styles["card-top-height"]}`}
      />
      <div className="card-body">
        <img
          src={props.imgSrc}
          className={`rounded-circle mb-3 ${styles["negative-margin"]}`}
          alt="Candidate"
        />
        <h5 className="card-title">{props.name}</h5>
        <div className={`${styles["card-content-container"]}`}>
          <p className={`card-text ${styles["line-clamp"]}`}>
            {props.qualification}
          </p>
        </div>
        {props.type === CandidateType.AwaitReview ||
        props.type === CandidateType.Reviewed ? (
          <ButtonGroup type={props.type} handleClick={props.handleClick} />
        ) : null}
      </div>
    </div>
  </div>
));

const MotionCandidate = motion(Candidate);

export default MotionCandidate;
