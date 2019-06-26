import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Blogs from './Blogs'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'
import Togglable from './Togglable'
import Users from './Users'
import User from './User'
import { logout } from '../reducers/loginReducer'
import styled from 'styled-components'

const Navigation = props => {
  const user = props.user
  const users = props.users
  const blogs = props.blogs
  const padding = {
    paddingRight: 5
  }
  const Page = styled.div`
    padding: 1em;
    background: papayawhip;
  `

  const Menu = styled.div`
    background: BurlyWood;
    padding: 1em;
  `

  const blogFormRef = React.createRef()

  return (
    <Page>
      <Router>
        <div>
          <Menu>
            <Link style={padding} to="/">
              blogs
            </Link>
            <Link style={padding} to="/users">
              users
            </Link>
            {user.name} logged in
            <button onClick={() => props.logout()}>logout</button>
          </Menu>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <h1>blogs</h1>
                <h1>create new</h1>
                <Togglable buttonLabel={'new note'} ref={blogFormRef}>
                  <BlogForm />
                </Togglable>
                <Blogs />
              </div>
            )}
          />
          <Route
            exact
            path="/users"
            render={() => (
              <div>
                <Users />
              </div>
            )}
          />
          <Route
            exact
            path="/users/:id"
            render={({ match }) => (
              <div>
                <User user={users.find(user => user.id === match.params.id)} />
              </div>
            )}
          />
          <Route
            exact
            path="/blogs/:id"
            render={({ match }) => (
              <div>
                <Blog blog={blogs.find(blog => blog.id === match.params.id)} />
              </div>
            )}
          />
        </div>
      </Router>
    </Page>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
