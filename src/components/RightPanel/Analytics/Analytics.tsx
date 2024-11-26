import "./Analytics.css";
import { AnalyticsHeader } from "./AnalyticsHeader/AnalyticsHeader";
import { PredictionTimeline } from "./PredictionTimeline/PredictionTimeline";

export const Analytics = (): JSX.Element => {
  return (
    <div className="analytics">
      <AnalyticsHeader />
      <PredictionTimeline />
    </div>
  );
};
