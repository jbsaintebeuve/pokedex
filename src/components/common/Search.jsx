import { FaSearch } from "react-icons/fa";

function Search({ searchValue, onSearchChange }) {
  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <>
      <div className="flex flew-row gap-4 border-blue-600 border-2 bg-white items-center px-5 py-3 rounded-xl hover:outline outline-2 outline-blue-500 w-full">
        <label htmlFor="search">
          <FaSearch className="text-slate-400" />
        </label>
        <input
          className="w-full outline-none"
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Rechercher un pokémon"
        />
        <button className="bg-yellow-400 text-blue-600 font-bold rounded-lg w-2/12 py-3 text-sm">Rechercher</button>
      </div>
    </>
  );
}

export default Search;
