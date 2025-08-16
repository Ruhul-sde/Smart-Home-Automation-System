
import { useState } from 'react'

const Settings = ({ settings, onUpdateSettings, devices, rooms }) => {
  const [activeSection, setActiveSection] = useState('general')
  const [tempSettings, setTempSettings] = useState(settings)

  const handleSave = () => {
    onUpdateSettings(tempSettings)
  }

  const handleReset = () => {
    setTempSettings(settings)
  }

  const sections = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'energy', name: 'Energy', icon: '⚡' },
    { id: 'about', name: 'About', icon: 'ℹ️' },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-black/20 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium">{section.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            {activeSection === 'general' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">General Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Theme</label>
                    <select
                      value={tempSettings.theme}
                      onChange={(e) => setTempSettings(prev => ({ ...prev, theme: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                    >
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Language</label>
                    <select
                      value={tempSettings.language}
                      onChange={(e) => setTempSettings(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Currency</label>
                    <select
                      value={tempSettings.currency}
                      onChange={(e) => setTempSettings(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Temperature Unit</label>
                    <select
                      value={tempSettings.temperatureUnit}
                      onChange={(e) => setTempSettings(prev => ({ ...prev, temperatureUnit: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                    >
                      <option value="C">Celsius (°C)</option>
                      <option value="F">Fahrenheit (°F)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Auto-save Changes</p>
                      <p className="text-slate-400 text-sm">Automatically save settings changes</p>
                    </div>
                    <button
                      onClick={() => setTempSettings(prev => ({ ...prev, autoSave: !prev.autoSave }))}
                      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                        tempSettings.autoSave 
                          ? 'bg-green-500 shadow-lg shadow-green-500/30' 
                          : 'bg-slate-600'
                      }`}
                    >
                      <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform duration-300 ${
                        tempSettings.autoSave ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Notification Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Push Notifications</p>
                      <p className="text-slate-400 text-sm">Receive notifications for device changes</p>
                    </div>
                    <button
                      onClick={() => setTempSettings(prev => ({ ...prev, notifications: !prev.notifications }))}
                      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                        tempSettings.notifications 
                          ? 'bg-green-500 shadow-lg shadow-green-500/30' 
                          : 'bg-slate-600'
                      }`}
                    >
                      <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform duration-300 ${
                        tempSettings.notifications ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl">
                    <h4 className="text-white font-medium mb-3">Notification Types</h4>
                    <div className="space-y-3">
                      {[
                        { key: 'deviceStatus', label: 'Device Status Changes', desc: 'When devices turn on/off' },
                        { key: 'security', label: 'Security Alerts', desc: 'Security system notifications' },
                        { key: 'energy', label: 'Energy Alerts', desc: 'High usage warnings' },
                        { key: 'automation', label: 'Automation Events', desc: 'When automations trigger' },
                      ].map(item => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="text-white text-sm font-medium">{item.label}</p>
                            <p className="text-slate-400 text-xs">{item.desc}</p>
                          </div>
                          <button className="relative w-10 h-5 rounded-full bg-green-500 shadow-lg shadow-green-500/30">
                            <div className="absolute w-3 h-3 bg-white rounded-full top-1 translate-x-6 transition-transform duration-300" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Security Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 p-4 rounded-xl">
                    <h4 className="text-white font-medium mb-3">Connected Devices</h4>
                    <p className="text-slate-400 text-sm mb-4">{devices.length} devices connected</p>
                    <div className="space-y-2">
                      {devices.slice(0, 3).map(device => (
                        <div key={device.id} className="flex items-center justify-between">
                          <span className="text-white text-sm">{device.name}</span>
                          <span className={`w-2 h-2 rounded-full ${device.status ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                        </div>
                      ))}
                      {devices.length > 3 && (
                        <p className="text-slate-400 text-xs">+{devices.length - 3} more devices</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl">
                    <h4 className="text-white font-medium mb-3">Security Status</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-white text-sm">All systems operational</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-white text-sm">Encryption enabled</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        <span className="text-white text-sm">Firmware update available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'energy' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Energy Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Energy Saving Mode</label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white">
                      <option>Eco Mode</option>
                      <option>Balanced</option>
                      <option>Performance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Usage Alert Threshold</label>
                    <input
                      type="number"
                      defaultValue="5.0"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                      placeholder="kW"
                    />
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl">
                  <h4 className="text-white font-medium mb-3">Current Month Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-400">1,230</p>
                      <p className="text-slate-400 text-sm">kWh Used</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-400">$156</p>
                      <p className="text-slate-400 text-sm">Total Cost</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-400">87%</p>
                      <p className="text-slate-400 text-sm">Efficiency</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-400">-12%</p>
                      <p className="text-slate-400 text-sm">vs Last Month</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'about' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">About Smart Home Control</h3>
                
                <div className="bg-white/5 p-6 rounded-xl text-center">
                  <div className="text-6xl mb-4">🏠</div>
                  <h4 className="text-2xl font-bold text-white mb-2">Smart Home Control</h4>
                  <p className="text-slate-400 mb-4">Version 2.1.0</p>
                  <p className="text-slate-300 mb-6">
                    A comprehensive home automation system built with React and modern web technologies.
                    Control your devices, monitor energy usage, and automate your home with ease.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-400">{devices.length}</p>
                      <p className="text-slate-400 text-sm">Connected Devices</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-400">{rooms.length}</p>
                      <p className="text-slate-400 text-sm">Monitored Rooms</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-400">24/7</p>
                      <p className="text-slate-400 text-sm">System Uptime</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl">
                  <h4 className="text-white font-medium mb-3">System Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Last Update:</span>
                      <span className="text-white">March 15, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Build:</span>
                      <span className="text-white">2.1.0-stable</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Platform:</span>
                      <span className="text-white">Web Application</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save/Reset Buttons */}
            <div className="flex gap-3 pt-6 border-t border-white/10">
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors"
              >
                Reset
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg hover:shadow-blue-500/30 rounded-lg text-white font-medium transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
