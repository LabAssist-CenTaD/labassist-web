import "./PredictionList.css";
import { useState } from "react";
import { CardWrapper } from "./CardWrapper/CardWrapper";
import { Toolbar } from "./Toolbar/Toolbar";
import { Filter } from "./Filter/Filter";
// import { TagStatus } from "./CardWrapper/Card/StatusBar/TagWrapper/Tag/Tag";

import { fileData } from "../../../shared/fileData";

export const PredictionList = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFileData = fileData.filter((file) => {
    // Remove the .mp4 extension and compare just the filename
    const fileNameWithoutExtension = file.fileName
      .replace(/\.mp4$/, "")
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

  console.log("Filtered file data: ", filteredFileData);

  return (
    <div className="prediction-list">
      <div className="header">Prediction List</div>
      <Toolbar onSearch={handleSearch} />
      <Filter />
      <CardWrapper fileList={filteredFileData} />
    </div>
  );
};
