import Slider from "@mui/material/Slider";
import { useEffect, useState } from "react";
import pokemonData from "../../pokemon.json";
import types from "../Page1/PokemonType/PokemonTypes.json";
import MultiSelector from "./MultiSelector";
import { usePokedexData } from "../../providers/GenContext";
import GenSelector from "./GenSelector";
import { usePokemonData } from "../../providers/DataContext";
import { use } from "react";

function Filter({
  filterTypeValues,
  onFilterTypeChange,
  langValue,
  valueWeightSlider,
  valueHeightSlider,
  onWeightSliderChange,
  onHeightSliderChange,
}) {

  const { types, loading, pokemonData } = usePokemonData();
  const { pokedexGen, selectedGen, setSelectedGen } = usePokedexData();

  const [minMaxWeightValues, setMinMaxWeightValues] = useState({ min: valueWeightSlider[0], max: valueWeightSlider[1] });
  const [minMaxHeightValues, setMinMaxHeightValues] = useState({ min: valueHeightSlider[0], max: valueHeightSlider[1] });

  const [isOpen, setIsOpen] = useState(() => window.innerWidth > 768);

  useEffect(() => {
    if (!loading) {
      console.log("init min max values");
      setMinMaxWeightValues(pokemonData.reduce(
        (acc, pokemon) => ({
          min: Math.min(acc.min, pokemon.pokemon_v2_pokemons[0].weight / 10),
          max: Math.max(acc.max, pokemon.pokemon_v2_pokemons[0].weight / 10),
        }),
        { min: 1000, max: 0 }
      ));

      setMinMaxHeightValues(pokemonData.reduce(
        (acc, pokemon) => ({
          min: Math.min(acc.min, pokemon.pokemon_v2_pokemons[0].height / 10),
          max: Math.max(acc.max, pokemon.pokemon_v2_pokemons[0].height / 10),
        }),
        { min: 1000, max: 0 }
      ));
    }
  }, [loading, pokemonData]);

  useEffect(() => {
    console.log("min max values", minMaxWeightValues, minMaxHeightValues);
  }, [minMaxWeightValues, minMaxHeightValues]);


  useEffect(() => {
    if (valueWeightSlider[0] === 0 && valueWeightSlider[1] === 0) {
      onWeightSliderChange([minMaxWeightValues.min, minMaxWeightValues.max]);
    }
  }, [minMaxWeightValues, valueWeightSlider, onWeightSliderChange, pokedexGen, pokemonData, loading]);

  useEffect(() => {
    if (valueHeightSlider[0] === 0 && valueHeightSlider[1] === 0) {
      onHeightSliderChange([minMaxHeightValues.min, minMaxHeightValues.max]);
    }
  }, [minMaxHeightValues, valueHeightSlider, onHeightSliderChange, pokedexGen, pokemonData, loading]);

  const handleWeightSliderChange = (event, newValue) => {
    onWeightSliderChange(newValue);
  };

  const handleHeightSliderChange = (event, newValue) => {
    onHeightSliderChange(newValue);
  };

  const resetFilters = () => {
    onFilterTypeChange([]);
    onWeightSliderChange([minMaxWeightValues.min, minMaxWeightValues.max]);
    onHeightSliderChange([minMaxHeightValues.min, minMaxHeightValues.max]);
  };


  return <>
    <button
      className="md:hidden font-bold text-sm py-3 border-2 border-yellow-400 rounded-md text-blue-700 bg-yellow-400 w-1/2 mx-auto"
      onClick={() => setIsOpen(!isOpen)}
    >{isOpen ? "Fermer" : "Filtres"}</button >
    {isOpen && (
      <div className="w-full md:w-1/4 relative border border-blue-500 rounded-md p-4 md:p-0 md:border-none">
        <div className="sticky top-10 flex flex-col gap-5">
          <GenSelector
            selectedValue={selectedGen}
            onChange={setSelectedGen}
            options={pokedexGen}
          />
          {!loading && (
            <MultiSelector
              selectedValues={filterTypeValues}
              onSelectValue={onFilterTypeChange}
              options={types}
              name={"Type"}
              langValue={langValue}
            />
          )}
          <div>
            <p className="text-md font-bold">Poids (kg)</p>
            <Slider
              className="w-11/12"
              getAriaLabel={() => "Weight range"}
              value={valueWeightSlider}
              onChange={handleWeightSliderChange}
              valueLabelDisplay="auto"
              getAriaValueText={(value) => `${value}kg`}
              step={10}
              min={minMaxWeightValues.min}
              max={minMaxWeightValues.max}
            />
          </div>
          <div>
            <p className="text-md font-bold">Taille (m)</p>
            <Slider
              className="w-11/12"
              getAriaLabel={() => "Height range"}
              value={valueHeightSlider}
              onChange={handleHeightSliderChange}
              valueLabelDisplay="auto"
              getAriaValueText={(value) => `${value}m`}
              step={0.4}
              min={minMaxHeightValues.min}
              max={minMaxHeightValues.max}
            />
          </div>
          <div className="flex gap-3">
            {/* <button className="font-bold text-sm w-1/3 py-3 border-2 border-yellow-400 rounded-md text-blue-700 bg-yellow-400 hover:bg-white hover:border-yellow-400 hover:text-yellow-400">
            Apply
          </button> */}
            <button
              className="font-bold text-sm w-1/3 py-3 rounded-md bg-blue-700 text-white dark:bg-blue-800 dark:text-white dark:hover:bg-blue-500"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )}
  </>
}
export default Filter;
