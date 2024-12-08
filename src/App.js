import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import NoPage from "./components/NoPage";
import Main from "./components/Page1/Main";
import PokemonDetails from "./components/Page2/PokemonDetails/PokemonDetails";
import CatchPokemon from "./components/Page3/CatchPokemon";
import DataProvider from "./providers/DataContext";
import GenProvider from "./providers/GenContext";
import { LangProvider } from "./providers/LangContext";
import { ThemeProvider } from "./providers/ThemeContext";

function App() {

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

  return (
    <BrowserRouter>
      <LangProvider>
        <GenProvider>
        <DataProvider>
          <ThemeProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                pokeballs={pokeballs}
                setPokeballs={setPokeballs}
              />
            }
          >
            <Route index element={<Main  />} />
            <Route
              path="/pokemon/:id"
              element={<PokemonDetails />}
            />
            <Route
              path="/minigame"
              element={
                <CatchPokemon
                  pokeballs={pokeballs}
                  setPokeballs={setPokeballs}
                />
              }
            />
             <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
        </ThemeProvider>
        </DataProvider>
        </GenProvider>
      </LangProvider>
    </BrowserRouter>
  );
}

export default App;
