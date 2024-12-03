import "./PredictionList.css";
import { useState } from "react";
import { CardWrapper } from "./CardWrapper/CardWrapper";
import { Toolbar } from "./Toolbar/Toolbar";
import { Filter } from "./Filter/Filter";
import { getCachedVideoManager } from "../../../utils/socketUtils";
import { useCachedVideoManager } from "../../../hooks/useCachedVideoManager";

export const PredictionList = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const cvm = getCachedVideoManager();
  const dataReady = useCachedVideoManager();

  const filteredFileData = cvm.getCachedVideos().filter((file) => {
    // Remove the .mp4, .mov or .avi extension and compare just the filename
    const fileNameWithoutExtension = file.fileName
      .replace(/\.(mp4|mov|avi)$/, "")
      .toLowerCase();
    const searchQueryLowerCase = searchQuery.toLowerCase();

    // console.log(
    //   `File: ${fileNameWithoutExtension} Search Query: ${searchQueryLowerCase} Match: ${fileNameWithoutExtension.includes(
    //     searchQueryLowerCase
    //   )}`
    // );

    return fileNameWithoutExtension.includes(searchQueryLowerCase);
  });

  const handleSearch = (query: string) => setSearchQuery(query);

  // console.log("Filtered file data: ", filteredFileData);

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
