import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { deleteBlog, like } from '../reducers/blogReducer'
import CommentForm from './CommentForm'
import Comments from './Comments'

const Blog = props => {
  const user = props.user
  const blog = props.blog
  if (blog === undefined) {
    return null
  }
  if (user === undefined) {
    return null
  }

  const handleRemove = () => {
    const confirmation = window.confirm(
      `remove blog ${blog.title} by ${blog.author}`
    )
    if (confirmation) {
      props.deleteBlog(blog.id)

      props.setNotification(
        `removed blog ${blog.title} by ${blog.author}`,
        'red',
        5
      )
    }
  }

  const handleLike = () => {
    props.like(blog)

    props.setNotification(
      `liked blog ${blog.title} by ${blog.author}`,
      'blue',
      5
    )
  }

  const removeButton = () => {
    if (blog.user.username === user.username) {
      return (
        <div>
          <button onClick={() => handleRemove()}>remove</button>
        </div>
      )
    } else {
      return <div />
    }
  }

  return (
    <div className="blog">
      <h1>
        {blog.title} {blog.author}
      </h1>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes <button onClick={() => handleLike()}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      {removeButton()}
      <h2>comments</h2>
      <CommentForm blog={blog} />
      <Comments blog={blog} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setNotification,
  deleteBlog,
  like
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
