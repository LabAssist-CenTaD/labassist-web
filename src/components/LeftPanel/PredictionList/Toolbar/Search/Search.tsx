import { useState } from "react";
import "./Search.css";
import { SearchNormal1 } from "iconsax-react";
import { Colors } from "../../../../../styles/colors";

interface SearchProps {
  onSearch: (query: string) => void;
}

export const Search = ({ onSearch }: SearchProps): JSX.Element => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Pass the query back to the parent component
  };

  return (
    <div className="search">
      <SearchNormal1 size={16} color={Colors.foreground} />
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearchChange}
      />
    </div>
  );
};
