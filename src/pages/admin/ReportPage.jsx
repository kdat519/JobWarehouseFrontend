import React, { useState, useEffect } from "react";
import adminReportApi from "../../api/adminReportApi";
import ReportList from "../../components/report/ReportList";
import Pagination from "../../components/UserList/Pagination";
import AdminNavBar from "../../components/navbar/AdminNavBar";

export default function Report() {
  const [reportList, setReportList] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [filters, setFilters] = useState({
    page: 1
  });

  function handlePageChange(newPage) {
    setFilters({ page: newPage });
  }

  useEffect(() => {
    async function fetchReportList(filters) {
      try {
        const response = await adminReportApi.getReportList(filters);
        setReportList(response.data.data);
        setLastPage(response.data.last_page);
        setCurrentPage(response.data.current_page);
      } catch (error) {
        console.log("Failed to fetch user list: ", error);
      }
    }

    fetchReportList(filters);
  }, [filters]);

  return (
    <div>
      <header className="mb-5">
        <AdminNavBar />
      </header>
      <div className="container">
        <h6 className="display-6">Quản lý báo cáo</h6>
        <hr />
        <ReportList reports={reportList} />
        <Pagination
          last_page={lastPage}
          current_page={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
