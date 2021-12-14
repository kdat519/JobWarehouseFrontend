import { useState, useEffect } from "react";
import adminApi from "../../api/adminApi";
import Pagination from "../../components/list/Pagination";
import UserListItem from "../../components/list/UserListItem";
import SearchForm from "../../components/list/SearchForm";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [filters, setFilters] = useState({ page: 1, searchContent: "" });

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
      let newusers = [...users];
      for (const user of newusers) {
        if (user.user_id === Number(id)) {
          if (user.status === "active") user.status = "banned";
          else user.status = "active";
        }
      }
      setUsers(newusers);
    }
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await adminApi.getUsers(filters);
        setUsers(response.users.data);
        setLastPage(response.users.last_page);
        setCurrentPage(response.users.current_page);
      } catch (error) {
        console.log("Failed to fetch user list: ", error);
      }
    }

    fetchUsers();
  }, [filters]);

  return (
    <div className="container">
      <h1 className="mt-5 fw-light">Quản lý tài khoản</h1>
      <SearchForm onSubmit={handleFiltersChange} />
      {users.map((user) => (
        <UserListItem key={user.user_id} user={user} handleBanChange={handleBanChange} />
      ))}
      <Pagination
        last_page={lastPage}
        current_page={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

