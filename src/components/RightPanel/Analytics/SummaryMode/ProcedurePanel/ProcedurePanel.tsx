import { LogItem } from "./LogItem/LogItem";
import "./ProcedurePanel.css";

interface ProcedurePanelProps {
  header: string;
}

export const ProcedurePanel = ({
  header,
}: ProcedurePanelProps): JSX.Element => {
  return (
    <div className="procedure-panel">
      <div className="procedure-panel-header">{header}</div>
      <div className="procedure-panel-content">
        <LogItem logText="Funnel detected while filling burette." />
      </div>
    </div>
  );
};
