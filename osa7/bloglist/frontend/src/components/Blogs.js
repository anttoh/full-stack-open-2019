import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = props => {
  const blogs = props.blogs

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const rows = () =>
    blogs
      .sort((b1, b2) => b2.likes - b1.likes)
      .map(blog => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))

  return <div>{rows()}</div>
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(Blogs)
