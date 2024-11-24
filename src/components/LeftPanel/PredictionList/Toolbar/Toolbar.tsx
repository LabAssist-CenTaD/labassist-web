// import React from "react";
import "./Toolbar.css";
import { Search } from "./Search/Search";
import { SelectButton } from "./SelectButton/SelectButton";
import { AddButton } from "./AddButton/AddButton";

export const Toolbar = (): JSX.Element => {
  return (
    <div className="toolbar">
      <Search />
      <AddButton />
      <SelectButton />
    </div>
  );
};
