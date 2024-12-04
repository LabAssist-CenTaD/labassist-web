import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getOrCreateDeviceId } from "../utils/deviceIdUtils";
import { CachedVideoManager } from "../managers/CachedVideoManager";
import { JsonData, CachedVideo } from "../types/jsondata";

// Define the shape of the context
interface CachedVideoContextType {
  cachedVideoManager: CachedVideoManager;
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
    () => new CachedVideoManager({ cached_videos: [] }) // Initial empty state
  );
  const [, setSocket] = useState<Socket | null>(null);
  let inititalisedSocketCount = 1;

  useEffect(() => {
    // Initialise socket
    const socketInstance = io("http://localhost:5000");
    setSocket(socketInstance);
    console.log(`Socket initialised, attempting to connect...(${inititalisedSocketCount++})`);

    // On connect, authenticate
    socketInstance.on("connect", () => {
      console.log("Connected to server.");
      socketInstance.emit(
        "authenticate",
        { device_id: getOrCreateDeviceId() },
        (message: string, data: JsonData) => {
          console.log("Authenticated:", message, data);
          cachedVideoManager.updateFromServerData(data); // Update state
        }
      );
    });

    // Handle incoming patches
    socketInstance.on("patch_frontend", (data) => {
      console.log("Raw patch data received:", data);

      try {
        const parsedData = typeof data === "string" ? JSON.parse(data) : data; // Parse data (convert to JSON)

        if (Array.isArray(parsedData)) {
          parsedData.forEach(
            (patch: { op: string; path: string; value: CachedVideo }) => {
              // Operation: Add new cached video
              if (patch.op === "add" && patch.value) {
                cachedVideoManager.addCachedVideo(patch.value); // Update manager
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
  }, [cachedVideoManager, inititalisedSocketCount]);

  return (
    <CachedVideoContext.Provider value={{ cachedVideoManager }}>
      {children}
    </CachedVideoContext.Provider>
  );
};

export default CachedVideoContext;
