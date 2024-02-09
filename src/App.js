import "./App.css";
import "./TableManager.css";
import TableManager from "./TableManager";
import { TableProvider } from "./TableContext";

function App() {
  const columnConfig = [
    { name: "", label: "", type: "checkbox" },
    { name: "id", label: "Id", type: "" },
    { name: "name", label: "Name", type: "text" },
    {
      name: "description",
      label: "Description",
      type: "text",
    },
    {
      name: "shouldCook",
      label: "ShouldCook",
      type: "checkbox",
      isBoolean: true,
    },
    {
      name: "nutrition",
      label: "Nutrition",
      type: "dropdown",
      options: [
        { value: "vitamin A", label: "Vitamin A" },
        { value: "vitamin B", label: "Vitamin B" },
        { value: "vitamin C", label: "Vitamin C" },
        { value: "vitamin D", label: "Vitamin D" },
        { value: "vitamin E", label: "Vitamin E" },
        { value: "calcium", label: "Calcium" },
        { value: "iron", label: "Iron" },
        { value: "protein", label: "Protein" },
      ],
    },
    { name: "count", label: "Count", type: "number" },
  ];

  return (
    <div className="App">
      <TableProvider header={columnConfig}>
        <TableManager />
      </TableProvider>
    </div>
  );
}

export default App;
