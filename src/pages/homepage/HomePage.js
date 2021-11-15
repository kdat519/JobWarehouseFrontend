import React from "react";
import NavBar from "../../components/navbar/NavBar";
import doodle from "./doodle.svg";

const SearchForm = () => {
  const InputGroup = (props) => (
    <div className="input-group">
      <span className="input-group-text" style={{ width: "5.5em" }}>
        {props.label}
      </span>
      <input
        type="text"
        className="form-control"
        placeholder={props.placeholder}
      ></input>
    </div>
  );

  return (
    <form>
      <div className="row">
        <div className="col-12 col-lg-5">
          <InputGroup label="Tìm kiếm" placeholder="Vị trí, công ty,..." />
        </div>
        <div className="col-12 col-lg-5">
          <InputGroup label="Địa điểm" placeholder="Tỉnh hoặc thành phố" />
        </div>
        <div className="col-12 col-lg-2 d-grid">
          <button type="submit" className="btn btn-primary text-nowrap fw-bold">
            Tìm kiếm
          </button>
        </div>
      </div>
    </form>
  );
};

const HomePage = () => (
  <div className="d-flex flex-column vh-100">
    <header>
      <NavBar />
    </header>
    <main className="container h-100 d-flex flex-column justify-content-center">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6">
          <img src={doodle} alt="" />
        </div>
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-12 col-lg-8">
          <SearchForm />
        </div>
      </div>
    </main>
  </div>
);

export default HomePage;
