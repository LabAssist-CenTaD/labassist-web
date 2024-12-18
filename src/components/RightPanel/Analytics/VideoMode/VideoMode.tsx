import "./VideoMode.css";

import { useState } from "react";
import { VideoPlayer } from "./VideoPlayer/VideoPlayer";
import { PredictionTimeline } from "./PredictionTimeline/PredictionTimeline";

export const VideoMode = (): JSX.Element => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  return (
    <div className={`video-mode ${videoUrl ? "video-present" : ""}`}>
      <VideoPlayer videoUrlChanged={setVideoUrl} />
      <PredictionTimeline />
    </div>
  );
};
