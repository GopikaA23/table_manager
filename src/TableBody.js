import React from "react";
import _ from "lodash";
import TableNewRow from "./TableNewRow";
import { useTableContext } from "./TableContext";

const TableBody = () => {
  const { rows, header, onCheckboxChange, selectedRows } = useTableContext();
  const handleCheckboxChange = (rowId, columnName) => {
    onCheckboxChange(rowId, columnName);
  };
  return (
    <tbody>
      {_.map(rows, (row, index) => (
        <tr key={row.id} className={index % 2 === 0 ? "even" : "odd"}>
          {_.map(header, (column) => (
            <td key={column.name}>
              <Cell
                row={row}
                column={column}
                onCheckboxChange={handleCheckboxChange}
                selectedRows={selectedRows}
              />
            </td>
          ))}
        </tr>
      ))}
      <TableNewRow />
    </tbody>
  );
};

const Cell = ({ row, column, onCheckboxChange }) => {
  const handleCheckbox = () => {
    onCheckboxChange(row.id, column.name);
  };

  switch (column.type) {
    case "checkbox":
      if (!column.isBoolean) {
        return (
          <input
            type="checkbox"
            checked={row[column.name]}
            onChange={handleCheckbox}
          />
        );
      } else {
        return row[column.name] ? "Yes" : "No";
      }
    default:
      return row[column.name];
  }
};

export default TableBody;
