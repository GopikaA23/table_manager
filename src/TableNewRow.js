import React from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { useTableContext } from "./TableContext";
import _ from "lodash";

const TableNewRow = () => {
  const {
    header,
    newRow,
    rows,
    onChange,
    selectedOptions,
    onKeyPress,
    onSelect,
    selectedRows,
    onCheckboxChange,
  } = useTableContext();

  return (
    <tr>
      {_.map(header, (data) => {
        switch (data.type) {
          case "text":
            return (
              <td key={data.name}>
                <input
                  type={data.type}
                  name={data.name}
                  value={newRow[data.name] || ""}
                  onChange={onChange}
                />
              </td>
            );
          case "dropdown":
            return (
              <td key={data.name}>
                <MultiSelectDropdown
                  options={data.options}
                  onChange={onSelect}
                  value={selectedOptions}
                />
              </td>
            );
          case "checkbox": 
            _.map(rows, (row) => {
              return (
                <td key={data.name}>
                  <input
                    type={data.type}
                    name={data.name}
                    checked={
                      data.name
                        ? newRow[data.name] || false
                        : _.includes(selectedRows, row.id)
                    }
                    onChange={
                      data.name
                        ? (e) => onChange(e)
                        : () => onCheckboxChange(row.id)
                    }
                  />
                </td>
              );
            });
          
          case "number":
            return (
              <td key={data.name}>
                <input
                  type={data.type}
                  name={data.name}
                  value={newRow[data.name] || "0"}
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                />
              </td>
            );
          default:
            return <td key={data.name}>{newRow[data.name]}</td>;
        }
      })}
    </tr>
  );
};

export default TableNewRow;
