import { useState, useEffect } from "react";
import { getCachedVideoManager } from "../utils/socketUtils";

// Custom hook to track if the cached videos are ready
export function useCachedVideoManager() {
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    const cachedVideoManager = getCachedVideoManager();

    // Check if the cached videos are available after socket data is updated
    const checkDataReady = setInterval(() => {
      if (cachedVideoManager.getCachedVideos().length > 0) {
        setDataReady(true);
        clearInterval(checkDataReady);
      }
    }, 100);

    return () => clearInterval(checkDataReady); // Cleanup interval
  }, []);

  return dataReady; // Return the ready state
}
