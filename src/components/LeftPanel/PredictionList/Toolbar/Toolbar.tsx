// import React from "react";
import "./Toolbar.css";
import { Search } from "./Search/Search";
import { SelectButton } from "./SelectButton/SelectButton";
import { Button40 } from "../../../SquareButtons/Button40/Button40";
import { FolderAdd, VideoAdd } from "iconsax-react";

export const Toolbar = (): JSX.Element => {
  return (
    <div className="toolbar">
      <Search />
      <Button40 Icon={VideoAdd} />
      <Button40 Icon={FolderAdd} />
      <SelectButton />
    </div>
  );
};
