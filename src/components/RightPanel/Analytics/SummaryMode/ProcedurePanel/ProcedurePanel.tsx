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
      <div className="procedure-panel-content"></div>
    </div>
  );
};
