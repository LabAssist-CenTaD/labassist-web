import "./Toolbar.css";

import { Search } from "./Search/Search";
import { SelectButton } from "./SelectButton/SelectButton";
import { AddButton } from "./AddButton/AddButton";

interface ToolbarProps {
  onSearch: (query: string) => void;
  handleSelectModeToggle: () => void;
  isInSelectMode: boolean;
}

export const Toolbar = ({
  onSearch,
  handleSelectModeToggle,
  isInSelectMode,
}: ToolbarProps): JSX.Element => {
  return (
    <div className="toolbar">
      <Search onSearch={onSearch} />
      <AddButton />
      <SelectButton
        onToggle={handleSelectModeToggle}
        isInSelectMode={isInSelectMode}
      />
    </div>
  );
};
