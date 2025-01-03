import "./ToolbarButton.css";

import { Colors } from "../../../../../styles/colors";

interface ToolbarButtonProps {
  Icon: React.ElementType;
  label: string;
  bg_color: string;
  onClick?: () => void;
}

export const ToolbarButton = ({
  Icon,
  label,
  bg_color,
  onClick,
}: ToolbarButtonProps): JSX.Element => {
  return (
    <div
      className="toolbar-button"
      style={{ backgroundColor: bg_color } as React.CSSProperties}
      onClick={onClick} // Added onClick handler
    >
      <Icon size={16} variant="Bold" color={Colors.background} />
      {label}
    </div>
  );
};
