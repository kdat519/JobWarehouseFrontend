import Pagination from "../../components/list/Pagination";
import ReportListItem from "../../components/list/ReportListItem";


export default function UserReports({reports, handlePageChange, lastPage, currentPage, total}) {
  return (
    <div>
      
      <div className="border border-1 mb-3">
      {reports.map((report, index) => (
        <div
          key={index}
          className="p-4 border border-1"
        >
          <ReportListItem report={report} />
        </div>
      ))}
      </div>
      {reports.length !== 0 &&
        <Pagination
        last_page={lastPage}
        current_page={currentPage}
        onPageChange={handlePageChange}
      />
      }
    </div>
  );
}
