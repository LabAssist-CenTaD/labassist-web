import "./Timeline.css";
import React, { useMemo } from "react";
import { HorizontalSeperator } from "../../../../../HorizontalSeperator/HorizontalSeperator";
import { TimelineEntry } from "./TimelineEntry/TimelineEntry";
import { useSelectedFileContext } from "../../../../../../hooks/useSelectedFileContext";
import { useCachedVideoContext } from "../../../../../../hooks/useCachedVideoContext";

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

export const Timeline = (): JSX.Element => {
  const { selectedFile } = useSelectedFileContext();
  const { cachedVideos } = useCachedVideoContext(); // Access cached video data

  // Get annotations for the selected video
  const annotations = useMemo(() => {
    if (!selectedFile?.fileName) return [];

    // Find the video data using the selected file name
    const videoData = cachedVideos.find(
      (video) => video.file_name === selectedFile.fileName
    );

    // Return annotations if the video exists, otherwise an empty array
    return videoData?.annotations || [];
  }, [selectedFile, cachedVideos]);
  return (
    <div className="timeline">
      {annotations.map((entry, index) => (
        <React.Fragment key={index}>
          <TimelineEntry
            key={index}
            type={entry.type}
            timestamp={formatTime(entry.start_seconds)}
            message={entry.message}
          />
          {/* Add timeline separator for every entry except last one */}
          {index < annotations.length - 1 && (
            <HorizontalSeperator key={`separator-${index}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
