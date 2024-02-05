import React from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { useTableContext } from "./TableContext";
import _ from "lodash";

const TableNewRow = ({ options }) => {
  const { header, newRow, onChange, selectedOptions, onKeyPress, onSelect } =
    useTableContext();

  return (
    <tr>
      {_.map(header, (data) => {
        switch (data.type) {
          case "text":
            return (
              <td key={data.name}>
                <input
                  type={data.type}
                  name={data.label}
                  value={newRow[data.label] || ""}
                  onChange={onChange}
                />
              </td>
            );
          case "dropdown":
            return (
              <td key={data.name}>
                <MultiSelectDropdown
                  options={options}
                  onChange={onSelect}
                  value={selectedOptions}
                />
              </td>
            );
          case "checkbox":
            return (
              <td key={data.name}>
                <input
                  type={data.type}
                  name={data.label}
                  checked={newRow[data.label] || false}
                  onChange={onChange}
                />
              </td>
            );
          case "number":
            return (
              <td key={data.name}>
                <input
                  type={data.type}
                  name={data.label}
                  value={newRow[data.label] || "0"}
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                />
              </td>
            );
          default:
            return <td key={data.name}>{newRow[data.label]}</td>;
        }
      })}
    </tr>
  );
};

/* <td></td>
      <td>{newRow.id}</td>
      <td>
        <input
          type="text"
          name="name"
          value={newRow.name}
          onChange={onChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="description"
          value={newRow.description}
          onChange={onChange}
        />
      </td>
      <td>
        <input
          type="checkbox"
          name="shouldCook"
          checked={newRow.shouldCook}
          onChange={onChange}
        />
      </td>
      <td>
        <MultiSelectDropdown
          nutritionList={nutritionList}
          onChange={onSelect}
          value={selectedOptions}
        />
      </td>
      <td>
        <input
          type="number"
          name="count"
          value={newRow.count}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </td> */

export default TableNewRow;
