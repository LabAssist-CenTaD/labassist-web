import { TagStatus } from "../components/LeftPanel/PredictionList/CardWrapper/Card/StatusBar/TagWrapper/Tag/Tag";

type Annotation = {
  status: string;
  message: string;
  timestamp: string;
};

type StatusCounts = {
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
