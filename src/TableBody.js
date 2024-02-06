import React from "react";
import _ from "lodash";
import TableNewRow from "./TableNewRow";
import { useTableContext } from "./TableContext";

const TableBody = () => {
  const { rows, onCheckboxChange, selectedRows} = useTableContext();

  return (
    <tbody>
      {rows.map((row) => (
        <tr key={row.id}>
          <td>
            <input
              type="checkbox"
              checked={_.includes(selectedRows, row.id)}
              onChange={() => onCheckboxChange(row.id)}
            />
          </td>
          {_.valuesIn(row).map((cell, cellIndex) => (
            <td key={cellIndex}>
              {typeof cell === "boolean" ? (cell ? "Yes" : "No") : cell}
            </td>
          ))}
        </tr>
      ))}
      <TableNewRow />
    </tbody>
  );
};

export default TableBody;


  /* {_.map(data, (row, index) => (
        <tr key={row.id} className={index % 2 === 0 ? "even" : "odd"}>
          <td>
            <input
              type="checkbox"
              checked={_.includes(selectedRows, row.id)}
              onChange={() => onCheckboxChange(row.id)}
            />
          </td>
          <td>{row}</td>
          {/* <td>{row.Name}</td>
          <td>{row.Description}</td>
          <td>{row.ShouldCook ? "Yes" : "No"}</td>
          <td>{row.nutrition}</td>
          <td>{row.Count}</td> 
        </tr>
      ))} */
