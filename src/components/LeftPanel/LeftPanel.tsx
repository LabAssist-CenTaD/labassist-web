import "./LeftPanel.css";

import { Logo } from "./Logo/Logo";
import { PredictionList } from "./PredictionList/PredictionList";

export const LeftPanel = (): JSX.Element => {
  return (
    <div className="left-panel">
      <Logo />
      <PredictionList />
    </div>
  );
};
