
import { useState } from 'react'

const SecuritySystem = ({ devices, onDeviceToggle }) => {
  const [securityMode, setSecurityMode] = useState('disarmed')
  const [alerts, setAlerts] = useState([
    { id: 1, time: '2 min ago', message: 'Front door opened', type: 'info', icon: '🚪' },
    { id: 2, time: '15 min ago', message: 'Motion detected in garden', type: 'warning', icon: '🚶' },
    { id: 3, time: '1 hour ago', message: 'System armed successfully', type: 'success', icon: '🔒' },
  ])

  const securityDevices = devices.filter(device => 
    ['lock', 'camera'].includes(device.type)
  )

  const zones = [
    { id: 'entrance', name: 'Entrance', status: 'secure', devices: ['Security Camera', 'Front Door Lock'] },
    { id: 'living', name: 'Living Area', status: 'secure', devices: ['Motion Sensor', 'Window Sensors'] },
    { id: 'bedroom', name: 'Bedrooms', status: 'secure', devices: ['Smoke Detector', 'Window Sensors'] },
    { id: 'perimeter', name: 'Perimeter', status: 'active', devices: ['Garden Camera', 'Motion Lights'] },
  ]

  const handleModeChange = (mode) => {
    setSecurityMode(mode)
    const newAlert = {
      id: Date.now(),
      time: 'Just now',
      message: `Security system ${mode === 'disarmed' ? 'disarmed' : mode + ' mode activated'}`,
      type: mode === 'disarmed' ? 'info' : 'success',
      icon: mode === 'disarmed' ? '🔓' : '🔒'
    }
    setAlerts(prev => [newAlert, ...prev.slice(0, 4)])
  }

  const getModeColor = (mode) => {
    switch (mode) {
      case 'home': return 'from-blue-500/20 to-blue-600/20 border-blue-500/30'
      case 'away': return 'from-red-500/20 to-red-600/20 border-red-500/30'
      case 'night': return 'from-purple-500/20 to-purple-600/20 border-purple-500/30'
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-500/30'
    }
  }

  const getAlertColor = (type) => {
    switch (type) {
      case 'success': return 'border-green-500/30 bg-green-500/10'
      case 'warning': return 'border-yellow-500/30 bg-yellow-500/10'
      case 'error': return 'border-red-500/30 bg-red-500/10'
      default: return 'border-blue-500/30 bg-blue-500/10'
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Security System</h2>

      {/* Security Modes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { id: 'disarmed', name: 'Disarmed', icon: '🔓', desc: 'System off' },
          { id: 'home', name: 'Home', icon: '🏠', desc: 'Perimeter only' },
          { id: 'away', name: 'Away', icon: '🚪', desc: 'Full protection' },
          { id: 'night', name: 'Night', icon: '🌙', desc: 'Sleep mode' },
        ].map(mode => (
          <button
            key={mode.id}
            onClick={() => handleModeChange(mode.id)}
            className={`bg-gradient-to-br ${
              securityMode === mode.id 
                ? getModeColor(mode.id)
                : 'from-white/5 to-white/10 border-white/10'
            } backdrop-blur-sm p-6 rounded-2xl border transition-all duration-300 hover:scale-105`}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{mode.icon}</div>
              <h3 className="text-white font-semibold">{mode.name}</h3>
              <p className="text-slate-300 text-sm">{mode.desc}</p>
              {securityMode === mode.id && (
                <div className="mt-3 px-3 py-1 bg-white/20 rounded-full text-xs text-white">
                  Active
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Security Zones */}
      <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-6">Security Zones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {zones.map(zone => (
            <div key={zone.id} className="bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">{zone.name}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  zone.status === 'secure' 
                    ? 'bg-green-500/20 text-green-200 border border-green-500/30'
                    : zone.status === 'active'
                    ? 'bg-blue-500/20 text-blue-200 border border-blue-500/30'
                    : 'bg-red-500/20 text-red-200 border border-red-500/30'
                }`}>
                  {zone.status}
                </span>
              </div>
              <div className="space-y-2">
                {zone.devices.map((device, index) => (
                  <div key={index} className="text-sm text-slate-300 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    {device}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Devices */}
      <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-6">Security Devices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityDevices.map(device => (
            <div key={device.id} className="bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-xl">
                      {device.type === 'lock' ? '🔒' : '📹'}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{device.name}</p>
                    <p className="text-slate-400 text-sm capitalize">{device.room}</p>
                  </div>
                </div>
                <button
                  onClick={() => onDeviceToggle(device.id)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                    device.status 
                      ? 'bg-green-500 shadow-lg shadow-green-500/30' 
                      : 'bg-slate-600'
                  }`}
                >
                  <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform duration-300 ${
                    device.status ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
        <div className="space-y-3">
          {alerts.map(alert => (
            <div key={alert.id} className={`p-4 rounded-xl border ${getAlertColor(alert.type)}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{alert.icon}</span>
                <div className="flex-1">
                  <p className="text-white font-medium">{alert.message}</p>
                  <p className="text-slate-400 text-sm">{alert.time}</p>
                </div>
                <button className="text-slate-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-red-500/10 backdrop-blur-sm p-6 rounded-2xl border border-red-500/30">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">🚨</span>
          Emergency Contacts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-red-500/20 hover:bg-red-500/30 p-4 rounded-xl border border-red-500/30 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">🚓</div>
              <p className="text-white font-medium">Police</p>
              <p className="text-red-200 text-sm">911</p>
            </div>
          </button>
          <button className="bg-red-500/20 hover:bg-red-500/30 p-4 rounded-xl border border-red-500/30 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">🚑</div>
              <p className="text-white font-medium">Medical</p>
              <p className="text-red-200 text-sm">911</p>
            </div>
          </button>
          <button className="bg-red-500/20 hover:bg-red-500/30 p-4 rounded-xl border border-red-500/30 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">🚒</div>
              <p className="text-white font-medium">Fire Dept</p>
              <p className="text-red-200 text-sm">911</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SecuritySystem
