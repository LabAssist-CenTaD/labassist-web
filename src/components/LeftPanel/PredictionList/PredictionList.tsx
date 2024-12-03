import "./PredictionList.css";
import { useState, useEffect } from "react";
import { CardWrapper } from "./CardWrapper/CardWrapper";
import { Toolbar } from "./Toolbar/Toolbar";
import { Filter } from "./Filter/Filter";
import { CachedVideo } from "../../../types/jsondata";
import { CachedVideoManager } from "../../../managers/CachedVideoManager"; // Adjust the import path as needed

interface PredictionListProps {
  cvm: CachedVideoManager; // Pass cvm as a prop
}

export const PredictionList = ({ cvm }: PredictionListProps): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fileData, setFileData] = useState<CachedVideo[]>([]); // Local state to hold filtered data

  useEffect(() => {
    setFileData(cvm.getCachedVideos());
  }, [cvm]); // This effect runs whenever cvm changes

  

  const filteredFileData = fileData.filter((file) => {
    const fileNameWithoutExtension = file.file_name
      .replace(/\.(mp4|mov|avi)$/, "")
      .toLowerCase();
    const searchQueryLowerCase = searchQuery.toLowerCase();

    return fileNameWithoutExtension.includes(searchQueryLowerCase);
  });

  const handleSearch = (query: string) => setSearchQuery(query);

  return (
    <div className="prediction-list">
      <div className="header">Prediction List</div>
      <Toolbar onSearch={handleSearch} />
      <Filter />
      <CardWrapper fileList={filteredFileData} />
    </div>
  );
};
