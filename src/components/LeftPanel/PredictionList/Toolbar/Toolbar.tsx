import { Search } from "./Search/Search";
import { SelectButton } from "./SelectButton/SelectButton";
import { AddButton } from "./AddButton/AddButton";
import "./Toolbar.css";

interface ToolbarProps {
  onSearch: (query: string) => void;
}

export const Toolbar = ({ onSearch }: ToolbarProps): JSX.Element => {
  return (
    <div className="toolbar">
      <Search onSearch={onSearch} />
      <AddButton />
      <SelectButton />
    </div>
  );
};
