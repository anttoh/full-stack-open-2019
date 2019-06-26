import React from 'react'
import { connect } from 'react-redux'
import { seperateReset, useField } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'

const LoginForm = props => {
  const username = useField('text')
  const password = useField('text')

  const handleLogin = async event => {
    event.preventDefault()
    await props.login(username, password)
    if (!window.localStorage.getItem('loggedBlogappUser')) {
      props.setNotification('wrong username or password', 'red', 5)
    }
    username.reset()
    password.reset()
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...seperateReset(username)} />
      </div>
      <div>
        password
        <input {...seperateReset(password)} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setNotification,
  login
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
