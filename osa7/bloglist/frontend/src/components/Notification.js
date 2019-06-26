import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  const notification = props.notification
  if (notification.message === '') {
    return ''
  }
  const notificationStyle = {
    color: notification.color,
    backgroundColor: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return <div style={notificationStyle}>{notification.message}</div>
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)
