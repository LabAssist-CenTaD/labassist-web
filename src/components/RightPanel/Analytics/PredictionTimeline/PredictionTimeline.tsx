import "./PredictionTimeline.css";
import { PredictionFilter } from "./PredictionFilter/PredictionFilter";

export const PredictionTimeline = (): JSX.Element => {
  return (
    <div className="prediction-timeline">
      <div className="prediction-timeline-header">Prediction Timeline</div>
      <PredictionFilter />
    </div>
  );
};
