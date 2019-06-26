import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let blog
  let user
  let mockHandleRemove
  let mockHandleLike

  beforeEach(() => {
    user = {
      name: 'Test name',
      username: 'Test username'
    }

    blog = {
      title: 'Title',
      author: 'Author',
      url: 'test.com',
      likes: 10,
      user: user
    }
    mockHandleRemove = jest.fn()
    mockHandleLike = jest.fn()

    component = render(
      <Blog
        blog={blog}
        handleRemove={mockHandleRemove}
        handleLike={mockHandleLike}
        user={user}
      />
    )
  })

  test('component renders blogs title and author by default', () => {
    const container = component.container

    expect(container).toHaveTextContent('Title')
    expect(container).toHaveTextContent('Author')
    expect(container).not.toHaveTextContent('test.com')
    expect(container).not.toHaveTextContent('10')
  })

  test('clicking toggle renders all blogs info', () => {
    const toggle = component.container.querySelector('.toggle')

    fireEvent.click(toggle)

    const container = component.container

    expect(container).toHaveTextContent('Title')
    expect(container).toHaveTextContent('Author')
    expect(container).toHaveTextContent('test.com')
    expect(container).toHaveTextContent('10')
  })
})
