import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState(null);

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const setMessageAndColor = (msg, clr) => {
    setMessage(msg);
    setColor(clr);
    setTimeout(() => {
      setMessage(null);
      setColor(null);
    }, 5000);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} color={color} />
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h2>add new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        createMessage={setMessageAndColor}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        filter={newFilter}
        createMessage={setMessageAndColor}
      />
    </div>
  );
};

export default App;
