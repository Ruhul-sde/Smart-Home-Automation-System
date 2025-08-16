import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import DashboardPage from './pages/DashboardPage'
import RoomsPage from './pages/RoomsPage'
import DevicesPage from './pages/DevicesPage'
import AutomationPage from './pages/AutomationPage'
import EnergyPage from './pages/EnergyPage'
import SecurityPage from './pages/SecurityPage'
import NotificationsPage from './pages/NotificationsPage'
import SettingsPage from './pages/SettingsPage'
import ApiService from './services/api'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [notifications, setNotifications] = useState([])
  const [devices, setDevices] = useState([])
  const [rooms, setRooms] = useState([])
  const [automations, setAutomations] = useState([])
  const [energyData, setEnergyData] = useState({
    currentUsage: 0,
    dailyUsage: 0,
    monthlyUsage: 0,
    cost: 0,
    peakHours: '',
    efficiency: 0
  })
  const [userSettings, setUserSettings] = useState({
    theme: 'dark',
    notifications: true,
    autoSave: true,
    language: 'en',
    currency: 'USD',
    temperatureUnit: 'C'
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load initial data from API
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true)
        const [devicesData, roomsData, automationsData, notificationsData, energyResponse, settingsData] = await Promise.all([
          ApiService.getDevices(),
          ApiService.getRooms(),
          ApiService.getAutomations(),
          ApiService.getNotifications(),
          ApiService.getEnergyData(),
          ApiService.getSettings()
        ])

        setDevices(devicesData)
        setRooms(roomsData)
        setAutomations(automationsData)
        setNotifications(notificationsData)
        setEnergyData(energyResponse)
        setUserSettings(settingsData)
        setError(null)
      } catch (err) {
        console.error('Failed to load initial data:', err)
        setError('Failed to connect to server. Using offline mode.')
        // Keep fallback data for offline mode
        setDevices([
          { id: 1, name: 'Living Room Lights', type: 'light', room: 'living', status: true, brightness: 75, lastUpdated: Date.now() },
          { id: 2, name: 'Bedroom AC', type: 'ac', room: 'bedroom', status: false, temperature: 22, lastUpdated: Date.now() },
        ])
        setRooms([
          { id: 'living', name: 'Living Room', temperature: 24, humidity: 45, devices: 3, occupied: true },
        ])
        setAutomations([
          { id: 1, name: 'Good Morning', time: '07:00', active: true, actions: ['Turn on lights'], lastTriggered: 'Yesterday' },
        ])
        setNotifications([
          { id: 1, type: 'error', message: 'Server connection failed', time: 'Just now', read: false },
        ])
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  const toggleDevice = async (deviceId) => {
    try {
      const updatedDevice = await ApiService.toggleDevice(deviceId)
      setDevices(devices.map(device => 
        device.id === deviceId ? updatedDevice : device
      ))
      // Refresh notifications to get the new one from server
      const updatedNotifications = await ApiService.getNotifications()
      setNotifications(updatedNotifications)
    } catch (err) {
      console.error('Failed to toggle device:', err)
      // Fallback to local state update
      setDevices(devices.map(device => 
        device.id === deviceId 
          ? { ...device, status: !device.status, lastUpdated: Date.now() }
          : device
      ))
    }
  }

  const updateDevice = async (deviceId, updates) => {
    try {
      const updatedDevice = await ApiService.updateDevice(deviceId, updates)
      setDevices(devices.map(device => 
        device.id === deviceId ? updatedDevice : device
      ))
      // Refresh notifications
      const updatedNotifications = await ApiService.getNotifications()
      setNotifications(updatedNotifications)
    } catch (err) {
      console.error('Failed to update device:', err)
      // Fallback to local state update
      setDevices(devices.map(device => 
        device.id === deviceId 
          ? { ...device, ...updates, lastUpdated: Date.now() }
          : device
      ))
    }
  }

  const addAutomation = async (automation) => {
    try {
      const newAutomation = await ApiService.createAutomation(automation)
      setAutomations([...automations, newAutomation])
      // Refresh notifications
      const updatedNotifications = await ApiService.getNotifications()
      setNotifications(updatedNotifications)
    } catch (err) {
      console.error('Failed to create automation:', err)
    }
  }

  const toggleAutomation = async (automationId) => {
    try {
      const automation = automations.find(a => a.id === automationId)
      const updatedAutomation = await ApiService.updateAutomation(automationId, { 
        active: !automation.active 
      })
      setAutomations(automations.map(a =>
        a.id === automationId ? updatedAutomation : a
      ))
    } catch (err) {
      console.error('Failed to toggle automation:', err)
      // Fallback to local state update
      setAutomations(automations.map(automation =>
        automation.id === automationId
          ? { ...automation, active: !automation.active }
          : automation
      ))
    }
  }

  const markNotificationAsRead = async (notificationId) => {
    try {
      await ApiService.markNotificationAsRead(notificationId)
      setNotifications(notifications.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      ))
    } catch (err) {
      console.error('Failed to mark notification as read:', err)
    }
  }

  const clearAllNotifications = async () => {
    try {
      await ApiService.clearAllNotifications()
      setNotifications([])
    } catch (err) {
      console.error('Failed to clear notifications:', err)
    }
  }

  const updateSettings = async (newSettings) => {
    try {
      const updatedSettings = await ApiService.updateSettings(newSettings)
      setUserSettings(updatedSettings)
      // Refresh notifications
      const updatedNotifications = await ApiService.getNotifications()
      setNotifications(updatedNotifications)
    } catch (err) {
      console.error('Failed to update settings:', err)
      // Fallback to local state update
      setUserSettings({ ...userSettings, ...newSettings })
    }
  }

  const quickActions = {
    allOff: async () => {
      try {
        const response = await ApiService.executeAllOff()
        setDevices(response.devices)
        const updatedNotifications = await ApiService.getNotifications()
        setNotifications(updatedNotifications)
      } catch (err) {
        console.error('Failed to execute all off:', err)
      }
    },
    sleepMode: async () => {
      try {
        const response = await ApiService.executeSleepMode()
        setDevices(response.devices)
        const updatedNotifications = await ApiService.getNotifications()
        setNotifications(updatedNotifications)
      } catch (err) {
        console.error('Failed to execute sleep mode:', err)
      }
    },
    awayMode: async () => {
      try {
        const response = await ApiService.executeAwayMode()
        setDevices(response.devices)
        const updatedNotifications = await ApiService.getNotifications()
        setNotifications(updatedNotifications)
      } catch (err) {
        console.error('Failed to execute away mode:', err)
      }
    },
    movieNight: async () => {
      try {
        const response = await ApiService.executeMovieNight()
        setDevices(response.devices)
        const updatedNotifications = await ApiService.getNotifications()
        setNotifications(updatedNotifications)
      } catch (err) {
        console.error('Failed to execute movie night:', err)
      }
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardPage 
            devices={devices} 
            rooms={rooms} 
            energyData={energyData}
            automations={automations}
            quickActions={quickActions}
            notifications={notifications}
          />
        )
      case 'rooms':
        return (
          <RoomsPage 
            rooms={rooms} 
            devices={devices} 
            onDeviceToggle={toggleDevice}
            onDeviceUpdate={updateDevice}
            setRooms={setRooms}
          />
        )
      case 'devices':
        return (
          <DevicesPage 
            devices={devices} 
            onToggle={toggleDevice}
            onUpdate={updateDevice}
            rooms={rooms}
          />
        )
      case 'automation':
        return (
          <AutomationPage 
            automations={automations}
            onToggle={toggleAutomation}
            onAdd={addAutomation}
            devices={devices}
            rooms={rooms}
          />
        )
      case 'energy':
        return (
          <EnergyPage 
            energyData={energyData} 
            devices={devices} 
            rooms={rooms}
          />
        )
      case 'security':
        return (
          <SecurityPage 
            devices={devices} 
            onDeviceToggle={toggleDevice}
            rooms={rooms}
          />
        )
      case 'notifications':
        return (
          <NotificationsPage 
            notifications={notifications}
            onMarkAsRead={markNotificationAsRead}
            onClearAll={clearAllNotifications}
          />
        )
      case 'settings':
        return (
          <SettingsPage 
            settings={userSettings}
            onUpdateSettings={updateSettings}
            devices={devices}
            rooms={rooms}
          />
        )
      default:
        return (
          <DashboardPage 
            devices={devices} 
            rooms={rooms} 
            energyData={energyData}
            automations={automations}
            quickActions={quickActions}
            notifications={notifications}
          />
        )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-white text-xl font-semibold mb-2">Loading Smart Home System</h2>
          <p className="text-purple-200">Connecting to your devices...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        unreadCount={unreadCount} 
      />

      {error && (
        <div className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-200 px-4 py-2 text-center">
          ⚠️ {error}
        </div>
      )}

      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer />
    </div>
  )
}

export default App