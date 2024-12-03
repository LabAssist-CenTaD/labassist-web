import "./PredictionList.css";
import { useState } from "react";
import { CardWrapper } from "./CardWrapper/CardWrapper";
import { Toolbar } from "./Toolbar/Toolbar";
import { Filter } from "./Filter/Filter";
import { getCachedVideoManager } from "../../../utils/socketUtils";

export const PredictionList = (): JSX.Element => {
  // const [, forceUpdate] = useReducer((x) => x + 1, 0); // State to trigger re-render
  const [searchQuery, setSearchQuery] = useState("");
  const cvm = getCachedVideoManager();

  const filteredFileData = cvm.getCachedVideos().filter((file) => {
    const fileNameWithoutExtension = file.file_name
      .replace(/\.(mp4|mov|avi)$/, "")
      .toLowerCase();
    const searchQueryLowerCase = searchQuery.toLowerCase();

    return fileNameWithoutExtension.includes(searchQueryLowerCase);
  });

  const handleSearch = (query: string) => setSearchQuery(query);

  // if (!dataReady) {
  //   return <div className="header">Loading...</div>; // Show loading message if data is still being fetched
  // }

  return (
    <div className="prediction-list">
      <div className="header">Prediction List</div>
      <Toolbar onSearch={handleSearch} />
      <Filter />
      <CardWrapper fileList={filteredFileData} />
    </div>
  );
};
