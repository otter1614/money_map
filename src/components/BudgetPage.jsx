// src/components/BudgetPage.jsx >> 전체 레이아웃 조립
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import DashboardSection from "./DashboardSection";
import EntrySection from "./EntrySection";
import AnalysisSection from "./AnalysisSection";
import DataSection from "./DataSection";

function BudgetPage() {
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

export default BudgetPage;
