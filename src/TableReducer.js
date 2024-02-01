import React, { useContext } from "react";
import { TableContext } from "./TableContext";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";

const TableReducer = ({ optionList, header }) => {
  const { state, dispatch } = useContext(TableContext);

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
  };

  return (
    <div>
      <table className="table">
        <TableHeader header={header} />
        <TableBody
          state={state}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
          handleSelect={handleSelect}
          handleKeyPress={handleKeyPress}
          optionList={optionList}
        />
      </table>
      <TableFooter
        state={state}
        handleDeleteRows={handleDeleteRows}
        handleDetailsClick={handleDetailsClick}
        handleLogsClick={handleLogsClick}
      />
    </div>
  );
};

export default TableReducer;
