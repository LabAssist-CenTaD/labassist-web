import "./VideoMode.css";
import { VideoPlayer } from "./VideoPlayer/VideoPlayer";
import { PredictionTimeline } from "./PredictionTimeline/PredictionTimeline";

export const VideoMode = (): JSX.Element => {
  return (
    <div className="video-mode">
      <VideoPlayer />
      <PredictionTimeline />
    </div>
  );
};
