import { useContext } from "react";
import SelectedFileContext from "../providers/SelectedFileContext";

// Custom hook for consuming the context
export const useSelectedFileContext = () => {
  const context = useContext(SelectedFileContext);
  if (!context) {
    throw new Error(
      "useSelectedFileContext must be used within a SelectedFileProvider"
    );
  }
  return context;
};
