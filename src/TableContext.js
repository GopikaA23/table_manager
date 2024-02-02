import React, { createContext, useContext, useReducer } from "react";
import _ from "lodash";

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
    case "CHECKBOX_CHANGE":
      const { id } = action.payload;
      return {
        ...state,
        selectedRows: _.includes(state.selectedRows, id)
          ? _.filter(state.selectedRows, (rowId) => rowId !== id)
          : [...state.selectedRows, id],
      };

    case "VALUE_CHANGE":
      const { name, value, type, checked } = action.payload;
      const newValue = type === "checkbox" ? checked : value;

      if (name === "Count" && !isNaN(Number(value))) {
        return {
          ...state,
          newRow: {
            ...state.newRow,
            [name]: Number(value),
          },
        };
      } else if (name === "Name") {
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

    case "DROPDOWN":
      return {
        ...state,
        selectedOptions: action.payload,
        newRow: {
          ...state.newRow,
          nutrition: _.join(
            _.map(action.payload, (option) => option.value),
            ","
          ),
        },
      };

    case "DELETE":
      return {
        ...state,
        rows: _.filter(state.rows, (row) =>
          _.includes(!state.selectedRows, row.id)
        ),
        selectedRows: [],
      };

    case "DETAILS":
      return {
        ...state,
        details: _.map(state.selectedRows, (id) =>
          state.rows.find((row) => row.id === id)
        ),
      };

    case "ENTER_KEY":
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

  const handleCheckboxChange = (id) => {
    dispatch({ type: "CHECKBOX_CHANGE", payload: { id } });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "name") {
      dispatch({ type: "VALUE_CHANGE", payload: { name, value } });
    } else {
      dispatch({
        type: "VALUE_CHANGE",
        payload: { name, value, type, checked },
      });
    }
  };

  const handleSelect = (optionList) => {
    dispatch({ type: "DROPDOWN", payload: optionList });
  };

  const handleDeleteRows = () => {
    dispatch({ type: "DELETE" });
  };

  const handleDetailsClick = () => {
    dispatch({ type: "DETAILS" });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch({ type: "ENTER_KEY" });
    }
  };

  const tableHeader = [
    { name: "", type: "checkbox" , isDropdown: false},
    { name: "ID", type: "", isDropdown: false },
    { name: "Name", type: "text" ,isDropdown: false},
    { name: "Description", type: "text" ,isDropdown: false},
    { name: "ShouldCook", type: "checkbox",isDropdown: false },
    { name: "Nutrition", type: "dropdown", isDropdown: true },
    { name: "Count", type: "number",isDropdown: false },
  ];

  const value = {
    rows: state.rows,
    selectedOptions: state.selectedOptions,
    newRow: state.newRow,
    selectedRows: state.selectedRows,
    details: state.details,
    header: tableHeader,
    onDelete: handleDeleteRows,
    onChange: handleChange,
    onCheckboxChange: handleCheckboxChange,
    onSelect: handleSelect,
    onDetailsClicked: handleDetailsClick,
    onKeyPress: handleKeyPress,
  };

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export const useTableContext = () => {
  const context = useContext(TableContext);

  if (!context) throw Error("");

  return context;
};

export { TableContext, TableProvider };
