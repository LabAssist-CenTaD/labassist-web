import "./PredictionList.css";
import { useEffect, useState } from "react";
import { CardWrapper } from "./CardWrapper/CardWrapper";
import { Toolbar } from "./Toolbar/Toolbar";
import { Filter } from "./Filter/Filter";
import { useCachedVideoContext } from "../../../hooks/useCachedVideoContext";
import { PredictionListFilterLabelName } from "../../../types/filterlabel";
import { SelectModeToolbar } from "./SelectModeToolbar/SelectModeToolbar";
import { useSelectedFileContext } from "../../../hooks/useSelectedFileContext"; // For single file selection
import { useSelectedFilesContext } from "../../../hooks/useSelectedFilesContext"; // For multi-file selection

export const PredictionList = (): JSX.Element => {
  const { cachedVideoManager, cachedVideos } = useCachedVideoContext();
  const { selectedFile, setSelectedFile } = useSelectedFileContext(); // Single file selection
  const { selectedFiles, toggleSelectedFile, setSelectedFiles } =
    useSelectedFilesContext(); // Multi file selection

  const [fileData, setFileData] = useState(
    cachedVideoManager.getCachedVideos()
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isInSelectMode, setIsInSelectMode] = useState(false);
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
  const [allFilesSelected, setAllFilesSelected] = useState(false); // New state for tracking if all files are selected

  useEffect(() => {
    const fetchData = async () => {
      const updatedData = cachedVideoManager.getCachedVideos();
      const jsonMessage = cachedVideoManager.getMessage();
      if (jsonMessage) {
        setFileData(updatedData);
        setLoading(false);
      }
    };

    fetchData();
  }, [cachedVideoManager, cachedVideos]);

  const filteredFileData = fileData.filter((file) => {
    const isQueued = file.status_list.includes("queued");
    const matchesLabels =
      activeLabels.length > 0 &&
      activeLabels.some((label) => file.status_list.includes(label));
    const fileNameWithoutExtension = file.file_name
      .replace(/\.(mp4|mov|avi)$/, "")
      .toLowerCase();
    const matchesSearch = fileNameWithoutExtension.includes(
      searchQuery.toLowerCase()
    );

    return isQueued || (matchesSearch && matchesLabels);
  });

  const handleSearch = (query: string) => setSearchQuery(query);

  const handleSelectModeToggle = () => setIsInSelectMode(!isInSelectMode);

  // Track whether all files are selected in select mode
  useEffect(() => {
    if (isInSelectMode) {
      // Check if all files in the filtered list are selected
      const allSelected = filteredFileData.every((file) =>
        selectedFiles.includes(file.file_name)
      );
      setAllFilesSelected(allSelected);
    }
  }, [isInSelectMode, selectedFiles, filteredFileData]);

  // Toggle select all files
  const toggleSelectAllFiles = () => {
    if (allFilesSelected) {
      // Deselect all files
      setSelectedFiles([]);
    } else {
      // Select all files
      const allFileNames = filteredFileData.map((file) => file.file_name);
      setSelectedFiles(allFileNames);
    }
  };

  if (loading) {
    return <div className="prediction-list-header">Loading...</div>;
  }

  return (
    <div className="prediction-list">
      <div className="prediction-list-header">Prediction List</div>
      <Toolbar
        onSearch={handleSearch}
        handleSelectModeToggle={handleSelectModeToggle}
        isInSelectMode={isInSelectMode}
      />
      {isInSelectMode ? (
        <SelectModeToolbar
          allFilesSelected={allFilesSelected}
          toggleSelectAllFiles={toggleSelectAllFiles} // Pass toggle function here
        />
      ) : (
        <Filter activeLabels={activeLabels} setActiveLabels={setActiveLabels} />
      )}

      <CardWrapper
        fileList={filteredFileData}
        isInSelectMode={isInSelectMode}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        selectedFiles={selectedFiles}
        toggleSelectedFile={toggleSelectedFile}
      />
    </div>
  );
};
