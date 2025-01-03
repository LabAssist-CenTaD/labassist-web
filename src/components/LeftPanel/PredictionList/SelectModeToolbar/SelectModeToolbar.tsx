import "./SelectModeToolbar.css"

import { ElementEqual, ExportCurve, Trash } from "iconsax-react";
import { ToolbarButton } from "./ToolbarButton/ToolbarButton";
import { Colors } from "../../../../styles/colors";

export const SelectModeToolbar = (): JSX.Element => {
  return (
    <div className="select-mode-toolbar">
      <ToolbarButton
        Icon={ElementEqual}
        label="Select All"
        bg_color={Colors.foreground}
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
