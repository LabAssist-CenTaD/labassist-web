import { EmojiHappy, EmojiSad } from "iconsax-react";
import "./LogItem.css";
import { Colors } from "../../../../../../styles/colors";

interface LogItemProps {
  type: "correct" | "incorrect";
  logText: string;
}

const typeStyles = {
  correct: {
    icon_color: Colors.green,
    Icon: EmojiHappy,
  },
  incorrect: {
    icon_color: Colors.red,
    Icon: EmojiSad,
  },
};

export const LogItem = ({ type, logText }: LogItemProps): JSX.Element => {
  const { icon_color, Icon } = typeStyles[type];
  return (
    <div
      className="log-item"
      title={`${type.charAt(0).toUpperCase() + type.slice(1)} action`}
    >
      <Icon size="20" variant="Bold" color={icon_color} />
      <div className="log-text">{logText}</div>
    </div>
  );
};
