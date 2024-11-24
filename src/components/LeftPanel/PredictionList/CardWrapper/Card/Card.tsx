import { StatusBar } from "./StatusBar/StatusBar";
import "./Card.css";
import { CardDetails } from "./CardDetails/CardDetails";

export const Card = (): JSX.Element => {
  return (
    <div className="card">
      <StatusBar />
      <CardDetails />
    </div>
  );
};
