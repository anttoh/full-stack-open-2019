const initialState = {
  message: '',
  color: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return {
      message: action.message,
      color: action.color
    }

  default:
    return state
  }
}

export const setNotification = (message, color, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
      color
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        message: '',
        color: ''
      })
    }, time * 1000)
  }
}

export default reducer
