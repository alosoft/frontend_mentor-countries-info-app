import "./Details.css";
import React, { useContext } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../theme";

const Details = () => {
    const [theme, setTheme, countries, setCountries, getTheme] = useContext(ThemeContext);
    const code = useParams();

    let navigate = useNavigate();
    let { state } = useLocation();
    const contextTheme = getTheme();
    const cardStyle = {
        background: contextTheme.foreground,
        boxShadow: '0 2px 7px 2px #00000029',
        color: contextTheme.text
    };
    return (
        <div className="details" style={cardStyle}>
            <div onClick={() => navigate(-1)} className="details__back" style={cardStyle}>
                <BsArrowLeft className="details__back__arrow" />
                <button className="details__back__button">Back</button>
            </div>
            <div className="details__box">
                <div className="details__box__image">
                    <img src={state.flags.png} alt={state.name.common} />
                </div>
                <div className="details__box__details">
                    <h2 className="details__box__details__name">{state.name.common}</h2>
                    <div className="details__box__details__infos">
                        <div className="details__box__details_left">
                            <p className="details__box__details_left__native">Native Name: <span>{state.name.nativeName[Object.keys(state.name.nativeName)[0]].common}</span></p>
                            <p className="details__box__details_left__population">Population: <span>{state.population}</span></p>
                            <p className="details__box__details_left__region">Region: <span>{state.region}</span></p>
                            <p className="details__box__details_left__sub_region">Sub Region: <span>{state.subregion}</span></p>
                            <p className="details__box__details_left__capital">Capital: <span>{state.capital[0]}</span></p>
                        </div>
                        <div className="details__box__details_right">
                            <p className="details__box__details_right__domain">Top Level Domain: <span>{state.tld[0]}</span></p>
                            <p className="details__box__details_right__currencies">Currencies: <span>{
                                Object.keys(state.currencies).map((item, index) => `${state.currencies[item].name} `)
                            }</span></p>
                            <p className="details__box__details_right__domain">Languages: <span>{
                                Object.keys(state.languages).map((item, index) => `${state.languages[item]} `)
                            }</span></p>

                        </div>
                    </div>
                    <div className="details__box__details_borders">
                        {state.borders !== undefined ?
                            <>
                                <p className="details__box__details_border">Border Countries:</p>
                                {state.borders.map((item, index) => <button style={cardStyle} key={index} onClick={() => {
                                    const country = countries.filter(count => count.cca2 === item || count.cca3 === item || count.ccn3 === item || count.cioc === item)
                                    if (country.length > 0)
                                        navigate(`/${country[0].cca3}`, { replace: true, state: country[0] })
                                }} className="details__box__details_borders_item">{item}</button>)}
                            </> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details