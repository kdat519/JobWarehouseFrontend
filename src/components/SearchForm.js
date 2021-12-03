import React from "react";
import { Link } from "react-router-dom";

const SearchForm = () => {
	const InputGroup = (props) => (
		<div className="input-group">
			<span className="input-group-text">{props.label}</span>
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
					<button type="submit" className="btn btn-primary text-nowrap">
						Tìm kiếm
					</button>
				</div>
			</div>
		</form>
	);
};

export default SearchForm;