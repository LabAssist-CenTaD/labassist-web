import { RemoveButton } from "./RemoveButton/RemoveButton";
import "./ButtonWrapper.css";

export const ButtonWrapper = (): JSX.Element => {
  return (
    <div className="button-wrapper">
      <RemoveButton />
    </div>
  );
};
