import { Link } from "react-router-dom";

export default function ReportListItem({ report }) {
  return (
    <div>
      <p>
        <Link
          className="text-decoration-none text-dark"
          to={`/admin/users/${report.receiver_id}`}
        >
          <span className="fw-bold">{report.receiver_name},</span>
          <span> {report.receiver_email} </span>
        </Link>
      </p>
      <p className="pre-line">{report.detail} </p>
      <p className="text-muted">
        <Link
          className="text-decoration-none text-dark"
          to={`/admin/users/${report.sender_id}`}
        >
          <span className=""> {report.sender_name},</span>
          <span> {report.sender_email} </span>
        </Link>
        nhận xét vào
        <span>
          {" "}
          {new Date(Date.parse(report?.updated_at)).toLocaleString()}
        </span>
      </p>
    </div>
  );
}
