import React, { useState, useEffect } from "react";
import adminApi from "../../api/adminApi";
import UserList from "../../components/UserList/UserList";
import Pagination from "../../components/UserList/Pagination";
import UserFiltersForm from "../../components/UserList/UserFiltersForm";
import AdminNavBar from "../../components/navbar/AdminNavBar";

export default function Admin() {
  const [userList, setUserList] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [filters, setFilters] = useState({
    page: 1,
    searchContent: "",
  });

  function handlePageChange(newPage) {
    setFilters({ ...filters, page: newPage });
  }

  function handleFiltersChange(newFilters) {
    setFilters({ ...filters, page: 1, searchContent: newFilters.searchTerm });
  }

  async function handleBanChange(id, status) {
    let response;
    if (status === "Active") response = await adminApi.banUser(id);
    else response = await adminApi.unbanUser(id);

    if (response.success) {
      let newUserList = [...userList];
      for (const user of newUserList) {
        if (user.user_id === Number(id)) {
          if (user.status === "active") user.status = "banned";
          else user.status = "active";
        }
      }
      setUserList(newUserList);
    }
  }

  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = await adminApi.getUserList(filters);
        setUserList(response.users.data);
        setLastPage(response.users.last_page);
        setCurrentPage(response.users.current_page);
      } catch (error) {
        console.log("Failed to fetch user list: ", error);
      }
    }

    fetchUserList();
  }, [filters]);

  return (
    <div>
      <header className="mb-5">
        <AdminNavBar />
      </header>
      <div className="container">
        <h6 className="display-6">Quản lý tài khoản</h6>
        <UserFiltersForm onSubmit={handleFiltersChange} />
        <UserList users={userList} onBanChange={handleBanChange} />
        <Pagination
          last_page={lastPage}
          current_page={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
