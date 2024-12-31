import { TagStatus } from "../components/LeftPanel/PredictionList/CardWrapper/Card/StatusBar/TagWrapper/Tag/Tag";

export type Annotation = {
  type: "info" | "warning" | "error";
  category: string;
  message: string;
  start_seconds: number;
  end_seconds: number;
};

export type StatusCounts = {
  info: number;
  warning: number;
  error: number;
};

export type CachedVideo = {
  file_name: string;
  file_path: string;
  status_list: TagStatus[]; // Assuming TagStatus is defined elsewhere
  annotations: Annotation[];
  status_counts: StatusCounts;
};

export type JsonData = {
  data: string;
  cached_videos: CachedVideo[];
};
