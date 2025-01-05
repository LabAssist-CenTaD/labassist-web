import { useContext } from "react";
import SelectedFilesContext from "../providers/SelectedFilesContext";

export const useSelectedFilesContext = () => {
  const context = useContext(SelectedFilesContext);

  if (!context) {
    throw new Error(
      "useSelectedFilesContext must be used within a SelectedFilesProvider"
    );
  }

  return context;
};
