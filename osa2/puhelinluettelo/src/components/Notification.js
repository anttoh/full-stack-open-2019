import React from "react";

const Notification = ({ message, color }) => {
  if (message === null) {
    return null;
  }
  const notificationStyle = {
    color: color,
    backgroundColor: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontStyle: "italic"
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
