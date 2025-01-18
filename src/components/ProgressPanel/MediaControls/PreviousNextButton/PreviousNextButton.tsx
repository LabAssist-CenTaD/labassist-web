import "./PreviousNextButton.css";

import { useEffect, useCallback } from "react";
import { Backward, Forward } from "iconsax-react";
import { Colors } from "../../../../styles/colors";
import { Annotation } from "../../../../types/jsondata";
import { usePlaybackContext } from "../../../../hooks/usePlaybackContext";
import { useSelectedFileContext } from "../../../../hooks/useSelectedFileContext";

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
  const { selectedFile } = useSelectedFileContext();

  const handlePreviousNext = useCallback(
    (type: "previous" | "next") => {
      if (!selectedFile.fileName) return; // Prevent action if button is disabled
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
    },
    [annotations, currentSeconds, durationSeconds, setSeekSeconds, selectedFile]
  );

  // Add a keydown event listener for left and right arrow keys
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "ArrowLeft") {
        handlePreviousNext("previous");
      } else if (event.code === "ArrowRight") {
        handlePreviousNext("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // Clean up the event listener
    };
  }, [handlePreviousNext]);

  return (
    <button
      className="previous-next-button"
      onClick={() => handlePreviousNext(type)}
      disabled={!selectedFile.fileName}
    >
      {type === "previous" ? (
        <Backward size={16} variant="Bold" color={Colors.background} />
      ) : (
        <Forward size={16} variant="Bold" color={Colors.background} />
      )}
    </button>
  );
};
