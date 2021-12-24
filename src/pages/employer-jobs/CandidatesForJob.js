import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { readCandidatesForJob, readJobDetail } from "../../api/jobApi";
import { fireErrorMessage } from "../../components/swal-error-message";
import { TabHeader, TabPane } from "./CandidatesTab";

export const CandidateType = {
  AwaitReview: "pending",
  Reviewed: "reviewed",
  Hired: "hired",
  Rejected: "rejected",
};

const CandidateContext = React.createContext();
export const useCandidate = () => useContext(CandidateContext);

const genCandidateLists = (candidates) => {
  const filterByType = (type) =>
    new Map(
      candidates
        .filter((candidate) => candidate.type === type)
        .map((candidate) => [candidate.id, candidate])
    );

  return {
    [CandidateType.AwaitReview]: filterByType(CandidateType.AwaitReview),
    [CandidateType.Reviewed]: filterByType(CandidateType.Reviewed),
    [CandidateType.Hired]: filterByType(CandidateType.Hired),
    [CandidateType.Rejected]: filterByType(CandidateType.Rejected),
  };
};

const CandidatesForJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [jobInfo, setJobInfo] = useState({ name: "", updatedAt: Date.now() });
  const [candidates, setCandidates] = useState([]);
  const candidateLists = genCandidateLists(candidates);
  const [activeTab, setActiveTab] = useState(CandidateType.AwaitReview);

  useEffect(() => {
    readCandidatesForJob(parseInt(jobId))
      .then((candidates) => {
        setCandidates(candidates);
      })
      .catch(() => {
        fireErrorMessage();
        navigate("/for-employers/jobs");
      });
    readJobDetail(jobId)
      .then((job) => {
        setJobInfo({ name: ": " + job.jobName, updatedAt: job.updatedAt });
      })
      .catch(() => {
        setJobInfo({ name: "", updatedAt: null });
      });
  }, [jobId, navigate]);

  const changeActiveTab = (candidateType) => (event) => {
    event.preventDefault();
    setActiveTab(candidateType);
  };

  const candidateContext = {
    jobId: jobId,
    candidateLists: candidateLists,
    setCandidates: setCandidates,
    activeTab: activeTab,
    changeActiveTab: changeActiveTab,
    jobUpdatedDate: jobInfo.updatedAt,
  };

  return (
    <main className="container">
      <h1 className="fw-bold mb-4">{"Danh sách ứng viên" + jobInfo.name}</h1>
      <CandidateContext.Provider value={candidateContext}>
        <nav>
          <div className="nav nav-tabs">
            <TabHeader
              title="Chưa xem"
              candidateType={CandidateType.AwaitReview}
            />
            <TabHeader
              title="Đã duyệt"
              candidateType={CandidateType.Reviewed}
            />
            <TabHeader title="Đã tuyển" candidateType={CandidateType.Hired} />
            <TabHeader
              title="Đã từ chối"
              candidateType={CandidateType.Rejected}
            />
          </div>
        </nav>
        <div className="tab-content">
          <TabPane candidateType={CandidateType.AwaitReview} />
          <TabPane candidateType={CandidateType.Reviewed} />
          <TabPane candidateType={CandidateType.Hired} />
          <TabPane candidateType={CandidateType.Rejected} />
        </div>
      </CandidateContext.Provider>
    </main>
  );
};
//#endregion

export default CandidatesForJob;
