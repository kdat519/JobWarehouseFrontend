import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Swal from "sweetalert2";
import { updateCandidateType } from "../../api/jobApi";
import doodle from "../../assets/empty-doodle-white.svg";
import { fireErrorMessage } from "../../components/swal-error-message";
import MotionCandidate from "./Candidate";
import { CandidateType, useCandidate } from "./CandidatesForJob";

export const TabHeader = ({ candidateType, title }) => {
  const { activeTab, changeActiveTab, candidateLists } = useCandidate();

  return (
    <button
      className={
        "nav-link text-dark " + (activeTab === candidateType ? "active" : "")
      }
      type="button"
      onClick={changeActiveTab(candidateType)}
    >
      {title}{" "}
      <span className="badge bg-light text-dark">
        {candidateLists[candidateType].size}
      </span>
    </button>
  );
};

const DAYS_BEFORE_HIRE_PERMIT = 7;

const changeCandidateType =
  (candidateId, setCandidates, jobId, update, create) => (type) => (event) => {
    event.preventDefault();

    if (type === CandidateType.Hired && update === null) {
      fireErrorMessage();
      return;
    }

    const updateAfterSomeTime = Math.abs(update - create) > 1000 * 60 * 10;
    const daysLeft =
      DAYS_BEFORE_HIRE_PERMIT -
      Math.floor((new Date() - update) / (1000 * 60 * 60 * 24));

    if (type === CandidateType.Hired && updateAfterSomeTime && daysLeft > 0) {
      Swal.fire({
        icon: "info",
        title: "<h3>Chưa thể tuyển dụng<h3>",
        html:
          "<p>Bạn không thể xác nhận tuyển dụng nhân viên mới ngay sau khi sửa tin tuyển dụng. " +
          "Bạn cần đợi " +
          daysLeft +
          "&nbsp;ngày&nbsp;nữa<p>",
        showConfirmButton: false,
        showCloseButton: true,
      });
      return;
    }

    updateCandidateType(parseInt(jobId), candidateId, type)
      .then((candidates) => {
        setCandidates(candidates);
      })
      .catch(fireErrorMessage);
  };

const candidates = (
  candidateLists,
  candidateType,
  setCandidates,
  jobId,
  jobUpdatedDate
) => (
  <AnimatePresence>
    {Array.from(candidateLists[candidateType].values()).map((candidate) => (
      <MotionCandidate
        key={candidate.id}
        exit={{ opacity: 0 }}
        layout="position"
        handleClick={changeCandidateType(
          candidate.id,
          setCandidates,
          jobId,
          jobUpdatedDate
        )}
        {...candidate}
      />
    ))}
  </AnimatePresence>
);

export const TabPane = ({ candidateType }) => {
  const { activeTab, candidateLists, setCandidates, jobId, jobUpdatedDate } =
    useCandidate();

  return (
    <div
      className={"tab-pane " + (activeTab === candidateType ? "active" : "")}
    >
      <AnimatePresence exitBeforeEnter>
        {Array.from(candidateLists[candidateType].values()).length ? (
          <motion.div
            key="candidates"
            exit={{ opacity: 0 }}
            className="d-flex flex-wrap"
          >
            {candidates(
              candidateLists,
              candidateType,
              setCandidates,
              jobId,
              jobUpdatedDate
            )}
          </motion.div>
        ) : (
          <motion.div key="empty" className="row justify-content-center">
            <div className="col-12 col-md-5">
              <img src={doodle} alt="" />
              <h6 className="display-6 fs-2 text-center">
                Không có kết quả nào!
              </h6>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
