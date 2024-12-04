import { useContext } from "react";
import CachedVideoContext from "../context/CachedVideoContext";

export const useCachedVideoContext = () => {
  const context = useContext(CachedVideoContext);
  if (!context) {
    throw new Error(
      "useCachedVideoContext must be used within a CachedVideoProvider"
    );
  }
  return context;
};
