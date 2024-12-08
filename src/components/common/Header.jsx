import { useEffect, useState } from "react";
import { FaFlag } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { MdLightMode, MdModeNight } from "react-icons/md";
import { TbPokeball } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useLang } from "../../providers/LangContext";
import { useTheme } from "../../providers/ThemeContext";
import Selector from "./Selector";
import Toast from "./Toast";

function Header({
  pokeballs,
  setPokeballs,
}) {
  const [isPokeballAvailable, setIsPokeballAvailable] = useState(false);
  const [toastData, setToastData] = useState({ bool: false, message: "" });

  const { langValue, handleLangValue, langAvailable } = useLang();
  const { darkMode, handleDarkValue } = useTheme();

  const [isOpened, setIsOpened] = useState(false);

  const getPokeball = () => {
    if (isPokeballAvailable) {
      const probabilities = [0.5, 0.3, 0.15, 0.05];
      const randomValue = Math.random();
      let cumulativeProbability = 0;

      for (let i = 0; i < probabilities.length; i++) {
        cumulativeProbability += probabilities[i];
        if (randomValue < cumulativeProbability) {
          setPokeballs(() =>
            pokeballs.map((pokeball) =>
              pokeball.name === pokeballs[i].name
                ? { ...pokeball, number: pokeball.number + 1 }
                : pokeball
            )
          );
          setToastData({ bool: true, message: "Vous avez obtenu une " + pokeballs[i].name });
          setIsPokeballAvailable(false);
          break;
        }
      }
    }
  };

  useEffect(() => {
    if (!isPokeballAvailable) {
      const timeout = setTimeout(() => {
        setIsPokeballAvailable(true);
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [isPokeballAvailable]);

  useEffect(() => {
    if (toastData.bool) {
      const timeout = setTimeout(() => {
        setToastData({ bool: false, message: "" });
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [toastData]);



  return (
    <>
      <header className="bg-blue-700 dark:bg-blue-950 flex justify-between px-5 py-2 items-center">
        <div className="flex gap-6 items-center">
          <Link to="/">
            <div className="w-1/2 h-auto md:w-auto md:h-10">
              <img src="/img/logo.svg" className="w-full h-full" alt="logo"></img>
            </div>
          </Link>
          <Link to="/minigame" className="font-semibold hidden md:flex text-white hover:underline hover:cursor-pointer">Jouer</Link>
        </div>
        <div className="flex gap-4">
          <div
            onClick={getPokeball}
            className={`hover:cursor-pointer relative hidden md:inline-flex justify-center w-16 rounded-md border border-gray-300 shadow-sm bg-white dark:bg-blue-700 dark:border-blue-800 dark:text-white dark:hover:bg-blue-500 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center`}
          >
            <TbPokeball className={`text-xl`} />
            {isPokeballAvailable && (
              <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                1
              </div>
            )}
          </div>
          <div
            className="hover:cursor-pointer relative hidden md:inline-flex justify-center w-16 rounded-md border border-gray-300 shadow-sm bg-white dark:bg-blue-700 dark:border-blue-800 dark:hover:bg-blue-500 dark:text-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center "
            onClick={() => handleDarkValue(!darkMode)}
          >
            {darkMode ? (<MdLightMode />
            ) : (<MdModeNight />)}
          </div>
          <Selector
            selectedValue={langValue}
            onChange={handleLangValue}
            options={langAvailable}
            icon={FaFlag}
          />
          <div
            className="md:hidden px-4 py-2 inline-flex hover:cursor-pointer relative  justify-center w-16 rounded-md border border-gray-300 shadow-sm bg-white dark:bg-blue-700 dark:border-blue-800 dark:hover:bg-blue-500 dark:text-white text-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center "
            onClick={() => setIsOpened(!isOpened)}
          >
            <FiMenu />
          </div>
        </div>
        {toastData.bool && (
          <Toast>
            <TbPokeball className="text-xl" />
            <p className="pl-2">{toastData.message}</p>
            <Link to="/minigame" className="pl-2 hover:underline">Jouer</Link>
          </Toast>
        )}
      </header>
      {isOpened && (
        <div className="flex justify-around gap-4 p-5 items-center bg-blue-400 w-full">
          <Link to="/minigame" className="font-semibold flex text-white hover:underline hover:cursor-pointer">Jouer</Link>
          <div className="flex gap-5">
            <div
              onClick={getPokeball}
              className={`hover:cursor-pointer relative px-4 py-2 inline-flex justify-center w-16 rounded-md border border-gray-300 shadow-sm bg-white dark:bg-blue-700 dark:border-blue-800 dark:text-white dark:hover:bg-blue-500 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center`}
            >
              <TbPokeball className={`text-xl`} />
              {isPokeballAvailable && (
                <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                  1
                </div>
              )}
            </div>
            <div
              className="hover:cursor-pointer relative px-4 py-2 inline-flex justify-center w-16 rounded-md border border-gray-300 shadow-sm bg-white dark:bg-blue-700 dark:border-blue-800 dark:hover:bg-blue-500 dark:text-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center "
              onClick={() => handleDarkValue(!darkMode)}
            >
              {darkMode ? (<MdLightMode />
              ) : (<MdModeNight />)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Header;
