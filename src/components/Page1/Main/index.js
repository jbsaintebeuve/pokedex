import { useState } from "react";
import Filter from "../../common/Filter";
import Search from "../../common/Search";
import PokemonList from "../PokemonList";

function Main(){
    const [searchValue, setSearchValue] = useState(localStorage.getItem("searchValue") || "");
    const [filterTypeValues, setFilterValue] = useState([]);
    const [valueWeightSlider, setValueWeightSlider] = useState([0,10000]);
    const [valueHeightSlider, setValueHeightSlider] = useState([0,10000]);
    
    const handleSearchChange = (value) => {
        setSearchValue(value);
        localStorage.setItem("searchValue", value);
    }
    const handleFilterTypeChange = (value) => {
        setFilterValue(value)
    }
    const handleWeightSliderChange = (value) => {
        setValueWeightSlider(value)
    }
    const handleHeightSliderChange = (value) => {
        setValueHeightSlider(value)
    }

    return (
        <>
        <div className="gap-10 flex flex-col py-10 w-11/12 mx-auto">
            <h1 className="text-5xl font-black text-blue-700 text-center dark:text-blue-400">Pokédex</h1>
            <Search searchValue={searchValue} onSearchChange={handleSearchChange} />
            <div className="flex flex-col md:flex-row gap-5">
                <Filter filterTypeValues={filterTypeValues} onFilterTypeChange={handleFilterTypeChange} valueHeightSlider={valueHeightSlider} valueWeightSlider={valueWeightSlider} onWeightSliderChange={handleWeightSliderChange} onHeightSliderChange={handleHeightSliderChange}/>
                <PokemonList searchValue={searchValue} filterTypeValues={filterTypeValues} valueHeightSlider={valueHeightSlider} valueWeightSlider={valueWeightSlider}/>
            </div>
        </div>
        </>
    )
}
export default Main;