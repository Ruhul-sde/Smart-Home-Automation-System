
const Notifications = ({ notifications, onMarkAsRead, onClearAll }) => {
  const getNotificationIcon = (type) => {
    const icons = {
      info: '💡',
      warning: '⚠️',
      error: '❌',
      success: '✅'
    }
    return icons[type] || '📢'
  }

  const getNotificationColor = (type) => {
    const colors = {
      info: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
      warning: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
      error: 'from-red-500/20 to-red-600/20 border-red-500/30',
      success: 'from-green-500/20 to-green-600/20 border-green-500/30'
    }
    return colors[type] || 'from-gray-500/20 to-gray-600/20 border-gray-500/30'
  }

  const unreadNotifications = notifications.filter(n => !n.read)
  const readNotifications = notifications.filter(n => n.read)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Notifications</h2>
          <p className="text-slate-400">
            {unreadNotifications.length} unread, {notifications.length} total
          </p>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={onClearAll}
            className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/30 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-black/20 backdrop-blur-sm p-12 rounded-2xl border border-white/10 text-center">
          <div className="text-6xl mb-4">🔔</div>
          <h3 className="text-xl font-semibold text-white mb-2">No notifications</h3>
          <p className="text-slate-400">You're all caught up! New notifications will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Unread Notifications */}
          {unreadNotifications.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                Unread ({unreadNotifications.length})
              </h3>
              <div className="space-y-3">
                {unreadNotifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`bg-gradient-to-br ${getNotificationColor(notification.type)} backdrop-blur-sm p-4 rounded-xl border`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">{getNotificationIcon(notification.type)}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{notification.message}</p>
                        <p className="text-slate-400 text-sm">{notification.time}</p>
                      </div>
                      <button
                        onClick={() => onMarkAsRead(notification.id)}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors"
                      >
                        Mark as read
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Read Notifications */}
          {readNotifications.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
                Read ({readNotifications.length})
              </h3>
              <div className="space-y-3">
                {readNotifications.map(notification => (
                  <div
                    key={notification.id}
                    className="bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/5 opacity-60"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">{getNotificationIcon(notification.type)}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{notification.message}</p>
                        <p className="text-slate-500 text-sm">{notification.time}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 rounded-lg text-green-400 text-sm">
                        Read
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Notifications
