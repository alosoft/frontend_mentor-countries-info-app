import React, { useState, createContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
    const [countries, setCountries] = useState([]);
    const [theme, setTheme] = useState('dark');
    const appTheme = {
        light: {
            foreground: '#ffffff',
            // foreground: '#858585',
            // background: '#fafafa',
            background: '#ffffff',
            text: '#000000'
        },
        dark: {
            foreground: '#2b3945',
            background: '#202c37',
            text: '#ffffff'
        },
    };

    const getTheme = () => theme === 'light' ? appTheme.light : appTheme.dark;

    return <ThemeContext.Provider style={{ background: getTheme().background }} value={[theme, setTheme, countries, setCountries, getTheme]}>
        {props.children}
    </ThemeContext.Provider>
}