import { useEffect } from "react";
import { initSocket } from "../utils/socketUtils";

let isSocketInitialised = false;

export function useInitSocket(): void {
  useEffect(() => {
    if (isSocketInitialised) {
      console.log("Socket is already initialised. Skipping re-initialisation.");
      return;
    }

    try {
      console.log("Initialising socket...");
      initSocket();
      isSocketInitialised = true;
    } catch (error) {
      console.error("Socket initialisation failed:", error);
    }
  }, []); // Run only once when the component mounts
}
