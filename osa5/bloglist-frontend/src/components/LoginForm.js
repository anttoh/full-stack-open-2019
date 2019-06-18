import React from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import PropTypes from 'prop-types'
import { seperateReset, useField } from '../hooks'

const LoginForm = ({ setUser, setNotification }) => {
  const username = useField('text')
  const password = useField('text')

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      setNotification({
        message: 'wrong username or password',
        color: 'red'
      })
      setTimeout(() => {
        setNotification({
          message: '',
          color: ''
        })
      }, 5000)
    }
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

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default LoginForm
