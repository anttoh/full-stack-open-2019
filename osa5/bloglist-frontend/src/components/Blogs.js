import React from 'react'
import Blog from '../components/Blog'
import PropTypes from 'prop-types'

const Blogs = ({ blogs, blogService, setNotification, user }) => {
  const handleRemove = blog => {
    const confirmation = window.confirm(
      `remove blog ${blog.title} by ${blog.author}`
    )
    if (confirmation) {
      blogService.remove(blog.id)

      setNotification({
        message: `removed blog ${blog.title} by ${blog.author}`,
        color: 'orange'
      })
      setTimeout(() => {
        setNotification({
          message: '',
          color: ''
        })
      }, 5000)
    }
  }

  const handleLike = blog => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    blogService.update(blog.id, blogObject)
  }
  const rows = () =>
    blogs
      .sort((b1, b2) => b2.likes - b1.likes)
      .map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => handleLike(blog)}
          handleRemove={() => handleRemove(blog)}
          user={user}
        />
      ))

  return <div>{rows()}</div>
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  blogService: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default Blogs
