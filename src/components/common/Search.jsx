import { FaSearch } from "react-icons/fa";

function Search({ searchValue, onSearchChange }) {
  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <>
      <div className="flex flew-row gap-4 border-blue-600 border-2 bg-white dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:outline-blue-700 items-center px-5 py-3 rounded-xl hover:outline outline-2 outline-blue-500 w-full">
        <label htmlFor="search">
          <FaSearch className="text-slate-400 dark:text-blue-400" />
        </label>
        <input
          className="w-full outline-none dark:bg-slate-900 dark:text-white"
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Rechercher un pokémon"
        />
      </div>
    </>
  );
}

export default Search;
