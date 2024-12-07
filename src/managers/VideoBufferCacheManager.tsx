import { config } from "../config/config";

export class VideoBufferCache {
  private cache: Map<string, Blob>;
  private maxCacheSize: number;

  constructor() {
    this.cache = new Map<string, Blob>(); // Map to store videos as { key: Blob }
    this.maxCacheSize = config.max_cache_size; // Maximum size of the cache
  }

  // Add a video to the cache
  public addVideo(fileName: string, videoBlob: Blob): void {
    if (!fileName || !videoBlob) {
      console.error("Invalid file name or video blob");
      return;
    }

    if (this.cache.has(fileName)) {
      this.cache.delete(fileName); // Remove existing entry to re-add it
    }
    this.cache.set(fileName, videoBlob);

    // Remove the oldest video if cache exceeds size
    if (this.cache.size > this.maxCacheSize) {
      const oldestKey = this.cache.keys().next().value; // Get the first inserted key
      if (oldestKey) {
        this.cache.delete(oldestKey); // Only delete if the key is valid
      }
    }
  }

  // Retrieve a video from the cache
  public getVideo(fileName: string): Blob | null {
    return this.cache.get(fileName) || null;
  }

  // Check if a video is cached
  public isCached(fileName: string): boolean {
    return this.cache.has(fileName);
  }
}
