import React, { createContext, useContext, useState, useEffect } from "react";

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [langValue, setLang] = useState(localStorage.getItem("lang") || "fr");

  useEffect(() => {
    localStorage.setItem("lang", langValue);
  }, [langValue]);

  const handleLangValue = (value) => {
    setLang(value);
  };

  return (
    <LangContext.Provider value={{ langValue, handleLangValue }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  return useContext(LangContext);
};
