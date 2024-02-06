import "./App.css";
import "./TableManager.css";
import TableManager from "./TableManager";
import { TableProvider } from "./TableContext";

function App() {
  const columnConfig = [
    { name: "", label: "", type: "checkbox", isDropdown: false },
    { name: "id", label: "Id", type: "", isDropdown: false },
    { name: "name", label: "Name", type: "text", isDropdown: false },
    {
      name: "description",
      label: "Description",
      type: "text",
      isDropdown: false,
    },
    {
      name: "shouldCook",
      label: "ShouldCook",
      type: "checkbox",
      isDropdown: false,
    },
    {
      name: "nutrition",
      label: "Nutrition",
      type: "dropdown",
      isDropdown: true,
    },
    { name: "count", label: "Count", type: "number", isDropdown: false },
  ];

  const nutritionList = [
    { value: "vitamin A", label: "Vitamin A" },
    { value: "vitamin B", label: "Vitamin B" },
    { value: "vitamin C", label: "Vitamin C" },
    { value: "vitamin D", label: "Vitamin D" },
    { value: "vitamin E", label: "Vitamin E" },
    { value: "calcium", label: "Calcium" },
    { value: "iron", label: "Iron" },
    { value: "protein", label: "Protein" },
  ];

  return (
    <div className="App">
      <TableProvider header={columnConfig} options={nutritionList}>
        <TableManager />
      </TableProvider>
    </div>
  );
}

export default App;
