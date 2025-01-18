import "./PlayButton.css";
import playIcon from "../../../../assets/play-icon.svg";

import { Pause } from "iconsax-react";
import { Colors } from "../../../../styles/colors";
import { usePlaybackContext } from "../../../../hooks/usePlaybackContext";
import { useSelectedFileContext } from "../../../../hooks/useSelectedFileContext";
import { config } from "../../../../config/config";

export const PlayButton = (): JSX.Element => {
  const { isPlaying, togglePlay } = usePlaybackContext(); // Use context to access playback state
  const { selectedFile } = useSelectedFileContext();

  const handlePlay = () => {
    togglePlay(); // Toggle play/pause when clicked
  };
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
