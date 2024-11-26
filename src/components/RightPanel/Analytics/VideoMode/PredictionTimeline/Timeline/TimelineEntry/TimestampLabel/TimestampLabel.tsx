import { Colors } from "../../../../../../../../styles/colors";
import "./TimestampLabel.css";
import { CloseCircle, Danger, InfoCircle } from "iconsax-react";

interface TimestampLabelProps {
  type: "info" | "warning" | "error"; // Define the possible types
  timestamp: string;
}

const typeStyles = {
  info: {
    bg_color: Colors.blue1,
    Icon: InfoCircle,
    label: "Info",
  },
  warning: {
    bg_color: Colors.yellow,
    Icon: Danger,
    label: "Warning",
  },
  error: {
    bg_color: Colors.red,
    Icon: CloseCircle,
    label: "Error",
  },
};

export const TimestampLabel = ({
  type,
  timestamp,
}: TimestampLabelProps): JSX.Element => {
  const { bg_color, Icon, label } = typeStyles[type]; // Select styles based on type

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
      <Icon size={8} variant="Bold" color={Colors.background} />
      <div className="timestamp">{timestamp}</div>
    </div>
  );
};
