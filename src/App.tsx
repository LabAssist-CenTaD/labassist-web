// import React from "react";
import "./App.css";
import "./styles/variables.css"; // Import global variables
import "./styles/fonts.css"; // Import custom fonts

import { LeftPanel } from "./components/LeftPanel/LeftPanel";
import { RightPanel } from "./components/RightPanel/RightPanel";

function App() {
  return (
    <div className="app">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}

export default App;
