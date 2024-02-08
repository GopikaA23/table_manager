import React from "react";
import Select from "react-select";

const MultiSelectDropdown = ({ options, onChange, value }) => {
  return (
    <div>
      <div>
        <Select
          placeholder="Select nutrient"
          options={options}
          onChange={onChange}
          value={value}
          isSearchable={true}
          isMulti
        />
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
