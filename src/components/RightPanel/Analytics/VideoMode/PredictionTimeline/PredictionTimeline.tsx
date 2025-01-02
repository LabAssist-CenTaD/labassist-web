import { useState } from "react";
import { PredictionTimelineFilterLabel } from "../../../../../types/filterlabel";
import { PredictionFilter } from "./PredictionFilter/PredictionFilter";
import "./PredictionTimeline.css";
import { Timeline } from "./Timeline/Timeline";

export const PredictionTimeline = (): JSX.Element => {
  const [activeLabels, setActiveLabels] = useState<
    PredictionTimelineFilterLabel[]
  >(["info", "warning", "error"]);

  return (
    <div className="prediction-timeline">
      <div className="prediction-timeline-header">Prediction Timeline</div>
      <PredictionFilter
        activeLabels={activeLabels}
        setActiveLabels={setActiveLabels}
      />
      <Timeline />
    </div>
  );
};
