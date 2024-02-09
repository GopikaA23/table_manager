import React from "react";
import _ from "lodash";
import { useTableContext } from "./TableContext";
import Details from "./Details";

const TableFooter = () => {
  const { onDelete, selectedRows, onDetailsClicked, rows } = useTableContext();
  const handleLogsClicked = () => {
    console.log("selectedrows", selectedRows);
    console.log(
      "Selected Rows:",
      _.map(selectedRows, (id) => _.find(rows, (row) => row.id === id))
    );
  };
  return (
    <div>
      <button onClick={onDelete} disabled={_.size(selectedRows) === 0}>
        Delete
      </button>
      <button onClick={handleLogsClicked} disabled={_.size(selectedRows) === 0}>
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
