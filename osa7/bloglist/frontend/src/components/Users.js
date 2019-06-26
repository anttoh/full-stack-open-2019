import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = props => {
  const rows = () =>
    props.users.map(user => (
      <tr key={user.id}>
        <td>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </td>
        <td>{user.blogs.length}</td>
      </tr>
    ))

  return (
    <div>
      <h1>users</h1>
      <table>
        <tbody>
          <tr>
            <th>{''}</th>
            <th>blogs created</th>
          </tr>
          {rows()}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Users)
