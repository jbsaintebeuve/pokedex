import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pokemonData from "../../pokemon.json";
import ButtonPrimary from "../common/ButtonPrimary";
import ButtonSecondary from "../common/ButtonSecondary";
import Pokeball from "./Pokeball";
import PokeballItem from "./PokeballItem";
import background from "./background.jpg";

function CatchPokemon({ langvalue, pokeballs, setPokeballs }) {
  const [pokemon, setPokemon] = useState(
    JSON.parse(localStorage.getItem("spawnedPokemon")) || null
  );

  useEffect(() => {
    localStorage.setItem("spawnedPokemon", JSON.stringify(pokemon));
  }, [pokemon]);

  const [catchingInProgress, setCatchingInProgress] = useState(false);
  const [capturedPokemon, setCapturedPokemon] = useState(
    JSON.parse(localStorage.getItem("capturedPokemon")) || []
  );

  useEffect(() => {
    localStorage.setItem("capturedPokemon", JSON.stringify(capturedPokemon));
  }, [capturedPokemon]);

  const [selectedPokeball, setSelectedPokeball] = useState("pokeball");
  const [isOnCapture, setIsOnCapture] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] = useState({ x: (window.innerWidth * 2) / 3, y: window.innerHeight - 150 });

  const summonPokemon = (storedPokemon) => {
    setIsOnCapture(false);
    setIsModalOpen(false);

    if (storedPokemon === null) {
      console.log("pokemon storage empty");
      const random = Math.floor(Math.random() * pokemonData.length);
      setPokemon(pokemonData[random]);
    } else {
      setPokemon(storedPokemon);
    }

    const pokemonImg = document.querySelector(".pokemon-image");
    pokemonImg?.classList.remove("hidden");
  };

  useEffect(() => {
    if (!pokemon) {
      summonPokemon();
    }
  }, [pokemon]);

  useEffect(() => {
    localStorage.setItem("capturedPokemon", JSON.stringify(capturedPokemon));
  }, [capturedPokemon]);

  const handleDrop = (e) => {
    e.preventDefault();
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();

    const pokemonImg = document.querySelector(".pokemon-image");
    const pokemonRect = pokemonImg?.getBoundingClientRect();

    if (
      pokemonRect &&
      rect.left < pokemonRect.right &&
      rect.right > pokemonRect.left &&
      rect.top < pokemonRect.bottom &&
      rect.bottom > pokemonRect.top
    ) {
      setCatchingInProgress(true);
      setIsOnCapture(true);
      pokemonImg.classList.add("hidden");
      const caught = capture(pokemon, selectedPokeball);
      setPokeballs((prevPokeballs) =>
        prevPokeballs.map((pokeball) =>
          pokeball.src === selectedPokeball && pokeball.number > 0
            ? { ...pokeball, number: pokeball.number - 1 }
            : pokeball
        )
      );
      setPosition({ x: (window.innerWidth * 2) / 3, y: window.innerHeight - 150 });

      setTimeout(() => {
        if (caught) {
          setCatchingInProgress(false);
          setIsModalOpen(true);
          setCapturedPokemon([...capturedPokemon, pokemon.id]);
        } else {
          pokemonImg.classList.remove("hidden");
          setIsOnCapture(false);
          setCatchingInProgress(false);
        }
      }, 2000);
    } else {
      setPokeballs((prevPokeballs) =>
        prevPokeballs.map((pokeball) =>
          pokeball.src === selectedPokeball && pokeball.number > 0
            ? { ...pokeball, number: pokeball.number - 1 }
            : pokeball
        )
      );
      setPosition({ x: (window.innerWidth * 2) / 3, y: window.innerHeight - 150 });
      setSelectedPokeball("pokeball");
  };
};

  const capture = (pokemon, ball) => {
    const captureProbability = {
      pokeball: 0.2,
      greatball: 0.4,
      ultraball: 0.7,
      masterball: 1.0,
    };

    const randomChance = Math.random();
    const ballProbability = captureProbability[ball];

    if (randomChance < ballProbability) {
      return true;
    } else {
      return false;
    }
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setDragImage(new Image(), 0, 0); 
  
    const pokemonImg = document.querySelector(".pokemon-image");
    
    if (pokemonImg) {
      let direction = 1;
      let position = -150;
      const range = 200;
      const speed = 5;
  
      const animate = () => {
        
        position += direction * speed;
        if (position >= range || position <= -range) {
          direction *= -1; 
        }
  
        pokemonImg.style.transform = `translateX(${position}px) translateY(-70px)`;

        requestAnimationFrame(animate);
      };

      animate();
    }
  };
  
  


  const handleDrag = (e) => {
    if (e.clientX !== 0 && e.clientY !== 0) {
      setPosition({
        x: e.clientX - 50, 
        y: e.clientY - 50,
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  return (
    <div className="relative h-[90vh] w-full">
      <div className="flex flex-col gap-5 bg-white relative my-auto w-24 z-10 rounded-r-md translate-y-1/2 p-4">
        {pokeballs.map(({ src, number }) => (
          <PokeballItem
            name={src}
            key={src}
            selectedPokeball={selectedPokeball}
            setSelectedPokeball={setSelectedPokeball}
            number={number}
          />
        ))}
      </div>

      {!isOnCapture &&
        pokeballs.find((pokeball) => pokeball.src === selectedPokeball).number >
          0 && (
          <div
            className=" z-10"
            draggable="true"
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragOver={handleDragOver}
            onDragEnd={handleDrop}
            style={{
              position: 'absolute',
              left: `${position.x }px`,
              top: `${position.y - 50}px`,
              width: '100px',
              height: '100px',
              cursor: 'move',
            }}
          >
            <Pokeball name={selectedPokeball} />
          </div>
        )}

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-5 rounded-lg w-1/2 flex flex-col items-center">
            <h1 className="text-2xl font-bold">Félicitation !</h1>
            <p>Vous avez capturé {pokemon?.names[langvalue]}!</p>
            <img src={pokemon?.image} alt={pokemon?.names[langvalue]} />
            <div className="flex justify-between w-1/2 gap-5 my-4">
              <Link to={`/pokemon/${pokemon?.id}`} className="w-1/2">
                <ButtonPrimary>Voir la fiche</ButtonPrimary>
              </Link>
              <Link to={"/"} className="w-1/2">
                <ButtonSecondary
                  onClick={() => {
                    setPokemon(null);
                    setIsModalOpen(false);
                  }}
                >
                  Accueil
                </ButtonSecondary>
              </Link>
            </div>
            <button
              onClick={() => summonPokemon(null)}
              className="text-blue-700 hover:underline cursor-pointer"
            >
              Rejouer
            </button>
          </div>
        </div>
      )}

      <img
        src={background}
        alt="background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
      />
      {catchingInProgress && (
        <div className="w-20 absolute bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
          <Pokeball name={selectedPokeball} />
        </div>
      )}
      {pokemon && (
        <img
          src={pokemon.image}
          alt="pokemon"
          className="w-56 absolute bottom-0 left-1/2 transform pokemon-image"
          style={{
            transform: `translateX(-100px) translateY(-70px)`
          }}
        />
      )}
    </div>
  );
}

export default CatchPokemon;
