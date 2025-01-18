import "./ProgressBar.css";

import { AnnotationBar } from "./AnnotationBar/AnnotationBar";
import { TimeBar } from "./TimeBar/TimeBar";
import { Annotation } from "../../../types/jsondata";
import { config } from "../../../config/config";

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
  if (config.debug_level === 2) console.log("durationSeconds", durationSeconds);

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
