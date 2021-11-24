import React, { useState } from "react";
import EmployerNavBar from "../../components/navbar/EmployerNavBar";
import styles from "./styles.module.scss";

const CandidateType = {
  AwaitReview: "await-review",
  Reviewed: "reviewed",
  Hired: "hired",
  Rejected: "rejected",
};

let id = 1;
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
];

const Candidate = (props) => {
  const ButtonGroup = () => (
    <div className="btn-group">
      <button
        type="button"
        className={`btn btn-success ${styles["accept"]}`}
        onClick={props.clickHandle(props.id, CandidateType.Hired)}
      >
        <i className="bi bi-check"></i>
      </button>
      <button
        type="button"
        className={`btn btn-danger ${styles["reject"]}`}
        onClick={props.clickHandle(props.id, CandidateType.Rejected)}
      >
        <i className="bi bi-x"></i>
      </button>
      {props.type === CandidateType.AwaitReview ? (
        <button
          type="button"
          className={`btn btn-secondary ${styles["mark-as-read"]}`}
          onClick={props.clickHandle(props.id, CandidateType.Reviewed)}
        >
          <i className="bi bi-file-earmark-check"></i>
        </button>
      ) : null}
    </div>
  );

  return (
    <div className={`p-1 ${styles["card-container"]}`}>
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
            <ButtonGroup />
          ) : null}
        </div>
      </div>
    </div>
  );
};

const useCandidateLists = () => {
  const filterByCandidateType = (data, type) =>
    new Map(
      data
        .filter((candidate) => candidate.type === type)
        .map((candidate) => [candidate.id, candidate])
    );

  return useState({
    [CandidateType.AwaitReview]: filterByCandidateType(
      data,
      CandidateType.AwaitReview
    ),
    [CandidateType.Reviewed]: filterByCandidateType(
      data,
      CandidateType.Reviewed
    ),
    [CandidateType.Hired]: filterByCandidateType(data, CandidateType.Hired),
    [CandidateType.Rejected]: filterByCandidateType(
      data,
      CandidateType.Rejected
    ),
  });
};

const CandidatesForJob = () => {
  const [candidateLists, setCandidateLists] = useCandidateLists();
  const [activeTab, setActiveTab] = useState(CandidateType.AwaitReview);

  const changeCandidateType = (fromList) => (id, toList) => (event) => {
    event.preventDefault();
    const fromListCopy = new Map(candidateLists[fromList]);
    const toListCopy = new Map(candidateLists[toList]);
    const candidate = fromListCopy.get(id);
    fromListCopy.delete(id);
    toListCopy.set(id, candidate);
    candidate.type = toList;
    setCandidateLists({
      ...candidateLists,
      [fromList]: fromListCopy,
      [toList]: toListCopy,
    });
  };

  const candidateComps = (candidateType) => {
    console.log(candidateLists, candidateType);
    return Array.from(candidateLists[candidateType].values()).map(
      (candidate) => (
        <Candidate
          key={candidate.id}
          clickHandle={changeCandidateType(candidateType)}
          {...candidate}
        />
      )
    );
  };

  const changeActiveTab = (candidateType) => (event) => {
    event.preventDefault();
    setActiveTab(candidateType);
  };

  const TabButton = (props) => (
    <button
      className={
        "nav-link text-dark " +
        (activeTab === props.candidateType ? "active" : "")
      }
      type="button"
      onClick={changeActiveTab(props.candidateType)}
    >
      {props.name}{" "}
      <span className="badge bg-light text-dark">
        {candidateLists[props.candidateType].size}
      </span>
    </button>
  );

  const TabPane = (props) => (
    <div
      className={
        "tab-pane " + (activeTab === props.candidateType ? "active" : "")
      }
    >
      <div className="d-flex flex-wrap">
        {candidateComps(props.candidateType)}
      </div>
    </div>
  );

  return (
    <>
      <header className="mb-5">
        <EmployerNavBar />
      </header>
      <main className="container">
        <h1 className="fw-bold mb-4">Danh sách ứng viên: "Lập trình viên"</h1>
        <nav>
          <div className="nav nav-tabs">
            <TabButton
              name="Chưa xem"
              candidateType={CandidateType.AwaitReview}
            />
            <TabButton name="Đã xem" candidateType={CandidateType.Reviewed} />
            <TabButton name="Đã tuyển" candidateType={CandidateType.Hired} />
            <TabButton
              name="Đã từ chối"
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
      </main>
    </>
  );
};

export default CandidatesForJob;
