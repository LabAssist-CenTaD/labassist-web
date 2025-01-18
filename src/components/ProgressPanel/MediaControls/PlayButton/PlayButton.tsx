import "./PlayButton.css";
import playIcon from "../../../../assets/play-icon.svg";

import { useEffect, useCallback } from "react";
import { Pause } from "iconsax-react";
import { Colors } from "../../../../styles/colors";
import { usePlaybackContext } from "../../../../hooks/usePlaybackContext";
import { useSelectedFileContext } from "../../../../hooks/useSelectedFileContext";
import { config } from "../../../../config/config";

export const PlayButton = (): JSX.Element => {
  const { isPlaying, togglePlay } = usePlaybackContext(); // Use context to access playback state
  const { selectedFile } = useSelectedFileContext();

  const handlePlay = useCallback(() => {
    if (!selectedFile.fileName) return; // Prevent action if button is disabled
    togglePlay(); // Toggle play/pause when clicked or spacebar is pressed
  }, [togglePlay, selectedFile]);

  // Add a keydown event listener for the spacebar
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault(); // Prevent default scrolling behaviour
        handlePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // Clean up the event listener
    };
  }, [handlePlay]);

  if (config.debug_level === 2)
    console.log(
      `Selected file received by PlayButton: ${selectedFile.fileName}`
    );

  return (
    <button
      className="play-button"
      title="Play"
      onClick={handlePlay}
      disabled={!selectedFile.fileName}
    >
      {isPlaying ? (
        <Pause size={12} variant="Bold" color={Colors.background} />
      ) : (
        <img className="play-button-icon" alt="Play" src={playIcon} />
      )}
    </button>
  );
};
