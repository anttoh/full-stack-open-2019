import userService from '../services/users'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INITALIZE_USERS':
    return action.data
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INITALIZE_USERS',
      data: users
    })
  }
}

export default reducer
