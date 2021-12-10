import React, { useState } from "react";
import EmployerNavBar from "../../components/navbar/EmployerNavBar";
import doodle from "./no-one-doodle.svg";
import styles from "./styles.module.scss";

const CandidateType = {
  AwaitReview: "awaitReview",
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

//#region Candidate
const ButtonGroup = ({ id, clickHandle, type }) => (
  <div className="btn-group">
    <button
      type="button"
      className={`btn btn-success ${styles["accept"]}`}
      onClick={clickHandle(id, CandidateType.Hired)}
    >
      <i className="bi bi-check" />
    </button>
    <button
      type="button"
      className={`btn btn-danger ${styles["reject"]}`}
      onClick={clickHandle(id, CandidateType.Rejected)}
    >
      <i className="bi bi-x" />
    </button>
    {type === CandidateType.AwaitReview ? (
      <button
        type="button"
        className={`btn btn-secondary ${styles["mark-as-read"]}`}
        onClick={clickHandle(id, CandidateType.Reviewed)}
      >
        <i className="bi bi-file-earmark-check" />
      </button>
    ) : null}
  </div>
);

const Candidate = ({ imgSrc, name, qualification, type, id, clickHandle }) => (
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
          <ButtonGroup id={id} type={type} clickHandle={clickHandle} />
        ) : null}
      </div>
    </div>
  </div>
);
//#endregion

//#region Candidate list
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

const CandidatesForJob = () => {
  const [candidateLists, setCandidateLists] = useCandidateLists();
  const [activeTab, setActiveTab] = useState(CandidateType.AwaitReview);

  //#region Helper function
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

  const candidateComps = (candidateType) =>
    Array.from(candidateLists[candidateType].values()).map((candidate) => (
      <Candidate
        key={candidate.id}
        clickHandle={changeCandidateType(candidateType)}
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
        <h1 className="fw-bold mb-4">Danh sách ứng viên: "Lập trình viên"</h1>
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
