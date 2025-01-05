import "./ProgressBar.css";

import { AnnotationBar } from "./AnnotationBar/AnnotationBar";
import { TimeBar } from "./TimeBar/TimeBar";
import { Annotation } from "../../../types/jsondata";

interface ProgressBarProps {
  annotations: Annotation[];
  currentSeconds: number;
  durationSeconds: number;
}

export const ProgressBar = ({
  annotations,
  currentSeconds,
  durationSeconds,
}: ProgressBarProps): JSX.Element => {
  return (
    <div className="progress-bar">
      <AnnotationBar
        annotations={annotations}
        currentSeconds={currentSeconds}
        durationSeconds={durationSeconds}
      />
      <TimeBar
        currentSeconds={currentSeconds}
        durationSeconds={durationSeconds}
      />
    </div>
  );
};
