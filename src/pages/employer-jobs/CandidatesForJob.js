import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  readCandidatesForJob,
  updateCandidateType,
  readJobDetail,
} from "../../api/jobApi";
import EmployerNavBar from "../../components/navbar/EmployerNavBar";
import { fireErrorMessage } from "../../components/swalErrorMessage";
import doodle from "./no-one-doodle.svg";
import styles from "./styles.module.scss";

export const CandidateType = {
  AwaitReview: "pending",
  Reviewed: "reviewed",
  Hired: "hired",
  Rejected: "rejected",
};

/* let id = 1;
const data = [
  {
    id: id++,
    name: "Lê Ứng Viên",
    type: CandidateType.AwaitReview,
    imgSrc: "https://source.unsplash.com/random/100x100",
    qualification:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque ab " +
      "nobis, at, consequuntur asperiores molestiae voluptates totam " +
      "consequatur aut dolorem laudantium beatae deleniti. Ea aperiam " +
      "totam accusamus quisquam, doloribus ab?",
  },
  {
    id: id++,
    name: "Nguyễn Ứng Viên",
    type: CandidateType.Reviewed,
    imgSrc: "https://source.unsplash.com/random/100x100",
    qualification:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque ab " +
      "nobis, at, consequuntur asperiores molestiae voluptates totam " +
      "consequatur aut dolorem laudantium beatae deleniti. Ea aperiam " +
      "totam accusamus quisquam, doloribus ab?",
  },
  {
    id: id++,
    name: "Trần Ứng Viên",
    type: CandidateType.Hired,
    imgSrc: "https://source.unsplash.com/random/100x100",
    qualification:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque ab " +
      "nobis, at, consequuntur asperiores molestiae voluptates totam " +
      "consequatur aut dolorem laudantium beatae deleniti. Ea aperiam " +
      "totam accusamus quisquam, doloribus ab?",
  },
  {
    id: id++,
    name: "Hoàng Ứng Viên",
    type: CandidateType.Rejected,
    imgSrc: "https://source.unsplash.com/random/100x100",
    qualification:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque ab " +
      "nobis, at, consequuntur asperiores molestiae voluptates totam " +
      "consequatur aut dolorem laudantium beatae deleniti. Ea aperiam " +
      "totam accusamus quisquam, doloribus ab?",
  },
  {
    id: id++,
    name: "Lê Ứng Viên",
    type: CandidateType.AwaitReview,
    imgSrc: "https://source.unsplash.com/random/100x100",
    qualification:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque ab " +
      "nobis, at, consequuntur asperiores molestiae voluptates totam " +
      "consequatur aut dolorem laudantium beatae deleniti. Ea aperiam " +
      "totam accusamus quisquam, doloribus ab?",
  },
  {
    id: id++,
    name: "Nguyễn Ứng Viên",
    type: CandidateType.Reviewed,
    imgSrc: "https://source.unsplash.com/random/100x100",
    qualification:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque ab " +
      "nobis, at, consequuntur asperiores molestiae voluptates totam " +
      "consequatur aut dolorem laudantium beatae deleniti. Ea aperiam " +
      "totam accusamus quisquam, doloribus ab?",
  },
  {
    id: id++,
    name: "Trần Ứng Viên",
    type: CandidateType.Hired,
    imgSrc: "https://source.unsplash.com/random/100x100",
    qualification:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque ab " +
      "nobis, at, consequuntur asperiores molestiae voluptates totam " +
      "consequatur aut dolorem laudantium beatae deleniti. Ea aperiam " +
      "totam accusamus quisquam, doloribus ab?",
  },
  {
    id: id++,
    name: "Hoàng Ứng Viên",
    type: CandidateType.Rejected,
    imgSrc: "https://source.unsplash.com/random/100x100",
    qualification:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque ab " +
      "nobis, at, consequuntur asperiores molestiae voluptates totam " +
      "consequatur aut dolorem laudantium beatae deleniti. Ea aperiam " +
      "totam accusamus quisquam, doloribus ab?",
  },
  {
    id: id++,
    name: "Lê Ứng Viên",
    type: CandidateType.AwaitReview,
    imgSrc: "https://source.unsplash.com/random/100x100",
    qualification:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque ab " +
      "nobis, at, consequuntur asperiores molestiae voluptates totam " +
      "consequatur aut dolorem laudantium beatae deleniti. Ea aperiam " +
      "totam accusamus quisquam, doloribus ab?",
  },
  {
    id: id++,
    name: "Nguyễn Ứng Viên",
    type: CandidateType.Reviewed,
    imgSrc: "https://source.unsplash.com/random/100x100",
    qualification:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque ab " +
      "nobis, at, consequuntur asperiores molestiae voluptates totam " +
      "consequatur aut dolorem laudantium beatae deleniti. Ea aperiam " +
      "totam accusamus quisquam, doloribus ab?",
  },
  {
    id: id++,
    name: "Trần Ứng Viên",
    type: CandidateType.Hired,
    imgSrc: "https://source.unsplash.com/random/100x100",
    qualification:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque ab " +
      "nobis, at, consequuntur asperiores molestiae voluptates totam " +
      "consequatur aut dolorem laudantium beatae deleniti. Ea aperiam " +
      "totam accusamus quisquam, doloribus ab?",
  },
  {
    id: id++,
    name: "Hoàng Ứng Viên",
    type: CandidateType.Rejected,
    imgSrc: "https://source.unsplash.com/random/100x100",
    qualification:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque ab " +
      "nobis, at, consequuntur asperiores molestiae voluptates totam " +
      "consequatur aut dolorem laudantium beatae deleniti. Ea aperiam " +
      "totam accusamus quisquam, doloribus ab?",
  },
  {
    id: id++,
    name: "Lê Ứng Viên",
    type: CandidateType.AwaitReview,
    imgSrc: "https://source.unsplash.com/random/100x100",
    qualification:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque ab " +
      "nobis, at, consequuntur asperiores molestiae voluptates totam " +
      "consequatur aut dolorem laudantium beatae deleniti. Ea aperiam " +
      "totam accusamus quisquam, doloribus ab?",
  },
  {
    id: id++,
    name: "Nguyễn Ứng Viên",
    type: CandidateType.Reviewed,
    imgSrc: "https://source.unsplash.com/random/100x100",
    qualification:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque ab " +
      "nobis, at, consequuntur asperiores molestiae voluptates totam " +
      "consequatur aut dolorem laudantium beatae deleniti. Ea aperiam " +
      "totam accusamus quisquam, doloribus ab?",
  },
  {
    id: id++,
    name: "Trần Ứng Viên",
    type: CandidateType.Hired,
    imgSrc: "https://source.unsplash.com/random/100x100",
    qualification:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque ab " +
      "nobis, at, consequuntur asperiores molestiae voluptates totam " +
      "consequatur aut dolorem laudantium beatae deleniti. Ea aperiam " +
      "totam accusamus quisquam, doloribus ab?",
  },
  {
    id: id++,
    name: "Hoàng Ứng Viên",
    type: CandidateType.Rejected,
    imgSrc: "https://source.unsplash.com/random/100x100",
    qualification:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque ab " +
      "nobis, at, consequuntur asperiores molestiae voluptates totam " +
      "consequatur aut dolorem laudantium beatae deleniti. Ea aperiam " +
      "totam accusamus quisquam, doloribus ab?",
  },
]; */

