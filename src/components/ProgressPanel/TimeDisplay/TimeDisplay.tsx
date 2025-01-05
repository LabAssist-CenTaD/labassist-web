import "./TimeDisplay.css";

interface TimeDisplayProps {
  currentTime: string;
  duration: string;
}

export const TimeDisplay = ({
  currentTime,
  duration,
}: TimeDisplayProps): JSX.Element => {
  return <div className="time-display">{`${currentTime} / ${duration}`}</div>;
};
