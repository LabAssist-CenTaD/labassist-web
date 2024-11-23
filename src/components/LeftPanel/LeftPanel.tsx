import { Logo } from "./Logo/Logo";
import { Toolbar } from "./Toolbar/Toolbar";
import "./LeftPanel.css";

export const LeftPanel = (): JSX.Element => {
  return (
    <div className="left-panel">
      <Logo />
      <Toolbar />
    </div>
  );
};
