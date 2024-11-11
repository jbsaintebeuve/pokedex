import { useEffect, useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Layout from "./components/Layout";
import Main from "./components/Page1/Main";
import types from "./components/Page1/PokemonType/PokemonTypes.json";
import PokemonDetails from "./components/Page2/PokemonDetails/PokemonDetails";
import CatchPokemon from "./components/Page3/CatchPokemon";
import pokemonData from "./pokemon.json";
import { LangProvider } from "./providers/LangContext";

function App() {
  const [langAvailable, setLangAvailable] = useState({})

  const initialPokeballs = [
    {
      name: "Pokéball",
      src: "pokeball",
      number: 5,
    },
    {
      name: "Superball",
      src: "greatball",
      number: 3,
    },
    {
      name: "Hyperball",
      src: "ultraball",
      number: 1,
    },
    {
      name: "Masterball",
      src: "masterball",
      number: 1,
    },
  ];

  const [pokeballs, setPokeballs] = useState(() => {
    const storedPokeballs = JSON.parse(localStorage.getItem("pokeballs"));
    return storedPokeballs || initialPokeballs;
  });

  useEffect(() => {
    localStorage.setItem("pokeballs", JSON.stringify(pokeballs));
  }, [pokeballs]);

  useEffect(()=> {
    const language = Object.keys(Object.values(types)[0].translations);
    setLangAvailable(language);
  },[])

  return (
    <LangProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout langAvailable={langAvailable} pokeballs={pokeballs} setPokeballs={setPokeballs}/>} >
            <Route index element={<Main pokemonData={pokemonData}/>} />
            <Route path="/pokemon/:id" element={<PokemonDetails pokemonData={pokemonData} />} />
            <Route path="/minigame" element={<CatchPokemon  pokeballs={pokeballs} setPokeballs={setPokeballs} />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </LangProvider>
  )
}

export default App;
