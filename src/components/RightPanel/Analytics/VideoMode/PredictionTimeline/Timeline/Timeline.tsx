import "./Timeline.css";

import React, { useEffect, useState } from "react";

import { TimelineEntry } from "./TimelineEntry/TimelineEntry";
import { HorizontalSeperator } from "../../../../../HorizontalSeperator/HorizontalSeperator";
import { useSelectedFileContext } from "../../../../../../hooks/useSelectedFileContext";
import { useCachedVideoContext } from "../../../../../../hooks/useCachedVideoContext";
import { Annotation } from "../../../../../../types/jsondata";

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

  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  useEffect(() => {
    if (!selectedFile?.fileName) {
      setAnnotations([]); // Clear annotations if no file is selected
      return;
    }

    // Find the video data using the selected file name
    const videoData = cachedVideos.find(
      (video) => video.file_name === selectedFile.fileName
    );

    if (videoData?.annotations) {
      setAnnotations([...videoData.annotations]); // Update annotations
    } else {
      setAnnotations([]); // No annotations available
    }
  }, [selectedFile, cachedVideos]);

  useEffect(() => {
    console.log("Annotations updated:", annotations);
  }, [annotations]);

  // Sort annotations by start_seconds
  const sortedAnnotations = annotations.sort(
    (a, b) => a.start_seconds - b.start_seconds
  );

  return (
    <div className="timeline">
      {sortedAnnotations.map((entry, index) => (
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
