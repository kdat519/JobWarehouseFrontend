import { Link } from "react-router-dom";

export default function ReportListItem({ report }) {
  return (
    <div>
      <p>
        <Link
          className="text-decoration-none text-dark"
          to={`/admin/users/${report.receiver_id}`}
        ><span className="fw-bold">{report.receiver_name},</span>
          <span> {report.receiver_email} </span>
        </Link>
      </p>
      <p className="">{report.detail} </p>
      <p className="fw-light h6">
      <small>
        Tạo bởi
        <Link
          className="text-decoration-none text-secondary"
          to={`/admin/users/${report.sender_id}`}
        >
          <span> {report.sender_email} </span>
        </Link>
        vào
        <span> {new Date(Date.parse(report.created_at)).toLocaleString()}</span>
        </small>
      </p>
    </div>
  );
}
