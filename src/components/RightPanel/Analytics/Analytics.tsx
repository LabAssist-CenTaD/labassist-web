import "./Analytics.css";
import { AnalyticsHeader } from "./AnalyticsHeader/AnalyticsHeader";
import { SummaryMode } from "./SummaryMode/SummaryMode";
import { VideoMode } from "./VideoMode/VideoMode";

export const Analytics = (): JSX.Element => {
  return (
    <div className="analytics">
      <AnalyticsHeader />
      <VideoMode />
      {/* <SummaryMode /> */}
    </div>
  );
};
