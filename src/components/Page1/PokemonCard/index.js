import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { TbPokeball } from "react-icons/tb";
import { Link } from "react-router-dom";
import PokemonType from "../PokemonType";

function PokemonCard({
  names,
  image,
  types,
  id,
  langValue,
  bookmarkPokemon,
  capturedPokemon,
}) {
  const transformId = (number) => {
    const str = "" + number;
    const pad = "000";
    const ans = pad.substring(0, pad.length - str.length) + str;
    return ans;
  };

  return (
    <>
      <Link to={`/pokemon/${id}`}>
        <div className="rounded-md border-blue-600 border-2 p-4 flex flex-col gap-5 w-60">
          <div className="cover h-36 flex justify-center">
            <img src={image} alt={names[langValue]} className="h-full" />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between items-center">
                <p className="font-bold text-xl">{names[langValue]}</p>
                <div className="flex gap-4">
                  {capturedPokemon.includes(id) && (
                    <TbPokeball className="text-blue-700" />
                  )}
                  {bookmarkPokemon.includes(id.toString()) ? (
                    <FaBookmark className="text-blue-700" />
                  ) : (
                    <FaRegBookmark className="text-blue-700" />
                  )}
                </div>
              </div>
              <span className="w-full text-xs text-gray-600 font-semibold">
                n°{transformId(id)}
              </span>
            </div>
            <div className="flex flex-row w-full gap-4">
              {types.map((type) => {
                return (
                  <PokemonType key={type} name={type} langValue={langValue} />
                );
              })}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
export default PokemonCard;
