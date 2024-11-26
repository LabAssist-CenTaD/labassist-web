import { EmojiHappy, EmojiSad } from "iconsax-react";
import "./LogItem.css";

interface LogItemProps {
  type: "correct" | "incorrect";
  logText: string;
}

const typeStyles = {
  correct: {
    icon_color: "rgba(6, 214, 160, 1)",
    Icon: EmojiHappy,
  },
  incorrect: {
    icon_color: "rgba(239, 71, 111, 1)",
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
