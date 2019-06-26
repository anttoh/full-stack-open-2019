import React from 'react'
import { connect } from 'react-redux'

const Comments = props => {
  const blog = props.blog
  const blogsComments = blog.comments

  return (
    <div>
      <ul>
        {blogsComments.map(comment => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    comments: state.comments
  }
}

export default connect(mapStateToProps)(Comments)
