import anecdoteService from "../services/anecdotes";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE":
      return state.map(anecdote =>
        anecdote.id === action.data.id ? action.data : anecdote
      );
    case "NEW_ANECTODE":
      return [...state, action.data];
    case "INITALIZE_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const vote = anecdote => {
  return async dispatch => {
    const newObject = {
      content: anecdote.content,
      votes: anecdote.votes + 1,
      id: anecdote.id
    };
    const updatedAnecdote = await anecdoteService.update(newObject);
    dispatch({
      type: "VOTE",
      data: updatedAnecdote
    });
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECTODE",
      data: newAnecdote
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INITALIZE_ANECDOTES",
      data: anecdotes
    });
  };
};

export default reducer;
