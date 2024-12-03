// CachedVideoManager

import { CachedVideo } from "../types/jsondata";

export class CachedVideoManager {
  private cachedVideos: CachedVideo[];
  private message: string | null;

  constructor(initialData: { cached_videos: CachedVideo[]; message?: string }) {
    this.cachedVideos = initialData.cached_videos || [];
    this.message = initialData.message || null;
  }

  // Get the current message
  public getMessage() {
    return this.message; // Retrieve the message
  }

  // Get the current list of cached videos
  public getCachedVideos(): CachedVideo[] {
    return this.cachedVideos;
  }

  // Replace the current cached videos with new ones from a server response
  public updateFromServerData(serverData: {
    cached_videos: CachedVideo[];
    message?: string;
  }): void {
    this.cachedVideos = serverData.cached_videos || [];
    if (serverData.message) {
      this.message = serverData.message; // Update message
    }
  }

  // Add a new cached video to the list
  public addCachedVideo(video: CachedVideo): void {
    this.cachedVideos.push(video);
  }

  // Remove a cached video by file name
  public removeCachedVideo(fileName: string): void {
    this.cachedVideos = this.cachedVideos.filter(
      (video) => video.file_name !== fileName
    );
  }

  // Find a cached video by its file name
  public findCachedVideo(fileName: string): CachedVideo | undefined {
    return this.cachedVideos.find((video) => video.file_name === fileName);
  }
}
