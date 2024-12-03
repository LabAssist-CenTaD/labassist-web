import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getOrCreateDeviceId } from "../utils/deviceIdUtils";
import { CachedVideo, JsonData } from "../types/jsondata";
import { CachedVideoManager } from "../managers/CachedVideoManager";

// Singleton socket instance
let socketInstance: Socket | null = null;

export const useSocket = (cvm: CachedVideoManager) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialise the socket connection only if not already connected
    if (!socketInstance) {
      socketInstance = io("http://localhost:5000");
      console.log("Socket initialised, attempting to connect...");

      // Connect and authenticate the socket
      socketInstance.on("connect", () => {
        console.log("Connected to server.");
        socketInstance?.emit(
          "authenticate",
          { device_id: getOrCreateDeviceId() },
          (message: string, data: JsonData) => {
            console.log("Response from server:", message, data);
            // Update the manager with data from the server
            cvm.updateFromServerData(data);
          }
        );
      });

      // Listen for updates from the server and apply them
      socketInstance.on("patch_frontend", (data) => {
        console.log("Raw message from server:", data);

        try {
          const parsedData = typeof data === "string" ? JSON.parse(data) : data;

          // Ensure parsedData is an array
          if (Array.isArray(parsedData)) {
            parsedData.forEach(
              (patch: { op: string; path: string; value: CachedVideo }) => {
                // Operation: Add new cached video
                if (patch.op === "add" && patch.value) {
                  cvm.addCachedVideo(patch.value); // Add the video to the cached video manager
                }
              }
            );
          } else {
            console.error("Unexpected data format:", parsedData);
          }
        } catch (error) {
          console.error("Error parsing patch_frontend data:", error, data);
        }
      });

      // Handle disconnect
      socketInstance.on("disconnect", () => {
        console.log("Disconnected from server.");
      });

      console.log("Socket event listeners registered.");
    } else {
      console.log("Socket already initialised. Skipping re-initialisation.");
    }

    // Set the socket instance in state for the component
    setSocket(socketInstance);

  }, [cvm]); // Dependency on `cvm` ensures the manager is updated

  return socket;
};
