import {
  Clock,
  CloseCircle,
  Danger,
  Star,
  TickCircle,
  Timer,
} from "iconsax-react";
import "./Filter.css";
import { FilterLabel } from "./FilterLabel/FilterLabel";

export const Filter = (): JSX.Element => {
  return (
    <div className="filter">
      <div className="wrapper">
        <FilterLabel Icon={Star} label="Perfect" color="rgba(6, 214, 160, 1)" />
        <FilterLabel
          Icon={Danger}
          label="Warnings Present"
          color="rgba(255, 209, 102, 1)"
        />
        <FilterLabel
          Icon={CloseCircle}
          label="Errors Present"
          color="rgba(239, 71, 111, 1)"
        />
      </div>
      <div className="wrapper">
        <FilterLabel
          Icon={TickCircle}
          label="Complete"
          color="rgba(0, 122, 255, 1)"
        />
        <FilterLabel
          Icon={Timer}
          label="Predicting"
          color="rgba(201, 232, 255, 1)"
        />
        <FilterLabel
          Icon={Clock}
          label="Queued"
          color="rgba(98, 120, 136, 1)"
        />
      </div>
    </div>
  );
};
