import React, { useState } from "react";
import personService from "../services/persons";

const PersonForm = ({ persons, setPersons, createMessage }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const isNameTaken = () => {
    return persons.filter(person => person.name === newName).length !== 0;
  };

  const updateNumber = () => {
    const person = persons.find(p => p.name === newName);
    const changedPerson = { ...person, number: newNumber };

    personService
      .update(changedPerson)
      .then(returnedPerson => {
        setPersons(
          persons.map(person =>
            person.id !== changedPerson.id ? person : returnedPerson
          )
        );
        createMessage(`Updated ${person.name}`, "blue");
      })
      .catch(() => {
        createMessage(
          `Information of ${person.name} has already been removed from server`,
          "darkRed"
        );
      });
  };

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber
    };
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        createMessage(`Added ${returnedPerson.name}`, "green");
      })
      .catch(err => {
        createMessage(JSON.stringify(err.response.data), "darkRed");
      });
  };
  const addOrUpdatePerson = event => {
    event.preventDefault();
    if (isNameTaken()) {
      if (
        window.confirm(
          newName +
            " is already added to phonebook, replace old number with a new one?"
        )
      ) {
        updateNumber();
      }
    } else {
      addPerson();
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };
  return (
    <form onSubmit={addOrUpdatePerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
