import React from "react";
import _ from "lodash";
import TableNewRow from "./TableNewRow";
import { useTableContext } from "./TableContext";

const TableBody = ({ options }) => {
  const { rows, selectedRows, onCheckboxChange } = useTableContext();

  return (
    <tbody>
      {_.map(rows, (row, index) => (
        <tr key={row.id} className={index % 2 === 0 ? "even" : "odd"}>
          <td>
            <input
              type="checkbox"
              checked={_.includes(selectedRows, row.id)}
              onChange={() => onCheckboxChange(row.id)}
            />
          </td>
          <td>{row.id}</td>
          <td>{row.Name}</td>
          <td>{row.Description}</td>
          <td>{row.ShouldCook ? "Yes" : "No"}</td>
          <td>{row.nutrition}</td>
          <td>{row.Count}</td>
        </tr>
      ))}
        <TableNewRow options={options} />
    </tbody>
  );
};

export default TableBody;
