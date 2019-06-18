import React from 'react'
import PropTypes from 'prop-types'
import { seperateReset, useField } from '../hooks'

const BlogForm = ({ blogs, blogService, setNotification }) => {
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

    await blogService.create(blogObject)
    title.reset()
    author.reset()
    url.reset()
    setNotification({
      message: `a new blog ${title.value} by ${author.value} added`,
      color: 'green'
    })

    setTimeout(() => {
      setNotification({
        message: '',
        color: ''
      })
    }, 5000)
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

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  blogService: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default BlogForm
