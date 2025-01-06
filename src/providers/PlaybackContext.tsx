import { createContext, useState, ReactNode, useEffect } from "react";
import { useSelectedFileContext } from "../hooks/useSelectedFileContext";

// Define the context type
interface PlaybackContextType {
  currentSeconds: number;
  durationSeconds: number;
  isPlaying: boolean;
  isScrubbing: boolean;
  scrubTargetSeconds: number | null;
  setCurrentSeconds: (currentSeconds: number) => void;
  setPlaybackState: (state: {
    currentSeconds: number;
    durationSeconds: number;
    isPlaying: boolean;
  }) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  startScrubbing: () => void;
  stopScrubbing: () => void;
  setScrubTargetSeconds: (seconds: number) => void;
}

// Create the context
const PlaybackContext = createContext<PlaybackContextType | null>(null);

// Provider component
export const PlaybackProvider = ({ children }: { children: ReactNode }) => {
  const { selectedFile } = useSelectedFileContext(); // Access selected file from context
  const [currentSeconds, setCurrentSecondsState] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false); // Tracks if the user is scrubbing
  const [scrubTargetSeconds, setScrubTargetSecondsState] = useState<
    number | null
  >(null); // Target time during scrubbing

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

  // Start scrubbing
  const startScrubbing = () => {
    setIsScrubbing(true);
  };

  // Stop scrubbing
  const stopScrubbing = () => {
    setIsScrubbing(false);
    setScrubTargetSecondsState(null); // Reset scrub target when scrubbing ends
  };

  // Update the scrub target seconds
  const setScrubTargetSeconds = (seconds: number) => {
    setScrubTargetSecondsState(seconds);
  };

  return (
    <PlaybackContext.Provider
      value={{
        currentSeconds,
        durationSeconds,
        isPlaying,
        isScrubbing,
        scrubTargetSeconds,
        setCurrentSeconds,
        setPlaybackState,
        play,
        pause,
        togglePlay,
        startScrubbing,
        stopScrubbing,
        setScrubTargetSeconds,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
};

export default PlaybackContext;
