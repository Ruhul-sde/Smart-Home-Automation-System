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

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', message: 'Security system armed', time: '2 min ago', read: false },
    { id: 2, type: 'warning', message: 'High energy usage detected', time: '15 min ago', read: false },
    { id: 3, type: 'success', message: 'All lights turned off automatically', time: '1 hour ago', read: true },
  ])

  const [devices, setDevices] = useState([
    { id: 1, name: 'Living Room Lights', type: 'light', room: 'living', status: true, brightness: 75, lastUpdated: Date.now() },
    { id: 2, name: 'Bedroom AC', type: 'ac', room: 'bedroom', status: false, temperature: 22, lastUpdated: Date.now() },
    { id: 3, name: 'Kitchen Smart Lock', type: 'lock', room: 'kitchen', status: true, lastUpdated: Date.now() },
    { id: 4, name: 'Garden Sprinkler', type: 'sprinkler', room: 'garden', status: false, schedule: '06:00', lastUpdated: Date.now() },
    { id: 5, name: 'Home Theater', type: 'entertainment', room: 'living', status: false, volume: 30, lastUpdated: Date.now() },
    { id: 6, name: 'Security Camera', type: 'camera', room: 'entrance', status: true, recording: true, lastUpdated: Date.now() },
    { id: 7, name: 'Smart Thermostat', type: 'thermostat', room: 'living', status: true, temperature: 24, targetTemp: 24, lastUpdated: Date.now() },
    { id: 8, name: 'Garage Door', type: 'garage', room: 'garage', status: false, lastUpdated: Date.now() },
  ])

  const [rooms, setRooms] = useState([
    { id: 'living', name: 'Living Room', temperature: 24, humidity: 45, devices: 3, occupied: true },
    { id: 'bedroom', name: 'Bedroom', temperature: 22, humidity: 50, devices: 2, occupied: false },
    { id: 'kitchen', name: 'Kitchen', temperature: 26, humidity: 40, devices: 2, occupied: false },
    { id: 'garden', name: 'Garden', temperature: 28, humidity: 35, devices: 1, occupied: false },
    { id: 'garage', name: 'Garage', temperature: 20, humidity: 30, devices: 1, occupied: false },
  ])

  const [automations, setAutomations] = useState([
    { id: 1, name: 'Good Morning', time: '07:00', active: true, actions: ['Turn on lights', 'Start coffee maker', 'Open blinds'], lastTriggered: 'Yesterday' },
    { id: 2, name: 'Away Mode', trigger: 'location', active: true, actions: ['Lock doors', 'Turn off lights', 'Arm security'], lastTriggered: '2 hours ago' },
    { id: 3, name: 'Sleep Mode', time: '23:00', active: false, actions: ['Turn off all lights', 'Lower AC temperature', 'Lock doors'], lastTriggered: 'Never' },
    { id: 4, name: 'Movie Night', trigger: 'manual', active: true, actions: ['Dim lights', 'Turn on TV', 'Close blinds'], lastTriggered: 'Last week' },
  ])

  const [energyData, setEnergyData] = useState({
    currentUsage: 2.4,
    dailyUsage: 48.6,
    monthlyUsage: 1230,
    cost: 156.78,
    peakHours: '6:00 PM - 9:00 PM',
    efficiency: 87
  })

  const [userSettings, setUserSettings] = useState({
    theme: 'dark',
    notifications: true,
    autoSave: true,
    language: 'en',
    currency: 'USD',
    temperatureUnit: 'C'
  })

  const toggleDevice = (deviceId) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { ...device, status: !device.status, lastUpdated: Date.now() }
        : device
    ))

    // Add notification for device status change
    const device = devices.find(d => d.id === deviceId)
    if (device) {
      addNotification('info', `${device.name} ${device.status ? 'turned off' : 'turned on'}`)
    }
  }

  const updateDevice = (deviceId, updates) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { ...device, ...updates, lastUpdated: Date.now() }
        : device
    ))
  }

  const addAutomation = (automation) => {
    setAutomations([...automations, { ...automation, id: Date.now(), lastTriggered: 'Never' }])
    addNotification('success', `Automation "${automation.name}" created successfully`)
  }

  const toggleAutomation = (automationId) => {
    setAutomations(automations.map(automation =>
      automation.id === automationId
        ? { ...automation, active: !automation.active }
        : automation
    ))
  }

  const addNotification = (type, message) => {
    const newNotification = {
      id: Date.now(),
      type,
      message,
      time: 'Just now',
      read: false
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    ))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const updateSettings = (newSettings) => {
    setUserSettings({ ...userSettings, ...newSettings })
    addNotification('info', 'Settings updated successfully')
  }

  const quickActions = {
    allOff: () => {
      setDevices(devices.map(device => ({ ...device, status: false, lastUpdated: Date.now() })))
      addNotification('info', 'All devices turned off')
    },
    sleepMode: () => {
      setDevices(devices.map(device => {
        if (device.type === 'light') return { ...device, status: false, lastUpdated: Date.now() }
        if (device.type === 'lock') return { ...device, status: true, lastUpdated: Date.now() }
        if (device.type === 'ac') return { ...device, temperature: 20, lastUpdated: Date.now() }
        return device
      }))
      addNotification('success', 'Sleep mode activated')
    },
    awayMode: () => {
      setDevices(devices.map(device => {
        if (device.type === 'light' || device.type === 'entertainment') return { ...device, status: false, lastUpdated: Date.now() }
        if (device.type === 'lock') return { ...device, status: true, lastUpdated: Date.now() }
        if (device.type === 'camera') return { ...device, recording: true, lastUpdated: Date.now() }
        return device
      }))
      addNotification('warning', 'Away mode activated - Security armed')
    },
    movieNight: () => {
      setDevices(devices.map(device => {
        if (device.type === 'light') return { ...device, status: true, brightness: 20, lastUpdated: Date.now() }
        if (device.type === 'entertainment') return { ...device, status: true, lastUpdated: Date.now() }
        return device
      }))
      addNotification('info', 'Movie night mode activated')
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        unreadCount={unreadCount} 
      />

      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer />
    </div>
  )
}

export default App