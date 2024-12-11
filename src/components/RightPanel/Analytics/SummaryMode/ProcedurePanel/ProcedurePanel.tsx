import "./ProcedurePanel.css";
import { LogItem } from "./LogItem/LogItem";
import { HorizontalSeperator } from "../../../../HorizontalSeperator/HorizontalSeperator";
import React from "react";

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
          <React.Fragment key={index}>
            <LogItem key={index} type={log.type} logText={log.logText} />
            {index < logs.length - 1 && (
              <HorizontalSeperator key={`separator-${index}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
