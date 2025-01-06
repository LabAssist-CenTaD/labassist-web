import "./CardWrapper.css";
import { useEffect, useState } from "react";
import { Card } from "./Card/Card";
import { CachedVideo } from "../../../../types/jsondata";

interface CardWrapperProps {
  fileList: CachedVideo[];
  isInSelectMode: boolean;
  selectedFile: { fileName: string | null; filePath: string | null };
  setSelectedFile: (file: { fileName: string; filePath: string }) => void;
  selectedFiles: string[];
  toggleSelectedFile: (fileName: string) => void;
}

export const CardWrapper = ({
  fileList,
  isInSelectMode,
  selectedFile,
  setSelectedFile,
  selectedFiles,
  toggleSelectedFile,
}: CardWrapperProps): JSX.Element => {
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

    checkScrollbar();
    const resizeObserver = new ResizeObserver(checkScrollbar);
    if (wrapper) resizeObserver.observe(wrapper);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      className="card-wrapper"
      style={{ paddingRight: hasScrollbar ? "16px" : "0px" }}
    >
      {fileList.map((file, index) => {
        const isSelectedInSelectMode =
          isInSelectMode && selectedFiles.includes(file.file_name);
        const isSelectedInSingleMode =
          !isInSelectMode && selectedFile.fileName === file.file_name;

        // Determine if the card is selected in select mode or single mode
        const cardClass = `card ${
          isSelectedInSelectMode || isSelectedInSingleMode ? "selected" : ""
        }`;

        return (
          <Card
            key={`${file.file_path}-${index}`}
            status_list={file.status_list}
            status_counts={file.status_counts}
            fileName={file.file_name}
            filePath={file.file_path}
            onClick={() => {
              if (isInSelectMode) {
                toggleSelectedFile(file.file_name); // Multi selection
              } else {
                setSelectedFile({
                  fileName: file.file_name,
                  filePath: file.file_path,
                }); // Single selection
              }
            }}
            cardClass={cardClass} // Pass the selected class based on the selection state
          />
        );
      })}
    </div>
  );
};
