import React from 'react'
import { connect } from 'react-redux'
import { seperateReset, useField } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = props => {
  const blogs = props.blogs

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = async event => {
    event.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      id: blogs.length + 1
    }

    props.createBlog(blogObject)
    title.reset()
    author.reset()
    url.reset()
    props.setNotification(
      `a new blog ${title.value} by ${author.value} added`,
      'green',
      5
    )
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input {...seperateReset(title)} />
      </div>
      <div>
        author:
        <input {...seperateReset(author)} />
      </div>
      <div>
        url:
        <input {...seperateReset(url)} />
      </div>
      <button type="submit">save</button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setNotification,
  createBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogForm)
