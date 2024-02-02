import React from "react";
import Select from "react-select";

const MultiSelectDropdown = ({ options, onChange, value }) => {
  return (
    <div>
      <div>
        <Select
          options={options}
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
