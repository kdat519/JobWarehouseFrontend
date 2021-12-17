import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";
import { updateCandidateType } from "../../api/jobApi";
import doodle from "../../assets/empty-doodle-white.svg";
import { fireErrorMessage } from "../../components/swalErrorMessage";
import MotionCandidate from "./Candidate";
import { CandidateContext } from "./CandidatesForJob";

export const TabHeader = ({ candidateType, title }) => {
  const { activeTab, changeActiveTab, candidateLists } =
    useContext(CandidateContext);

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

const changeCandidateType =
  (candidateId, setCandidates, jobId) => (type) => (event) => {
    event.preventDefault();
    updateCandidateType(parseInt(jobId), candidateId, type)
      .then((candidates) => {
        setCandidates(candidates);
      })
      .catch(fireErrorMessage);
  };

const candidates = (candidateLists, candidateType, setCandidates, jobId) => (
  <AnimatePresence>
    {Array.from(candidateLists[candidateType].values()).map((candidate) => (
      <MotionCandidate
        key={candidate.id}
        exit={{ opacity: 0 }}
        layout="position"
        handleClick={changeCandidateType(candidate.id, setCandidates, jobId)}
        {...candidate}
      />
    ))}
  </AnimatePresence>
);

export const TabPane = ({ candidateType }) => {
  const { activeTab, candidateLists, setCandidates, jobId } =
    useContext(CandidateContext);

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
            {candidates(candidateLists, candidateType, setCandidates, jobId)}
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
