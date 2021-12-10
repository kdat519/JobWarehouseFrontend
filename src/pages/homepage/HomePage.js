import React from "react";
import NavBar from "../../components/navbar/NavBar";
import SearchForm from "../../components/search-form/SearchForm";
import doodle from "./homepage-doodle.svg";

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
