import { NotificationManager } from 'react-notifications'

import 'react-notifications/lib/notifications.css'

const showNotification = (title, content, type, delay = 0) => {
  // notification.destroy()

  if (type === 'waiting') {
    NotificationManager.info(content, title)
  } else if (type === 'success') {
    NotificationManager.success(content, title, delay)
  } else if (type === 'failed') {
    NotificationManager.error(content, title, delay)
  }
}

export default showNotification
