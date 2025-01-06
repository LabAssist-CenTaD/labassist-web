import "./ProgressBar.css";

import { AnnotationBar } from "./AnnotationBar/AnnotationBar";
import { TimeBar } from "./TimeBar/TimeBar";
import { Annotation } from "../../../types/jsondata";

interface ProgressBarProps {
  annotations: Annotation[];
  currentSeconds: number;
  durationSeconds: number;
  onScrubStart: () => void;
  onScrub: (seconds: number) => void;
  onScrubEnd: (seconds: number) => void;
}

export const ProgressBar = ({
  annotations,
  currentSeconds,
  durationSeconds,
  onScrubStart,
  onScrub,
  onScrubEnd,
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
        onScrubStart={onScrubStart}
        onScrub={onScrub}
        onScrubEnd={onScrubEnd}
      />
    </div>
  );
};
