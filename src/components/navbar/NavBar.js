import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Role, useAuth } from "../auth/AuthProvider";
import AuthUserNavLayout from "./AuthUserNavLayout";
import brandNameLogo from "./brandname.svg";
import brandNameLogoWhite from "./brandname-white.svg";
import GenericNavBar, {
  jobSeekerDark,
  NavItem,
  ThemeContext,
  useTheme,
} from "./GenericNavBar";

const BrandName = () => {
  const themeContext = useTheme();

  return (
    <NavLink className="navbar-brand" to="/">
      <img
        src={
          themeContext.value === Role.JobSeeker
            ? brandNameLogo
            : brandNameLogoWhite
        }
        alt=""
        height="30"
      />
    </NavLink>
  );
};

const AuthUserNav = ({ username, logout }) => {
  const themeContext = useTheme();
  return (
    <AuthUserNavLayout
      username={username}
      logout={logout}
      dark={themeContext.value !== Role.JobSeeker}
    >
      <li>
        <Link className="dropdown-item" to="/account">
          Tài khoản
        </Link>
      </li>
      <li>
        <Link className="dropdown-item" to="/following">
          Tin tuyển dụng đang theo dõi
        </Link>
      </li>
    </AuthUserNavLayout>
  );
};

const GuestNav = () => {
  const themeContext = useTheme();
  return (
    <>
      <NavItem to="/register">Tạo CV của bạn</NavItem>
      <NavItem
        to="/login"
        className={
          "d-none d-lg-block fw-bold text-" +
          (themeContext.value === Role.JobSeeker ? "primary" : "white")
        }
      >
        Đăng nhập
      </NavItem>
    </>
  );
};

const NavItems = () => {
  const authContext = useAuth();
  return authContext.name && authContext.role === Role.JobSeeker ? (
    <AuthUserNav username={authContext.name} logout={authContext.logout} />
  ) : (
    <GuestNav />
  );
};

const NavCollapse = () => {
  const themeContext = useTheme();
  return (
    <div className="collapse navbar-collapse" id="nav-collapse">
      <ul className="navbar-nav me-auto">
        <NavItem to="/jobs">Tìm việc</NavItem>
        <NavItem to="/employers">Tìm nhà tuyển dụng</NavItem>
      </ul>
      <ul className="navbar-nav">
        <NavItems />
        <div
          className={
            "vr d-none d-lg-block " +
            (themeContext.value === Role.JobSeeker ? "text-dark" : "text-light")
          }
        />
        <NavItem to="/for-employers">Nhà tuyển dụng/Đăng việc làm</NavItem>
      </ul>
    </div>
  );
};

const NavBar = ({ dark = false }) => (
  <ThemeContext.Provider
    value={{ value: dark ? jobSeekerDark : Role.JobSeeker }}
  >
    <GenericNavBar brandName={<BrandName />} navCollapse={<NavCollapse />} />
  </ThemeContext.Provider>
);

export default NavBar;
