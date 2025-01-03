// SelectModeToolbar.tsx
import "./SelectModeToolbar.css";

import { ElementEqual, ExportCurve, Trash } from "iconsax-react";
import { ToolbarButton } from "./ToolbarButton/ToolbarButton";
import { Colors } from "../../../../styles/colors";

interface SelectModeToolbarProps {
  allFilesSelected: boolean;
  toggleSelectAllFiles: () => void;
  onPredict: () => void; // Add a prop for the predict action
}

export const SelectModeToolbar = ({
  allFilesSelected,
  toggleSelectAllFiles,
  onPredict, // Receive onPredict prop
}: SelectModeToolbarProps): JSX.Element => {
  return (
    <div className="select-mode-toolbar">
      <ToolbarButton
        Icon={ElementEqual}
        label={allFilesSelected ? "Deselect All" : "Select All"}
        bg_color={Colors.foreground}
        onClick={toggleSelectAllFiles}
      />
      <ToolbarButton
        Icon={ExportCurve}
        label="Predict"
        bg_color={Colors.blue1}
        onClick={onPredict} // Trigger the onPredict function when clicked
      />
      <ToolbarButton Icon={Trash} label="Upload" bg_color={Colors.red} />
    </div>
  );
};
