
import SecuritySystem from '../components/SecuritySystem'

const SecurityPage = ({ devices, onDeviceToggle, rooms }) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <SecuritySystem 
          devices={devices} 
          onDeviceToggle={onDeviceToggle}
          rooms={rooms}
        />
      </div>
    </div>
  )
}

export default SecurityPage
