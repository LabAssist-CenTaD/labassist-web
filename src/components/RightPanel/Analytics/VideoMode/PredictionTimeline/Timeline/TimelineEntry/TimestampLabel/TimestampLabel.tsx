import { Colors } from "../../../../../../../../styles/colors";
import "./TimestampLabel.css";
import { CloseCircle, Danger, InfoCircle } from "iconsax-react";

interface TimestampLabelProps {
  type: "info" | "warning" | "error"; // Define the possible types
  timestamp: string;
  active: boolean;
}

const typeStylesActive = {
  info: {
    bg_color: Colors.blue1,
    main_color: Colors.background,
    Icon: InfoCircle,
    label: "Info",
  },
  warning: {
    bg_color: Colors.yellow,
    main_color: Colors.background,
    Icon: Danger,
    label: "Warning",
  },
  error: {
    bg_color: Colors.red,
    main_color: Colors.background,
    Icon: CloseCircle,
    label: "Error",
  },
};

const typeStylesInactive = {
  info: {
    bg_color: "transparent",
    main_color: Colors.blue1,
    Icon: InfoCircle,
    label: "Info",
  },
  warning: {
    bg_color: "transparent",
    main_color: Colors.yellow,
    Icon: Danger,
    label: "Warning",
  },
  error: {
    bg_color: "transparent",
    main_color: Colors.red,
    Icon: CloseCircle,
    label: "Error",
  },
};

export const TimestampLabel = ({
  type,
  timestamp,
  active,
}: TimestampLabelProps): JSX.Element => {
  const { bg_color, main_color, Icon, label } = active
    ? typeStylesActive[type]
    : typeStylesInactive[type]; // Select styles based on type

  return (
    <div
      className="timestamp-label"
      style={
        {
          "--bg-color": bg_color,
        } as React.CSSProperties
      }
      title={`${label} at ${timestamp}`} // Dynamic title
    >
      <Icon size={8} variant="Bold" color={main_color} />
      <div className="timestamp" style={{ color: main_color }}>
        {timestamp}
      </div>
    </div>
  );
};
