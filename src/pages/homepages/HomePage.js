import React from "react";
import NavBar from "../../components/NavBar";
import doodle from "./doodle.svg";
import SearchForm from "../../components/SearchForm";

const HomePage = () => {
	return (
		<>
			<NavBar />
			<main className="container position-absolute top-50 start-50 translate-middle">
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
		</>
	);
};

export default HomePage;
