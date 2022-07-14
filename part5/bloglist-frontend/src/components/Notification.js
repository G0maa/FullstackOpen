const Notification = ({ notificationObj }) => {
  if (notificationObj === null)
    return null

  // Probably not the best way to implement an error notification,
  // but I was lazy.
  const notificationStyle = {
    color: (notificationObj.error === true) ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={notificationStyle}>
      {notificationObj.message}
    </div>
  )
}

export default Notification
