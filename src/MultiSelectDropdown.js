import React from "react";
import Select from "react-select";

const MultiSelectDropdown = ({ optionList, onChange, value }) => {
  return (
    <div className="app">
      <div className="dropdown-container">
        <Select
          options={optionList}
          placeholder="Select nutrient"
          value={value}
          onChange={onChange}
          isSearchable={true}
          isMulti
        />
      </div>
    </div>
  );
};

export default MultiSelectDropdown;


