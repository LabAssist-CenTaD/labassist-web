// Timeline.tsx

import "./Timeline.css";

import React, { useEffect, useState } from "react";

import { TimelineEntry } from "./TimelineEntry/TimelineEntry";
import { HorizontalSeperator } from "../../../../../HorizontalSeperator/HorizontalSeperator";
import { useSelectedFileContext } from "../../../../../../hooks/useSelectedFileContext";
import { useCachedVideoContext } from "../../../../../../hooks/useCachedVideoContext";
import { Annotation } from "../../../../../../types/jsondata";
import { formatTime } from "../../../../../../utils/timeUtils";

interface TimelineProps {
  activeLabels: string[]; // Receive active labels
}

export const Timeline = ({ activeLabels }: TimelineProps): JSX.Element => {
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

  // Sort annotations by start_seconds
  const sortedAnnotations = annotations.sort(
    (a, b) => a.start_seconds - b.start_seconds
  );

  // Filter annotations based on activeLabels
  const filteredAnnotations = sortedAnnotations.filter(
    (entry) => activeLabels.includes(entry.type) // Only include annotations of active types
  );

  return (
    <div className="timeline">
      {filteredAnnotations.map((entry, index) => (
        <React.Fragment key={index}>
          <TimelineEntry
            type={entry.type}
            timestamp={formatTime(entry.start_seconds)}
            message={entry.message}
          />
          {/* Add timeline separator for every entry except last one */}
          {index < filteredAnnotations.length - 1 && (
            <HorizontalSeperator key={`separator-${index}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
