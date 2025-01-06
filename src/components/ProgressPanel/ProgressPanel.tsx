import "./ProgressPanel.css";

import { useEffect, useState } from "react";
import { useSelectedFileContext } from "../../hooks/useSelectedFileContext";
import { MediaControls } from "./MediaControls/MediaControls";
import { TimeDisplay } from "./TimeDisplay/TimeDisplay";
import { ProgressBar } from "./ProgressBar/ProgressBar";
import { useCachedVideoContext } from "../../hooks/useCachedVideoContext";
import { usePlaybackContext } from "../../hooks/usePlaybackContext";
import { Annotation } from "../../types/jsondata";
import { config } from "../../config/config";

export const ProgressPanel = (): JSX.Element => {
  const { cachedVideos } = useCachedVideoContext();
  const { selectedFile } = useSelectedFileContext();
  const {
    currentSeconds,
    durationSeconds,
    isVideoLoading,
    startScrubbing,
    stopScrubbing,
    setScrubTargetSeconds,
  } = usePlaybackContext(); // Access playback state

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

  const handleScrubStart = () => startScrubbing();
  const handleScrub = (seconds: number) => {
    setScrubTargetSeconds(seconds);
    if (config.debug_level === 2)
      console.log(`PlaybackContext: Scrub target seconds = ${seconds}`);
  };

  const handleScrubEnd = (seconds: number) => {
    setScrubTargetSeconds(seconds);
    stopScrubbing();
  };

  if (isVideoLoading) {
    <div className="progress-panel">
      <MediaControls
        annotations={annotations}
        currentSeconds={Math.round(currentSeconds)}
        durationSeconds={Math.round(durationSeconds)}
      />
      <ProgressBar
        annotations={[]}
        currentSeconds={0}
        durationSeconds={0}
        onScrubStart={handleScrubStart}
        onScrub={handleScrub}
        onScrubEnd={handleScrubEnd}
      />
      <TimeDisplay
        currentSeconds={Math.round(currentSeconds)} // Show live or scrubbed time
        durationSeconds={Math.round(durationSeconds)}
        isVideoLoading={isVideoLoading}
      />
    </div>;
  }

  return (
    <div className="progress-panel">
      <MediaControls
        annotations={annotations}
        currentSeconds={Math.round(currentSeconds)}
        durationSeconds={Math.round(durationSeconds)}
      />
      <ProgressBar
        annotations={annotations}
        currentSeconds={Math.round(currentSeconds)} // Live current time from context
        durationSeconds={Math.round(durationSeconds)} // Live duration from context
        onScrubStart={handleScrubStart}
        onScrub={handleScrub}
        onScrubEnd={handleScrubEnd}
      />
      <TimeDisplay
        currentSeconds={Math.round(currentSeconds)} // Show live or scrubbed time
        durationSeconds={Math.round(durationSeconds)}
        isVideoLoading={isVideoLoading}
      />
    </div>
  );
};
