// import React from "react";
import "./styles/global.css"; // Import global styles
import "./styles/variables.css"; // Import global variables
import "./styles/fonts.css"; // Import custom fonts

import { LeftPanel } from "./components/LeftPanel/LeftPanel";

function App() {
  return (
    <div className="app">
      <LeftPanel />
    </div>
  );
}

export default App;
