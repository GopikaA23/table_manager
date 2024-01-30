import "./App.css";
import TableReducer from "./TableManager";
import "./TableManager.css";

function App() {
  return (
    <div className="App">
      <TableReducer
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
    </div>
  );
}

export default App;
