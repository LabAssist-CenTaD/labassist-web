// import React from "react";

import "./Search.css";
import { SearchNormal1 } from "iconsax-react";

export const Search = (): JSX.Element => {
  return (
    <div className="search">
      <SearchNormal1 size={16} color="rgba(201, 232, 255, 1)" />
      <input className="search-input" type="text" placeholder="Search..." />
    </div>
  );
};
