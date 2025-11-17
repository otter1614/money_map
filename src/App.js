// src/App.js
import React from "react";
import "./styles.css";
import DataManagementUI from "./components/DataManagementUI";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import DashboardSection from "./components/DashboardSection";
import EntrySection from "./components/EntrySection";
import AnalysisSection from "./components/AnalysisSection";
import DataSection from "./components/DataSection";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-area">
        <Topbar />
        <main className="content">
          <DashboardSection />
          <EntrySection />
          <AnalysisSection />
          <DataSection />
        </main>
      </div>
    </div>
  );
}
export default App;
