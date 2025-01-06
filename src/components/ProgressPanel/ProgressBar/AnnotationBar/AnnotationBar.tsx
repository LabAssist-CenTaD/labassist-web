import "./AnnotationBar.css";
import { Annotation } from "../../../../types/jsondata";

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

  return (
    <div className="annotation-bar">
      {/* Render warnings */}
      {warnings.map((annotation) => (
        <button
          key={`warning-${annotation.start_seconds}-${annotation.end_seconds}`}
          className="annotation warning"
          style={calculateStyle(
            annotation.start_seconds,
            annotation.end_seconds
          )}
        />
      ))}

      {/* Render errors (which overlap on top of warnings) */}
      {errors.map((annotation) => (
        <button
          key={`error-${annotation.start_seconds}-${annotation.end_seconds}`}
          className="annotation error"
          style={calculateStyle(
            annotation.start_seconds,
            annotation.end_seconds
          )}
        />
      ))}
    </div>
  );
};
