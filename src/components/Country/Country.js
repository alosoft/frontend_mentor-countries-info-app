import React from 'react';
import { useNavigate } from "react-router-dom";
import { ThemeContext } from '../../theme';

import "./Country.css";

const Country = ({ data }) => {
    let navigate = useNavigate();
    const [theme, setTheme, countries, setCountries, getTheme] = React.useContext(ThemeContext);
    const contextTheme = getTheme();
    const cardStyle = {
        background: contextTheme.foreground,
        boxShadow: '0 2px 7px 2px #00000029',
        color: contextTheme.text
    };

    return (
        <div style={cardStyle} onClick={() => navigate(`/${data.cca3}`, { state: data })} className="countries__item">
            <div className="countries__item__flag">
                <img src={data.flags.png} alt={`${data.name.common} flat`} />
            </div>
            <div className="countries__item__info">
                <p className="countries__item__info__name">{data.name.common}</p>
                <p className="countries__item__info__population">Population: <span>{data.population}</span></p>
                <p className="countries__item__info__region">Region: <span>{data.region}</span></p>
                <p className="countries__item__info__capital">Capital: <span>{data.capital ?? null}</span></p>
            </div>
        </div>
    )
}

export default Country
