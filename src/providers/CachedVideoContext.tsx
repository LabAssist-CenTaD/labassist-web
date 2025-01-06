import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getOrCreateDeviceId } from "../utils/deviceIdUtils";
import { CachedVideoManager } from "../managers/CachedVideoManager";
import { JsonData, CachedVideo } from "../types/jsondata";
import { config } from "../config/config";
import * as jsonpatch from "fast-json-patch";

// Define the shape of the context
interface CachedVideoContextType {
  cachedVideoManager: CachedVideoManager;
  cachedVideos: CachedVideo[];
  setCachedVideos: React.Dispatch<React.SetStateAction<CachedVideo[]>>; // Expose setCachedVideos for updating state in the context
}

// Create the context
const CachedVideoContext = createContext<CachedVideoContextType | undefined>(
  undefined
);

// Provider component
export const CachedVideoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cachedVideoManager] = useState(
    () => new CachedVideoManager({ cached_videos: [] }, null)
  );
  const [, setSocket] = useState<Socket | null>(null);
  const [cachedVideos, setCachedVideos] = useState<CachedVideo[]>([]);

  useEffect(() => {
    // Initialise socket
    const socketInstance = io(config.connection_address);
    setSocket(socketInstance);
    if (config.debug_level === 1)
      console.log("Socket initialised, attempting to connect to API...");

    // Pass the socket instance to the manager
    cachedVideoManager["socket"] = socketInstance;

    // On connect, authenticate
    socketInstance.on("connect", () => {
      if (config.debug_level === 1) console.log("Connected to API.");

      socketInstance.emit(
        "authenticate",
        { device_id: getOrCreateDeviceId() },
        (message: string, data: JsonData) => {
          if (config.debug_level === 1)
            console.log("Authenticated:", message, data);

          cachedVideoManager.updateFromServerData(data); // Update the manager
          setCachedVideos(cachedVideoManager.getCachedVideos()); // Update the state
        }
      );
    });

    // Handle incoming patches
    socketInstance.on("patch_frontend", (data) => {
      if (config.debug_level === 1) console.log("Patch data received:", data);

      const parsedData = typeof data === "string" ? JSON.parse(data) : data;

      // Create a copy of the current videos and apply the patch to it
      const patchedData = jsonpatch.applyPatch(
        [...cachedVideoManager.getCachedVideos()],
        parsedData
      ).newDocument;

      // Update the manager with the patched data
      cachedVideoManager.updateFromServerData({
        cached_videos: patchedData,
      });

      setCachedVideos(patchedData); // Directly update the state with the patched data to trigger a re-render
    });

    // Listen for server responses to the `patch_backend` event
    socketInstance.on("update", (response) => {
      if (config.debug_level === 2)
        console.log("Server response to patch_backend:", response);

      // const parsedResponse =
      //   typeof response === "string" ? JSON.parse(response) : response;

      // // Update the manager with the server's response if necessary
      // if (parsedResponse?.data) {
      //   cachedVideoManager.updateFromServerData({
      //     cached_videos: parsedResponse.data,
      //   });
      //   setCachedVideos(parsedResponse.data);
      // }
    });

    // Handle disconnect
    socketInstance.on("disconnect", () => {
      if (config.debug_level === 1) console.log("Disconnected from API.");
    });

    return () => {
      socketInstance.disconnect();
      setSocket(null);
    };
  }, [cachedVideoManager]);

  return (
    <CachedVideoContext.Provider
      value={{ cachedVideoManager, cachedVideos, setCachedVideos }}
    >
      {children}
    </CachedVideoContext.Provider>
  );
};

export default CachedVideoContext;
