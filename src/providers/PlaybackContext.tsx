import { createContext, useState, ReactNode } from "react";

// Define the context type
interface PlaybackContextType {
  currentSeconds: number;
  durationSeconds: number;
  isPlaying: boolean;
  setCurrentSeconds: (currentSeconds: number) => void;
  setPlaybackState: (state: {
    currentSeconds: number;
    durationSeconds: number;
    isPlaying: boolean;
  }) => void;
}

// Create the context
const PlaybackContext = createContext<PlaybackContextType | null>(null);

// Provider component
export const PlaybackProvider = ({ children }: { children: ReactNode }) => {
  const [currentSeconds, setCurrentSecondsState] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to update currentSeconds
  const setCurrentSeconds = (newCurrentSeconds: number) => {
    setCurrentSecondsState(newCurrentSeconds);
  };

  // Function to update playback state
  const setPlaybackState = ({
    currentSeconds,
    durationSeconds,
    isPlaying,
  }: {
    currentSeconds: number;
    durationSeconds: number;
    isPlaying: boolean;
  }) => {
    setCurrentSecondsState(currentSeconds);
    setDurationSeconds(durationSeconds);
    setIsPlaying(isPlaying);
  };

  return (
    <PlaybackContext.Provider
      value={{
        currentSeconds,
        durationSeconds,
        isPlaying,
        setCurrentSeconds,
        setPlaybackState,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
};

export default PlaybackContext;
