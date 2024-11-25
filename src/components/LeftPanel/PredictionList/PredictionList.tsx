import "./PredictionList.css";
import { useState } from "react";
import { CardWrapper } from "./CardWrapper/CardWrapper";
import { Toolbar } from "./Toolbar/Toolbar";
import { Filter } from "./Filter/Filter";
import { TagStatus } from "./CardWrapper/Card/StatusBar/TagWrapper/Tag/Tag";

// Define fileData in PredictionList
const fileData: {
  fileName: string;
  filePath: string;
  status_list: TagStatus[];
  status_counts: { correct: number; warning: number; error: number };
}[] = [
  {
    fileName: "titration_1.mp4",
    filePath: "C:/Users/LabAssist/2024/Practicals/Titration/24S6X/titration_1.mp4",
    status_list: ["complete"],
    status_counts: { correct: 3, warning: 0, error: 0 },
  },
  {
    fileName: "titration_2.mp4",
    filePath: "C:/Users/LabAssist/24S6X/titration_2.mp4",
    status_list: ["warnings-present", "errors-present"],
    status_counts: { correct: 2, warning: 1, error: 1 },
  },
  {
    fileName: "titration_3.mp4",
    filePath: "C:/Users/LabAssist/24S6X/titration_3.mp4",
    status_list: ["perfect"],
    status_counts: { correct: 5, warning: 0, error: 0 },
  },
  {
    fileName: "titration_4.mp4",
    filePath: "C:/Users/LabAssist/24S6X/titration_4.mp4",
    status_list: ["predicting"],
    status_counts: { correct: 0, warning: 2, error: 0 },
  },
  {
    fileName: "titration_5.mp4",
    filePath: "C:/Users/LabAssist/24S6X/titration_5.mp4",
    status_list: ["predicting"],
    status_counts: { correct: 0, warning: 1, error: 1 },
  },
  {
    fileName: "titration_6.mp4",
    filePath: "C:/Users/LabAssist/24S6X/titration_6.mp4",
    status_list: ["predicting"],
    status_counts: { correct: 1, warning: 1, error: 0 },
  },
  {
    fileName: "titration_7.mp4",
    filePath: "C:/Users/LabAssist/24S6X/titration_7.mp4",
    status_list: ["predicting"],
    status_counts: { correct: 0, warning: 2, error: 0 },
  },
  {
    fileName: "titration_8.mp4",
    filePath: "C:/Users/LabAssist/24S6X/titration_8.mp4",
    status_list: ["errors-present"],
    status_counts: { correct: 0, warning: 0, error: 1 },
  },
  {
    fileName: "titration_9.mp4",
    filePath: "C:/Users/LabAssist/24S6X/titration_9.mp4",
    status_list: ["warnings-present"],
    status_counts: { correct: 1, warning: 1, error: 0 },
  },
  {
    fileName: "titration_10.mp4",
    filePath: "C:/Users/LabAssist/24S6X/titration_10.mp4",
    status_list: ["complete"],
    status_counts: { correct: 3, warning: 0, error: 0 },
  },
];

export const PredictionList = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the fileList based on the searchQuery
  const filteredFileData = fileData.filter((file) =>
    file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="prediction-list">
      <div className="header">Prediction List</div>
      <Toolbar onSearch={handleSearch} />
      <Filter />
      <CardWrapper fileList={filteredFileData} />
    </div>
  );
};
