import Pokeball from "./Pokeball";

function PokeballItem({ name, selectedPokeball = "", setSelectedPokeball = "", number = 0 }) {

  const handleSelectPokeball = (name) => {
    if (number === 0) return;
    setSelectedPokeball(name);
  }

  return (
    <>
      <div
        className={`relative inline-flex items-center p-3 text-sm font-medium text-center hover:cursor-pointer text-white rounded-md ${
          name === selectedPokeball
            ? "border-2 border-red-500"
            : "border-2 border-gray-400"
        }
        ${number === 0 ? "opacity-50" : ""} 
        `}
        onClick={() => handleSelectPokeball(name)}
      >
       <Pokeball name={name} />
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
          {number}
        </div>
      </div>
    </>
  );
}

export default PokeballItem;
