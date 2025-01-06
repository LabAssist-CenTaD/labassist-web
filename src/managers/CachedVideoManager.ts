// CachedVideoManager

import jsonpatch from "fast-json-patch";
import { CachedVideo } from "../types/jsondata";
import { Socket } from "socket.io-client";
import { getOrCreateDeviceId } from "../utils/deviceIdUtils";
import { config } from "../config/config";

export class CachedVideoManager {
  private cachedVideos: CachedVideo[];
  private message: string | null;
  private socket: Socket | null;

  constructor(
    initialData: { cached_videos: CachedVideo[]; message?: string },
    socket: Socket | null
  ) {
    this.cachedVideos = initialData.cached_videos || [];
    this.message = initialData.message || null;
    this.socket = socket;
  }

  // Get the current message
  public getMessage() {
    return this.message; // Retrieve the message
  }

  // Get the current list of cached videos
  public getCachedVideos(): CachedVideo[] {
    if (config.debug_level === 2) 
      console.log("GET cached videos:", this.cachedVideos);
    
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
    if (config.debug_level === 2) 
      console.log("UPDATE cached videos:", this.cachedVideos);
    

    if (serverData.message) {
      this.message = serverData.message;
    }
  }

  // Find a cached video by its file name
  public findCachedVideo(fileName: string): CachedVideo | undefined {
    return this.cachedVideos.find((video) => video.file_name === fileName);
  }

  // Update the status list of a specific video by file name
  public updateStatusList(
    fileName: string,
    newStatusList: CachedVideo["status_list"]
  ): void {
    const oldVideos = [...this.cachedVideos]; // Clone the current state of cachedVideos for comparison

    const videoIndex = this.cachedVideos.findIndex(
      (video) => video.file_name === fileName
    );

    if (videoIndex !== -1) {
      // Update the video status in the cloned array
      const updatedVideo = {
        ...this.cachedVideos[videoIndex],
        status_list: newStatusList,
      };
      this.cachedVideos[videoIndex] = updatedVideo;

      const patch = jsonpatch.compare(oldVideos, this.cachedVideos);

      // const patchString = JSON.stringify(patch);

      const message = {
        patch: patch, // Pass the patch object directly as JSON
        device_id: getOrCreateDeviceId(), // Ensure this is a string
      };

      if (config.debug_level === 2) 
        console.log("Message sent:", message);
      

      // Emit the patch to the backend
      if (this.socket) {
        this.socket.emit("patch_backend", message);
        if (config.debug_level === 1) 
          console.log("Patch emitted:", patch);
        
      } else {
        if (config.debug_warnings)
          console.warn("Socket not initialised, patch not sent.");
      }
    } else {
      if (config.debug_warnings)
        console.warn(`Video with fileName "${fileName}" not found.`);
    }
  }
}
