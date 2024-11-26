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
import { Colors } from "../../../../styles/colors";

export const Filter = (): JSX.Element => {
  return (
    <div className="filter">
      <div className="wrapper">
        <FilterLabel Icon={Star} label="Perfect" bg_color={Colors.green} />
        <FilterLabel
          Icon={Danger}
          label="Warnings Present"
          bg_color={Colors.yellow}
        />
        <FilterLabel
          Icon={CloseCircle}
          label="Errors Present"
          bg_color={Colors.red}
        />
      </div>
      <div className="wrapper">
        <FilterLabel
          Icon={TickCircle}
          label="Complete"
          bg_color={Colors.blue1}
        />
        <FilterLabel
          Icon={Timer}
          label="Predicting"
          bg_color={Colors.foreground}
        />
        <FilterLabel Icon={Clock} label="Queued" bg_color={Colors.blueGrey} />
      </div>
    </div>
  );
};
