import "./PredictionList.css";
import { useState, useEffect, useReducer } from "react";
import { CardWrapper } from "./CardWrapper/CardWrapper";
import { Toolbar } from "./Toolbar/Toolbar";
import { Filter } from "./Filter/Filter";
import { getCachedVideoManager } from "../../../utils/socketUtils";
import { useCachedVideoManager } from "../../../hooks/useCachedVideoManager";
import { CachedVideo } from "../../../types/jsondata";

export const PredictionList = (): JSX.Element => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0); // State to trigger re-render
  const [searchQuery, setSearchQuery] = useState("");
  const cvm = getCachedVideoManager();
  const dataReady = useCachedVideoManager();

  useEffect(() => {
    if (dataReady) {
      const newVideo: CachedVideo = {
        file_name: "example_video.mp4",
        file_path: "uploads/example_video.mp4",
        status_list: ["predicting"],
        annotations: [],
        status_counts: {
          correct: 0,
          warning: 0,
          error: 0,
        },
      };

      // Add the new video to the cached video manager
      cvm.addCachedVideo(newVideo);

      // Trigger re-render by updating state
      forceUpdate();
    }
  }, [dataReady, cvm]); // Add new video only when data is ready

  const filteredFileData = cvm.getCachedVideos().filter((file) => {
    const fileNameWithoutExtension = file.file_name
      .replace(/\.(mp4|mov|avi)$/, "")
      .toLowerCase();
    const searchQueryLowerCase = searchQuery.toLowerCase();

    return fileNameWithoutExtension.includes(searchQueryLowerCase);
  });

  const handleSearch = (query: string) => setSearchQuery(query);

  if (!dataReady) {
    return <div className="header">Loading...</div>; // Show loading message if data is still being fetched
  }

  return (
    <div className="prediction-list">
      <div className="header">Prediction List</div>
      <Toolbar onSearch={handleSearch} />
      <Filter />
      <CardWrapper fileList={filteredFileData} />
    </div>
  );
};
