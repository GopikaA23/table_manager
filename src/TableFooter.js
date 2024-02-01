import React from "react";
import _ from "lodash";
import { useTableContext } from "./TableContext";
import Details from "./Details";

const TableFooter = () => {
  const { onDelete, selectedRows, onDetailsClicked, rows } = useTableContext();
  const Logs = () => {
    console.log(
      "Selected Rows:",
      _.map(selectedRows, (id) => rows.find((row) => row.id === id))
    );
  };
  return (
    <div>
      <button onClick={onDelete} disabled={_.size(selectedRows) === 0}>
        Delete
      </button>
      <button onClick={Logs} disabled={_.size(selectedRows) === 0}>
        Logs
      </button>
      <button
        onClick={onDetailsClicked}
        disabled={_.size(selectedRows) === 0 || _.size(selectedRows) > 1}
      >
        Details
      </button>
      <Details />
    </div>
  );
};

export default TableFooter;
