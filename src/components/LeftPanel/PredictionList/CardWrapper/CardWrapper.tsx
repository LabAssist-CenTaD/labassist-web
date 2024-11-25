import { Card } from "./Card/Card";
import "./CardWrapper.css";

// interface CardWrapperProps {
//   fileList: string[];
// }

export const CardWrapper = (): JSX.Element => {
  return (
    <div className="card-wrapper">
      <Card
        status_list={["complete"]}
        // status_counts={{ correct: 1, warning: 1, error: 1 }}
        fileName="file1"
        filePath="path1"
      />
    </div>
  );
};
