// usePlaybackContext.ts
import { useContext } from "react";
import PlaybackContext from "../providers/PlaybackContext";

// Custom hook to use PlaybackContext
export const usePlaybackContext = () => {
  const context = useContext(PlaybackContext);
  if (!context) {
    throw new Error(
      "usePlaybackContext must be used within a PlaybackProvider"
    );
  }
  return context;
};
