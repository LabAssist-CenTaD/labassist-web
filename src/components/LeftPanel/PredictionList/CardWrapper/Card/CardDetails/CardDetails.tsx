import { RemoveButton } from "./ButtonWrapper/RemoveButton/RemoveButton";
import { FileDetails } from "./FileDetails/FileDetails";

export const CardDetails = (): JSX.Element => {
  return (
    <div className="card-details">
      <FileDetails
        fileName="titration_1.mp4"
        filePath="C:\Users\labassist\Videos\24S6X\10-04-2024\titration_1.mp4"
      />
      <RemoveButton />
    </div>
  );
};
