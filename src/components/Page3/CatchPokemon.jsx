import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../providers/LangContext";
import ButtonPrimary from "../common/ButtonPrimary";
import ButtonSecondary from "../common/ButtonSecondary";
import Pokeball from "./Pokeball";
import PokeballItem from "./PokeballItem";
import background from "./background.jpg";

function CatchPokemon({ pokeballs, setPokeballs }) {
  const [pokemon, setPokemon] = useState(
    localStorage.getItem("spawnedPokemon") && localStorage.getItem("spawnedPokemon") !== "undefined"
      ? JSON.parse(localStorage.getItem("spawnedPokemon"))
      : null
  );

  const { langValue } = useLang();
  const [pokemonData, setPokemonData] = useState([]);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://beta.pokeapi.co/graphql/v1beta', {
          query: `
                 query samplePokeAPIquery {
                        pokemons: pokemon_v2_pokemonspecies {
                            name
                            id
                            pokemon_v2_pokemonspeciesnames {
                            name
                            pokemon_v2_language {
                                name
                            }
                            }
                            pokemon_v2_pokemons {
                            pokemon_v2_pokemonsprites {
                                sprites(path: "other")
                            }
                            }
                        }
                        }

              `
        });
        setPokemonData(response.data.data.pokemons);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log("Random pokemon:", pokemon);
  // }, [pokemon]);

  useEffect(() => {
    localStorage.setItem("spawnedPokemon", JSON.stringify(pokemon));
  }, [pokemon]);

  const [catchingInProgress, setCatchingInProgress] = useState(false);
  const [capturedPokemon, setCapturedPokemon] = useState(
    localStorage.getItem("capturedPokemon") && localStorage.getItem("capturedPokemon") !== "undefined"
      ? JSON.parse(localStorage.getItem("capturedPokemon"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("capturedPokemon", JSON.stringify(capturedPokemon));
  }, [capturedPokemon]);

  const [selectedPokeball, setSelectedPokeball] = useState("pokeball");
  const [isOnCapture, setIsOnCapture] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] = useState({ x: (window.innerWidth * 2) / 3, y: window.innerHeight - 150 });

  const summonPokemon = (storedPokemon) => {
    if (pokemonData.length > 0) {
      setIsOnCapture(false);
      setIsModalOpen(false);

      if (storedPokemon === null) {
        console.log("pokemon storage empty");
        const random = Math.floor(Math.random() * pokemonData.length);
        setPokemon(pokemonData[random]);
        console.log(pokemonData[random]);
      } else {
        setPokemon(storedPokemon);
      }

      const pokemonImg = document.querySelector(".pokemon-image");
      pokemonImg?.classList.remove("hidden");
    }
  };
  useEffect(() => {
    summonPokemon(null);
  }, [pokemonData]);

  // useEffect(() => {
  //   if (!pokemon || pokemon === null || pokemon === undefined) {
  //     summonPokemon(null);
  //   }
  // }, [pokemon]);

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

    if (!isMobile) {
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

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - 50,
      y: touch.clientY - 50,
    });
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
            draggable={!isMobile}
            onDragStart={!isMobile ? handleDragStart : null}
            onDrag={!isMobile ? handleDrag : null}
            onDragOver={!isMobile ? handleDragOver : null}
            onDragEnd={!isMobile ? handleDrop : null}
            onTouchMove={isMobile ? handleTouchMove : null}
            onTouchEnd={isMobile ? handleDrop : null}
            style={{
              position: 'absolute',
              left: `${position.x}px`,
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
          <div className="bg-white p-5 rounded-lg md:w-1/2 w-11/12 mx-auto flex flex-col items-center text-black">
            <h1 className="text-2xl font-bold">Félicitation !</h1>
            <p>Vous avez capturé {pokemon.pokemon_v2_pokemonspeciesnames.find(
              (name) => name.pokemon_v2_language.name === langValue
            )?.name || pokemon.name}!</p>
            <div className="w-1/3 h-auto">
              <img className="w-full h-full" src={pokemon?.pokemon_v2_pokemons[0].pokemon_v2_pokemonsprites[0].sprites["official-artwork"].front_default} alt={pokemon?.name} />
            </div>
            <div className="flex justify-between md:w-1/2 w-full gap-5 my-4">
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
        <div
          style={{
            transform: `${!isMobile ? "translateX(-100px)" : ""} translateY(-70px)`
          }}
          className="absolute bottom-5 md:left-1/2 left-1/3 transform pokemon-image md:w-32 w-36 h-auto"
        >
          <img
            src={pokemon.pokemon_v2_pokemons[0].pokemon_v2_pokemonsprites[0].sprites.showdown.front_default}
            alt="pokemon"
            className="w-full h-full"

          />
        </div>
      )}
    </div>
  );
}

export default CatchPokemon;
