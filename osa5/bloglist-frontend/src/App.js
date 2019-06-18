import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useResource } from './hooks'

const App = () => {
  const [blogs, blogService] = useResource('/api/blogs')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: '',
    color: ''
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const blogFormRef = React.createRef()

  const view = () => {
    if (user === null) {
      return (
        <div>
          <h1>log in to application</h1>
          <Notification notification={notification} />
          <LoginForm setUser={setUser} setNotification={setNotification} />
        </div>
      )
    } else {
      return (
        <div>
          <h1>blogs</h1>
          <Notification notification={notification} />
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <h1>create new</h1>
          <Togglable buttonLabel={'new note'} ref={blogFormRef}>
            <BlogForm
              blogs={blogs}
              blogService={blogService}
              setNotification={setNotification}
            />
          </Togglable>
          <Blogs
            blogs={blogs}
            blogService={blogService}
            setNotification={setNotification}
            user={user}
          />
        </div>
      )
    }
  }

  return <div>{view()}</div>
}

export default App
