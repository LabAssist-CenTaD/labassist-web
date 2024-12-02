import { io } from "socket.io-client";
import * as jsonpatch from "fast-json-patch";

const socket = io("http://localhost:5000");
let jsonData = {};

socket.on("delta_update", (patch) => {
  jsonpatch.applyPatch(jsonData, patch);
});

export function sendUpdate(newData: JSON): void { // JSON type
  const patch = jsonpatch.compare(jsonData, newData);
  socket.emit("delta_update", patch);
  jsonData = newData; // Update local data
}
