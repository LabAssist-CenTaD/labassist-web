import * as jsonpatch from "fast-json-patch";
import { io, Socket } from "socket.io-client";
import { CachedVideo, JsonData } from "../types/jsondata";
import { getOrCreateDeviceId } from "./deviceIdUtils";
import { CachedVideoManager } from "../managers/CachedVideoManager";

let socket: Socket | null = null; // Singleton socket instance
let jsonData = {}; // Stores the current state
const cvm = new CachedVideoManager({ cached_videos: [] }); // Initializing with empty cached_videos

export function getSocket(): Socket {
  if (!socket) {
    socket = io("http://localhost:5000");
    console.log("Socket initialised, attemping to connect...");
  }
  return socket;
}

// Initialise the socket connection
export function initSocket() {
  const socket = getSocket();
  socket.removeAllListeners(); // Remove all existing listeners

  // Socket events

  // Connect and authenticate the socket
  socket.on("connect", () => {
    console.log("Connected to server.");
    socket.emit(
      "authenticate",
      { device_id: getOrCreateDeviceId() },
      (message: string, data: JsonData) => {
        console.log("Response from server:", message, data);

        // Update the manager with data from the server
        cvm?.updateFromServerData(data);
      }
    );
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server.");
  });

  socket.on("delta_update", (patch) => {
    jsonpatch.applyPatch(jsonData, patch);
  });

  // Listen for updates from the server and apply them
  socket.on("patch_frontend", (data) => {
    console.log("Raw message from server:", data);

    try {
      // Parse the data if it's a string
      const parsedData = typeof data === "string" ? JSON.parse(data) : data;

      // Ensure parsedData is an array
      if (Array.isArray(parsedData)) {
        parsedData.forEach(
          (patch: { op: string; path: string; value: CachedVideo }) => {
            // Operation: add new cached video
            if (patch.op === "add" && patch.value) {
              // Add the video to the cached video manager
              if (!cvm.findCachedVideo(patch.value.file_name)) {
                cvm.addCachedVideo(patch.value);
              }
            }
            
            // Operation: remove cached video
          }
        );
      } else {
        console.error("Unexpected data format for patch_frontend:", parsedData);
      }
    } catch (error) {
      console.error("Error parsing patch_frontend data:", error, data);
    }
  });

  socket.on("authentication_success", (data) => {
    console.log("Authentication success:", data);
  });
}

// Emit updates to the server
export function patchBackend(newData: JsonData): void {
  const socket = getSocket();
  const patch = jsonpatch.compare(jsonData, newData);
  socket.emit("patch_backend", patch);
  jsonData = newData; // Update local data
}

// Export CachedVideoManager for global use
export function getCachedVideoManager(): CachedVideoManager {
  return cvm; // Always return the singleton instance
}
