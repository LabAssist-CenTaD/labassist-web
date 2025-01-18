import "./VideoMode.css";

import { useState } from "react";
import { VideoPlayer } from "./VideoPlayer/VideoPlayer";
import { PredictionTimeline } from "./PredictionTimeline/PredictionTimeline";
import { usePlaybackContext } from "../../../../hooks/usePlaybackContext";

export const VideoMode = (): JSX.Element => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const { isVideoPresent, setIsVideoPresent } = usePlaybackContext();

  return (
    <div
      className={`video-mode ${
        videoUrl && isVideoPresent ? "video-present" : ""
      }`}
    >
      <VideoPlayer
        isVideoPresent={isVideoPresent}
        setIsVideoPresent={setIsVideoPresent}
        videoUrlChanged={setVideoUrl}
      />
      <PredictionTimeline />
    </div>
  );
};
