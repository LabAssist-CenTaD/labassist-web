import "./App.css";
import "./styles/variables.css"; // Import global variables
import "./styles/fonts.css"; // Import custom fonts

import { LeftPanel } from "./components/LeftPanel/LeftPanel";
import { RightPanel } from "./components/RightPanel/RightPanel";
import AppProviders from "./providers/AppProviders";

function App() {
  return (
    <AppProviders>
      <div className="app">
        <LeftPanel />
        <RightPanel />
      </div>
    </AppProviders>
  );
}

export default App;
