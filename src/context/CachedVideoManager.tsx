import { CachedVideo } from "../types/jsondata";

export class CachedVideoManager {
  private cachedVideos: CachedVideo[];

  constructor(initialData: { cached_videos: CachedVideo[] }) {
    this.cachedVideos = initialData.cached_videos || [];
  }

  // Get the current list of cached videos
  public getCachedVideos(): CachedVideo[] {
    return this.cachedVideos;
  }

  // Replace the current cached videos with new ones from a server response
  public updateFromServerData(serverData: {
    cached_videos: CachedVideo[];
  }): void {
    this.cachedVideos = serverData.cached_videos || [];
  }

  // Add a new cached video to the list
  public addCachedVideo(video: CachedVideo): void {
    this.cachedVideos.push(video);
  }

  // Remove a cached video by file name
  public removeCachedVideo(fileName: string): void {
    this.cachedVideos = this.cachedVideos.filter(
      (video) => video.fileName !== fileName
    );
  }

  // Find a cached video by its file name
  public findCachedVideo(fileName: string): CachedVideo | undefined {
    return this.cachedVideos.find((video) => video.fileName === fileName);
  }
}
