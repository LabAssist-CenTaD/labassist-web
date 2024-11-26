import { ProcedurePanel } from "./ProcedurePanel/ProcedurePanel";
import "./SummaryMode.css";

export const SummaryMode = (): JSX.Element => {
  return (
    <div className="summary-mode">
      <div className="procedural-overview-header">Procedural Overview</div>
      <div className="procedure-panel-wrapper">
        <ProcedurePanel header="Filling Burette" />
        <ProcedurePanel header="Pipetting Titrant" />
        <ProcedurePanel header="Swirling Conical Flask" />
      </div>
    </div>
  );
};
