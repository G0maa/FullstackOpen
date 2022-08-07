import { useSelector } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = () => {
  const notificationObj = useSelector((state) => state.notification)

  if (notificationObj.message === '') return null

  if (notificationObj.type === 'error') {
    return (
      <Message
        id="notification-message"
        negative
        header={notificationObj.message}
      />
    )
  }

  return (
    <Message
      positive
      id="notification-message"
      header={notificationObj.message}
    />
  )
}

export default Notification
