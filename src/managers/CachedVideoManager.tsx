// CachedVideoManager

import { CachedVideo } from "../types/jsondata";

export class CachedVideoManager {
  private cachedVideos: CachedVideo[];
  private message: string | null;
  private listeners: Array<() => void> = [];

  constructor(initialData: { cached_videos: CachedVideo[]; message?: string }) {
    this.cachedVideos = initialData.cached_videos || [];
    this.message = initialData.message || null;
  }

  // Add a listener that will be called when the cached videos change
  public addChangeListener(listener: () => void): void {
    this.listeners.push(listener);
  }

  // Remove a listener
  public removeChangeListener(listener: () => void): void {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  // Trigger all listeners when the data is updated
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }

  // Get the current message
  public getMessage() {
    return this.message; // Retrieve the message
  }

  // Get the current list of cached videos
  public getCachedVideos(): CachedVideo[] {
    // console.log("GET cached videos:", this.cachedVideos);
    return this.cachedVideos;
  }

  // Replace the current cached videos with new ones from a server response
  // Update the state with new data (triggering reactivity)
  public updateFromServerData(serverData: {
    cached_videos: CachedVideo[];
    message?: string;
  }): void {
    // Use a new array reference to trigger re-rendering
    this.cachedVideos = [...serverData.cached_videos]; // Ensure it's a new reference
    // console.log("UPDATE cached videos:", this.cachedVideos);

    if (serverData.message) {
      this.message = serverData.message;
    }

    this.notifyListeners(); // Notify listeners about the update
  }

  // Add a new cached video to the list
  public addCachedVideo(video: CachedVideo): void {
    this.cachedVideos.push(video);
    this.notifyListeners(); // Notify listeners after adding a video
  }

  // Remove a cached video by file name
  public removeCachedVideo(fileName: string): void {
    this.cachedVideos = this.cachedVideos.filter(
      (video) => video.file_name !== fileName
    );
    this.notifyListeners(); // Notify listeners after removing a video
  }

  // Find a cached video by its file name
  public findCachedVideo(fileName: string): CachedVideo | undefined {
    return this.cachedVideos.find((video) => video.file_name === fileName);
  }
}
