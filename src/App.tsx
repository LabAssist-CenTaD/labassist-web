import "./App.css";
import "./styles/variables.css"; // Import global variables
import "./styles/fonts.css"; // Import custom fonts

import { useEffect } from "react";
import { LeftPanel } from "./components/LeftPanel/LeftPanel";
import { RightPanel } from "./components/RightPanel/RightPanel";
import { authenticateSocket, initSocket } from "./utils/socketUtils";
import { getOrCreateDeviceId } from "./utils/deviceIdUtils";

function App() {
  useEffect(() => {
    // Initialise the socket connection
    initSocket();

    // Emit ID
    authenticateSocket(getOrCreateDeviceId());
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="app">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}

export default App;
