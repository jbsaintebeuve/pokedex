import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { TbPokeball } from "react-icons/tb";
import { Link } from "react-router-dom";
import PokemonType from "../PokemonType";
import { useEffect } from "react";

function PokemonCard({
  pokemon,
  langValue,
  bookmarkPokemon,
  capturedPokemon,
}) {
  const transformId = (number) => {
    const str = "" + number;
    const pad = "000";
    const ans = pad.substring(0, pad.length - str.length) + str;
    return ans;
  };

  return (
    <>
      <Link to={`/pokemon/${pokemon.id}`}>
        <div className="rounded-md border-blue-600 border-2 p-4 flex flex-col gap-5 w-60">
          <div className="cover h-36 flex justify-center">
            <img src={pokemon.pokemon_v2_pokemons[0].pokemon_v2_pokemonsprites[0].sprites.showdown.front_default} 
            alt={pokemon.pokemon_v2_pokemonspeciesnames.find(
              (name) => name.pokemon_v2_language.name === langValue
            )?.name || pokemon.name} 
            className="h-full" />
            </div>
            <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between items-center">
              <p className="font-bold text-xl">
                {pokemon.pokemon_v2_pokemonspeciesnames.find(
                (name) => name.pokemon_v2_language.name === langValue
                )?.name || pokemon.name}
              </p>
              <div className="flex gap-4">
                {capturedPokemon.includes(pokemon.id) && (
                <TbPokeball className="text-blue-700" />
                )}
                {bookmarkPokemon.includes(pokemon.id.toString()) ? (
                <FaBookmark className="text-blue-700" />
                ) : (
                <FaRegBookmark className="text-blue-700" />
                )}
              </div>
              </div>
              <span className="w-full text-xs text-gray-600 font-semibold">
              n°{transformId(pokemon.id)}
              </span>
            </div>
            <div className="flex flex-row w-full gap-4">
              {pokemon.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes.map((type) => (
                <PokemonType key={type.pokemon_v2_type.name} name={type.pokemon_v2_type.name} langValue={langValue} />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
export default PokemonCard;
