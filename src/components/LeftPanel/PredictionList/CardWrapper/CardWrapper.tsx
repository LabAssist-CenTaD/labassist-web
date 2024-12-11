import "./CardWrapper.css";
import { useEffect, useState } from "react";
import { Card } from "./Card/Card";
import { useSelectedFileContext } from "../../../../hooks/useSelectedFileContext";
import { CachedVideo } from "../../../../types/jsondata";

interface CardWrapperProps {
  fileList: CachedVideo[];
}

export const CardWrapper = ({ fileList }: CardWrapperProps): JSX.Element => {
  const { selectedFile, setSelectedFile } = useSelectedFileContext();
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

  return (
    <div
      className="card-wrapper"
      style={{ paddingRight: hasScrollbar ? "16px" : "0px" }}
    >
      {fileList.map((file, index) => (
        <Card
          key={index}
          status_list={file.status_list}
          status_counts={file.status_counts}
          fileName={file.file_name}
          filePath={file.file_path}
          isSelected={selectedFile.fileName === file.file_name}
          onClick={() => {
            setSelectedFile({
              fileName: file.file_name,
              filePath: file.file_path,
            });
          }}
        />
      ))}
    </div>
  );
};
