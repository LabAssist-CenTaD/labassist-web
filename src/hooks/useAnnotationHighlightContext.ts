import { useContext } from "react";
import AnnotationHighlightContext from "../providers/AnnotationHighlightContext";

export const useAnnotationHighlightContext = () => {
  const context = useContext(AnnotationHighlightContext);
  if (!context) {
    throw new Error(
      "useAnnotationHighlightContext must be used within a CachedVideoProvider"
    );
  }
  return context;
};
