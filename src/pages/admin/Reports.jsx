import { useState, useEffect } from "react";
import adminReportApi from "../../api/adminReportApi";
import Pagination from "../../components/list/Pagination";
import ReportListItem from "../../components/list/ReportListItem";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  

  const [filters, setFilters] = useState({ page: 1 });

  function handlePageChange(newPage) {
    setFilters({ page: newPage });
  }

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await adminReportApi.getReports(filters);
        setReports(response.data.data);
        setLastPage(response.data.last_page);
        setCurrentPage(response.data.current_page);
        
      } catch (error) {
        console.log("Failed to fetch report list: ", error);
      }
    }

    fetchReports();
  }, [filters]);

  return (
    <div className="container">
      <h1 className="mt-5 h2 mb-4">Nhận xét mới nhất</h1>
      {reports.map((report, index) => (
        <div
          key={index}
          className="d-flex justify-content-between my-3 p-3 border border-1 rounded-3"
        >
          <ReportListItem report={report} />
        </div>
      ))}
      <Pagination
        last_page={lastPage}
        current_page={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
