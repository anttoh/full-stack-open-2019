import blogService from '../services/blogs'
import commentService from '../services/comments'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LIKE':
    return state.map(blog =>
      blog.id === action.data ? { ...blog, likes: blog.likes + 1 } : blog
    )
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data)
  case 'INITALIZE_BLOGS':
    return action.data
  case 'ADD_COMMENT':
    return state.map(blog =>
      blog.id === action.data.blog
        ? { ...blog, comments: blog.comments.concat(action.data) }
        : blog
    )
  default:
    return state
  }
}

export const like = blog => {
  return async dispatch => {
    const newObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes + 1,
      id: blog.id
    }
    await blogService.update(newObject)
    dispatch({
      type: 'LIKE',
      data: blog.id
    })
  }
}

export const createBlog = newObject => {
  return async dispatch => {
    const newBlog = await blogService.create(newObject)

    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITALIZE_BLOGS',
      data: blogs
    })
  }
}

export const createComment = newObject => {
  return async dispatch => {
    const newComment = await commentService.create(newObject)
    dispatch({
      type: 'ADD_COMMENT',
      data: newComment
    })
  }
}

export default reducer
