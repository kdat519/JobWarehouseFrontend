import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import EmployerNavBar from "../components/navbar/EmployerNavBar";

const ForEmployersLayout = () => {
  const location = useLocation();
  return location.pathname === "/for-employers" ? (
    <Outlet />
  ) : (
    <>
      <header className="mb-5">
        <EmployerNavBar />
      </header>
      <Outlet />
    </>
  );
};

export default ForEmployersLayout;
