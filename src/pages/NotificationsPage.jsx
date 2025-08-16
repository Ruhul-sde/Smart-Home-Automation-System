
import Notifications from '../components/Notifications'

const NotificationsPage = ({ notifications, onMarkAsRead, onClearAll }) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Notifications 
          notifications={notifications}
          onMarkAsRead={onMarkAsRead}
          onClearAll={onClearAll}
        />
      </div>
    </div>
  )
}

export default NotificationsPage
