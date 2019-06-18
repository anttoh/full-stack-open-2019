import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component
  let blog
  let mockHandler

  beforeEach(() => {
    blog = {
      title: 'Title',
      author: 'Author',
      likes: 10
    }
    mockHandler = jest.fn()

    component = render(<SimpleBlog blog={blog} onClick={mockHandler} />)
  })

  test('component renders blogs title, author and likes', () => {
    const container = component.container

    expect(container).toHaveTextContent('Title')

    expect(container).toHaveTextContent('Author')

    expect(container).toHaveTextContent('10')
  })

  test('clicking like button calls event handler', () => {
    const button = component.getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
