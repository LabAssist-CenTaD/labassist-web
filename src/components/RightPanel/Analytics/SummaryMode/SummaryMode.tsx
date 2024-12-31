import "./SummaryMode.css";

import { useEffect, useState } from "react";

import { Annotation } from "../../../../types/jsondata";
import { SummaryText, summaryTexts } from "../../../../data/summaryText";
import { useCachedVideoContext } from "../../../../hooks/useCachedVideoContext";
import { useSelectedFileContext } from "../../../../hooks/useSelectedFileContext";
import { ProcedurePanel } from "./ProcedurePanel/ProcedurePanel";

// Function to group annotations by category and match with summaryText
const groupAnnotationsByCategory = (
  annotations: Annotation[],
  summaryText: SummaryText[]
): {
  [category: string]: { type: "correct" | "incorrect"; logText: string }[];
} => {
  const grouped: {
    [category: string]: { type: "correct" | "incorrect"; logText: string }[];
  } = {};

  annotations.forEach((annotation) => {
    const matchedCategory = summaryText.find(
      (entry) =>
        entry.category.toLowerCase() === annotation.category.toLowerCase()
    ); // Find matching category for each annotation

    if (matchedCategory) {
      const isErrorMessageMatch =
        annotation.message === matchedCategory.error_message; // Check if error message matches

      const logText = isErrorMessageMatch // Set log text based on error message match
        ? matchedCategory.error_text
        : matchedCategory.no_error_text;

      const logType = isErrorMessageMatch ? "incorrect" : "correct"; // Set log type based on error message match

      if (!grouped[annotation.category]) {
        grouped[annotation.category] = [];
      } // Empty array if some category has no annotations

      grouped[annotation.category].push({
        type: logType,
        logText: logText,
      });
    }
  });

  return grouped;
};

export const SummaryMode = (): JSX.Element => {
  const { selectedFile } = useSelectedFileContext();
  const { cachedVideos } = useCachedVideoContext(); // Access cached video data

  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [groupedAnnotations, setGroupedAnnotations] = useState<{
    [category: string]: { type: "correct" | "incorrect"; logText: string }[];
  }>({});

  const predefinedCategories = [
    "Funnel",
    "Conical Flask",
    "Lab Goggles",
    "White Tile",
  ];

  useEffect(() => {
    if (!selectedFile?.fileName) {
      setAnnotations([]); // Clear annotations if no file is selected
      setGroupedAnnotations({});
      return;
    }

    // Find the video data using the selected file name
    const videoData = cachedVideos.find(
      (video) => video.file_name === selectedFile.fileName
    );

    if (videoData?.annotations) {
      const sortedAnnotations = [...videoData.annotations].sort(
        (a, b) => a.start_seconds - b.start_seconds
      );
      setAnnotations(sortedAnnotations); // Update annotations
    } else {
      setAnnotations([]); // No annotations available
    }
  }, [selectedFile, cachedVideos]);

  useEffect(() => {
    console.log("Annotations updated:", annotations);

    // Group annotations by category and match with summaryText whenever annotations are updated
    const grouped = groupAnnotationsByCategory(annotations, summaryTexts);
    setGroupedAnnotations(grouped);
  }, [annotations]);

  return (
    <div className="summary-mode">
      <div className="procedural-overview-header">Procedural Overview</div>
      <div className="procedure-panel-wrapper">
        {/* Render all predefined categories, even if they have no annotations */}
        {predefinedCategories.map((category) => {
          const logs = groupedAnnotations[category.toLowerCase()] || []; // If no logs, use empty array
          return (
            <ProcedurePanel
              key={category}
              header={category}
              logs={logs} // Pass the grouped annotations or an empty array
            />
          );
        })}
      </div>
    </div>
  );
};
