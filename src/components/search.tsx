import { useState } from "react";

export default function Search({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (arg: string) => void;
}) {
  const [inputValue, setInputValue] = useState(query);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && setQuery(inputValue);
  };
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
