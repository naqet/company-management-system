import { FiSearch } from "react-icons/fi";

export default function SearchPanel() {
  // TODO: add search logic
  return (
    <>
      <button
        type="button"
        title="Search panel"
        className="text-hover text-3xl md:text-xl md:flex md:gap-2 md:items-center md:border-hover md:px-3 md:py-2 md:rounded-lg"
      >
        <FiSearch />
        <span className="hidden md:block text-xs">Search for anything</span>
      </button>
    </>
  );
}
