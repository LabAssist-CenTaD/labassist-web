import "./App.css";
// import "./styles/variables.css"; // Import global variables
// import "./styles/fonts.css"; // Import custom fonts

import { PlaybackProvider } from "./providers/PlaybackContext";
import AppProviders from "./providers/AppProviders";
import { LeftPanel } from "./components/LeftPanel/LeftPanel";
import { ProgressPanel } from "./components/ProgressPanel/ProgressPanel";
import { RightPanel } from "./components/RightPanel/RightPanel";

function App() {
  return (
    <AppProviders>
      <div className="app">
        <div className="panel-container">
          <LeftPanel />
          <RightPanel />
        </div>
        <PlaybackProvider>
          <ProgressPanel />
        </PlaybackProvider>
      </div>
    </AppProviders>
  );
}

export default App;
