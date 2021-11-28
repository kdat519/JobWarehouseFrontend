import React, { useState, useEffect } from "react";
import adminApi from "../../api/adminApi";
import UserList from "../../components/UserList/UserList";
import Pagination from "../../components/UserList/Pagination";
import UserFiltersForm from "../../components/UserList/UserFiltersForm";

export default function Admin() {
    const [userList, setUserList] = useState([]);
    const [lastPage, setLastPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [filters, setFilters] = useState({
        page: 1,
        email: '',
    })

    function handlePageChange(newPage) {
        setFilters({...filters, page: newPage});
    }

    function handleFiltersChange(newFilters) {
        setFilters({...filters, page: 1, email: newFilters.searchTerm});
    }

    useEffect(() => {
        async function fetchUserList() {
            try {
                const response = await adminApi.getUserList(filters);
                setUserList(response.users.data);
                setLastPage(response.users.last_page);
                setCurrentPage(response.users.current_page);
            }
            catch (error) {
                console.log("Failed to fetch user list: ", error);
            }
        }

        fetchUserList();
    }, [filters]);

    return (
        <div>
            <h2>JOBWAREHOUSE</h2><hr />
            <UserFiltersForm onSubmit={handleFiltersChange}/>
            <UserList users={userList} />
            <Pagination 
                last_page={lastPage}
                current_page={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}