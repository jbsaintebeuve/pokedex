import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { usePokedexData } from "./GenContext";
const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [pokemonData, setPokemonData] = useState([]);
    const { selectedGen } = usePokedexData();
    const [types, setTypes] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://beta.pokeapi.co/graphql/v1beta', {
                    query: `
                       query samplePokeAPIquery {
                        pokemons: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {id: {_eq: ${selectedGen.id}}}}) {
                            name
                            id
                            pokemon_v2_pokemonspeciesnames {
                            name
                            pokemon_v2_language {
                                name
                            }
                            }
                            pokemon_v2_pokemons {
                            height
                            weight
                            pokemon_v2_pokemontypes {
                                pokemon_v2_type {
                                name
                                }
                            }
                            pokemon_v2_pokemonsprites {
                                sprites(path: "other")
                            }
                            }
                        }
                        }

                    `
                });
                setPokemonData(response.data.data.pokemons);
                setLoading(false);
                // console.log("Pokemon data fetched:", response.data.data.pokemons);

            } catch (error) {
                console.error("Error fetching Pokemon data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedGen]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://beta.pokeapi.co/graphql/v1beta', {
                    query: `
                      {
                        types: pokemon_v2_type {
                          name
                          pokemon_v2_typenames {
                            name
                            pokemon_v2_language {
                              name
                            }
                          }
                        }
                      }
                    `
                });
                const typeColors = {
                    normal: "#A8A77A",
                    fighting: "#C22E28",
                    flying: "#A98FF3",
                    poison: "#A33EA1",
                    ground: "#E2BF65",
                    rock: "#B6A136",
                    bug: "#A6B91A",
                    ghost: "#735797",
                    steel: "#B7B7CE",
                    fire: "#EE8130",
                    water: "#6390F0",
                    grass: "#7AC74C",
                    electric: "#F7D02C",
                    psychic: "#F95587",
                    ice: "#96D9D6",
                    dragon: "#6F35FC",
                    fairy: "#D685AD"
                };

                const formattedTypes = response.data.data.types.reduce((acc, type) => {
                    acc[type.name] = type.pokemon_v2_typenames.reduce((langAcc, typename) => {
                        langAcc[typename.pokemon_v2_language.name] = typename.name;
                        return langAcc;
                    }, {});
                    acc[type.name].backgroundColor = typeColors[type.name] || "#000";
                    return acc;
                }, {});
                setTypes(Object.entries(formattedTypes));
                // console.log("Types fetched:", formattedTypes);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching Pokemon data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ pokemonData, types, loading }}>
            {children}
        </DataContext.Provider>
    );
};

export const usePokemonData = () => {
    return useContext(DataContext);
};

export default DataProvider;