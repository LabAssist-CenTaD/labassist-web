import "./PredictionTimeline.css";
import { PredictionFilter } from "./PredictionFilter/PredictionFilter";
import { Timeline } from "./Timeline/Timeline";
import { VideoPlayer } from "./VideoPlayer/VideoPlayer";

export const PredictionTimeline = (): JSX.Element => {
  return (
    <div className="prediction-timeline">
      <VideoPlayer />
      <div className="prediction-timeline-right-container">
        <div className="prediction-timeline-header">Prediction Timeline</div>
        <PredictionFilter />
        <Timeline />
      </div>
    </div>
  );
};
