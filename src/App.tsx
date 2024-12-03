import "./App.css";
import "./styles/variables.css"; // Import global variables
import "./styles/fonts.css"; // Import custom fonts

import { LeftPanel } from "./components/LeftPanel/LeftPanel";
import { RightPanel } from "./components/RightPanel/RightPanel";
import { useInitSocket } from "./hooks/useInitSocket";


function App() { 
  useInitSocket(); // Initialise the socket connection

  // const dataReady = useCachedVideoManager(); // Use the custom hook

  // useEffect(() => {
  //   if (dataReady) {
  //     const cachedVideoManager = getCachedVideoManager();
  //     console.log(cachedVideoManager.getCachedVideos());
  //   }
  // }, [dataReady]); // Only run when dataReady changes

  return (
    <div className="app">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}

export default App;
