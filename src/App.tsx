// import React from "react";
import "./App.css";
import "./styles/variables.css"; // Import global variables
import "./styles/fonts.css"; // Import custom fonts

import { LeftPanel } from "./components/LeftPanel/LeftPanel";
import { TagWrapper } from "./components/LeftPanel/PredictionList/CardWrapper/Card/StatusBar/TagWrapper/TagWrapper";
import { StatusCount } from "./components/LeftPanel/PredictionList/CardWrapper/Card/StatusBar/StatusCount/StatusCount";

function App() {
  const statusCounts = {
    correct: 5, // Number of correct items
    warning: 2, // Number of items with warnings
    error: 1, // Number of error items
  };

  return (
    <div className="app">
      <LeftPanel />
      <TagWrapper
        status_list={[
          "perfect",
          "warnings-present",
          "errors-present",
          "complete",
          "predicting",
          "queued",
        ]}
      />
      <StatusCount status_counts={statusCounts} />
    </div>
  );
}

export default App;
