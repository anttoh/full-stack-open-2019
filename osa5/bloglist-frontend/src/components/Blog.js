import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleRemove, handleLike, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showAll, setShowAll] = useState(false)

  const toggle = () => {
    setShowAll(!showAll)
  }

  const removeButton = () => {
    if (blog.user.username === user.username) {
      return (
        <div>
          <button onClick={handleRemove}>remove</button>
        </div>
      )
    } else {
      return <div />
    }
  }

  const row = () => {
    if (showAll) {
      return (
        <div className="blog">
          <p className="toggle" onClick={toggle}>
            {blog.title} {blog.author}
          </p>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes <button onClick={handleLike}>like</button>
          </p>
          <p>added by {blog.user.name}</p>
          {removeButton()}
        </div>
      )
    } else {
      return (
        <div className="blog">
          <div className="toggle" onClick={toggle}>
            {blog.title} {blog.author}
          </div>
        </div>
      )
    }
  }

  return <div style={blogStyle}>{row()}</div>
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired
}

export default Blog
