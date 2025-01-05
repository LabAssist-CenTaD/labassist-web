import "./ProgressPanel.css";

import { useEffect, useState } from "react";
import { useSelectedFileContext } from "../../hooks/useSelectedFileContext";
import { MediaControls } from "./MediaControls/MediaControls";
import { TimeDisplay } from "./TimeDisplay/TimeDisplay";
import { ProgressBar } from "./ProgressBar/ProgressBar";
import { useCachedVideoContext } from "../../hooks/useCachedVideoContext";
import { usePlaybackContext } from "../../hooks/usePlaybackContext";
import { Annotation } from "../../types/jsondata";

export const ProgressPanel = (): JSX.Element => {
  const { cachedVideos } = useCachedVideoContext();
  const { selectedFile } = useSelectedFileContext();
  const { currentSeconds, durationSeconds } = usePlaybackContext(); // Access playback state

  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  useEffect(() => {
    const selectedVideo = cachedVideos.find(
      (video) => video.file_name === selectedFile.fileName
    );

    // Set annotations for the selected video
    if (selectedVideo) {
      setAnnotations(selectedVideo.annotations);
    } else {
      setAnnotations([]); // Fallback to empty array if no video found
    }
  }, [selectedFile, cachedVideos]); // Dependency array ensures update when these values change

  return (
    <div className="progress-panel">
      <MediaControls />
      <ProgressBar
        annotations={annotations}
        currentSeconds={Math.round(currentSeconds)} // Live current time from context
        durationSeconds={Math.round(durationSeconds)} // Live duration from context
      />
      <TimeDisplay
        currentSeconds={Math.round(currentSeconds)} // Live current time from context
        durationSeconds={Math.round(durationSeconds)} // Live duration from context
      />
    </div>
  );
};
