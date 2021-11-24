import React from "react";

export const makeHeader = (col, name) => ({ col: col, name: name });

export const Row = (props) => (
  <>
    <div>
      <div className="row gy-0 align-items-center">{props.children}</div>
      <hr className="my-3" />
    </div>
  </>
);

const TableHeaders = (props) => {
  const headers = props.headers.map((header) => (
    <div key={header.name} className={`col-${header.col} fw-bold`}>
      {header.name}
    </div>
  ));

  return (
    <div>
      <div className="row gy-0 d-none d-lg-flex border-bottom border-2 border-dark pb-2 mb-3">
        {headers}
      </div>
      {props.children}
    </div>
  );
};

export default TableHeaders;
