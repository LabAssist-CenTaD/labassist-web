import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getOrCreateDeviceId } from "../utils/deviceIdUtils";
import { CachedVideoManager } from "../managers/CachedVideoManager";
import { JsonData, CachedVideo } from "../types/jsondata";
import { config } from "../config/config";

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
    () => new CachedVideoManager({ cached_videos: [] })
  );
  const [, setSocket] = useState<Socket | null>(null);
  const [cachedVideos, setCachedVideos] = useState<CachedVideo[]>([]);

  let initialisedSocketCount = 1;

  useEffect(() => {
    // Initialise socket
    const socketInstance = io(config.connection_address);
    setSocket(socketInstance);
    console.log(
      `Socket initialised, attempting to connect...(${initialisedSocketCount++})`
    );

    // On connect, authenticate
    socketInstance.on("connect", () => {
      console.log("Connected to server.");
      socketInstance.emit(
        "authenticate",
        { device_id: getOrCreateDeviceId() },
        (message: string, data: JsonData) => {
          console.log("Authenticated:", message, data);
          cachedVideoManager.updateFromServerData(data); // Update the manager
          setCachedVideos(cachedVideoManager.getCachedVideos()); // Update the state
        }
      );
    });

    // Handle incoming patches
    socketInstance.on("patch_frontend", (data) => {
      console.log("Raw patch data received:", data);

      try {
        const parsedData = typeof data === "string" ? JSON.parse(data) : data;

        if (Array.isArray(parsedData)) {
          parsedData.forEach(
            (patch: { op: string; path: string; value: CachedVideo }) => {
              if (patch.op === "add" && patch.value) {
                cachedVideoManager.addCachedVideo(patch.value); // Update manager
                // console.log(
                //   "Video added, updated list:",
                //   cachedVideoManager.getCachedVideos()
                // );
                setCachedVideos(cachedVideoManager.getCachedVideos()); // Update state to trigger rerender
              }
            }
          );
        } else {
          console.error("Unexpected data format:", parsedData);
        }
      } catch (error) {
        console.error("Error parsing patch data:", error);
      }
    });

    // Handle disconnect
    socketInstance.on("disconnect", () => {
      console.log("Disconnected from server.");
    });

    return () => {
      socketInstance.disconnect();
      setSocket(null);
    };
  }, [cachedVideoManager, initialisedSocketCount]);

  return (
    <CachedVideoContext.Provider
      value={{ cachedVideoManager, cachedVideos, setCachedVideos }}
    >
      {children}
    </CachedVideoContext.Provider>
  );
};

export default CachedVideoContext;
