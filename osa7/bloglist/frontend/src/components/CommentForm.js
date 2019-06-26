import React from 'react'
import { connect } from 'react-redux'
import { seperateReset, useField } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'
import { createComment } from '../reducers/blogReducer'

const CommentForm = props => {
  const blog = props.blog
  const comments = props.comments

  const content = useField('text')

  const addComment = async event => {
    event.preventDefault()
    const commentObject = {
      content: content.value,
      blog_id: blog.id,
      id: comments.length + 1
    }

    props.createComment(commentObject)
    content.reset()
    props.setNotification(`a new comment '${content.value}' added`, 'green', 5)
  }

  return (
    <form onSubmit={addComment}>
      <div>
        <input {...seperateReset(content)} />
        <button type="submit">add comment</button>
      </div>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = {
  setNotification,
  createComment
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm)
