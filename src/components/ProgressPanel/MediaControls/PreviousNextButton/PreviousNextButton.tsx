import "./PreviousNextButton.css";

import { Backward, Forward } from "iconsax-react";
import { Colors } from "../../../../styles/colors";
import { Annotation } from "../../../../types/jsondata";
import { usePlaybackContext } from "../../../../hooks/usePlaybackContext";

interface PreviousNextButtonProps {
  type: "previous" | "next";
  annotations: Annotation[];
  currentSeconds: number;
  durationSeconds: number;
}

export const PreviousNextButton = ({
  type,
  annotations,
  currentSeconds,
  durationSeconds,
}: PreviousNextButtonProps): JSX.Element => {
  const { setSeekSeconds } = usePlaybackContext();

  const handlePreviousNext = (type: "previous" | "next") => {
    const startSeconds = annotations
      .filter((annotation) => annotation.type !== "info")
      .map((annotation) => annotation.start_seconds);

    // let targetAnnotation = null;

    // if (type === "previous") {
    //   targetAnnotation =
    //     currentSeconds < Math.min(...startSeconds)
    //       ? null
    //       : startSeconds
    //           .filter((start) => start < currentSeconds)
    //           .sort((a, b) => b - a)[1]; // Get the second highest
    // } else {
    //   targetAnnotation =
    //     currentSeconds > Math.max(...startSeconds)
    //       ? null
    //       : Math.min(...startSeconds.filter((start) => start > currentSeconds));
    // }

    const targetAnnotation =
      type === "previous"
        ? startSeconds
            .filter((start) => start < currentSeconds)
            .sort((a, b) => b - a)[1]
        : Math.min(...startSeconds.filter((start) => start > currentSeconds));

    // Ensure the target annotation is within the valid video range
    if (
      targetAnnotation !== null &&
      targetAnnotation >= 0 &&
      targetAnnotation <= durationSeconds
    ) {
      setSeekSeconds(targetAnnotation);
    } else {
      setSeekSeconds(currentSeconds); // Stay at current position if out of range
    }
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
