import React, { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import Modal from "./components/Modal";
import Visual from "./components/VisualizationDashboard";
import FinishMoney from "./components/FinishMoney";
import Test from "./components/Test.js";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <Layout>
      <Visual />
      <FinishMoney />
      <Test />
    </Layout>
  );
}

export default App;
