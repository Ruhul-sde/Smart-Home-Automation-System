
import { useState } from 'react'

const Navbar = ({ activeTab, setActiveTab, unreadCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '🏠', color: 'blue' },
    { id: 'rooms', name: 'Rooms', icon: '🚪', color: 'green' },
    { id: 'devices', name: 'Devices', icon: '💡', color: 'yellow' },
    { id: 'automation', name: 'Automation', icon: '⚙️', color: 'purple' },
    { id: 'energy', name: 'Energy', icon: '⚡', color: 'orange' },
    { id: 'security', name: 'Security', icon: '🔒', color: 'red' },
    { id: 'notifications', name: 'Notifications', icon: '🔔', color: 'pink', badge: unreadCount },
    { id: 'settings', name: 'Settings', icon: '⚙️', color: 'gray' },
  ]

  return (
    <nav className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">SH</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Smart Home</h1>
              <p className="text-xs text-slate-400">Control Hub</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? `bg-${tab.color}-500 text-white shadow-lg shadow-${tab.color}-500/30`
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-sm">{tab.icon}</span>
                <span className="font-medium text-sm">{tab.name}</span>
                {tab.badge > 0 && (
                  <span className="w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          {/* User Info */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-white font-medium text-sm">{new Date().toLocaleDateString()}</p>
              <p className="text-slate-400 text-xs">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            {unreadCount > 0 && (
              <div className="relative">
                <button
                  onClick={() => setActiveTab('notifications')}
                  className="w-8 h-8 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  🔔
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <div className="grid grid-cols-2 gap-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? `bg-${tab.color}-500 text-white`
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.name}</span>
                  {tab.badge > 0 && (
                    <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
