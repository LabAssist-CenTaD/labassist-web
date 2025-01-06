import "./AnnotationBar.css";

import { Annotation } from "../../../../types/jsondata";
import { formatTimeMMSS } from "../../../../utils/timeUtils";
import { usePlaybackContext } from "../../../../hooks/usePlaybackContext";
import { useAnnotationHighlightContext } from "../../../../hooks/useAnnotationHighlightContext";

interface AnnotationBarProps {
  annotations: Annotation[];
  currentSeconds: number;
  durationSeconds: number;
}

export const AnnotationBar = ({
  annotations,
  currentSeconds,
  durationSeconds,
}: AnnotationBarProps): JSX.Element => {
  const { setSeekSeconds } = usePlaybackContext();
  const { highlightedBarAnnotation, setHighlightedTimelineAnnotation } =
    useAnnotationHighlightContext();
  const { isVideoLoading } = usePlaybackContext();

  // Calculate the position and width of each annotation
  const calculateStyle = (start: number, end: number): React.CSSProperties => {
    const left = (start / durationSeconds) * 100; // Percentage based on start time
    const width = ((end - start) / durationSeconds) * 100; // Percentage width based on duration
    return {
      left: `${left}%`,
      width: `${width}%`,
    };
  };

  // Separate warnings and errors
  const warnings = annotations.filter(
    (annotation) => annotation.type === "warning"
  );
  const errors = annotations.filter(
    (annotation) => annotation.type === "error"
  );

  const handleClick = (seconds: number) => {
    setSeekSeconds(seconds);
  };

  const generateHighlightClassOnHover = (annotation: Annotation) => {
    if (highlightedBarAnnotation) {
      if (annotation === highlightedBarAnnotation) {
        return "";
      } else {
        return "hover-dimmed";
      }
    } else {
      return "";
    }
  };

  if (isVideoLoading) {
    return <div className="annotation-bar" />;
  }

  return (
    <div className="annotation-bar">
      <div
        className="progress-filter"
        style={{ width: `${(currentSeconds / durationSeconds) * 100}%` }}
      ></div>
      
      {/* Render warnings */}
      {warnings.map((annotation) => (
        <button
          key={`warning-${annotation.start_seconds}-${annotation.end_seconds}`}
          className={`annotation warning ${generateHighlightClassOnHover(
            annotation
          )}`}
          style={calculateStyle(
            annotation.start_seconds,
            annotation.end_seconds
          )}
          title={`${formatTimeMMSS(
            annotation.start_seconds
          )} - ${formatTimeMMSS(annotation.end_seconds)}: ${
            annotation.message
          }`}
          onClick={() => handleClick(annotation.start_seconds)}
          onMouseEnter={() => {
            setHighlightedTimelineAnnotation(annotation);
          }}
          onMouseLeave={() => setHighlightedTimelineAnnotation(null)}
        />
      ))}

      {/* Render errors (which overlap on top of warnings) */}
      {errors.map((annotation) => (
        <button
          key={`error-${annotation.start_seconds}-${annotation.end_seconds}`}
          className={`annotation error ${generateHighlightClassOnHover(
            annotation
          )}`}
          style={calculateStyle(
            annotation.start_seconds,
            annotation.end_seconds
          )}
          title={`${formatTimeMMSS(
            annotation.start_seconds
          )} - ${formatTimeMMSS(annotation.end_seconds)}: ${
            annotation.message
          }`}
          onClick={() => handleClick(annotation.start_seconds)}
          onMouseEnter={() => setHighlightedTimelineAnnotation(annotation)}
          onMouseLeave={() => setHighlightedTimelineAnnotation(null)}
        />
      ))}
    </div>
  );
};
