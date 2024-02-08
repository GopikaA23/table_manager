import React from "react";
import _ from "lodash";
import TableNewRow from "./TableNewRow";
import { useTableContext } from "./TableContext";

const TableBody = () => {
  const { rows, header } = useTableContext();

  return (
    <tbody>
      {_.map(rows, (row, index) => (
        <tr key={row.id} className={index % 2 === 0 ? "even" : "odd"}>
          {header.map((column) => {
            return <td key={column.name}>{Cell(row, column)}</td>;
          })}
        </tr>
      ))}
      <TableNewRow />
    </tbody>
  );
};

const Cell = (row, column) => {
  const { onCheckboxChange, selectedRows } = useTableContext();
  switch (column.type) {
    case "checkbox":
      if (column.name === "") {
        return (
          <input
            type="checkbox"
            checked={_.includes(selectedRows, row.id)}
            onChange={() => onCheckboxChange(row.id)}
          />
        );
      } else {
        console.log("check", column.name);
        return row[column.name] ? "Yes" : "No";
      }
    default:
      return row[column.name];
  }
};

export default TableBody;
