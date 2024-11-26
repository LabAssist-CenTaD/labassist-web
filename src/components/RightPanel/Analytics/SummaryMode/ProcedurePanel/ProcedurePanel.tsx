import { LogItem } from "./LogItem/LogItem";
import "./ProcedurePanel.css";

interface ProcedurePanelProps {
  header: string;
  logs: { type: "incorrect" | "correct"; logText: string }[]; // Define logs prop
}

export const ProcedurePanel = ({
  header,
  logs,
}: ProcedurePanelProps): JSX.Element => {
  return (
    <div className="procedure-panel">
      <div className="procedure-panel-header">{header}</div>
      <div className="procedure-panel-content">
        {logs.map((log, index) => (
          <LogItem key={index} type={log.type} logText={log.logText} />
        ))}
      </div>
    </div>
  );
};
