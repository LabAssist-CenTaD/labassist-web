import "./FileDetails.css";

interface FileDetailsProps {
  fileName: string;
  filePath: string;
}

export const FileDetails = ({
  fileName,
  filePath,
}: FileDetailsProps): JSX.Element => {
  return (
    <div className="file-details">
      <div className="file-name">{fileName}</div>
      <div className="file-path">{filePath}</div>
    </div>
  );
};
