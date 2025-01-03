import "./SelectModeToolbar.css";
import { ElementEqual, ExportCurve, Trash } from "iconsax-react";
import { ToolbarButton } from "./ToolbarButton/ToolbarButton";
import { Colors } from "../../../../styles/colors";

interface SelectModeToolbarProps {
  allFilesSelected: boolean;
  toggleSelectAllFiles: () => void; // Add a function to toggle select all files
}

export const SelectModeToolbar = ({
  allFilesSelected,
  toggleSelectAllFiles,
}: SelectModeToolbarProps): JSX.Element => {
  return (
    <div className="select-mode-toolbar">
      <ToolbarButton
        Icon={ElementEqual}
        label={allFilesSelected ? "Deselect All" : "Select All"}
        bg_color={Colors.foreground}
        onClick={toggleSelectAllFiles} // Pass the toggle function as onClick handler
      />
      <ToolbarButton
        Icon={ExportCurve}
        label="Predict"
        bg_color={Colors.blue1}
      />
      <ToolbarButton Icon={Trash} label="Upload" bg_color={Colors.red} />
    </div>
  );
};