//#region Candidate
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

const Candidate = ({ imgSrc, name, qualification, type, handleClick }) => (
  <div className={`p-1 ${styles["card-container"]}`}>
    <div className="card">
      <div
        className={`card-img-top bg-secondary ${styles["card-top-height"]}`}
      />
      <div className="card-body">
        <img
          src={imgSrc}
          className={`rounded-circle mb-3 ${styles["negative-margin"]}`}
          alt="Candidate"
        />
        <h5 className="card-title">{name}</h5>
        <div className={`${styles["card-content-container"]}`}>
          <p className={`card-text ${styles["line-clamp"]}`}>{qualification}</p>
        </div>
        {type === CandidateType.AwaitReview ||
        type === CandidateType.Reviewed ? (
          <ButtonGroup type={type} handleClick={handleClick} />
        ) : null}
      </div>
    </div>
  </div>
);
//#endregion

//#region Candidate list
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

const TabHeader = ({
  activeTab,
  candidateType,
  changeActiveTab,
  title,
  candidateLists,
}) => (
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

const TabPane = ({ activeTab, candidateType, candidateComps }) => (
  <div className={"tab-pane " + (activeTab === candidateType ? "active" : "")}>
    {candidateComps(candidateType).length ? (
      <div className="d-flex flex-wrap">{candidateComps(candidateType)}</div>
    ) : (
      <>
        <div className="row justify-content-center">
          <div className="col-12 col-md-5">
            <img src={doodle} alt="" />
          </div>
        </div>
        <h3 className="text-muted text-center">Không có ứng viên nào!</h3>
      </>
    )}
  </div>
);

const Title = ({ jobId }) => {
  const [jobName, setJobName] = useState("");
  useEffect(() => {
    readJobDetail(jobId)
      .then((job) => {
        setJobName(": " + job.jobName);
      })
      .catch(() => {
        // Ignore
      });
  }, [jobId]);
  return <h1 className="fw-bold mb-4">{"Danh sách ứng viên" + jobName}</h1>;
};

const CandidatesForJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

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
  }, [jobId, navigate]);

  //#region Helper function
  const changeCandidateType = (candidateId) => (type) => (event) => {
    event.preventDefault();
    updateCandidateType(parseInt(jobId), candidateId, type)
      .then((candidates) => {
        setCandidates(candidates);
      })
      .catch(fireErrorMessage);
  };

  const candidateComps = (candidateType) =>
    Array.from(candidateLists[candidateType].values()).map((candidate) => (
      <Candidate
        key={candidate.id}
        handleClick={changeCandidateType(candidate.id)}
        {...candidate}
      />
    ));

  const changeActiveTab = (candidateType) => (event) => {
    event.preventDefault();
    setActiveTab(candidateType);
  };

  const tabHeaderProps = (title, candidateType) => ({
    title: title,
    candidateType: candidateType,
    activeTab: activeTab,
    changeActiveTab: changeActiveTab,
    candidateLists: candidateLists,
  });

  const tabPaneProps = (candidateType) => ({
    candidateType: candidateType,
    activeTab: activeTab,
    candidateComps: candidateComps,
  });
  //#endregion

  return (
    <>
      <header className="mb-5">
        <EmployerNavBar />
      </header>
      <main className="container">
        <Title jobId={parseInt(jobId)} />
        <nav>
          <div className="nav nav-tabs">
            <TabHeader
              {...tabHeaderProps("Chưa xem", CandidateType.AwaitReview)}
            />
            <TabHeader
              {...tabHeaderProps("Đã duyệt", CandidateType.Reviewed)}
            />
            <TabHeader {...tabHeaderProps("Đã tuyển", CandidateType.Hired)} />
            <TabHeader
              {...tabHeaderProps("Đã từ chối", CandidateType.Rejected)}
            />
          </div>
        </nav>
        <div className="tab-content">
          <TabPane {...tabPaneProps(CandidateType.AwaitReview)} />
          <TabPane {...tabPaneProps(CandidateType.Reviewed)} />
          <TabPane {...tabPaneProps(CandidateType.Hired)} />
          <TabPane {...tabPaneProps(CandidateType.Rejected)} />
        </div>
      </main>
    </>
  );
};
//#endregion

export default CandidatesForJob;
