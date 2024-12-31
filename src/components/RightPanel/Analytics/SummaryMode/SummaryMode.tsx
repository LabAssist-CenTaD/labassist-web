import "./SummaryMode.css";

import { useEffect, useState } from "react";

import { Annotation } from "../../../../types/jsondata";
import { SummaryText, summaryTexts } from "../../../../data/summaryText";
import { useCachedVideoContext } from "../../../../hooks/useCachedVideoContext";
import { useSelectedFileContext } from "../../../../hooks/useSelectedFileContext";
import { ProcedurePanel } from "./ProcedurePanel/ProcedurePanel";

const groupAnnotationsByCategory = (
  annotations: Annotation[],
  summaryText: SummaryText[]
): {
  [category: string]: { type: "correct" | "incorrect"; logText: string }[];
} => {
  const categoryLogs: {
    [category: string]: { type: "correct" | "incorrect"; logText: string }[];
  } = {};

  // Create a map to track unique logs for each category
  const categorySeenMessages: {
    [category: string]: Set<string>;
  } = {};

  annotations.forEach((annotation) => {
    const matchedSummary = summaryText.find(
      (entry) =>
        entry.category.toLowerCase() === annotation.category.toLowerCase()
    );

    if (matchedSummary) {
      const categoryKey = annotation.category.toLowerCase();
      const isErrorMessageMatch =
        annotation.message === matchedSummary.error_message;

      const logText = isErrorMessageMatch
        ? matchedSummary.error_text
        : matchedSummary.no_error_text;

      const logType = isErrorMessageMatch ? "incorrect" : "correct";

      // Initialise the Set for this category if it doesn't exist
      if (!categorySeenMessages[categoryKey]) {
        categorySeenMessages[categoryKey] = new Set();
      }

      const uniqueKey = `${logType}|${logText}`;

      // Ensure no duplicates are added by checking the unique key
      if (!categorySeenMessages[categoryKey].has(uniqueKey)) {
        categorySeenMessages[categoryKey].add(uniqueKey);

        // Initialise categoryLogs if not already present
        if (!categoryLogs[categoryKey]) {
          categoryLogs[categoryKey] = [];
        }

        // Add the log to the category
        categoryLogs[categoryKey].push({
          type: logType,
          logText: logText,
        });
      }
    }
  });

  // Iterate through summaryText to ensure the error text and no error text is included
  summaryText.forEach((entry) => {
    const categoryKey = entry.category.toLowerCase();

    // Check if the error_text is already in the logs for this category
    const hasErrorText = categoryLogs[categoryKey]?.some(
      (log) => log.logText === entry.error_text
    );

    // If error_text is not found, add the no_error_text
    if (!hasErrorText) {
      if (!categoryLogs[categoryKey]) {
        categoryLogs[categoryKey] = [];
      }

      // Add the no_error_text to the logs
      const uniqueKey = `correct|${entry.no_error_text}`;
      if (!categorySeenMessages[categoryKey]?.has(uniqueKey)) {
        categorySeenMessages[categoryKey]?.add(uniqueKey);
        categoryLogs[categoryKey].push({
          type: "correct",
          logText: entry.no_error_text,
        });
      }
    }
  });

  return categoryLogs;
};

export const SummaryMode = (): JSX.Element => {
  const { selectedFile } = useSelectedFileContext();
  const { cachedVideos } = useCachedVideoContext();

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
    // Clear annotations and groupedAnnotations if no file is selected
    if (!selectedFile?.fileName) {
      setAnnotations([]);
      setGroupedAnnotations({});
      return;
    }

    // Find video data based on the selected file
    const videoData = cachedVideos.find(
      (video) => video.file_name === selectedFile.fileName
    );

    if (videoData?.annotations) {
      const sortedAnnotations = [...videoData.annotations].sort(
        (a, b) => a.start_seconds - b.start_seconds
      );
      setAnnotations(sortedAnnotations);
    } else {
      setAnnotations([]);
    }
  }, [selectedFile, cachedVideos]);

  useEffect(() => {
    // Clear groupedAnnotations if annotations are empty
    if (!annotations.length) {
      setGroupedAnnotations({});
      return;
    }

    // Group annotations by category
    const grouped = groupAnnotationsByCategory(annotations, summaryTexts);
    setGroupedAnnotations(grouped);
  }, [annotations]);

  return (
    <div className="summary-mode">
      <div className="procedural-overview-header">Procedural Overview</div>
      <div className="procedure-panel-wrapper">
        {predefinedCategories.map((category) => {
          const logs = groupedAnnotations[category.toLowerCase()] || []; // Default to empty array if no logs
          return (
            <ProcedurePanel key={category} header={category} logs={logs} />
          );
        })}
      </div>
    </div>
  );
};
