import React from "react";
import Person from "./Person";
import personService from "../services/persons";

const Persons = ({ persons, setPersons, filter, createMessage }) => {
  const filteredPersons = () => {
    return persons.filter(person => person.name.toLowerCase().includes(filter));
  };

  const deletePerson = person => {
    if (window.confirm("Delete " + person.name)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id));
          createMessage(`Deleted ${person.name}`, "red");
        })
        .catch(() => {
          createMessage(
            `Information of ${
              person.name
            } has already been removed from server`,
            "darkRed"
          );
        });
    }
  };

  const rows = () =>
    filteredPersons().map(person => (
      <div key={person.id}>
        <Person key={person.id} name={person.name} number={person.number} />
        <button onClick={() => deletePerson(person)}>delete</button>
      </div>
    ));

  return <div>{rows()}</div>;
};

export default Persons;
