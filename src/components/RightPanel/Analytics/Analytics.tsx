import "./Analytics.css";
import { AnalyticsHeader } from "./AnalyticsHeader/AnalyticsHeader";
import { PredictionTimeline } from "./PredictionTimeline/PredictionTimeline";
import { VideoPlayer } from "./VideoPlayer/VideoPlayer";

export const Analytics = (): JSX.Element => {
  return (
    <div className="analytics">
      <AnalyticsHeader />
      <div className="analytics-container">
        <VideoPlayer />
        <PredictionTimeline />
      </div>
    </div>
  );
};
