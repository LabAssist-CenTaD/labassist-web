import { TagStatus } from "../components/LeftPanel/PredictionList/CardWrapper/Card/StatusBar/TagWrapper/Tag/Tag";

// Define the data structure for the files
export const fileData: {
  fileName: string;
  filePath: string;
  status_list: TagStatus[];
  status_counts: { correct: number; warning: number; error: number };
}[] = [
  // Data structure for the files
  {
    fileName: "titration_1.mp4",
    filePath:
      "C:/Users/LabAssist/2024/Practicals/Titration/24S6X/titration_1.mp4",
    status_list: ["complete"],
    status_counts: { correct: 0, warning: 0, error: 0 },
  },
  {
    fileName: "hello.mov",
    filePath:
      "C:/Users/LabAssist/2024/Practicals/Titration/24S6X/titration_1.mp4",
    status_list: ["complete"],
    status_counts: { correct: 0, warning: 0, error: 0 },
  },
];
