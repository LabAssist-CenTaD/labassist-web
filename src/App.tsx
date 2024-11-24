// import React from "react";
import "./App.css";
import "./styles/variables.css"; // Import global variables
import "./styles/fonts.css"; // Import custom fonts

import { LeftPanel } from "./components/LeftPanel/LeftPanel";
import { TagWrapper } from "./components/LeftPanel/PredictionList/CardWrapper/Card/StatusBar/TagWrapper/TagWrapper";

function App() {
  return (
    <div className="app">
      <LeftPanel />
      <TagWrapper status_list={["perfect", "warnings-present", "errors-present", "complete", "predicting", "queued"]}/>
    </div>
  );
}

export default App;
