import "./Tag.css";

import {
  Clock,
  CloseCircle,
  Danger,
  Star,
  TickCircle,
  Timer,
  VideoTick,
} from "iconsax-react"; // Import required icons
import { Colors } from "../../../../../../../../styles/colors";
import { TagStatus } from "../../../../../../../../types/tagstatus";

interface TagProps {
  status: TagStatus;
}

export const Tag = ({ status }: TagProps): JSX.Element => {
  // Define mappings for status to styles and icons
  const tagConfig = {
    perfect: {
      background: Colors.green,
      icon: <Star size={8} variant="Bold" color={Colors.blue2} />,
      text: "Perfect",
    },
    "warnings-present": {
      background: Colors.yellow,
      icon: <Danger size={8} variant="Bold" color={Colors.blue2} />,
      text: "Warnings Present",
    },
    "errors-present": {
      background: Colors.red,
      icon: <CloseCircle size={8} variant="Bold" color={Colors.blue2} />,
      text: "Errors Present",
    },
    complete: {
      background: Colors.blue1,
      icon: <TickCircle size={8} variant="Bold" color={Colors.blue2} />,
      text: "Complete",
    },
    predicting: {
      background: Colors.foreground,
      icon: <Timer size={8} variant="Bold" color={Colors.blue2} />,
      text: "Predicting",
    },
    queued: {
      background: Colors.blueGrey,
      icon: <Clock size={8} variant="Bold" color={Colors.blue2} />,
      text: "Queued",
    },
    uploaded: { 
      background: Colors.blueGrey,
      icon: <VideoTick size={8} variant="Bold" color={Colors.blue2} />,
      text: "Uploaded",
    }
  };

  // Get the specific config based on the status
  const { background, icon, text } = tagConfig[status];

  return (
    <div className="tag" style={{ background }}>
      {icon}
      <div className="tag-text">{text}</div>
    </div>
  );
};
