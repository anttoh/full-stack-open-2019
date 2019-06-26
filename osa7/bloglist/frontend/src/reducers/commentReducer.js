import commentService from '../services/comments'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INITALIZE_COMMENTS':
    return action.data
  default:
    return state
  }
}

export const initializeComments = () => {
  return async dispatch => {
    const comments = await commentService.getAll()
    dispatch({
      type: 'INITALIZE_COMMENTS',
      data: comments
    })
  }
}

export default reducer
