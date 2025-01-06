import "./MediaControls.css";

import { Annotation } from "../../../types/jsondata";
import { PlayButton } from "./PlayButton/PlayButton";
import { PreviousNextButton } from "./PreviousNextButton/PreviousNextButton";

interface MediaControlsProps {
  annotations: Annotation[];
  currentSeconds: number;
}

export const MediaControls = ({
  annotations,
  currentSeconds,
}: MediaControlsProps): JSX.Element => {
  return (
    <div className="media-controls">
      <PreviousNextButton
        type="previous"
        annotations={annotations}
        currentSeconds={currentSeconds}
      />
      <PlayButton />
      <PreviousNextButton
        type="next"
        annotations={annotations}
        currentSeconds={currentSeconds}
      />
    </div>
  );
};
