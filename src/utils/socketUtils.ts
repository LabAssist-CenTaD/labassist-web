import { io } from "socket.io-client";
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

const socket = io("http://localhost:5000");
let jsonData = {};

socket.on("delta_update", (patch) => {
  jsonpatch.applyPatch(jsonData, patch);
});

export function sendUpdate(newData: FileData[]): void {
  // JSON type
  const patch = jsonpatch.compare(jsonData, newData);
  socket.emit("delta_update", patch);
  jsonData = newData; // Update local data
}

export function authenticateSocket(deviceId: string): void {
  socket.emit("authenticate", { client_id: deviceId });
}

// Initialise the socket connection
export function initSocket(): void {
  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });

  socket.on("message", (data) => {
    console.log("Message from server:", data);
  });

  socket.on("authentication_success", (data) => {
    console.log("Authentication success:", data);
  });
}
