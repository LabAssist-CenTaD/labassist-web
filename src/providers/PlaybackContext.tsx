import { createContext, useState, ReactNode, useEffect } from "react";
import { useSelectedFileContext } from "../hooks/useSelectedFileContext";

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
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
}

// Create the context
const PlaybackContext = createContext<PlaybackContextType | null>(null);

// Provider component
export const PlaybackProvider = ({ children }: { children: ReactNode }) => {
  const { selectedFile } = useSelectedFileContext(); // Access selected file from context
  const [currentSeconds, setCurrentSecondsState] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Reset playback when the selected video changes
  useEffect(() => {
    if (selectedFile.fileName) {
      setCurrentSeconds(0);
      setIsPlaying(false); // Optionally pause playback when changing files
    }
  }, [selectedFile]);

  const setCurrentSeconds = (newCurrentSeconds: number) => {
    setCurrentSecondsState(newCurrentSeconds);
  };

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

  // Play the video
  const play = () => {
    setIsPlaying(true);
  };

  // Pause the video
  const pause = () => {
    setIsPlaying(false);
  };

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <PlaybackContext.Provider
      value={{
        currentSeconds,
        durationSeconds,
        isPlaying,
        setCurrentSeconds,
        setPlaybackState,
        play,
        pause,
        togglePlay,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
};

export default PlaybackContext;
