import * as jsonpatch from "fast-json-patch";
import { io, Socket } from "socket.io-client";
import { getOrCreateDeviceId } from "./deviceIdUtils";
import { JsonData } from "../types/jsondata";
import { CachedVideoManager } from "../context/CachedVideoManager";

let socket: Socket | null = null; // Singleton socket instance
let jsonData = {}; // Stores the current state
const cvm: CachedVideoManager | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io("http://localhost:5000");
    console.log("Socket initialised");
  }
  return socket;
}

// Initialise the socket connection
export function initSocket() {
  const socket = getSocket();
  socket.removeAllListeners(); // Remove all existing listeners

  // Connect and authenticate the socket
  socket.on("connect", () => {
    console.log("Connected to server");
    socket.emit(
      "authenticate",
      { client_id: getOrCreateDeviceId() },
      (message: string, data: JsonData) => {
        console.log("Response from server:", message, data);

        // Update the manager with data from the server
        cvm?.updateFromServerData(data);
      }
    );
  });

  // Socket events
  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });

  socket.on("delta_update", (patch) => {
    jsonpatch.applyPatch(jsonData, patch);
  });

  socket.on("patch_frontend", (data) => {
    console.log("Message from server:", data);
  });

  socket.on("authentication_success", (data) => {
    console.log("Authentication success:", data);
  });

  // console.log("Socket initialised");
}

// Emit updates to the server
export function sendUpdate(newData: JsonData): void {
  const socket = getSocket();
  const patch = jsonpatch.compare(jsonData, newData);
  socket.emit("delta_update", patch);
  jsonData = newData; // Update local data
}

// Export CachedVideoManager for global use
export function getCachedVideoManager(): CachedVideoManager | null {
  return cvm;
}
