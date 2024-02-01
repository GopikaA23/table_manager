import React from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";
import _ from "lodash";

const TableBody = ({
  state,
  optionList,
  handleChange,
  handleCheckboxChange,
  handleSelect,
  handleKeyPress,
}) => {
  return (
    <tbody>
      {_.map(state.rows, (row, index) => (
        <tr key={row.id} className={index % 2 === 0 ? "even" : "odd"}>
          <td>
            <input
              type="checkbox"
              checked={_.includes(state.selectedRows, row.id)}
              onChange={() => handleCheckboxChange(row.id)}
            />
          </td>
          <td>{row.id}</td>
          <td>{row.name}</td>
          <td>{row.description}</td>
          <td>{row.shouldCook ? "Yes" : "No"}</td>
          <td>{row.nutrition}</td>
          <td>{row.count}</td>
        </tr>
      ))}
      <tr>
        <td></td>
        <td>{state.newRow.id}</td>
        <td>
          <input
            type="text"
            name="name"
            value={state.newRow.name}
            onChange={handleChange}
          />
        </td>
        <td>
          <input
            type="text"
            name="description"
            value={state.newRow.description}
            onChange={handleChange}
          />
        </td>
        <td>
          <input
            type="checkbox"
            name="shouldCook"
            checked={state.newRow.shouldCook}
            onChange={handleChange}
          />
        </td>
        <td>
          <MultiSelectDropdown
            optionList={optionList}
            onChange={handleSelect}
            value={state.selectedOptions}
          />
        </td>
        <td>
          <input
            type="number"
            name="count"
            value={state.newRow.count}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default TableBody;
