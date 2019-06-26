import React from 'react'
import { connect } from 'react-redux'

const User = props => {
  const user = props.user
  if (user === undefined) {
    return null
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.length === 0 ? (
          <p>no blogs added</p>
        ) : (
          user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
        )}
      </ul>
    </div>
  )
}

export default connect(null)(User)
