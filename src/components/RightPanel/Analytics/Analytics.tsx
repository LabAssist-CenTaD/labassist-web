import "./Analytics.css";
import { AnalyticsHeader } from "./AnalyticsHeader/AnalyticsHeader";
import { VideoPlayer } from "./VideoPlayer/VideoPlayer";

export const Analytics = (): JSX.Element => {
  return (
    <div className="analytics">
      <AnalyticsHeader />
      <div className="analytics-container">
        <VideoPlayer />
      </div>
    </div>
  );
};
