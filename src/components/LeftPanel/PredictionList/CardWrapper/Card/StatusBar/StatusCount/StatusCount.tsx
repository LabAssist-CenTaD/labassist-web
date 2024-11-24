import greenCircle from "../../../../../../../assets/status_count/green_circle.svg";
import yellowCircle from "../../../../../../../assets/status_count/yellow_circle.svg";
import redCircle from "../../../../../../../assets/status_count/red_circle.svg";

import "./StatusCount.css";

interface StatusCountProps {
  status_counts: {
    correct: number;
    warning: number;
    error: number;
  };
}

export const StatusCount = ({
  status_counts,
}: StatusCountProps): JSX.Element => {
  return (
    <div className="status-count-wrapper">
      {/* Correct Count */}
      <div className="status-count">
        <img
          className="status-icon"
          alt="Correct count icon"
          src={greenCircle}
          title={`Correct(s): ${status_counts.correct}`} // Display the count dynamically
        />
        <div className="status-text">{status_counts.correct}</div>
      </div>

      {/* Warning Count */}
      <div className="status-count">
        <img
          className="status-icon"
          alt="Warning count icon"
          src={yellowCircle}
          title={`Warning(s): ${status_counts.warning}`} // Display the count dynamically
        />
        <div className="status-text">{status_counts.warning}</div>
      </div>

      {/* Error Count */}
      <div className="status-count">
        <img
          className="status-icon"
          alt="Error count icon"
          src={redCircle}
          title={`Error(s): ${status_counts.error}`} // Display the count dynamically
        />
        <div className="status-text">{status_counts.error}</div>
      </div>
    </div>
  );
};
