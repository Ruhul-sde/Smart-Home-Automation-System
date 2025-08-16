
import { useState, useEffect } from 'react'

const Dashboard = ({ devices, rooms, energyData, automations, quickActions, notifications }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [weather] = useState({ temp: 24, condition: 'Sunny', humidity: 45, windSpeed: 12 })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const activeDevices = devices.filter(device => device.status).length
  const totalDevices = devices.length
  const activeAutomations = automations.filter(automation => automation.active).length
  const occupiedRooms = rooms.filter(room => room.occupied).length

  const recentActivity = [
    { icon: '💡', message: 'Living room lights dimmed to 20%', time: '2 min ago' },
    { icon: '🔒', message: 'Front door locked automatically', time: '5 min ago' },
    { icon: '❄️', message: 'Bedroom AC temperature adjusted', time: '15 min ago' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Good {currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 18 ? 'Afternoon' : 'Evening'}! 👋
            </h2>
            <p className="text-purple-200">Your smart home is running smoothly</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-white">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-purple-200">
              {currentTime.toLocaleDateString([], { weekday: 'long' })}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/30 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm font-medium">Active Devices</p>
              <p className="text-3xl font-bold text-white">{activeDevices}<span className="text-lg">/{totalDevices}</span></p>
              <div className="w-full bg-blue-500/20 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(activeDevices / totalDevices) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm p-6 rounded-2xl border border-green-500/30 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm font-medium">Energy Usage</p>
              <p className="text-3xl font-bold text-white">{energyData.currentUsage}<span className="text-lg">kW</span></p>
              <p className="text-green-200 text-sm">Efficiency: {energyData.efficiency}%</p>
            </div>
            <div className="w-12 h-12 bg-green-500/30 rounded-xl flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/30 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm font-medium">Automations</p>
              <p className="text-3xl font-bold text-white">{activeAutomations} <span className="text-lg">Active</span></p>
              <p className="text-purple-200 text-sm">{automations.length} total rules</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center">
              <span className="text-2xl">⚙️</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm p-6 rounded-2xl border border-orange-500/30 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-200 text-sm font-medium">Occupied Rooms</p>
              <p className="text-3xl font-bold text-white">{occupiedRooms}<span className="text-lg">/{rooms.length}</span></p>
              <p className="text-orange-200 text-sm">Temperature: {weather.temp}°C</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/30 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🏠</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weather & Time */}
        <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Weather & Time</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">{weather.temp}°C</p>
                <p className="text-slate-300">{weather.condition}</p>
              </div>
              <div className="text-5xl">☀️</div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-slate-400 text-sm">Humidity</p>
                <p className="text-white font-semibold">{weather.humidity}%</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Wind</p>
                <p className="text-white font-semibold">{weather.windSpeed} km/h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={quickActions.allOff}
              className="bg-gradient-to-br from-red-500/20 to-red-600/20 p-4 rounded-xl border border-red-500/30 hover:from-red-500/30 hover:to-red-600/30 transition-all duration-300 group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🔴</div>
              <p className="text-white font-medium text-sm">All Off</p>
            </button>
            <button 
              onClick={quickActions.sleepMode}
              className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-4 rounded-xl border border-blue-500/30 hover:from-blue-500/30 hover:to-blue-600/30 transition-all duration-300 group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🌙</div>
              <p className="text-white font-medium text-sm">Sleep Mode</p>
            </button>
            <button 
              onClick={quickActions.awayMode}
              className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 p-4 rounded-xl border border-yellow-500/30 hover:from-yellow-500/30 hover:to-yellow-600/30 transition-all duration-300 group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🚪</div>
              <p className="text-white font-medium text-sm">Away Mode</p>
            </button>
            <button 
              onClick={quickActions.movieNight}
              className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-4 rounded-xl border border-purple-500/30 hover:from-purple-500/30 hover:to-purple-600/30 transition-all duration-300 group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🎬</div>
              <p className="text-white font-medium text-sm">Movie Night</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <span className="text-xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{activity.message}</p>
                  <p className="text-slate-400 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Room Status Overview */}
      <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-6">Room Status Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {rooms.map(room => (
            <div key={room.id} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">{room.name}</h4>
                <span className={`w-3 h-3 rounded-full ${room.occupied ? 'bg-green-500' : 'bg-gray-500'}`}></span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Temperature</span>
                  <span className="text-white">{room.temperature}°C</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Humidity</span>
                  <span className="text-white">{room.humidity}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Devices</span>
                  <span className="text-white">{room.devices}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Notifications */}
      {notifications.length > 0 && (
        <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Recent Notifications</h3>
            <span className="text-slate-400 text-sm">{notifications.filter(n => !n.read).length} unread</span>
          </div>
          <div className="space-y-3">
            {notifications.map(notification => (
              <div key={notification.id} className={`flex items-center gap-3 p-3 rounded-lg ${
                notification.read ? 'bg-white/5' : 'bg-blue-500/10 border border-blue-500/30'
              }`}>
                <span className="text-xl">
                  {notification.type === 'info' ? '💡' : 
                   notification.type === 'warning' ? '⚠️' :
                   notification.type === 'error' ? '❌' : '✅'}
                </span>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{notification.message}</p>
                  <p className="text-slate-400 text-xs">{notification.time}</p>
                </div>
                {!notification.read && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
