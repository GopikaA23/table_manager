import React, { createContext, useReducer } from "react";

const TableContext = createContext();

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

const tableReducer = (state, action) => {
  switch (action.type) {
    case "checkboxChange":
      const { id } = action.payload;
      return {
        ...state,
        selectedRows: state.selectedRows.includes(id)
          ? state.selectedRows.filter((rowId) => rowId !== id)
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

const TableProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tableReducer, initialState);

  return (
    <TableContext.Provider value={{ state, dispatch }}>
      {children}
    </TableContext.Provider>
  );
};

export { TableContext, TableProvider };
