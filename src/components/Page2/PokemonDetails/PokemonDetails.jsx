import { Link, useParams } from "react-router-dom";
import PokemonType from "../../Page1/PokemonType";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { TbPokeball } from "react-icons/tb";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLang } from "../../../providers/LangContext";
import { usePokemonData } from "../../../providers/DataContext";
import axios from "axios";

function PokemonDetails() {
  const params = useParams();
  const transformId = (number) => {
    const str = "" + number;
    const pad = "000";
    const ans = pad.substring(0, pad.length - str.length) + str;
    return ans;
  };
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});

  const { langValue } = useLang();
  const { pokemonData } = usePokemonData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://beta.pokeapi.co/graphql/v1beta', {
          query: `
                  query pokemon {
                      pokemon: pokemon_v2_pokemon(where: {id: {_eq: ${params.id}}}) {
                        id
                        height
                        pokemon_v2_pokemonspecy {
                          pokemon_v2_evolutionchain {
                            pokemon_v2_pokemonspecies (order_by: {id: asc}){
                              id
                              pokemon_v2_pokemonspeciesnames {
                                name
                                pokemon_v2_language {
                                  name
                                }
                              }
                            }
                          }
                          pokemon_v2_pokemonspeciesnames {
                            name
                            pokemon_v2_language {
                              name
                            }
                          }
                        }
                        weight
                        pokemon_v2_pokemonabilities {
                          pokemon_v2_ability {
                            name
                          }
                        }
                        pokemon_v2_pokemonsprites {
                          sprites(path: "front_default")
                        }
                        pokemon_v2_pokemontypes {
                          pokemon_v2_type {
                            name
                          }
                        }
                        pokemon_v2_pokemonspecy {
                          capture_rate
                          is_legendary
                          is_mythical
                          evolution_chain_id
                        }
                        pokemon_v2_pokemonstats {
                          base_stat
                          pokemon_v2_stat {
                            name
                          }
                        }
                      }
                      pokemon_v2_move(where: {pokemon_v2_pokemonmoves: {pokemon_id: {_eq: ${params.id}}}}) {
                        pokemon_v2_movenames{
                            name
                            pokemon_v2_language {
                              name
                            }
                          }
                        id
                      }
                    }
              `
        });
        const pokemonData = response.data.data.pokemon[0];
        pokemonData.pokemon_v2_pokemonmoves = response.data.data.pokemon_v2_move;
        setPokemon(pokemonData);
        console.log("Pokemon data fetched:", pokemonData);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  const [bookmarkPokemon, setBookmarkPokemon] = useState(
    JSON.parse(localStorage.getItem("bookmarkPokemon")) || []
  )
  useEffect(() => {
    localStorage.setItem("bookmarkPokemon", JSON.stringify(bookmarkPokemon));
  }, [bookmarkPokemon]);
  const [capturedPokemon, setCapturedPokemon] = useState(
    JSON.parse(localStorage.getItem("capturedPokemon")) || []
  )

  return (
    !loading ? (
      <main className="w-10/12 mx-auto gap-8 flex flex-col my-10">
        <div className="grid grid-cols-3 text-blue-700">
          {pokemon.id > 1 && (
            <Link
              to={`/pokemon/${pokemon.id - 1}`}
              className="flex justify-start"
            >
              <HiArrowLongLeft
                className="text-4xl hover:cursor-pointer hover:text-blue-700"
              />
            </Link>
          )}
          <p className="col-span-1 col-start-2 gap-2 flex justify-center">
            <span className="font-bold">{pokemon.id}</span> /{" "}
            {pokemonData.length}
          </p>
          {pokemon.id < pokemonData.length && (
            <Link
              to={`/pokemon/${pokemon.id + 1}`}
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
                src={pokemon.pokemon_v2_pokemonsprites[0].sprites}
                alt={pokemon.name}
                className="h-full mx-auto"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-gray-700 font-light">
                <span className="text-black font-bold">Poids: </span>
                {pokemon.weight / 10}kg
              </p>
              <p className="text-gray-700 font-light">
                <span className="text-black font-bold">Taille: </span>{" "}
                {pokemon.height / 10}m
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Type:</p>
              <div className="flex gap-5">
                {pokemon.pokemon_v2_pokemontypes.map((type) => (
                  <PokemonType key={type.pokemon_v2_type.name} name={type.pokemon_v2_type.name} langValue={langValue} />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Stats:</p>
              {pokemon.pokemon_v2_pokemonstats.map((stat) => (
                <div key={stat.pokemon_v2_stat.name} className="flex justify-between">
                  <p>{stat.pokemon_v2_stat.name}</p>
                  <p>{stat.base_stat}</p>
                </div>
              ))}

            </div>
          </div>
          <div className="flex gap-5 flex-col w-7/12">
            <div className="flex justify-between items-center">
              <h2 className="font-black text-blue-700 text-6xl">
                {pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames.find(
                  (name) => name.pokemon_v2_language.name === langValue
                )?.name}
              </h2>
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
            <div className="flex gap-5">
              <p className="font-bold">Évolution:</p>
              {pokemon.pokemon_v2_pokemonspecy.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies.map((evolution) => (
                <Link key={evolution.id} to={`/pokemon/${evolution.id}`}>
                  <p>{evolution.pokemon_v2_pokemonspeciesnames.find((name) => name.pokemon_v2_language.name === langValue)?.name}</p>
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-bold">Attaque:</p>
              <div className="flex flex-wrap gap-5">
                {pokemon.pokemon_v2_pokemonmoves.map((move) => {
                  const moveName = move.pokemon_v2_movenames.find((name) => name.pokemon_v2_language.name === langValue)?.name || move.pokemon_v2_movenames.find((name) => name.pokemon_v2_language.name === 'en')?.name;
                  return (
                    <p key={move.id} className="bg-slate-200 rounded-xl px-5 py-1">
                      {moveName}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    ) : (<p>Loading...</p>)
  );
}
export default PokemonDetails;
