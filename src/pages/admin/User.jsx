import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import adminApi from "../../api/adminApi";
import adminReportApi from "../../api/adminReportApi";
import UserReports from "./UserReports";

export default function User() {
  const { userId } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await adminApi.getUser(userId);
        if (response.success) setUser(response.data[0]);
      } catch (error) {
        console.log("Failed to fetch user: ", error);
      }
    }
    fetchUser();
  }, [userId]);

  async function handleBanChange(id, status) {
    let response;
    if (status === "Active") response = await adminApi.banUser(id);
    else response = await adminApi.unbanUser(id);
    if (response.success) {
      let newUser = { ...user };
      if (user.status === "active") newUser.status = "banned";
      else newUser.status = "active";
      setUser(newUser);
    }
  }

  const [reports, setReports] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ page: 1 });
  function handlePageChange(newPage) {
    setFilters({ page: newPage });
  }
  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await adminReportApi.getReportsTo(userId, filters);
        setReports(response.data.data);
        setLastPage(response.data.last_page);
        setCurrentPage(response.data.current_page);
        setTotal(response.data.total);
      } catch (error) {
        console.log("Failed to fetch report list: ", error);
      }
    }

    fetchReports();
  }, [filters, userId]);

  const [reportsFrom, setReportsFrom] = useState([]);
  const [lastPageFrom, setLastPageFrom] = useState(0);
  const [currentPageFrom, setCurrentPageFrom] = useState(0);
  const [totalFrom, setTotalFrom] = useState(0);
  const [filtersFrom, setFiltersFrom] = useState({ page: 1 });
  function handlePageChangeFrom(newPage) {
    setFiltersFrom({ page: newPage });
  }
  useEffect(() => {
    async function fetchReportsFrom() {
      try {
        const response = await adminReportApi.getReportsFrom(
          userId,
          filtersFrom
        );
        setReportsFrom(response.data.data);
        setLastPageFrom(response.data.last_page);
        setCurrentPageFrom(response.data.current_page);
        setTotalFrom(response.data.total);
      } catch (error) {
        console.log("Failed to fetch report list: ", error);
      }
    }

    fetchReportsFrom();
  }, [filtersFrom, userId]);

  const [showReportsTo, setShowReportsTo] = useState("to");

  function handleShowReports(e) {
    e.preventDefault();
    setShowReportsTo(e.target.dataset.show);
  }

  return (
    <div>
      {user?.role && user?.role !== "admin" && (
        <div className="container">
          <UserListItem user={user} handleBanChange={handleBanChange} />
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link shadow-none ${
                  showReportsTo === "to" ? "active fw-bold" : "text-secondary"
                }`}
                data-show="to"
                onClick={handleShowReports}
              >
                Nhận xét về tài khoản ({total})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link shadow-none ${
                  showReportsTo === "from" ? "active fw-bold" : "text-secondary"
                }`}
                href=""
                data-show="from"
                onClick={handleShowReports}
              >
                Nhận xét đã tạo ({totalFrom})
              </button>
            </li>
          </ul>
          {showReportsTo === "to" ? (
            <UserReports
              reports={reports}
              handlePageChange={handlePageChange}
              lastPage={lastPage}
              currentPage={currentPage}
              total={total}
            />
          ) : (
            <UserReports
              reports={reportsFrom}
              handlePageChange={handlePageChangeFrom}
              lastPage={lastPageFrom}
              currentPage={currentPageFrom}
              total={totalFrom}
            />
          )}
        </div>
      )}
    </div>
  );
}

function UserListItem({ user, handleBanChange }) {
  return (
    <div className="d-flex justify-content-between my-3 p-3 border border-1 rounded-3">
      <div>
        <p className="fw-bolder">
          {user.role === "jobseeker"
            ? "Người tìm việc"
            : user.role === "admin"
            ? "Admin"
            : "Nhà tuyển dụng"}
        </p>
        <p>Tên: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>SĐT: {user.phonenumber}</p>
        <p>
          Thời gian tạo:{" "}
          {new Date(Date.parse(user.created_at)).toLocaleString()}
        </p>
        {user.role !== "admin" && (
          <Link
            className="text-decoration-none"
            to={`/profile/${user.user_id}`}
          >
            Xem trang Profile
          </Link>
        )}
        {user.role === "admin" && <span></span>}
      </div>

      <div className="mr-auto">
        <input
          type="button"
          value={user.status === "active" ? "Active" : "Banned"}
          data-user={user.user_id}
          onClick={(e) =>
            handleBanChange(e.target.dataset.user, e.target.value)
          }
          className={`px-2 btn mx-1 ${
            user.status === "active" ? "btn-success" : "btn-danger"
          }`}
        />
      </div>
    </div>
  );
}
