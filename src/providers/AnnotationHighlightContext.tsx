import { createContext, ReactNode, useState } from "react";
import { Annotation } from "../types/jsondata";

interface AnnotationHighlightContextType {
  highlightedTimelineAnnotation: Annotation | null;
  setHighlightedTimelineAnnotation: (annotation: Annotation | null) => void;

  highlightedBarAnnotation: Annotation | null;
  setHighlightedBarAnnotation: (annotation: Annotation | null) => void;
}

const AnnotationHighlightContext =
  createContext<AnnotationHighlightContextType | null>(null);

export const AnnotationHighlightProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [highlightedTimelineAnnotation, setHighlightedTimelineAnnotation] =
    useState<Annotation | null>(null);
  const [highlightedBarAnnotation, setHighlightedBarAnnotation] =
    useState<Annotation | null>(null);

  return (
    <AnnotationHighlightContext.Provider
      value={{
        highlightedTimelineAnnotation,
        setHighlightedTimelineAnnotation,

        highlightedBarAnnotation,
        setHighlightedBarAnnotation,
      }}
    >
      {children}
    </AnnotationHighlightContext.Provider>
  );
};

export default AnnotationHighlightContext;
