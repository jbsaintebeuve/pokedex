import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [langValue, setLang] = useState(localStorage.getItem("lang") || "fr");
  const [langAvailable, setLangAvailable] = useState({});

  useEffect(() => {
    const fetchLangAvailable = async () => {
      try {
        const response = await axios.get('https://pokedex-jgabriele.vercel.app/types.json');
        const data = Object.keys(Object.values(response.data)[0].translations);
        setLangAvailable(data);

      } catch (error) {
        console.error("Error fetching Lang data:", error);
      }
    }
    fetchLangAvailable();
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", langValue);
  }, [langValue]);


  const handleLangValue = (value) => {
    setLang(value);
  };

  return (
    <LangContext.Provider value={{ langValue, handleLangValue, langAvailable }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  return useContext(LangContext);
};

export default LangContext;