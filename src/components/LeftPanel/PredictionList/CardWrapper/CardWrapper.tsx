import "./CardWrapper.css";
import { setSelectedFilePath } from "../../../../shared/selectedFile";
import { useEffect, useState } from "react";
import { Card } from "./Card/Card";
import { TagStatus } from "./Card/StatusBar/TagWrapper/Tag/Tag";

interface CardWrapperProps {
  fileList: {
    fileName: string;
    filePath: string;
    status_list: TagStatus[];
    status_counts: {
      correct: number;
      warning: number;
      error: number;
    };
  }[];
}

export const CardWrapper = ({ fileList }: CardWrapperProps): JSX.Element => {
  // Track if the card wrapper has a scrollbar
  const [hasScrollbar, setHasScrollbar] = useState(false);

  useEffect(() => {
    const wrapper = document.querySelector(".card-wrapper");

    const checkScrollbar = () => {
      if (wrapper) {
        const hasVerticalScrollbar =
          wrapper.scrollHeight > wrapper.clientHeight;
        setHasScrollbar(hasVerticalScrollbar);
      }
    };

    checkScrollbar(); // Check on mount

    const resizeObserver = new ResizeObserver(checkScrollbar);
    if (wrapper) resizeObserver.observe(wrapper);

    return () => resizeObserver.disconnect();
  }, []);

  // Track selected card
  const [selectedCard, setSelectedCard] = useState<{
    fileName: string;
    filePath: string;
  } | null>(null);

  return (
    <div
      className="card-wrapper"
      style={{ paddingRight: hasScrollbar ? "8px" : "0px" }}
    >
      {fileList.map((file, index) => (
        <Card
          key={index}
          status_list={file.status_list}
          status_counts={file.status_counts}
          fileName={file.fileName}
          filePath={file.filePath}
          isSelected={selectedCard?.fileName === file.fileName}
          onClick={() => {
            setSelectedCard({
              fileName: file.fileName,
              filePath: file.filePath,
            });
            setSelectedFilePath(file.filePath);
          }}
        />
      ))}
    </div>
  );
};
