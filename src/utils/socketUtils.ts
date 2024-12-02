import { io, Socket } from "socket.io-client";
import * as jsonpatch from "fast-json-patch";
import { TagStatus } from "../components/LeftPanel/PredictionList/CardWrapper/Card/StatusBar/TagWrapper/Tag/Tag";

type Annotation = {
  status: string;
  message: string;
  timestamp: string;
};

type FileData = {
  fileName: string;
  filePath: string;
  status_list: TagStatus[];
  annotations: Annotation[];
  status_counts: {
    correct: number;
    warning: number;
    error: number;
  };
};

let socket: Socket | null = null; // Singleton socket instance
let jsonData = {}; // Stores the current state

// Initialise the socket connection
export function initSocket() {
  if (!socket) {
    socket = io("http://localhost:5000");

    // Socket events
    socket.on("connect", () => {
      console.log("Connected to server");
    });

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

    console.log("Socket initialised");
  }

  return socket;
}

// Emit updates to the server
export function sendUpdate(newData: FileData[]): void {
  const socketInstance = initSocket();
  const patch = jsonpatch.compare(jsonData, newData);
  socketInstance.emit("delta_update", patch);
  jsonData = newData; // Update local data
}

// Authenticate the socket connection
export function authenticateSocket(deviceId: string): void {
  if (socket) {
    socket.emit("authenticate", { client_id: deviceId });
  } else {
    console.error("Socket is not initialised");
  }
}
