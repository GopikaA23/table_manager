import React, { useState, useEffect } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";

const optionList = [
  { value: "vitamin A", label: "Vitamin A" },
  { value: "vitamin B", label: "Vitamin B" },
  { value: "vitamin C", label: "Vitamin C" },
  { value: "vitamin D", label: "Vitamin D" },
  { value: "vitamin E", label: "Vitamin E" },
  { value: "calcium", label: "Calcium" },
  { value: "iron", label: "Iron" },
  { value: "protein", label: "Protein" },
];

const TableComponent = () => {
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({
    id: 1,
    name: "",
    description: "",
    shouldCook: false,
    nutrition: [],
    count: 0,
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [details, setDetails] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState();
  // const [detailsButtonVisible, setDetailsButtonVisible] = useState(true);

  const handleSelect = (optionList) => {
    setSelectedOptions(optionList);
    setNewRow((prevRow) => ({
      ...prevRow,
      nutrition: optionList.map((option) => option.value).join(","),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name === "count" && !isNaN(Number(value))) {
      setNewRow((prevState) => ({
        ...prevState,
        [name]: Number(value),
      }));
    } else {
      setNewRow((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };

  const handleDeleteRows = () => {
    setRows((prevRows) =>
      prevRows.filter((row) => !selectedRows.includes(row.id))
    );
    setSelectedRows([]);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setRows((prevRows) => [...prevRows, { ...newRow }]);
      setNewRow({
        id: newRow.id + 1,
        name: "",
        description: "",
        shouldCook: false,
        nutrition: [],
        count: 0,
      });
      setSelectedOptions([]);
    }
  };

  const handleLogsClick = () => {
    console.log(
      "Selected Rows:",
      selectedRows.map((id) => rows.find((row) => row.id === id))
    );
  };

  const handleDetailsClick = () => {
    setDetails(selectedRows.map((id) => rows.find((row) => row.id === id)));
    setDetails((prevDetails) =>
      prevDetails.map((row) => ({
        ...row,
        shouldCook: row.shouldCook ? "Yes" : "No",
      }))
    );
  };

  useEffect(() => {
    if (selectedRows.length === 1) {
      handleDetailsClick();
    } else {
      setDetails([]);
    }
  }, [selectedRows]);

  return (
    <div>
      <table className="table">
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
          {rows.map((row, index) => (
            <tr key={row.id} className={index % 2 === 0 ? "even" : "odd"}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
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
            <td>{newRow.id}</td>
            <td>
              <input
                type="text"
                name="name"
                value={newRow.name}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="description"
                value={newRow.description}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="shouldCook"
                checked={newRow.shouldCook}
                onChange={handleChange}
              />
            </td>
            <td>
              <MultiSelectDropdown
                optionList={optionList}
                onChange={handleSelect}
                value={selectedOptions}
              />
            </td>
            <td>
              <input
                type="number"
                name="count"
                value={newRow.count}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleDeleteRows} disabled={selectedRows.length === 0}>
        Delete
      </button>
      <button onClick={handleLogsClick} disabled={selectedRows.length === 0}>
        Logs
      </button>
      <button disabled={selectedRows.length === 0 || selectedRows.length > 1}>
        Details
      </button>
      {details.length > 0 && (
        <div className="list">
          {details.map((row) => (
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

export default TableComponent;
