import "./LeftPanel.css";

import { Logo } from "./Logo/Logo";
import { PredictionList } from "./PredictionList/PredictionList";
import { CachedVideoManager } from "../../managers/CachedVideoManager";

interface LeftPanelProps {
  cvm: CachedVideoManager;
}

export const LeftPanel = ({ cvm }: LeftPanelProps): JSX.Element => {
  return (
    <div className="left-panel">
      <Logo />
      <PredictionList cvm={cvm} />
    </div>
  );
};
