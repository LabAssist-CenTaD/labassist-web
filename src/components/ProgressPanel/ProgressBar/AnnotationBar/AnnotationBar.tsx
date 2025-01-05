import "./AnnotationBar.css";

import { Annotation } from "../../../../types/jsondata";

interface AnnotationBarProps {
  annotations: Annotation[];
  currentSeconds: number;
  durationSeconds: number;
}

export const AnnotationBar = ({
  annotations,
  currentSeconds,
  durationSeconds,
}: AnnotationBarProps): JSX.Element => {
  return <div className="annotation-bar"></div>;
};
