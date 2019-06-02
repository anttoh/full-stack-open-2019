import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({});
  useEffect(() => {
    axios
      .get(
        `https://api.apixu.com/v1/current.json?key=9210f6a9601b43ab827125533190206&q=${capital}`
      )
      .then(res => {
        setWeather(res.data);
      })
      .catch(err => {
        console.log("error", err);
      });
  }, []);
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

export default Weather;
