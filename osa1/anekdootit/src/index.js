import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const AnecdoteOfTheDay = ({ curIdx }) => (
  <div>
    <h1>Anecdote of the day</h1>
    <p>
      {anecdotes[curIdx]} has {votes[curIdx]} votes
    </p>
  </div>
);

const AnecdoteWithMostVotes = () => {
  let idx = 0;
  for (let i = 0; i < votes.length; i++) {
    if (votes[idx] < votes[i]) {
      idx = i;
    }
  }

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>
        {anecdotes[idx]} has {votes[idx]} votes
      </p>
    </div>
  );
};

const App = props => {
  const [selected, setSelected] = useState(0);
  const copy = [...votes];

  const setPoints = value => {
    copy[selected] = value;
    votes = copy;
    refresh();
  };

  return (
    <div>
      <AnecdoteOfTheDay curIdx={selected} />
      <Button
        handleClick={() => setPoints(votes[selected] + 1)}
        text={"vote"}
      />
      <Button
        handleClick={() => setSelected(getRandomInt(anecdotes.length))}
        text={"next anecdote"}
      />
      <AnecdoteWithMostVotes />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

let votes = [];
for (let i = 0; i < anecdotes.length; i++) {
  votes[i] = 0;
}

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const refresh = () => {
  ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById("root")
  );
};

refresh();
