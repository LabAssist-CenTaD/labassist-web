import { CardWrapper } from "./CardWrapper/CardWrapper";
import { Toolbar } from "./Toolbar/Toolbar";
import { Filter } from "./Filter/Filter";
import "./PredictionList.css";
import { TagStatus } from "./CardWrapper/Card/StatusBar/TagWrapper/Tag/Tag";

// Define file list
const fileData: {
  fileName: string;
  filePath: string;
  status_list: TagStatus[];
  status_counts: { correct: number; warning: number; error: number };
}[] = [
  {
    fileName: "file1",
    filePath: "path1",
    status_list: ["complete"],
    status_counts: { correct: 1, warning: 0, error: 0 },
  },
  {
    fileName: "file2",
    filePath: "path2",
    status_list: ["warnings-present", "errors-present"],
    status_counts: { correct: 0, warning: 1, error: 1 },
  },
  {
    fileName: "file3",
    filePath: "path3",
    status_list: ["warnings-present"],
    status_counts: { correct: 0, warning: 1, error: 0 },
  },
];

export const PredictionList = (): JSX.Element => {
  return (
    <div className="prediction-list">
      <div className="header">Prediction List</div>
      <Toolbar />
      <Filter />
      <CardWrapper fileList={fileData} />
    </div>
  );
};
