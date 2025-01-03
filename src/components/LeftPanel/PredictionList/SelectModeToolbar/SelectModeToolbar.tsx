// SelectModeToolbar.tsx
import "./SelectModeToolbar.css";

import { ElementEqual, ExportCurve, Trash } from "iconsax-react";
import { ToolbarButton } from "./ToolbarButton/ToolbarButton";
import { Colors } from "../../../../styles/colors";

interface SelectModeToolbarProps {
  allFilesSelected: boolean;
  toggleSelectAllFiles: () => void;
  onPredict: () => void; // Prop for the predict action
  onDelete: () => void; // Prop for the delete action
}

export const SelectModeToolbar = ({
  allFilesSelected,
  toggleSelectAllFiles,
  onPredict, // Receive onPredict prop
  onDelete, // Receive onDelete prop
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
      <ToolbarButton
        Icon={Trash}
        label="Delete"
        bg_color={Colors.red}
        onClick={onDelete} // Trigger the onDelete function when clicked
      />
    </div>
  );
};
