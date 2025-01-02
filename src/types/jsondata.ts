import { TagStatus } from "./tagstatus";

export type AnnotationCatergories =
  | "funnel"
  | "conical flask"
  // | "burette"
  | "lab goggles"
  | "white tile";

export type Annotation = {
  type: "info" | "warning" | "error";
  category: AnnotationCatergories;
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
  status_list: TagStatus[];
  annotations: Annotation[];
  status_counts: StatusCounts;
};

export type JsonData = {
  data: string;
  cached_videos: CachedVideo[];
};
