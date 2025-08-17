
import { useState, useEffect } from 'react'

const Navbar = ({ activeTab, setActiveTab, unreadCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: '🏠', 
      description: 'Home overview',
      gradient: 'from-blue-500 to-purple-600'
    },
    { 
      id: 'rooms', 
      name: 'Rooms', 
      icon: '🏘️', 
      description: 'Room controls',
      gradient: 'from-green-500 to-teal-600'
    },
    { 
      id: 'devices', 
      name: 'Devices', 
      icon: '💡', 
      description: 'Device management',
      gradient: 'from-yellow-500 to-orange-600'
    },
    { 
      id: 'scenes', 
      name: 'Scenes', 
      icon: '🎭', 
      description: 'Device scenes',
      gradient: 'from-pink-500 to-rose-600'
    },
    { 
      id: 'automation', 
      name: 'Automation', 
      icon: '⚙️', 
      description: 'Smart rules',
      gradient: 'from-indigo-500 to-blue-600'
    },
    { 
      id: 'energy', 
      name: 'Energy', 
      icon: '⚡', 
      description: 'Usage monitor',
      gradient: 'from-emerald-500 to-green-600'
    },
    { 
      id: 'security', 
      name: 'Security', 
      icon: '🔒', 
      description: 'Safety controls',
      gradient: 'from-red-500 to-pink-600'
    },
    { 
      id: 'notifications', 
      name: 'Notifications', 
      icon: '🔔', 
      description: 'System alerts', 
      badge: unreadCount,
      gradient: 'from-purple-500 to-indigo-600'
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: '⚙️', 
      description: 'Preferences',
      gradient: 'from-slate-500 to-gray-600'
    }
  ]

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'backdrop-blur-2xl bg-gradient-to-r from-black/40 via-purple-900/30 to-black/40 shadow-2xl shadow-purple-500/10' 
          : 'backdrop-blur-xl bg-black/20'
      } border-b border-white/10`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-18">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:shadow-purple-500/30 transition-all duration-300 group-hover:scale-110">
                  <span className="text-white font-bold text-xl">S</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-30 group-hover:opacity-60 blur transition-all duration-300 -z-10"></div>
              </div>
              <div className="transition-all duration-300 group-hover:translate-x-1">
                <h1 className="text-white font-bold text-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SmartHome
                </h1>
                <p className="text-purple-300 text-sm font-medium">Automation Hub</p>
              </div>
            </div>

            {/* Enhanced Navigation Items */}
            <div className="flex items-center space-x-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative group px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                    activeTab === item.id
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-2xl shadow-current/25 border border-white/20`
                      : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`text-lg transition-all duration-300 ${
                      activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'
                    }`}>
                      {item.icon}
                    </span>
                    <span className="hidden xl:block">{item.name}</span>
                    {item.badge > 0 && (
                      <div className="relative">
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center font-bold animate-pulse shadow-lg">
                          {item.badge > 99 ? '99+' : item.badge}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Enhanced Tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 px-4 py-2 bg-black/90 backdrop-blur-sm text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-xl border border-white/10">
                    <div className="text-center">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-slate-300">{item.description}</p>
                    </div>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45"></div>
                  </div>
                </button>
              ))}
            </div>

            {/* Enhanced User Profile */}
            <div className="flex items-center space-x-4 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-110">
                  <span className="text-white text-lg font-bold">A</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl opacity-30 group-hover:opacity-60 blur transition-all duration-300 -z-10"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
              </div>
              <div className="hidden xl:block transition-all duration-300 group-hover:translate-x-1">
                <p className="text-white text-sm font-semibold">Admin User</p>
                <p className="text-emerald-400 text-xs font-medium">System Owner</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Navbar */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-gradient-to-r from-black/50 via-purple-900/40 to-black/50 border-b border-white/10 shadow-2xl">
        <div className="px-6">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Logo */}
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/30 transition-all duration-300">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-30 group-hover:opacity-50 blur transition-all duration-300 -z-10"></div>
              </div>
              <h1 className="text-white font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SmartHome
              </h1>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center space-x-4">
              {/* Quick Notification Access */}
              {unreadCount > 0 && (
                <button
                  onClick={() => handleTabClick('notifications')}
                  className="relative w-10 h-10 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-all duration-300 shadow-lg"
                >
                  <span className="text-lg">🔔</span>
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center font-bold animate-pulse shadow-lg">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                </button>
              )}
              
              {/* Enhanced Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/10"
              >
                <div className="space-y-1.5">
                  <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                  <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                  <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-6 py-6 bg-black/40 backdrop-blur-2xl border-t border-white/10">
            <div className="grid grid-cols-2 gap-4">
              {navigationItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative p-4 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 ${
                    activeTab === item.id
                      ? `bg-gradient-to-r ${item.gradient} border border-white/20 shadow-2xl shadow-current/25`
                      : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">{item.name}</p>
                      <p className="text-slate-400 text-xs">{item.description}</p>
                    </div>
                    {item.badge > 0 && (
                      <span className="absolute top-3 right-3 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center font-bold animate-pulse shadow-lg">
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            {/* Enhanced Mobile User Profile */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold">Admin User</p>
                  <p className="text-emerald-400 text-sm font-medium">System Owner</p>
                </div>
                <div className="text-green-400">
                  <span className="text-sm">●</span>
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
