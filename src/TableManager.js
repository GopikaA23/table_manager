import React, { useReducer } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";
import _ from "lodash";

const table = (state, action) => {
  switch (action.type) {
    case "checkboxChange":
      const { id } = action.payload;
      return {
        ...state,
        selectedRows: _.includes(state.selectedRows, id)
          ? _.filter(state.selectedRows, (rowId) => rowId !== id)
          : [...state.selectedRows, id],
      };

    case "valueChange":
      const { name, value, type, checked } = action.payload;
      const newValue = type === "checkbox" ? checked : value;

      if (name === "count" && !isNaN(Number(value))) {
        return {
          ...state,
          newRow: {
            ...state.newRow,
            [name]: Number(value),
          },
        };
      } else if (name === "name") {
        return {
          ...state,
          newRow: {
            ...state.newRow,
            [name]: value,
          },
        };
      } else {
        return {
          ...state,
          newRow: {
            ...state.newRow,
            [name]: newValue,
          },
        };
      }

    case "dropdown":
      return {
        ...state,
        selectedOptions: action.payload,
        newRow: {
          ...state.newRow,
          nutrition: action.payload.map((option) => option.value).join(","),
        },
      };

    case "delete":
      return {
        ...state,
        rows: state.rows.filter((row) => !state.selectedRows.includes(row.id)),
        selectedRows: [],
      };

    case "logs":
      console.log(
        "Selected Rows:",
        state.selectedRows.map((id) => state.rows.find((row) => row.id === id))
      );
      return state;

    case "details":
      return {
        ...state,
        details: state.selectedRows.map((id) =>
          state.rows.find((row) => row.id === id)
        ),
      };

    case "enterKey":
      return {
        ...state,
        rows: [...state.rows, { ...state.newRow }],
        newRow: {
          id: state.newRow.id + 1,
          name: "",
          description: "",
          shouldCook: false,
          nutrition: [],
          count: 0,
        },
        selectedRows: [],
        selectedOptions: [],
      };

    default:
      return state;
  }
};

const initialState = {
  rows: [],
  selectedRows: [],
  newRow: {
    id: 1,
    name: "",
    description: "",
    shouldCook: false,
    nutrition: [],
    count: 0,
  },
  selectedOptions: [],
  details: [],
};

const TableReducer = ({ optionList }) => {
  const [state, dispatch] = useReducer(table, initialState);

  const handleCheckboxChange = (id) => {
    dispatch({ type: "checkboxChange", payload: { id } });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "name") {
      dispatch({ type: "valueChange", payload: { name, value } });
    } else {
      dispatch({
        type: "valueChange",
        payload: { name, value, type, checked },
      });
    }
  };

  const handleSelect = (optionList) => {
    dispatch({ type: "dropdown", payload: optionList });
  };

  const handleDeleteRows = () => {
    dispatch({ type: "delete" });
  };

  const handleLogsClick = () => {
    dispatch({ type: "logs" });
  };

  const handleDetailsClick = () => {
    dispatch({ type: "details" });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch({ type: "enterKey" });
    }
    console.log("enter pressed");
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Should Cook</th>
            <th>Nutrition</th>
            <th>Count</th>
          </tr>
        </thead>
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
      </table>
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

export default TableReducer;
