import "./App.css";
import "./styles/variables.css"; // Import global variables
import "./styles/fonts.css"; // Import custom fonts

import { LeftPanel } from "./components/LeftPanel/LeftPanel";
import { RightPanel } from "./components/RightPanel/RightPanel";
import { CachedVideoManager } from "./managers/CachedVideoManager";
import { useState, useEffect } from "react";
import { useSocket } from "./hooks/useSocket";

const cvm = new CachedVideoManager({ cached_videos: [] }); // Initialise with empty cached_videos

function App() {
  const [, forceUpdate] = useState(0); // Force re-render

  // Set the update callback
  useEffect(() => {
    cvm.setUpdateCallback(() => forceUpdate((x) => x + 1));
  }, []); // Empty dependency array ensures this runs only once

  useSocket(cvm); // Initialise socket and trigger re-renders when cvm changes

  return (
    <div className="app">
      <LeftPanel cvm={cvm} />
      <RightPanel />
    </div>
  );
}

export default App;
