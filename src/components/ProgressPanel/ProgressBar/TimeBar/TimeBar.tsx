import "./TimeBar.css";

interface TimeBarProps {
  currentSeconds: number;
  durationSeconds: number;
}

export const TimeBar = ({
  currentSeconds,
  durationSeconds,
}: TimeBarProps): JSX.Element => {
  if (currentSeconds > durationSeconds) {
    throw new Error("Current seconds cannot be greater than duration seconds");
  }
  const progressPercentage = (currentSeconds / durationSeconds) * 100;

  return (
    <div className="time-bar-duration">
      <div
        className="time-bar-current"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};
