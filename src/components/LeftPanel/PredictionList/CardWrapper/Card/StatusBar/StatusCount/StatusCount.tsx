import greenCircle from "../../../../../../../assets/status_count/green_circle.svg";
import yellowCircle from "../../../../../../../assets/status_count/yellow_circle.svg";
import redCircle from "../../../../../../../assets/status_count/red_circle.svg";

import "./StatusCount.css";

interface StatusCountProps {
  status_counts?: {
    correct: number;
    warning: number;
    error: number;
  };
}

export const StatusCount = ({
  status_counts = { correct: 0, warning: 0, error: 0 },
}: StatusCountProps): JSX.Element => {
  return (
    <div
      className="status-count-wrapper"
      title={`Correct(s): ${status_counts.correct}`}
    >
      {/* Correct Count */}
      <div className="status-count">
        <img
          className="status-icon"
          alt="Correct count icon"
          src={greenCircle}
        />
        <div className="status-text">{status_counts.correct}</div>
      </div>

      {/* Warning Count */}
      <div
        className="status-count"
        title={`Warning(s): ${status_counts.warning}`}
      >
        <img
          className="status-icon"
          alt="Warning count icon"
          src={yellowCircle}
        />
        <div className="status-text">{status_counts.warning}</div>
      </div>

      {/* Error Count */}
      <div className="status-count" title={`Error(s): ${status_counts.error}`}>
        <img className="status-icon" alt="Error count icon" src={redCircle} />
        <div className="status-text">{status_counts.error}</div>
      </div>
    </div>
  );
};
