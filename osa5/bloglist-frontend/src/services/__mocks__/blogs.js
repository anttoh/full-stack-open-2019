let token = null

const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'HTML is easy',
    author: 'John Doe',
    url: 'https://example.com',
    user: {
      token,
      _id: '5a437a9e514ab7f168ddf138',
      username: 'tester',
      name: 'Donald Tester'
    }
  },
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'Browser can execute only javascript',
    author: 'Jane Doe',
    url: 'https://random.com',
    user: {
      token,
      _id: '5a437a9e514ab7f168ddf138',
      username: 'tester',
      name: 'Donald Tester'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    title: 'The most important methods of HTTP are GET and POST',
    author: 'unknown',
    url: 'https://test.com',
    user: {
      token,
      _id: '5a437a9e514ab7f168ddf138',
      username: 'tester',
      name: 'Donald Tester'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }
