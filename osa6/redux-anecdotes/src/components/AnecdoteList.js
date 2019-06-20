import React from "react";
import { connect } from "react-redux";
import Anecdote from "./Anecdote";

const AnecdoteList = props => {
  const rows = () =>
    props.anecdotesToShow.map(anecdote => (
      <Anecdote key={anecdote.id} anecdote={anecdote} />
    ));

  return <div>{rows()}</div>;
};

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    .sort((a1, a2) => a2.votes - a1.votes);
};

const mapStateToProps = state => {
  return {
    anecdotesToShow: anecdotesToShow(state)
  };
};

export default connect(mapStateToProps)(AnecdoteList);
