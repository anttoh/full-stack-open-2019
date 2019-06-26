import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import { initializeBlogs } from './reducers/blogReducer'
import { logout, initializeUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeComments } from './reducers/commentReducer'
import styled from 'styled-components'
import { setNotification } from './reducers/notificationReducer'

const App = props => {
  const user = props.user

  useEffect(() => {
    props.initializeBlogs()
    props.initializeUser()
    props.initializeUsers()
    props.initializeComments()
  }, [])

  const Page = styled.div`
    padding: 1em;
    background: papayawhip;
  `

  const view = () => {
    if (user === null) {
      return (
        <Page>
          <h1>log in to application</h1>
          <LoginForm />
        </Page>
      )
    } else {
      return (
        <div>
          <Navigation />
        </div>
      )
    }
  }

  return (
    <div>
      <Notification />
      {view()}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUser,
  initializeUsers,
  initializeComments,
  logout,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
