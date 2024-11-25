import "./PredictionTimeline.css";
import { PredictionFilter } from "./PredictionFilter/PredictionFilter";
import { Timeline } from "./Timeline/Timeline";

export const PredictionTimeline = (): JSX.Element => {
  return (
    <div className="prediction-timeline">
      <div className="prediction-timeline-header">Prediction Timeline</div>
      <PredictionFilter />
      <Timeline />
    </div>
  );
};
