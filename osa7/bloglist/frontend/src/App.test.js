import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('login'))

    // expectations here
    expect(component.container).not.toHaveTextContent('HTML is easy')
    expect(component.container).not.toHaveTextContent(
      'Browser can execute only javascript'
    )
    expect(component.container).not.toHaveTextContent(
      'The most important methods of HTTP are GET and POST'
    )
  })

  test('if user is logged in, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.container.querySelector('.blog'))

    // expectations here
    expect(component.container).toHaveTextContent('HTML is easy')
    expect(component.container).toHaveTextContent(
      'Browser can execute only javascript'
    )
    expect(component.container).toHaveTextContent(
      'The most important methods of HTTP are GET and POST'
    )
  })
})
