import React from "react";
import Person from "./Person";

const Persons = ({ persons, filter }) => {
  const filteredPersons = () => {
    return persons.filter(person => person.name.toLowerCase().includes(filter));
  };

  const rows = () =>
    filteredPersons().map(person => (
      <Person key={person.name} name={person.name} number={person.number} />
    ));

  return <div>{rows()}</div>;
};

export default Persons;
