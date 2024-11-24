import { FileDetails } from "./FileDetails/FileDetails";
import { ButtonWrapper } from "./ButtonWrapper/ButtonWrapper";
import "./CardDetails.css";

export const CardDetails = (): JSX.Element => {
  return (
    <div className="card-details">
      <FileDetails
        fileName="titration_1.mp4"
        filePath="C:\Users\labassist\Videos\24S6X\titration_1.mp4"
      />
      <ButtonWrapper />
    </div>
  );
};
