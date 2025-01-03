// PredictionList.tsx
import "./PredictionList.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { dotStream } from "ldrs";
import { CardWrapper } from "./CardWrapper/CardWrapper";
import { Toolbar } from "./Toolbar/Toolbar";
import { Filter } from "./Filter/Filter";
import { useCachedVideoContext } from "../../../hooks/useCachedVideoContext";
import { PredictionListFilterLabelName } from "../../../types/filterlabel";
import { SelectModeToolbar } from "./SelectModeToolbar/SelectModeToolbar";
import { useSelectedFileContext } from "../../../hooks/useSelectedFileContext"; // For single file selection
import { useSelectedFilesContext } from "../../../hooks/useSelectedFilesContext"; // For multi-file selection
import { getOrCreateDeviceId } from "../../../utils/deviceIdUtils";
import { Colors } from "../../../styles/colors";
import { VideoBufferCache } from "../../../managers/VideoBufferCacheManager";

dotStream.register();

export const PredictionList = (): JSX.Element => {
  const { cachedVideoManager, cachedVideos } = useCachedVideoContext();
  const { selectedFile, setSelectedFile } = useSelectedFileContext();
  const { selectedFiles, toggleSelectedFile, setSelectedFiles } =
    useSelectedFilesContext();

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
  const [allFilesSelected, setAllFilesSelected] = useState(false);

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

  useEffect(() => {
    if (isInSelectMode) {
      const allSelected = filteredFileData.every((file) =>
        selectedFiles.includes(file.file_name)
      );
      setAllFilesSelected(allSelected);
    }
  }, [isInSelectMode, selectedFiles, filteredFileData]);

  const toggleSelectAllFiles = () => {
    if (allFilesSelected) {
      setSelectedFiles([]);
    } else {
      const allFileNames = filteredFileData.map((file) => file.file_name);
      setSelectedFiles(allFileNames);
    }
  };

  // Handle file deletion
  const handleDelete = async () => {
    setLoading(true); // Set loading state before starting deletion
    const deviceId = getOrCreateDeviceId();
    const videoCache = VideoBufferCache.getInstance();

    for (const fileName of selectedFiles) {
      try {
        // Delete the video from the backend
        const url = `http://localhost:5000/delete/${fileName}?device_id=${deviceId}`;
        const response = await axios.get(url);

        if (response.data?.message === "Video deleted successfully") {
          // Remove the video from the cache
          videoCache.removeVideo(fileName);
          console.log(`Video ${fileName} deleted from cache.`);
        }
      } catch (error) {
        console.error("Error deleting video:", error);
      }
    }

    // Reset the selected files after deletion
    setSelectedFiles([]);
    setLoading(false); // Set loading to false after deletion is done
  };

  // Handle predict action
  const handlePredict = async () => {
    const deviceId = getOrCreateDeviceId(); // Get or create device ID
    setLoading(true); // Set loading state while processing predictions

    for (const fileName of selectedFiles) {
      const file = fileData.find((file) => file.file_name === fileName);
      if (file) {
        const url = `http://localhost:5000/process_video/${fileName}?device_id=${deviceId}`;
        try {
          console.log(`Processing video: ${fileName}`);
          const response = await axios.get(url); // Send GET request for prediction
          console.log("Prediction response:", response.data);
        } catch (error) {
          console.error("Error predicting:", error);
        }
      }
    }

    setLoading(false); // Reset loading state after prediction is complete
  };

  if (loading) {
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
            toggleSelectAllFiles={toggleSelectAllFiles}
            onPredict={handlePredict}
            onDelete={handleDelete}
          />
        ) : (
          <Filter
            activeLabels={activeLabels}
            setActiveLabels={setActiveLabels}
          />
        )}
        <div className="loading">
          Loading
          <l-dot-stream size="32" speed="2.5" color={Colors.foreground} />
        </div>
        ;
      </div>
    );
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
          toggleSelectAllFiles={toggleSelectAllFiles}
          onPredict={handlePredict}
          onDelete={handleDelete}
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
