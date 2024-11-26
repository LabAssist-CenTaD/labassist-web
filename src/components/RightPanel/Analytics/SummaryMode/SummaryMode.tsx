import { ProcedurePanel } from "./ProcedurePanel/ProcedurePanel";
import "./SummaryMode.css";

// logsData containing all the necessary log details
const logsData: {
  [header: string]: { type: "incorrect" | "correct"; logText: string }[];
} = {
  "Filling Burette": [
    {
      type: "correct",
      logText: "Funnel detected while filling burette.",
    },
    {
      type: "correct",
      logText: "Check for air bubbles in the burette.",
    },
  ],
  "Pipetting Titrant": [
    { type: "correct", logText: "Pipette rinsed with titrant." },
    { type: "incorrect", logText: "Pipette filler used incorrectly." },
  ],
  "Swirling Conical Flask": [
    {
      type: "correct",
      logText: "Solution turned pink after swirling.",
    },
    { type: "incorrect", logText: "Ensure consistent swirling." },
  ],
};

export const SummaryMode = (): JSX.Element => {
  return (
    <div className="summary-mode">
      <div className="procedural-overview-header">Procedural Overview</div>
      <div className="procedure-panel-wrapper">
        {Object.keys(logsData).map((header) => (
          <ProcedurePanel
            key={header}
            header={header}
            logs={logsData[header]} // Pass the corresponding logs from logsData
          />
        ))}
      </div>
    </div>
  );
};
