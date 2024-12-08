import axios from "axios";
import { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { TbPokeball } from "react-icons/tb";
import LazyLoad from 'react-lazyload';
import { Link, useParams, useNavigate } from "react-router-dom";
import { usePokemonData } from "../../../providers/DataContext";
import { useLang } from "../../../providers/LangContext";
import Table from "../../common/Table";
import PokemonType from "../../Page1/PokemonType";

function PokemonDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const transformId = (number) => {
    const str = "" + number;
    const pad = "000";
    const ans = pad.substring(0, pad.length - str.length) + str;
    return ans;
  };
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});

  const { langValue } = useLang();
  const { numPokemonData, types } = usePokemonData();

  useEffect(() => {
    if (isNaN(params.id)) {
      navigate("/nopage");
      return;
    }
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
                          pokemon_v2_pokemonspecies(order_by: {id: asc}) {
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
                          pokemon_v2_abilitynames {
                            name
                            pokemon_v2_language {
                              name
                            }
                          }
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
                        pokemon_v2_evolutionchain {
                          pokemon_v2_pokemonspecies(order_by: {id: asc}) {
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
                      pokemon_v2_pokemonstats {
                        base_stat
                        pokemon_v2_stat {
                          pokemon_v2_statnames {
                            name
                            pokemon_v2_language{
                              name
                            }
                          }
                        }
                      }
                    }
                    pokemon_v2_move(where: {pokemon_v2_pokemonmoves: {pokemon_id: {_eq: ${params.id}}, _and: {order: {}, pokemon_v2_movelearnmethod: {}}}}) {
                      name
                      id
                      accuracy
                      pokemon_v2_movenames {
                        name
                        pokemon_v2_language {
                          name
                        }
                      }
                      power
                      pp
                      priority
                      pokemon_v2_type {
                        pokemon_v2_typenames {
                          pokemon_v2_language {
                            name
                          }
                          name
                        }
                      }
                    }
                  }

              `
        });
        const pokemonData = response.data.data.pokemon[0];
        pokemonData.pokemon_v2_pokemonmoves = response.data.data.pokemon_v2_move;
        setPokemon(pokemonData);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchData();
  }, [params.id, navigate]);

  const [bookmarkPokemon, setBookmarkPokemon] = useState(
    JSON.parse(localStorage.getItem("bookmarkPokemon")) || []
  )
  useEffect(() => {
    localStorage.setItem("bookmarkPokemon", JSON.stringify(bookmarkPokemon));
  }, [bookmarkPokemon]);
  const capturedPokemon = JSON.parse(localStorage.getItem("capturedPokemon")) || [];

  const columns = [
    {
      Header: 'Attaque',
      accessor: (row) => {
        const moveName = row.pokemon_v2_movenames.find(
          (name) => name.pokemon_v2_language.name === langValue
        )?.name || row.pokemon_v2_movenames.find(
          (name) => name.pokemon_v2_language.name === 'en'
        )?.name;
        return moveName;
      }
    },
    { Header: 'Puissance', accessor: 'power' },
    { Header: 'Précision', accessor: 'accuracy' },
    { Header: 'PP', accessor: 'pp' }
  ];

  const getStatColor = (stat) => {
    if (stat <= 50) return 'bg-red-600';
    if (stat <= 100) return 'bg-orange-400';
    if (stat <= 255) return 'bg-green-600';
    return 'bg-blue-600';
  };

  return (
    !loading ? (
      <main className="w-10/12 mx-auto gap-8 flex flex-col py-10">
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
            {numPokemonData}
          </p>
          {pokemon.id < numPokemonData && (
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
        <div className="flex md:flex-row flex-col justify-between gap-10">
          <div className="flex flex-col md:w-5/12 gap-5">

            <LazyLoad height={144} offset={100} placeholder={
              <img src={"./img/pokemon-placeholder.gif"} alt="pokeball" className="h-full" />
            }>
              <div className="cover h-80">
                <img
                  src={pokemon.pokemon_v2_pokemonsprites[0].sprites}
                  alt={pokemon.name}
                  className="h-full mx-auto"
                />
              </div>
            </LazyLoad>
            <div className="flex justify-between items-center md:hidden">
              <h2 className="font-black text-blue-700 text-5xl">
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
                    className="text-blue-700 text-xl hover:cursor-pointer"
                    onClick={() =>
                      setBookmarkPokemon(bookmarkPokemon.filter((id) => id !== params.id))
                    }
                  />
                ) : (
                  <FaRegBookmark
                    className="text-blue-700 text-xl hover:cursor-pointer"
                    onClick={() =>
                      setBookmarkPokemon([...bookmarkPokemon, params.id])
                    }
                  />
                )}
              </div>
            </div>
            <p className="font-bold text-xl flex md:hidden">n°{transformId(params.id)}</p>
            <div className="grid grid-cols-2 gap-4 text-lg">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="dark:text-white text-black font-bold">Poids: </span>
                {pokemon.weight / 10}kg
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="dark:text-white text-black font-bold">Taille: </span>{" "}
                {pokemon.height / 10}m
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Type:</p>
              <div className="flex gap-5">
                {pokemon.pokemon_v2_pokemontypes.map((type, index) => (
                  <PokemonType key={"type-" + index} name={type.pokemon_v2_type.name} types={types} />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-bold">Stats:</p>
              {pokemon.pokemon_v2_pokemonstats.map((stat) => (
                <div key={stat.pokemon_v2_stat.name} className="flex justify-between items-center">
                  <p className="text-nowrap text-xs md:text-sm text-ellipsis overflow-hidden ...">
                    {stat.pokemon_v2_stat.pokemon_v2_statnames.find(
                      (name) => name.pokemon_v2_language.name === langValue
                    )?.name || stat.pokemon_v2_stat.pokemon_v2_statnames.find(
                      (name) => name.pokemon_v2_language.name === 'en'
                    )?.name}
                  </p>
                  <div className="w-8/12 bg-gray-200 dark:bg-slate-800 rounded-full h-5 relative">
                    <div className={`${getStatColor(stat.base_stat)} h-5 rounded-full`} style={{ width: `${(stat.base_stat / 255) * 100}%` }}></div>
                    <span className="absolute inset-0 flex left-4 justify-left items-center text-xs font-medium text-white">{stat.base_stat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-5 flex-col md:w-7/12">
            <div className="md:flex hidden justify-between items-center">
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
            <p className="font-bold hidden md:flex text-xl">n°{transformId(params.id)}</p>
            {pokemon.pokemon_v2_pokemonspecy.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies.length > 1 && (
              <div className="flex flex-col gap-5">
                <p className="font-bold">Évolution:</p>
                <div className="flex flex-wrap md:gap-5 gap-1 gap-y-3 md:justify-normal">
                  {pokemon.pokemon_v2_pokemonspecy.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies.map((evolution, index) => (
                    <>
                      <Link key={"evo-" + evolution.id} to={`/pokemon/${evolution.id}`}>
                        <p className={`${evolution.id.toString() === params.id ? "border-blue-500" : "border-gray-50"} border-2 text-sm md:text-lg rounded-md md:px-4 px-3 py-2 hover:bg-blue-500 hover:text-white`}>{evolution.pokemon_v2_pokemonspeciesnames.find((name) => name.pokemon_v2_language.name === langValue)?.name}</p>
                      </Link>
                      {index < pokemon.pokemon_v2_pokemonspecy.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies.length - 1 && (
                        <div className="flex items-center">
                          <MdKeyboardDoubleArrowRight className="md:text-2xl text-blue-500" />
                        </div>
                      )}
                    </>
                  ))
                  }
                </div>
              </div>
            )}
            <div className="flex flex-col gap-5">
              <p className="font-bold">Capacités:</p>
              <div className="flex flex-wrap gap-4">
                {pokemon.pokemon_v2_pokemonabilities.map((ability) => (
                  <p className="bg-slate-300 dark:bg-blue-700 font-medium px-4 py-1 rounded-xl" key={ability.pokemon_v2_ability.name}>{ability.pokemon_v2_ability.pokemon_v2_abilitynames.find(
                    (name) => name.pokemon_v2_language.name === langValue
                  )?.name || ability.pokemon_v2_ability.pokemon_v2_abilitynames.find(
                    (name) => name.pokemon_v2_language.name === 'en'
                  )?.name}</p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-bold">Attaque:</p>
              <Table columns={columns} data={pokemon.pokemon_v2_pokemonmoves} />
            </div>
          </div>
        </div>
      </main >
    ) : (
      <div className="bg-blue-500 w-screen h-screen absolute top-0 flex flex-col justify-center items-center">
        <p className="text-white text-2xl">Chargement...</p>
      </div>
    )
  );
}
export default PokemonDetails;
