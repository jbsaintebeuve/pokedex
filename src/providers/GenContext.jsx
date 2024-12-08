import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
const GenContext = createContext();

export const GenProvider = ({ children }) => {

    const [pokedexGen, setPokemonGen] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGen, setSelectedGen] = useState({
        "name": "generation-i",
        "id": 1,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://beta.pokeapi.co/graphql/v1beta', {
                    query: `
                      query samplePokeAPIquery {
                        generations: pokemon_v2_generation {
                            name
                            id
                            pokemon_v2_generationnames {
                            name
                            pokemon_v2_language {
                                name
                            }
                            }
                        }
                        }
                    `
                });

                setPokemonGen(response.data.data.generations);

            } catch (error) {
                console.error("Error fetching Pokedex data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <GenContext.Provider value={{ pokedexGen, selectedGen, setSelectedGen, loading, setLoading }}>
            {children}
        </GenContext.Provider>
    );
};

export const usePokedexData = () => {
    return useContext(GenContext);
};

export default GenProvider;