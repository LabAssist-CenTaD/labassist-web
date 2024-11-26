import { EmojiHappy } from "iconsax-react";
import "./LogItem.css";

interface LogItemProps {
  logText: string;
}

export const LogItem = ({ logText }: LogItemProps): JSX.Element => {
  return (
    <div className="log-item">
      <EmojiHappy size="20" variant="Bold" color="rgba(6, 214, 160, 1)" />;
      <div className="log-text">{logText}</div>
    </div>
  );
};
