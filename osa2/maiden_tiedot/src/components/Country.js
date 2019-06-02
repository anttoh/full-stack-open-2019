import React, { useState, useEffect } from "react";
import Weather from "./Weather";

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

  if (showAll && !show) {
    setShow(true);
  }

  useEffect(() => {
    setShow(false);
  }, [change]);

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
        <Weather capital={capital} />
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
