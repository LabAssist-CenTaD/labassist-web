import "./PlayButton.css";
import playIcon from "../../../../assets/play-icon.svg";

import { useState } from "react";
import { Pause } from "iconsax-react";
import { Colors } from "../../../../styles/colors";

// import { Play } from "iconsax-react";
// import { Colors } from "../../../../styles/colors";

export const PlayButton = (): JSX.Element => {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(!playing);
  };

  return (
    <button className="play-button" title="Play" onClick={handlePlay}>
      {/* <Play size={16} variant="Bold" color={Colors.background} /> */}
      {playing ? (
        <img className="play-button-icon" alt="Play" src={playIcon} />
      ) : (
        <Pause size={12} variant="Bold" color={Colors.background} />
      )}
    </button>
  );
};
