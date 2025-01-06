import "./PlayButton.css";
import playIcon from "../../../../assets/play-icon.svg";

import { Pause } from "iconsax-react";
import { Colors } from "../../../../styles/colors";
import { usePlaybackContext } from "../../../../hooks/usePlaybackContext";
import { useSelectedFileContext } from "../../../../hooks/useSelectedFileContext";

export const PlayButton = (): JSX.Element => {
  const { isPlaying, togglePlay } = usePlaybackContext(); // Use context to access playback state
  const { selectedFile } = useSelectedFileContext();

  const handlePlay = () => {
    togglePlay(); // Toggle play/pause when clicked
  };
  // console.log(selectedFile);
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
