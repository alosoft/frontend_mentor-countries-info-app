import './Nav.css';
import { BsMoonFill, BsMoon } from "react-icons/bs";

import React from 'react';
import { ThemeContext } from '../../theme';

const Nav = () => {
    const [theme, setTheme, countries, setCountries, getTheme] = React.useContext(ThemeContext);
    const contextTheme = getTheme();
    return <nav className="nav" style={{
        background: contextTheme.foreground,
        color: contextTheme.text
    }}>
        <p className="nav__logo">Where in the world?</p>
        <div onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="nav__switch">
            {theme === 'light' ?
                <BsMoonFill className="nav__switch__icon" />
                : <BsMoon className="nav__switch__icon" />
            }
            <button style={{ color: contextTheme.text }} className="nav__switch__button">{theme === 'light' ? 'Dark' : 'Light'}</button>
        </div>
    </nav>;
}

export default Nav
