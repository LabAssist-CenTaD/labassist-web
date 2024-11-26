import "./Analytics.css";
import { AnalyticsHeader } from "./AnalyticsHeader/AnalyticsHeader";
// import { VideoMode } from "./VideoMode/VideoMode";
import { SummaryMode } from "./SummaryMode/SummaryMode";

export const Analytics = (): JSX.Element => {
  return (
    <div className="analytics">
      <AnalyticsHeader />
      {/* <VideoMode /> */}
      <SummaryMode />
    </div>
  );
};