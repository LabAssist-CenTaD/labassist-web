import "./PreviousNextButton.css";

import { Backward, Forward } from "iconsax-react";
import { Colors } from "../../../../styles/colors";
import { Annotation } from "../../../../types/jsondata";
import { usePlaybackContext } from "../../../../hooks/usePlaybackContext";

interface PreviousNextButtonProps {
  type: "previous" | "next";
  annotations: Annotation[];
  currentSeconds: number;
}

export const PreviousNextButton = ({
  type,
  annotations,
  currentSeconds,
}: PreviousNextButtonProps): JSX.Element => {
  const { setSeekSeconds } = usePlaybackContext();

  const handlePreviousNext = (type: "previous" | "next") => {
    const startSeconds = annotations.map(
      (annotation) => annotation.start_seconds
    );

    const targetAnnotation =
      type === "previous"
        ? startSeconds
            .filter((start) => start < currentSeconds)
            .sort((a, b) => b - a)[1] // Get the second highest
        : Math.min(...startSeconds.filter((start) => start > currentSeconds));

    setSeekSeconds(targetAnnotation || currentSeconds);
  };

  return (
    <button
      className="previous-next-button"
      onClick={() => handlePreviousNext(type)}
    >
      {type === "previous" ? (
        <Backward size={16} variant="Bold" color={Colors.background} />
      ) : (
        <Forward size={16} variant="Bold" color={Colors.background} />
      )}
    </button>
  );
};
