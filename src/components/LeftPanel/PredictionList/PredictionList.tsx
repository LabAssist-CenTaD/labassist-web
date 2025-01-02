import "./PredictionList.css";

import { useEffect, useState } from "react";
import { CardWrapper } from "./CardWrapper/CardWrapper";
import { Toolbar } from "./Toolbar/Toolbar";
import { Filter } from "./Filter/Filter";
import { useCachedVideoContext } from "../../../hooks/useCachedVideoContext";
import { PredictionListFilterLabelName } from "../../../types/filterlabel";

export const PredictionList = (): JSX.Element => {
  const { cachedVideoManager, cachedVideos } = useCachedVideoContext(); // Use context to get cachedVideoManager

  const [fileData, setFileData] = useState(
    cachedVideoManager.getCachedVideos()
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLabels, setActiveLabels] = useState<
    PredictionListFilterLabelName[]
  >([
    "perfect",
    "warnings-present",
    "errors-present",
    "complete",
    "predicting",
    "uploaded",
  ]);
  const [loading, setLoading] = useState(true);

  // Update fileData when cachedVideoManager is updated
  useEffect(() => {
    const fetchData = async () => {
      const updatedData = cachedVideoManager.getCachedVideos();
      const jsonMessage = cachedVideoManager.getMessage();
      if (jsonMessage) {
        setFileData(updatedData); // Trigger re-render by updating fileData state
        setLoading(false);
      }
    };

    fetchData();
  }, [cachedVideoManager, cachedVideos]); // Depend on cachedVideoManager to re-trigger effect on changes

  // Filter the file data based on the search query and active labels
  const filteredFileData = fileData.filter((file) => {
    // Always show files with `queued` status
    const isQueued = file.status_list.includes("queued");

    // If activeLabels is not empty, check if the file matches any active labels
    const matchesLabels =
      activeLabels.length > 0 &&
      activeLabels.some((label) => file.status_list.includes(label));

    // Check search query
    const fileNameWithoutExtension = file.file_name
      .replace(/\.(mp4|mov|avi)$/, "")
      .toLowerCase();
    const searchQueryLowerCase = searchQuery.toLowerCase();
    const matchesSearch =
      fileNameWithoutExtension.includes(searchQueryLowerCase);

    // Include files that are queued or match the search and active labels
    return isQueued || (matchesSearch && matchesLabels);
  });

  // console.log("activeLabels: ", activeLabels);

  const handleSearch = (query: string) => setSearchQuery(query);

  // If still loading, show a loading message
  if (loading) {
    return <div className="prediction-list-header">Loading...</div>;
  }

  return (
    <div className="prediction-list">
      <div className="prediction-list-header">Prediction List</div>
      <Toolbar onSearch={handleSearch} />
      <Filter activeLabels={activeLabels} setActiveLabels={setActiveLabels} />
      <CardWrapper fileList={filteredFileData} />
    </div>
  );
};
