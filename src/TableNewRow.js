import React from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { useTableContext } from "./TableContext";

const TableNewRow = ({ optionList }) => {
  const { newRow, onChange, selectedOptions, onKeyPress, onSelect } =
    useTableContext();
  return (
    <>
      <td></td>
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
          optionList={optionList}
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
      </td>
    </>
  );
};

export default TableNewRow;
