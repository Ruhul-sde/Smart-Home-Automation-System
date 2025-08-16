
import Settings from '../components/Settings'

const SettingsPage = ({ settings, onUpdateSettings, devices, rooms }) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Settings 
          settings={settings}
          onUpdateSettings={onUpdateSettings}
          devices={devices}
          rooms={rooms}
        />
      </div>
    </div>
  )
}

export default SettingsPage
