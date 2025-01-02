// PredictionTimeline.tsx

import { useState } from "react";
import { PredictionTimelineFilterLabelName } from "../../../../../types/filterlabel";
import { PredictionTimelineFilter } from "./PredictionTimelineFilter/PredictionTimelineFilter";
import "./PredictionTimeline.css";
import { Timeline } from "./Timeline/Timeline";

export const PredictionTimeline = (): JSX.Element => {
  const [activeLabels, setActiveLabels] = useState<
    PredictionTimelineFilterLabelName[]
  >(["info", "warning", "error"]);

  return (
    <div className="prediction-timeline">
      <div className="prediction-timeline-header">Prediction Timeline</div>
      <PredictionTimelineFilter
        activeLabels={activeLabels}
        setActiveLabels={setActiveLabels}
      />
      <Timeline activeLabels={activeLabels} /> {/* Pass activeLabels */}
    </div>
  );
};
