import "./MediaControls.css";

import { Annotation } from "../../../types/jsondata";
import { PlayButton } from "./PlayButton/PlayButton";
import { PreviousNextButton } from "./PreviousNextButton/PreviousNextButton";

interface MediaControlsProps {
  annotations: Annotation[];
  currentSeconds: number;
  durationSeconds: number;
}

export const MediaControls = ({
  annotations,
  currentSeconds,
  durationSeconds,
}: MediaControlsProps): JSX.Element => {
  return (
    <div className="media-controls">
      <PreviousNextButton
        type="previous"
        annotations={annotations}
        currentSeconds={currentSeconds}
        durationSeconds={durationSeconds}
      />
      <PlayButton />
      <PreviousNextButton
        type="next"
        annotations={annotations}
        currentSeconds={currentSeconds}
        durationSeconds={durationSeconds}
      />
    </div>
  );
};
