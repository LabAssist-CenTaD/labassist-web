import { TagStatus } from "../components/LeftPanel/PredictionList/CardWrapper/Card/StatusBar/TagWrapper/Tag/Tag";

type Annotation = {
  status: string;
  message: string;
  timestamp: string;
};

type StatusCounts = {
  correct: number;
  warning: number;
  error: number;
};

export type CachedVideo = {
  fileName: string;
  filePath: string;
  status_list: TagStatus[]; // Assuming TagStatus is defined elsewhere
  annotations: Annotation[];
  status_counts: StatusCounts;
};

export type JsonData = {
  data: string;
  cached_videos: CachedVideo[];
};
