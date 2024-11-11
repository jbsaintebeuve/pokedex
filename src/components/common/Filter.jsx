import Slider from "@mui/material/Slider";
import { useEffect } from "react";
import pokemonData from "../../pokemon.json";
import types from "../Page1/PokemonType/PokemonTypes.json";
import MultiSelector from "./MultiSelector";

function Filter({
  filterTypeValues,
  onFilterTypeChange,
  langValue,
  valueWeightSlider,
  valueHeightSlider,
  onWeightSliderChange,
  onHeightSliderChange,
}) {
  const minMaxWeightValues = pokemonData.reduce(
    (acc, pokemon) => ({
      min: Math.min(acc.min, pokemon.weight / 10),
      max: Math.max(acc.max, pokemon.weight / 10),
    }),
    { min: 1000 , max: 0 }
  );

  useEffect(() => {
    if (valueWeightSlider[0] === 0 && valueWeightSlider[1] === 0) {
      onWeightSliderChange([minMaxWeightValues.min, minMaxWeightValues.max]);
    }
  }, [minMaxWeightValues, valueWeightSlider, onWeightSliderChange]);

  const minMaxHeightValues = pokemonData.reduce(
    (acc, pokemon) => ({
      min: Math.min(acc.min, pokemon.height / 10),
      max: Math.max(acc.max, pokemon.height / 10),
    }),
    { min: 1000, max: 0 }
  );

  useEffect(() => {
    if (valueHeightSlider[0] === 0 && valueHeightSlider[1] === 0) {
      onHeightSliderChange([minMaxHeightValues.min, minMaxHeightValues.max]);
    }
  }, [minMaxHeightValues, valueHeightSlider, onHeightSliderChange]);

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

  const PokemonTypes = Object.entries(types);

  return (
    <div className="w-1/4 relative">
      <div className="sticky top-10 flex flex-col gap-5">
        <MultiSelector
          selectedValues={filterTypeValues}
          onSelectValue={onFilterTypeChange}
          options={PokemonTypes}
          name={"Type"}
          langValue={langValue}
        />
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
          <button className="font-bold text-sm w-1/3 py-3 border-2 border-yellow-400 rounded-md text-blue-700 bg-yellow-400 hover:bg-white hover:border-yellow-400 hover:text-yellow-400">
            Apply
          </button>
          <button
            className="text-blue-700 font-bold text-sm w-1/3 py-3 rounded-md hover:bg-blue-700 hover:text-white"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
export default Filter;
