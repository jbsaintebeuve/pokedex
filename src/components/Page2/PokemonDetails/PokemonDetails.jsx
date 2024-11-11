import { Link, useParams } from "react-router-dom";
import PokemonType from "../../Page1/PokemonType";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { TbPokeball } from "react-icons/tb";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useEffect, useState } from "react";

function PokemonDetails({ pokemonData, langValue }) {
  const params = useParams();
  const transformId = (number) => {
    const str = "" + number;
    const pad = "000";
    const ans = pad.substring(0, pad.length - str.length) + str;
    return ans;
  };

  const [bookmarkPokemon, setBookmarkPokemon] = useState(
    JSON.parse(localStorage.getItem("bookmarkPokemon")) || []
  )
  useEffect(() => {
    localStorage.setItem("bookmarkPokemon", JSON.stringify(bookmarkPokemon));
  }, [bookmarkPokemon]);
  const [capturedPokemon, setCapturedPokemon] = useState(
    JSON.parse(localStorage.getItem("capturedPokemon")) || []
  )

  const pokemon = pokemonData.filter(
    (pokemon) => pokemon.id === parseInt(params.id)
  );

  return (
    <main className="w-10/12 mx-auto gap-8 flex flex-col my-10">
      <div className="grid grid-cols-3 text-blue-700">
        {pokemon[0].id > 1 && (
          <Link
            to={`/pokemon/${pokemon[0].id - 1}`}
            className="flex justify-start"
          >
            <HiArrowLongLeft
              className="text-4xl hover:cursor-pointer hover:text-blue-700"
            />
          </Link>
        )}
        <p className="col-span-1 col-start-2 gap-2 flex justify-center">
          <span className="font-bold">{pokemon[0].id}</span> /{" "}
          {pokemonData.length}
        </p>
        {pokemon[0].id < pokemonData.length && (
          <Link
            to={`/pokemon/${pokemon[0].id + 1}`}
            className="flex justify-end"
          >
            <HiArrowLongRight
              className="text-4xl hover:cursor-pointer hover:text-blue-700"
            />
          </Link>
        )}
      </div>
      <div className="flex justify-between gap-10">
        <div className="flex flex-col w-5/12 gap-5">
          <div className="cover h-80">
            <img
              src={pokemon[0].image}
              alt={pokemon[0].names[langValue]}
              className="h-full mx-auto"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <p className="text-gray-700 font-light">
              <span className="text-black font-bold">Poids: </span>
              {pokemon[0].weight/10}kg
            </p>
            <p className="text-gray-700 font-light">
              <span className="text-black font-bold">Taille: </span>{" "}
              {pokemon[0].height/10}m
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Type:</p>
            <div className="flex gap-5">
              {pokemon[0].types.map((type) => (
                <PokemonType key={type} name={type} langValue={langValue} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-5 flex-col w-7/12">
        <div className="flex justify-between items-center">
          <h2 className="font-black text-blue-700 text-6xl">{pokemon[0].names[langValue]}</h2>
          <div className="flex gap-5">
          {capturedPokemon.includes(parseInt(params.id)) && (
                  <TbPokeball
                    className="text-blue-700 text-2xl"
                  />
                )}
          {bookmarkPokemon.includes(params.id) ? (
                  <FaBookmark
                    className="text-blue-700 text-2xl hover:cursor-pointer"
                    onClick={() => 
                      setBookmarkPokemon(bookmarkPokemon.filter((id) => id !== params.id))
                    }
                  />
                ) : (
                  <FaRegBookmark
                    className="text-blue-700 text-2xl hover:cursor-pointer"
                    onClick={() => 
                      setBookmarkPokemon([...bookmarkPokemon, params.id])
                    }
                  />
                )}
                </div>
        </div>
          <p className="font-bold text-xl">n°{transformId(params.id)}</p>
          <div className="flex flex-col gap-5">
            <p className="font-bold">Attaque:</p>
            <div className="flex flex-wrap gap-5">
            {pokemon[0].moves.map((move) => (
              <p key={move} className="bg-slate-200 rounded-xl px-5 py-1">
                {move}
              </p>
            ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default PokemonDetails;
