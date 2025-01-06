import "./VideoMode.css";

import { useState } from "react";
import { VideoPlayer } from "./VideoPlayer/VideoPlayer";
import { PredictionTimeline } from "./PredictionTimeline/PredictionTimeline";

export const VideoMode = (): JSX.Element => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoPresent, setVideoPresent] = useState<boolean>(false);

  return (
    <div
      className={`video-mode ${
        videoUrl && videoPresent ? "video-present" : ""
      }`}
    >
      <VideoPlayer
        videoUrlChanged={setVideoUrl}
        setVideoPresent={setVideoPresent}
      />
      <PredictionTimeline />
    </div>
  );
};
