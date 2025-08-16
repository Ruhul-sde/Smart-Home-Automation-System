
const DeviceGrid = ({ devices, onToggle, onUpdate }) => {
  const getDeviceIcon = (type) => {
    const icons = {
      light: '💡',
      ac: '❄️',
      lock: '🔒',
      sprinkler: '💧',
      entertainment: '📺',
      camera: '📹'
    }
    return icons[type] || '⚡'
  }

  const getStatusColor = (status, type) => {
    if (!status) return 'from-slate-500/20 to-slate-600/20 border-slate-500/30'
    
    const colors = {
      light: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
      ac: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
      lock: 'from-green-500/20 to-green-600/20 border-green-500/30',
      sprinkler: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30',
      entertainment: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
      camera: 'from-red-500/20 to-red-600/20 border-red-500/30'
    }
    
    return colors[type] || 'from-blue-500/20 to-blue-600/20 border-blue-500/30'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">All Devices</h2>
        <div className="text-slate-300">
          {devices.filter(d => d.status).length} of {devices.length} active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map(device => (
          <div 
            key={device.id} 
            className={`bg-gradient-to-br ${getStatusColor(device.status, device.type)} backdrop-blur-sm p-6 rounded-2xl border transition-all duration-300 hover:scale-105`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  device.status ? 'bg-white/20' : 'bg-white/10'
                }`}>
                  <span className="text-2xl">{getDeviceIcon(device.type)}</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{device.name}</h3>
                  <p className="text-slate-300 text-sm capitalize">{device.room} • {device.type}</p>
                </div>
              </div>
              
              <button
                onClick={() => onToggle(device.id)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                  device.status 
                    ? 'bg-white/30 shadow-lg' 
                    : 'bg-white/10'
                }`}
              >
                <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform duration-300 ${
                  device.status ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {device.status && (
              <div className="space-y-3">
                {device.type === 'light' && (
                  <div>
                    <div className="flex justify-between text-sm text-slate-200 mb-2">
                      <span>Brightness</span>
                      <span>{device.brightness || 50}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={device.brightness || 50}
                      onChange={(e) => onUpdate(device.id, { brightness: parseInt(e.target.value) })}
                      className="w-full accent-white/50"
                    />
                  </div>
                )}
                
                {device.type === 'ac' && (
                  <div>
                    <div className="flex justify-between text-sm text-slate-200 mb-2">
                      <span>Temperature</span>
                      <span>{device.temperature || 22}°C</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => onUpdate(device.id, { temperature: Math.max(16, (device.temperature || 22) - 1) })}
                        className="w-8 h-8 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                      >
                        -
                      </button>
                      <div className="flex-1 bg-white/10 h-2 rounded-full">
                        <div 
                          className="bg-white/50 h-2 rounded-full transition-all"
                          style={{ width: `${((device.temperature || 22) - 16) / 14 * 100}%` }}
                        />
                      </div>
                      <button 
                        onClick={() => onUpdate(device.id, { temperature: Math.min(30, (device.temperature || 22) + 1) })}
                        className="w-8 h-8 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className={`mt-4 px-3 py-1 rounded-full text-xs font-medium ${
              device.status 
                ? 'bg-green-500/20 text-green-200 border border-green-500/30' 
                : 'bg-red-500/20 text-red-200 border border-red-500/30'
            }`}>
              {device.status ? 'Online' : 'Offline'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeviceGrid
