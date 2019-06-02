import React from "react";
import Country from "./Country";

const Countries = ({ countries, filter }) => {
  const filteredCountries = () => {
    return countries.filter(country =>
      country.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  let show = false;
  if (filteredCountries().length === 1) {
    show = true;
  }
  const rows = () =>
    filteredCountries().map(country => (
      <Country
        key={country.name}
        name={country.name}
        capital={country.capital}
        population={country.population}
        languages={country.languages}
        flag={country.flag}
        showAll={show}
        change={filter}
      />
    ));

  return <div>{rows()}</div>;
};

export default Countries;
