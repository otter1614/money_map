// src/App.js
import React from "react";
import "./styles.css";
import BudgetPage from "./components/BudgetPage";
import DataManagementUI from "./components/DataManagementUI";


function App() {
  return (
    <div className="App">
      {/* <BudgetPage /> */}
      <DataManagementUI />
    </div>  
  )
}
export default App;
