import { io } from "socket.io-client";
import * as jsonpatch from "fast-json-patch";
import { TagStatus } from "../components/LeftPanel/PredictionList/CardWrapper/Card/StatusBar/TagWrapper/Tag/Tag";

interface Annotation {
  status: string;
  message: string;
  timestamp: string;
}

interface FileData {
  fileName: string;
  filePath: string;
  status_list: TagStatus[];
  annotations: Annotation[];
  status_counts: {
    correct: number;
    warning: number;
    error: number;
  };
}

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
