import { useEffect, useState } from "react";
import {
  FaBookmark,
  FaRegBookmark,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortNumericDown,
  FaSortNumericUp,
} from "react-icons/fa";
import { TbPokeballOff, TbPokeball } from "react-icons/tb";
import SelectorAlt from "../../common/SelectorAlt";
import PokemonCard from "../PokemonCard";
import { usePokemonData } from "../../../providers/DataContext";

function PokemonList({
  searchValue,
  langValue,
  // pokemonData,
  filterTypeValues,
  valueHeightSlider,
  valueWeightSlider,
}) {
  const { pokemonData, loading } = usePokemonData();

  useEffect(() => {
    console.log("Pokemon data fetched:", pokemonData.length);
  }, [pokemonData]);

  const [selectedSort, setSelectedSort] = useState("id");
  const sortOptions = ["id", "name", "weight", "height", "type"];
  const [sortOrder, setSortOrder] = useState("asc");
  const [rangeId, setRangeId] = useState({ min: 0, max: pokemonData.length });

  const [displayBookmark, setDisplayBookmark] = useState(false);
  const [bookmarkPokemon, setBookmarkPokemon] = useState(
    JSON.parse(localStorage.getItem("bookmarkPokemon")) || []
  );
  const [displayCaptured, setDisplayCaptured] = useState(false);
  const [capturedPokemon, setCapturedPokemon] = useState(
    JSON.parse(localStorage.getItem("capturedPokemon")) || []
  );

  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    if(!loading){
    setFilteredPokemon(pokemonData
    .filter((pokemon) =>
      pokemon.pokemon_v2_pokemonspeciesnames
        .find((name) => name.pokemon_v2_language.name === langValue)
        ?.name.toLowerCase()
        .includes(searchValue.toLowerCase())
    )
    .filter((pokemon) =>
      filterTypeValues.length > 0
        ? filterTypeValues.every((type) =>
          pokemon.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes.some(
            (pokemonType) => pokemonType.pokemon_v2_type.name === type
          )
        )
        : true
    )
    .filter(
      (pokemon) =>
        pokemon.pokemon_v2_pokemons[0].weight / 10 >= valueWeightSlider[0] &&
        pokemon.pokemon_v2_pokemons[0].weight / 10 <= valueWeightSlider[1]
    )
    .filter(
      (pokemon) =>
        pokemon.pokemon_v2_pokemons[0].height / 10 >= valueHeightSlider[0] &&
        pokemon.pokemon_v2_pokemons[0].height / 10 <= valueHeightSlider[1]
    )
    // .filter(
    //   (pokemon) => pokemon.id >= rangeId.min && pokemon.id <= rangeId.max
    // )
    .filter(
      (pokemon) =>
        !displayBookmark || bookmarkPokemon.includes(pokemon.id.toString())
    )
    .filter(
      (pokemon) => !displayCaptured || capturedPokemon.includes(pokemon.id)
    )
  );
  }
  },[pokemonData, valueHeightSlider, valueWeightSlider, searchValue, langValue, filterTypeValues, rangeId, displayBookmark, bookmarkPokemon, displayCaptured, capturedPokemon, loading]);

  useEffect(() => {
    if (pokemonData.length > 0) {
      setRangeId((prev) => ({ ...prev, max: pokemonData.length }));
    }
  }, [pokemonData]);

  const sortFilteredPokemon = (pokemonList, sortValue) => {
    switch (sortValue) {
      case "id":
        if (sortOrder === "asc") {
          return pokemonList.sort((a, b) => a.id - b.id);
        }
        if (sortOrder === "desc") {
          return pokemonList.sort((a, b) => b.id - a.id);
        }
      case "name":
        if (sortOrder === "asc") {
          return pokemonList.sort((a, b) =>
            a.pokemon_v2_pokemonspeciesnames.find(name => name.pokemon_v2_language.name === langValue)?.name.localeCompare(
              b.pokemon_v2_pokemonspeciesnames.find(name => name.pokemon_v2_language.name === langValue)?.name
            )
          );
        }
        if (sortOrder === "desc") {
          return pokemonList.sort((a, b) =>
            b.pokemon_v2_pokemonspeciesnames.find(name => name.pokemon_v2_language.name === langValue)?.name.localeCompare(
              a.pokemon_v2_pokemonspeciesnames.find(name => name.pokemon_v2_language.name === langValue)?.name
            )
          );
        }
      case "weight":
        if (sortOrder === "asc") {
          return pokemonList.sort((a, b) => a.pokemon_v2_pokemons[0].weight - b.pokemon_v2_pokemons[0].weight);
        }
        if (sortOrder === "desc") {
          return pokemonList.sort((a, b) => b.pokemon_v2_pokemons[0].weight - a.pokemon_v2_pokemons[0].weight);
        }
      case "height":
        if (sortOrder === "asc") {
          return pokemonList.sort((a, b) => a.pokemon_v2_pokemons[0].height - b.pokemon_v2_pokemons[0].height);
        }
        if (sortOrder === "desc") {
          return pokemonList.sort((a, b) => b.pokemon_v2_pokemons[0].height - a.pokemon_v2_pokemons[0].height);
        }
      case "type":
        if (sortOrder === "asc") {
          return pokemonList.sort((a, b) =>
            a.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name.localeCompare(
              b.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name
            )
          );
        }
        if (sortOrder === "desc") {
          return pokemonList.sort((a, b) =>
            b.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name.localeCompare(
              a.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name
            )
          );
        }
      default:
        return pokemonList;
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex gap-5 w-full px-5 justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="flex gap-4">
            {(selectedSort === "id" ||
              selectedSort === "weight" ||
              selectedSort === "height") &&
              (sortOrder === "asc" ? (
                <FaSortNumericDown
                  className="hover:cursor-pointer hover:text-blue-700"
                  onClick={() => setSortOrder("desc")}
                />
              ) : (
                <FaSortNumericUp
                  className="hover:cursor-pointer hover:text-blue-700"
                  onClick={() => setSortOrder("asc")}
                />
              ))}
            {(selectedSort === "name" || selectedSort === "type") &&
              (sortOrder === "asc" ? (
                <FaSortAlphaDown
                  className="hover:cursor-pointer hover:text-blue-700"
                  onClick={() => setSortOrder("desc")}
                />
              ) : (
                <FaSortAlphaUp
                  className="hover:cursor-pointer hover:text-blue-700"
                  onClick={() => setSortOrder("asc")}
                />
              ))}
            <SelectorAlt
              selectedValue={selectedSort}
              onChange={setSelectedSort}
              options={sortOptions}
              name={"Trier par"}
            />
          </div>
          <div className="flex gap-4">
            <div
              className={`flex gap-2 items-center text-sm text-blue-700 hover:bg-slate-100 px-2 py-1 hover:cursor-pointer rounded-md border  ${displayBookmark ? "border-blue-700 bg-slate-100" : "border-none"
                }`}
              onClick={() => setDisplayBookmark(!displayBookmark)}
            >
              {displayBookmark ? <FaBookmark /> : <FaRegBookmark />}
              <p className="font-semibold">Enregistré</p>
            </div>
            <div className={`flex gap-2 items-center text-sm text-blue-700 hover:bg-slate-100 px-2 py-1 hover:cursor-pointer rounded-md border ${displayCaptured ? "border-blue-700 bg-slate-100" : "border-none"
              }`}
              onClick={() => setDisplayCaptured(!displayCaptured)}
            >
              {displayCaptured ? <TbPokeball /> : <TbPokeballOff />}
              <p className="font-semibold">Capturé</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 items-center">
          <p className="font-bold text-sm">Plage d'ID</p>
          <input
            type="number"
            className="border-blue-700 border-2 w-20 rounded-md px-2 py-2"
            placeholder="min"
            onChange={(e) => setRangeId({ ...rangeId, min: e.target.value })}
            value={rangeId.min}
          />
          <span>-</span>
          <input
            type="number"
            className="border-blue-700 border-2 w-20 rounded-md px-2 py-2"
            placeholder="max"
            onChange={(e) => setRangeId({ ...rangeId, max: e.target.value })}
            value={rangeId.max}
          />
        </div>
      </div>
      <section className="flex flex-wrap gap-5">
        {sortFilteredPokemon(filteredPokemon, selectedSort).length > 0 ? (
          sortFilteredPokemon(filteredPokemon, selectedSort).map(
            (pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                langValue={langValue}
                bookmarkPokemon={bookmarkPokemon}
                capturedPokemon={capturedPokemon}
              />
            )
          )
        ) : (
          <p>Aucun Pokémon trouvé</p>
        )}
      </section>
    </div>
  );
}
export default PokemonList;
