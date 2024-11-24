// import React from "react";
import {
  Clock,
  CloseCircle,
  Danger,
  Star,
  TickCircle,
  Timer,
} from "iconsax-react"; // Import required icons
import "./Tag.css";

export type TagStatus =
  | "perfect"
  | "warnings-present"
  | "errors-present"
  | "complete"
  | "predicting"
  | "queued";

interface TagProps {
  status: TagStatus;
}

export const Tag = ({ status }: TagProps): JSX.Element => {
  // Define mappings for status to styles and icons
  const tagConfig = {
    perfect: {
      background: "rgba(6, 214, 160, 1)",
      icon: <Star size={8} variant="Bold" color="rgba(0, 33, 57, 1)" />,
      text: "Perfect",
    },
    "warnings-present": {
      background: "rgba(255, 209, 102, 1)",
      icon: <Danger size={8} variant="Bold" color="rgba(0, 33, 57, 1)" />,
      text: "Warnings Present",
    },
    "errors-present": {
      background: "rgba(239, 71, 111, 1)",
      icon: <CloseCircle size={8} variant="Bold" color="rgba(0, 33, 57, 1)" />,
      text: "Errors Present",
    },
    complete: {
      background: "rgba(0, 122, 255, 1)",
      icon: <TickCircle size={8} variant="Bold" color="rgba(0, 33, 57, 1)" />,
      text: "Complete",
    },
    predicting: {
      background: "rgba(201, 232, 255, 1)",
      icon: <Timer size={8} variant="Bold" color="rgba(0, 33, 57, 1)" />,
      text: "Predicting",
    },
    queued: {
      background: "rgba(98, 120, 136, 1)",
      icon: <Clock size={8} variant="Bold" color="rgba(0, 33, 57, 1)" />,
      text: "Queued",
    },
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
