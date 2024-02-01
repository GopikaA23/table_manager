import React from "react";
import _ from "lodash";

const TableFooter = ({
  state,
  handleDeleteRows,
  handleDetailsClick,
  handleLogsClick,
}) => {
  return (
    <div>
      <button
        onClick={handleDeleteRows}
        disabled={_.size(state.selectedRows) === 0}
      >
        Delete
      </button>
      <button
        onClick={handleLogsClick}
        disabled={_.size(state.selectedRows) === 0}
      >
        Logs
      </button>
      <button
        onClick={handleDetailsClick}
        disabled={
          _.size(state.selectedRows) === 0 || _.size(state.selectedRows) > 1
        }
      >
        Details
      </button>
      {_.size(state.details) > 0 && (
        <div className="list">
          {_.map(state.details, (row) => (
            <div key={row.id}>
              <p>ID: {row.id}</p>
              <p>Name: {row.name}</p>
              <p>Description: {row.description}</p>
              <p>Should Cook: {row.shouldCook}</p>
              <p>Nutrition: {row.nutrition}</p>
              <p>Count: {row.count}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableFooter;
