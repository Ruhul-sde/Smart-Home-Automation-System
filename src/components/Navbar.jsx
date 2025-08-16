
import { useState } from 'react'

const Navbar = ({ activeTab, setActiveTab, unreadCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '🏠', description: 'Home overview' },
    { id: 'rooms', name: 'Rooms', icon: '🏘️', description: 'Room controls' },
    { id: 'devices', name: 'Devices', icon: '💡', description: 'Device management' },
    { id: 'scenes', name: 'Scenes', icon: '🎭', description: 'Device scenes' },
    { id: 'automation', name: 'Automation', icon: '⚙️', description: 'Smart rules' },
    { id: 'energy', name: 'Energy', icon: '⚡', description: 'Usage monitor' },
    { id: 'security', name: 'Security', icon: '🔒', description: 'Safety controls' },
    { id: 'notifications', name: 'Notifications', icon: '🔔', description: 'System alerts', badge: unreadCount },
    { id: 'settings', name: 'Settings', icon: '⚙️', description: 'Preferences' }
  ]

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:block sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  SmartHome
                </h1>
                <p className="text-purple-300 text-xs">Automation Hub</p>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative group px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-white shadow-lg backdrop-blur-sm border border-purple-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                    {item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">
                        {item.badge > 99 ? '99+' : item.badge}
                      </span>
                    )}
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {item.description}
                  </div>
                </button>
              ))}
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
              <div className="hidden xl:block">
                <p className="text-white text-sm font-medium">Admin</p>
                <p className="text-slate-400 text-xs">System Owner</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="lg:hidden sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <h1 className="text-white font-bold text-lg">SmartHome</h1>
            </div>

            {/* Notification Badge & Menu Button */}
            <div className="flex items-center space-x-3">
              {unreadCount > 0 && (
                <div className="relative">
                  <button
                    onClick={() => handleTabClick('notifications')}
                    className="w-8 h-8 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-center text-red-400"
                  >
                    🔔
                  </button>
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                </div>
              )}
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <div className="space-y-1">
                  <div className={`w-4 h-0.5 bg-white transition-transform duration-200 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                  <div className={`w-4 h-0.5 bg-white transition-opacity duration-200 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                  <div className={`w-4 h-0.5 bg-white transition-transform duration-200 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 py-4 bg-black/30 backdrop-blur-sm border-t border-white/5">
            <div className="grid grid-cols-2 gap-3">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative p-3 rounded-xl text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-purple-500/30 shadow-lg'
                      : 'bg-white/5 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-white font-medium text-sm">{item.name}</p>
                      <p className="text-slate-400 text-xs">{item.description}</p>
                    </div>
                    {item.badge > 0 && (
                      <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            {/* User Profile in Mobile */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">A</span>
                </div>
                <div>
                  <p className="text-white font-medium">Admin User</p>
                  <p className="text-slate-400 text-sm">System Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
