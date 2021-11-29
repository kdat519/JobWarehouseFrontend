import React from "react";
import { Link } from "react-router-dom";


const BrandName = () => {
    const brandNameClass = "border border-primary px-1";
    return (
      <Link className="navbar-brand fw-bold text-primary" to="/">
        <span className={brandNameClass}>Job</span>
        <span className={brandNameClass + " bg-primary text-light"}>
          Warehouse
        </span>
      </Link>
    );
};

export default BrandName;