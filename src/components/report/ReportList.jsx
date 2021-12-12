import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


function ReportList(props) {
  const { reports } = props;

  return (
    <ul className="container">
      {reports.map((report) => (
        <div key={report.report_id}>
          <div className="d-flex justify-content-between">
            <ReportInfo report={report} />
          </div>
          <hr />
        </div>
      ))}
    </ul>
  );
}

function ReportInfo(props) {
  const { report } = props;

  return (
    <div>
      <p>{report.detail}</p>
    </div>
  );
}

export default ReportList;
