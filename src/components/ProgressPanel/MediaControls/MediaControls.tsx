import "./MediaControls.css";
import { PlayButton } from "./PlayButton/PlayButton";
import { PreviousNextButton } from "./PreviousNextButton/PreviousNextButton";

export const MediaControls = (): JSX.Element => {
  return (
    <div className="media-controls">
      <PreviousNextButton type="previous" />
      <PlayButton />
      <PreviousNextButton type="next" />
    </div>
  );
};
