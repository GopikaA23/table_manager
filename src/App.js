import "./App.css";
import "./TableManager.css";
import TableManager from "./TableManager";
import { TableProvider } from "./TableContext";

function App() {
  return (
    <div className="App">
      <TableProvider>
        <TableManager
          header={[
            "",
            "ID",
            "Name",
            "Description",
            "ShouldCook",
            "Nutrition",
            "count",
          ]}
          optionList={[
            { value: "vitamin A", label: "Vitamin A" },
            { value: "vitamin B", label: "Vitamin B" },
            { value: "vitamin C", label: "Vitamin C" },
            { value: "vitamin D", label: "Vitamin D" },
            { value: "vitamin E", label: "Vitamin E" },
            { value: "calcium", label: "Calcium" },
            { value: "iron", label: "Iron" },
            { value: "protein", label: "Protein" },
          ]}
        />
      </TableProvider>
    </div>
  );
}

export default App;
