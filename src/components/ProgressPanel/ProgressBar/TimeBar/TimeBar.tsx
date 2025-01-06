import "./TimeBar.css";
import { useState, useEffect, useCallback } from "react";

interface TimeBarProps {
  currentSeconds: number;
  durationSeconds: number;
  onScrubStart: () => void;
  onScrub: (seconds: number) => void;
  onScrubEnd: (seconds: number) => void;
}

export const TimeBar = ({
  currentSeconds,
  durationSeconds,
  onScrubStart,
  onScrub,
  onScrubEnd,
}: TimeBarProps): JSX.Element => {
  const [isScrubbing, setIsScrubbing] = useState(false);

  if (currentSeconds > durationSeconds) {
    throw new Error("Current seconds cannot be greater than duration seconds");
  }

  const progressPercentage = (currentSeconds / durationSeconds) * 100;

  const getTargetSeconds = useCallback(
    (e: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
      const bar = document.querySelector(
        ".time-bar-duration"
      ) as HTMLDivElement;
      if (!bar) return 0;

      const rect = bar.getBoundingClientRect();
      const clickX = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
      const scrubPercentage = clickX / rect.width;
      return Math.min(scrubPercentage * durationSeconds, durationSeconds);
    },
    [durationSeconds]
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsScrubbing(true);
    onScrubStart();
    handleScrub(e); // Trigger an initial scrub action on click
  };

  const handleScrub = useCallback(
    (e: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
      const targetSeconds = getTargetSeconds(e);
      onScrub(targetSeconds); // Notify parent of the scrub position
    },
    [getTargetSeconds, onScrub]
  );

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      if (isScrubbing) {
        setIsScrubbing(false);
        const targetSeconds = getTargetSeconds(e);
        onScrubEnd(targetSeconds); // Notify parent of final scrub target
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isScrubbing) return;
      const targetSeconds = getTargetSeconds(e);
      onScrub(targetSeconds); // Notify parent of current scrub position
    };

    if (isScrubbing) {
      // Attach global listeners when scrubbing starts
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      // Clean up global listeners when scrubbing ends
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      // Clean up listeners on component unmount
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isScrubbing, getTargetSeconds, onScrub, onScrubEnd]);

  return (
    <div
      className={`time-bar-duration ${isScrubbing ? "scrubbing" : ""}`}
      onMouseDown={handleMouseDown}
    >
      <div
        className="time-bar-current"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};
