import React, { useContext, useEffect, useState } from 'react';
import "./Home.css";
import { BsSearch, BsChevronDown } from "react-icons/bs";
import Country from "../Country/Country";
import { ThemeContext } from '../../theme';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
    console.log('building');
    const [showDialog, setShowDialog] = useState(false);
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('');
    console.log(filter);
    const [theme, setTheme, countries, setCountries, getTheme] = React.useContext(ThemeContext);
    console.log(countries);
    const contextTheme = getTheme();
    const cardStyle = {
        background: contextTheme.foreground,
        boxShadow: '0 2px 7px 2px #00000029',
        color: contextTheme.text
    };

    useEffect(() => {
        console.log('useEffect')
        async function fetchData() {
            console.log('fectData')
            // You can await here
            const res = await fetch("https://restcountries.com/v3.1/all");
            if (!res.ok) {
                //show error message
            }

            const json = await res.json();
            console.log(json[0])
            setCountries(json)
        }
        try {
            fetchData();
        } catch (e) {
            console.log(e);
            //show error message
        }
    }, [])

    function changeFilter(region) {
        setFilter(region);
        setShowDialog(!showDialog);
    }
    return (
        <div className="home" style={{
            background: contextTheme.background
        }}>
            <div className="home__head">
                <div className="home__head_search" style={cardStyle}>
                    <BsSearch style={{ color: contextTheme.text }} className="home__head_search__icon" />
                    <input style={{ color: contextTheme.text }} onChange={(event) => setQuery(event.target.value)} className="home__head_search__input" placeholder="Search for a country" name="query" type="text" />
                </div>
                <div className="home__head_filter" style={cardStyle}>
                    <div onClick={() => setShowDialog(!showDialog)} className="home__head_filter_box">
                        <p className="home__head_filter__region">{filter.length > 0 ? filter : 'Filter by Region'}</p>
                        <BsChevronDown onClick={() => setShowDialog(!showDialog)} className="home__head_filter__more" style={{ color: contextTheme.text }} />
                    </div>
                    <ul className={`${showDialog ? 'show_dialog' : 'hide_dialog'} home__head_filter_dialog`} style={cardStyle}>
                        <li onClick={() => changeFilter('')} className="home__head_filter_dialog__item">
                            <button onClick={() => changeFilter('')}>All</button>
                        </li>
                        <li onClick={() => changeFilter('Africa')} className="home__head_filter_dialog__item">
                            <button onClick={() => changeFilter('Africa')}>Africa</button>
                        </li>
                        <li onClick={() => changeFilter('Americas')} className="home__head_filter_dialog__item">
                            <button onClick={() => changeFilter('Americas')}>Americas</button>
                        </li>
                        <li onClick={() => changeFilter('Asia')} className="home__head_filter_dialog__item">
                            <button onClick={() => changeFilter('Asia')}>Asia</button>
                        </li>
                        <li onClick={() => changeFilter('Europe')} className="home__head_filter_dialog__item">
                            <button onClick={() => changeFilter('Europe')}>Europe</button>
                        </li>
                        <li onClick={() => changeFilter('Oceania')} className="home__head_filter_dialog__item">
                            <button onClick={() => changeFilter('Oceania')}>Oceania</button>
                        </li>
                    </ul>
                </div>
            </div>
            {countries.length === 0 ? <div className="home__progress">
                <CircularProgress color="secondary" />
            </div> : null}
            <div className="home__countries">
                {query.length > 0 ?
                    filter.length > 0 ?
                        countries.filter(item => item.name.common.includes(query) && item.region.toLowerCase() === filter.toLowerCase()).map(item => <Country key={item.name.common} data={item} />)
                        : countries.filter(item => item.name.common.includes(query)).map(item => <Country key={item.name.common} data={item} />)
                    : filter.length > 0 ? countries.filter(item => item.region === filter).map(item => <Country key={item.name.common} data={item} />)
                        : countries.map(item => <Country key={item.name.common} data={item} />)}
            </div>
        </div>
    )
}

export default Home
