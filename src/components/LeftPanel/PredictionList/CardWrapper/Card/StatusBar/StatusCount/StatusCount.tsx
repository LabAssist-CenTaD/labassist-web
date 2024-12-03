import blueCircle from "../../../../../../../assets/status_count/blue_circle.svg";
import yellowCircle from "../../../../../../../assets/status_count/yellow_circle.svg";
import redCircle from "../../../../../../../assets/status_count/red_circle.svg";

import "./StatusCount.css";

interface StatusCountProps {
  status_counts?: {
    info: number;
    warning: number;
    error: number;
  };
}

export const StatusCount = ({
  status_counts = { info: 0, warning: 0, error: 0 },
}: StatusCountProps): JSX.Element => {
  return (
    <div
      className="status-count-wrapper"
      title={`Info(s): ${status_counts.info}`}
    >
      {/* Info Count */}
      <div className="status-count">
        <img
          className="status-icon"
          alt="Info count icon"
          src={blueCircle}
        />
        <div className="status-text">{status_counts.info}</div>
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
