import { JsonData, CachedVideo } from "../types/jsondata";

export class JsonDataContextManager {
  private jsonData: JsonData;

  constructor(initialData: JsonData) {
    this.jsonData = initialData;
  }

  // Get current cached videos
  public getData(): JsonData {
    return this.jsonData;
  }

  // Set or update data
  public setData(newData: JsonData): void {
    this.jsonData = newData;
  }

  // Add a new cached video to the list
  public addCachedVideo(video: CachedVideo): void {
    this.jsonData.cached_videos.push(video);
  }

  // Remove a cached video by file name
  public removeCachedVideo(fileName: string): void {
    this.jsonData.cached_videos = this.jsonData.cached_videos.filter(
      (video) => video.fileName !== fileName
    );
  }

  // Find a cached video by its file name
  public getCachedVideo(fileName: string): CachedVideo | undefined {
    return this.jsonData.cached_videos.find(
      (video) => video.fileName === fileName
    );
  }
}

// Example usage: set initial data
// const initialData: JsonData = {
//   data: "Authenticated!",
//   cached_videos: [
//     {
//       fileName: "video_1.mp4",
//       filePath: "uploads\\video_1.mp4",
//       status_list: [],
//       annotations: [],
//       status_counts: { correct: 0, warning: 0, error: 0 },
//     },
//     {
//       fileName: "video_2.mp4",
//       filePath: "uploads\\video_1.mp4",
//       status_list: [],
//       annotations: [],
//       status_counts: { correct: 0, warning: 0, error: 0 },
//     },
//   ],
// };

// Example usage: create the context manager instance
// const jsonManager = new JsonDataContextManager(initialData);

// Example usage: use the context manager to add a new video
// jsonManager.addCachedVideo({
//   fileName: "new_video.mp4",
//   filePath: "uploads\\new_video.mp4",
//   status_list: [],
//   annotations: [],
//   status_counts: { correct: 0, warning: 0, error: 0 },
// });

// console.log(jsonManager.getData()); // See the updated data
