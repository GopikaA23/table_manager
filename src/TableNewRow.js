import React from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { useTableContext } from "./TableContext";
import _ from "lodash";

const TableNewRow = ({ options }) => {
  const { header, newRow, onChange, selectedOptions, onKeyPress, onSelect } =
    useTableContext();

  return _.map(header, (data) => {
    
    switch (data.type) {
      case "text":
        return (
          <td>
            <input
              type={data.type}
              name={data.name}
              value={newRow[data.name]}
              onChange={onChange}
            />
          </td>
        );
      case "dropdown":
        return (
          <td>
            <MultiSelectDropdown
              options={options}
              onChange={onSelect}
              value={selectedOptions}
            />
          </td>
        );
      case "checkbox":
        const checked = data.name;
        return (
          <td>
            <input
              type={data.type}
              name={data.name}
              checked={newRow[checked]}
              onChange={onChange}
            />
          </td>
        );
      case "number":
        return (
          <td>
            <input
              type={data.type}
              name={data.name}
              onChange={onChange}
              onKeyPress={onKeyPress}
            />
          </td>
        );
      default:
        return <td>{newRow.id}</td>;
    }
  });
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
