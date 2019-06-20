import React from "react";
import { connect } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = props => {
  const anecdote = props.anecdote;
  const handleVote = anecdote => {
    props.vote(anecdote);
    props.setNotification(`you voted '${anecdote.content}'`, 5);
  };

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  vote,
  setNotification
};

export default connect(
  null,
  mapDispatchToProps
)(Anecdote);
