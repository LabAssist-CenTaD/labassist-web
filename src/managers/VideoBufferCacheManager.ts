import { config } from "../config/config";

export class VideoBufferCache {
  private static instance: VideoBufferCache | null = null;
  private cache: Map<string, Blob>;
  private maxCacheSize: number;

  constructor() {
    this.cache = new Map<string, Blob>(); // Map to store videos as { key: Blob }
    this.maxCacheSize = config.max_cache_size; // Maximum size of the cache
  }

  public static getInstance(): VideoBufferCache {
    if (!VideoBufferCache.instance) {
      VideoBufferCache.instance = new VideoBufferCache();
    }
    return VideoBufferCache.instance;
  }

  // Add a video to the cache
  public addVideo(fileName: string, videoBlob: Blob): void {
    if (!fileName || !videoBlob) {
      if (config.debug_errors) console.error("Invalid file name or video blob");
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
        if (config.debug_level === 1)
          console.log(
            `Video ${fileName} added to the VBCache. Oldest video ${oldestKey} removed (cached size exceeded). Cache size: (${this.cache.size}/${this.maxCacheSize})`
          );
      } else {
        if (config.debug_errors)
          console.error("Failed to get the oldest key in the VBCache.");
      }
    } else {
      if (config.debug_level === 1)
        console.log(
          `Video ${fileName} added to the VBCache. Cache size: (${this.cache.size}/${this.maxCacheSize})`
        );
    }
  }

  // Retrieve a video from the cache
  public getVideo(fileName: string): Blob | null {
    if (this.cache.has(fileName)) {
      return this.cache.get(fileName) || null;
    } else {
      if (config.debug_warnings)
        console.warn(`Video ${fileName} not found in the VBCache.`);
      return null;
    }
  }

  // Check if a video is cached
  public isCached(fileName: string): boolean {
    return this.cache.has(fileName);
  }

  // Remove a video from the cache
  public removeVideo(fileName: string): void {
    if (this.cache.has(fileName)) {
      this.cache.delete(fileName);
      if (config.debug_level === 1)
        console.log(`Video ${fileName} removed from the VBCache.`);
    } else {
      if (config.debug_warnings)
        console.warn(
          `Attempted to remove ${fileName}, but it does not exist in the VBCache.`
        );
    }
  }
}
