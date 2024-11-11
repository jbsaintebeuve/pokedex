import pokeball from "./pokeball.png";
import greaball from "./greatball.png";
import ultraball from "./ultraball.png";
import masterball from "./masterball.png";

const pokeballNames = {
  pokeball: pokeball,
  greatball: greaball,
  ultraball: ultraball,
  masterball: masterball,
};

function Pokeball({ name}) {
  return (
    <>
        <img
          src={pokeballNames[name]}
          alt="pokeball"
          className="w-full h-full relative"
          style={{
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            WebkitUserDrag: "none",
            KhtmlUserSelect: "none",
            MozUserSelect: "none",
            MsUserSelect: "none",
            userDrag: "none",
            userSelect: "none",
          }}
          
        />
    </>
  );
}

export default Pokeball;
