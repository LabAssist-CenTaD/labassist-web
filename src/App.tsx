import "./App.css";
import "./styles/variables.css"; // Import global variables
import "./styles/fonts.css"; // Import custom fonts

import { LeftPanel } from "./components/LeftPanel/LeftPanel";
import { RightPanel } from "./components/RightPanel/RightPanel";
import { CachedVideoProvider } from "./context/CachedVideoContext";

function App() {
  return (
    <CachedVideoProvider>
      <div className="app">
        <LeftPanel />
        <RightPanel />
      </div>
    </CachedVideoProvider>
  );
}

export default App;
