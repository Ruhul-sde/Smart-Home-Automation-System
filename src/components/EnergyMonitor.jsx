
import { useState, useEffect } from 'react'

const EnergyMonitor = ({ energyData, devices }) => {
  const [chartData, setChartData] = useState([])
  const [timeRange, setTimeRange] = useState('24h')

  useEffect(() => {
    // Generate mock chart data
    const generateData = () => {
      const hours = timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : 30
      const data = []
      for (let i = 0; i < hours; i++) {
        data.push({
          time: i,
          usage: Math.random() * 5 + 1,
          cost: Math.random() * 0.5 + 0.1
        })
      }
      setChartData(data)
    }

    generateData()
  }, [timeRange])

  const getDevicePowerUsage = (device) => {
    const basePower = {
      light: 0.06,
      ac: 2.5,
      lock: 0.01,
      sprinkler: 0.8,
      entertainment: 0.2,
      camera: 0.05
    }
    
    let power = basePower[device.type] || 0.1
    
    if (device.type === 'light' && device.brightness) {
      power = power * (device.brightness / 100)
    }
    
    return device.status ? power : 0
  }

  const totalDevicePower = devices.reduce((total, device) => total + getDevicePowerUsage(device), 0)

  const maxUsage = Math.max(...chartData.map(d => d.usage))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Energy Monitor</h2>
        <div className="flex gap-2">
          {['24h', '7d', '30d'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                timeRange === range
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Energy Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm p-6 rounded-2xl border border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm font-medium">Current Usage</p>
              <p className="text-3xl font-bold text-white">{energyData.currentUsage}kW</p>
            </div>
            <div className="w-12 h-12 bg-green-500/30 rounded-xl flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm font-medium">Today</p>
              <p className="text-3xl font-bold text-white">{energyData.dailyUsage}kWh</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm font-medium">This Month</p>
              <p className="text-3xl font-bold text-white">{energyData.monthlyUsage}kWh</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm p-6 rounded-2xl border border-orange-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-200 text-sm font-medium">Monthly Cost</p>
              <p className="text-3xl font-bold text-white">${energyData.cost}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/30 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Chart */}
      <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-6">Usage Over Time</h3>
        <div className="h-64 flex items-end gap-2">
          {chartData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="bg-gradient-to-t from-blue-500 to-blue-300 w-full rounded-t-lg transition-all duration-500 hover:from-blue-400 hover:to-blue-200"
                style={{ 
                  height: `${(data.usage / maxUsage) * 200}px`,
                  minHeight: '4px'
                }}
              />
              <span className="text-xs text-slate-400 mt-2">
                {timeRange === '24h' ? `${data.time}:00` : `Day ${data.time + 1}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Device Power Usage */}
      <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-6">Device Power Usage</h3>
        <div className="space-y-4">
          {devices.map(device => {
            const power = getDevicePowerUsage(device)
            const percentage = totalDevicePower > 0 ? (power / totalDevicePower) * 100 : 0
            
            return (
              <div key={device.id} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <span className="text-xl">
                    {device.type === 'light' ? '💡' :
                     device.type === 'ac' ? '❄️' :
                     device.type === 'lock' ? '🔒' :
                     device.type === 'sprinkler' ? '💧' :
                     device.type === 'entertainment' ? '📺' : '📹'}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{device.name}</span>
                    <span className="text-slate-300">{power.toFixed(2)}kW</span>
                  </div>
                  <div className="bg-white/10 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        device.status 
                          ? 'bg-gradient-to-r from-green-500 to-green-400' 
                          : 'bg-gradient-to-r from-gray-500 to-gray-400'
                      }`}
                      style={{ width: `${Math.max(percentage, 2)}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Energy Tips */}
      <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">💡 Energy Saving Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 p-4 rounded-xl">
            <p className="text-green-400 font-medium mb-2">Lights Optimization</p>
            <p className="text-slate-300 text-sm">Consider using LED bulbs and dimming lights when not needed. Current brightness average: 75%</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl">
            <p className="text-blue-400 font-medium mb-2">AC Efficiency</p>
            <p className="text-slate-300 text-sm">Set temperature to 24°C for optimal efficiency. Each degree lower increases consumption by 8%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnergyMonitor
