import "./PredictionList.css";
import { Toolbar } from "./Toolbar/Toolbar";
import { Filter } from "./Filter/Filter";
import { CardWrapper } from "./CardWrapper/CardWrapper";

export const PredictionList = (): JSX.Element => {
  return (
    <div className="prediction-list">
      <div className="header">Prediction List</div>
      <Toolbar />
      <Filter />
      <CardWrapper />
    </div>
  );
};
