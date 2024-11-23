import { Toolbar } from "./Toolbar/Toolbar";
import "./PredictionList.css";
import { Filter } from "./Filter/Filter";

export const PredictionList = (): JSX.Element => {
  return (
    <div className="prediction-list">
      <div className="header">Prediction List</div>
      <Toolbar />
      <Filter />
    </div>
  );
};
