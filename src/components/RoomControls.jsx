
const RoomControls = ({ rooms, devices, onDeviceToggle, onDeviceUpdate }) => {
  const getRoomDevices = (roomId) => {
    return devices.filter(device => device.room === roomId)
  }

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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Room Controls</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {rooms.map(room => {
          const roomDevices = getRoomDevices(room.id)
          
          return (
            <div key={room.id} className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">{room.name}</h3>
                <div className="flex gap-4 text-sm text-slate-300">
                  <span>{room.temperature}°C</span>
                  <span>{room.humidity}%</span>
                </div>
              </div>

              <div className="space-y-4">
                {roomDevices.map(device => (
                  <div key={device.id} className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getDeviceIcon(device.type)}</span>
                        <div>
                          <p className="text-white font-medium">{device.name}</p>
                          <p className="text-sm text-slate-400 capitalize">{device.type}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {device.type === 'light' && device.status && (
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={device.brightness || 50}
                            onChange={(e) => onDeviceUpdate(device.id, { brightness: parseInt(e.target.value) })}
                            className="w-20 accent-blue-500"
                          />
                        )}
                        
                        {device.type === 'ac' && device.status && (
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => onDeviceUpdate(device.id, { temperature: Math.max(16, (device.temperature || 22) - 1) })}
                              className="w-8 h-8 bg-blue-500/20 rounded-full text-white hover:bg-blue-500/30"
                            >
                              -
                            </button>
                            <span className="text-white min-w-[3rem] text-center">{device.temperature || 22}°C</span>
                            <button 
                              onClick={() => onDeviceUpdate(device.id, { temperature: Math.min(30, (device.temperature || 22) + 1) })}
                              className="w-8 h-8 bg-blue-500/20 rounded-full text-white hover:bg-blue-500/30"
                            >
                              +
                            </button>
                          </div>
                        )}
                        
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
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RoomControls
