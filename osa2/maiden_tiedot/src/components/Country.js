import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({
  name,
  capital,
  population,
  languages,
  flag,
  showAll,
  change
}) => {
  const [show, setShow] = useState(false);
  const [weather, setWeather] = useState({});

  if (showAll && !show) {
    setShow(true);
  }

  useEffect(() => {
    setShow(false);
  }, [change]);

  useEffect(() => {
    axios
      .get(
        `https://api.apixu.com/v1/current.json?key=9210f6a9601b43ab827125533190206&q=${capital}`
      )
      .then(res => {
        setWeather(res.data);
      })
      .catch(err => {console.log('error', err)});
  }, []);

  const weatherData = () => {
    if (weather.current === undefined) {
      return <p>weather data not available</p>;
    } else {
      return (
        <div>
          <p>temperature: {weather.current.temp_c} Celsius</p>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
            height="100"
          />
          <p>
            wind: {weather.current.wind_kph} kph direction{" "}
            {weather.current.wind_dir}
          </p>
        </div>
      );
    }
  };
  const rows = () =>
    languages.map(language => <li key={generateKey(name)}>{language.name}</li>);

  if (show) {
    return (
      <div>
        <h1>{name}</h1>
        <p>capital {capital}</p>
        <p>population {population}</p>
        <h2>languages</h2>
        <ul>{rows()}</ul>
        <img src={flag} alt="flag" height="100" />
        {weatherData()}
      </div>
    );
  } else {
    return (
      <div>
        {name}
        <button onClick={() => setShow(true)}>show</button>
      </div>
    );
  }
};

const generateKey = name => {
  let hash = 1;
  for (let i = 0; i < name.length; i++) {
    hash *= name.charCodeAt(i) * Math.random(1);
  }
  return hash;
};

export default Country;
