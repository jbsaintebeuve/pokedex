import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("poke-dark-mode")) || false);

    useEffect(() => {
        localStorage.setItem("poke-dark-mode", JSON.stringify(darkMode));
    }, [darkMode]);

    const handleDarkValue = (value) => {
        setDarkMode(value);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, handleDarkValue }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};

export default ThemeContext;